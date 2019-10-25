import { DataService } from 'src/app/services/data.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { observable, action } from "mobx";
import { Injectable } from "@angular/core";
import { pushToArray } from '../services/utils.lib';
import { ConvertService } from '../services/convert.service';
import { IInvoice } from 'src/app/interfaces/invoice';
import { PAY_STATUS, statusObj } from '../dummy/status';

@Injectable()
export class Subscriber {
  @observable data = [];
  @observable invoices = [];
  @observable subscriber = null;
  @observable subscriberKey = null;
  @observable isMember = false;
  @observable loading = true;
  @observable memberships = [];
  @observable receipts = [];
  @observable empty = false;
  @observable process = false;
  @observable FILTER_OPTIONS_TYPES: any = null;

  constructor(public ds: DataService) { }

  @action
  async fetchPackage() {
    this.loading = true;
    const docs = await this.ds.productRef().get().toPromise();
    this.loading = false;
    return pushToArray(docs);
  }

  @action
  async fetchSubscriber() {
    this.loading = true;
    const docs = await this.ds.subscriberRef().get().toPromise();
    this.memberships = pushToArray(docs);
    this.loading = false;
  }

  @action
  fetchSubscriberDoc(key: string) {
    this.loading = true;
    this.isMember = false;
    this.subscriber = null
    this.ds.subscriberRef().doc(key).valueChanges().subscribe(doc => {
      if (doc) {
        this.subscriber = doc;
        const { isPaid, expiredDateKey } = this.subscriber;

        if (isPaid && expiredDateKey >= ConvertService.dateKey()) this.isMember = true;
      }

      this.loading = false;
    })
  }

  @action
  fetchSubscriberReceipts(key: string) {
    this.loading = true;
    this.receipts = null
    this.ds.subscriberRef().doc(key).collection("invoices", ref=> ref.where("isHeader", '==', true)).valueChanges().subscribe(docs => {
      this.receipts = docs
      this.loading = false;
    })
  }

  @action
  fetchSubscriberPayment(key: string) {
    this.loading = true;
    this.ds.subscriberRef().doc(key).collection("invoices").valueChanges().subscribe(docs => {
      this.invoices = docs;
      this.loading = false;
    })
  }

  @action
  search(field, search) {
    if (search.key) {
      return this.ds.subscriberFilterRef(field, search.phone).valueChanges();
    }
    return this.ds.subscriberFilterRef(field, search).valueChanges();
  }

  @action
  subscriberSearch(field) {
    this.loading = true;
    this.ds.subscriberSearchRef(field).valueChanges().subscribe(docs => {
        this.empty = docs.length === 0;
        this.memberships = docs;
        this.loading = false;
      });
  }

  @action
  async fetchTag() {
    this.process = true;
    const docs = await this.ds.tagRef().get().toPromise();
    this.process = false;
    return pushToArray(docs)
  }

  @action
  fetchData(id: string) {
    this.loading = true;
    this.ds.subscriberTypesRef(id).valueChanges().subscribe(docs => {
      this.data = docs;
      this.empty = docs.length === 0;
      this.loading = false;
    });
  }

  @action
  addNew(item: any, callback) {
    this.process = true;
    this.ds.subscriberRef().doc(item.key).set(item).then(() => {
      this.process = false;
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  update(ref: AngularFirestoreCollection, item: any, callback) {
    this.process = true;
    ref.doc(item.key).update(item).then(() => {
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  delete(ref: AngularFirestoreCollection, item: any, callback) {
    this.process = true;
    ref.doc(item.key).delete().then(() => {
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  updateFileUrl(ref, item: any, fileName, fileUrl, callback) {
    this.process = true;
    ref.doc(item.key).update({
      fileName: fileName,
      fileUrl: fileUrl
    }).then(() => {
      this.process = false;
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  updateDocUrl(ref, item: any, docName, docUrl, callback) {
    this.process = true;
    ref.doc(item.key).update({
      docName: docName,
      docUrl: docUrl
    }).then(() => {
      this.process = false;
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  updateInvoiceNo(callback) {
    this.ds.settingFireStore().get().then(config => {
      const setting = config.data();
      this.ds.sysSetting().update({
        invoice_no: setting.invoice_no + 1,
      }).then(() => {
        callback(true, setting)
      }).catch(error => {
        callback(false, error)
      })
    }).catch(error => {
      callback(false, error)
    })
  }

  @action
  savePaidSubscriber(note: string, product: any, subscriber: any, user: any, callback) {
    this.process = true;
    this.updateInvoiceNo(async (success, response) => {
      if (success) {
        const invoiceNo = ConvertService.generate_invoiceNo(response);
        const batch = this.ds.batch();
        const { price, period, discount } = product;
        const subscribeRef = this.ds.subscriberFireRef().doc(subscriber.key);
        const invoiceRef = this.ds.invoiceFireRef();
        const expiredDate = ConvertService.addExpiredMonth(period);
        const dis_amount = (price * discount / 100);
        const amount = price - dis_amount;

        const headerKey = this.ds.createId();
        const header: IInvoice = {
          key: headerKey,
          create_date_key: ConvertService.dateKey(),
          create_date: new Date(),
          create_by: user,
          invoice_no: invoiceNo,
          subscriber: subscriber,
          expired_date: expiredDate,
          expired_date_key: ConvertService.toDateKey(expiredDate),
          invoice_date: new Date(),
          invoice_date_key: ConvertService.dateKey(),
          page_key: ConvertService.pageKey(),
          product: product,
          description: null,
          isPaid: PAY_STATUS.paid,
          isVoid: false,
          price: price,
          amount: amount,
          received_by: user,
          received_date: new Date(),
          received_date_key: ConvertService.dateKey(),
          note: note,
          discount: ConvertService.toNumber(dis_amount),
          headerRef: headerKey,
          isHeader: true,
        }


        const detail: IInvoice = {
          key: this.ds.createId(),
          create_date_key: ConvertService.dateKey(),
          create_date: new Date(),
          create_by: user,
          invoice_no: invoiceNo,
          subscriber: subscriber,
          expired_date: expiredDate,
          expired_date_key: ConvertService.toDateKey(expiredDate),
          invoice_date: new Date(),
          invoice_date_key: ConvertService.dateKey(),
          page_key: ConvertService.pageKey(),
          product: product,
          description: null,
          isPaid: PAY_STATUS.paid,
          isVoid: false,
          price: price,
          amount: amount,
          received_by: user,
          received_date: new Date(),
          received_date_key: ConvertService.dateKey(),
          note: note,
          discount: ConvertService.toNumber(dis_amount),
          headerRef: headerKey,
          isHeader: false,
        }

        batch.set(invoiceRef.doc(header.key), header);
        batch.set(invoiceRef.doc(detail.key), detail);

        batch.set(subscribeRef.collection("invoices").doc(header.key), header);
        batch.set(subscribeRef.collection("invoices").doc(detail.key), detail);

        batch.update(subscribeRef, {
          product: product,
          isPaid: true,
          expiredDate: expiredDate,
          expiredDateKey: ConvertService.toDateKey(expiredDate),
          status: statusObj.subscribed,
        });

        batch.commit().then(() => {
          this.process = false;
          callback(true, null)
        }).catch(error => {
          this.process = false;
          callback(false, error)
        });
      } else {
        alert(response)
      }
    })

  }

}