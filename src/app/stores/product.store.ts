import { IProduct } from './../interfaces/subscriber';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { observable, action } from "mobx";
import { Injectable } from "@angular/core";
import { pushToArray } from '../services/utils.lib';

@Injectable()
export class Product {
  @observable data = [];
  @observable loading = true;
  @observable empty = false;
  @observable process = false;

  constructor(public ds: DataService) { }

  @action
  fetchData() {
    this.loading = true;
    this.ds.productRef().valueChanges().subscribe(docs => {
      this.data = docs;
      this.empty = docs.length === 0;
      this.loading = false;
    });
  }

  @action
  addNew(item:IProduct, callback) {
    this.process = true;
    this.ds.productRef().doc(item.key).set(item).then(() => {
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
      this.process = false;
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  delete(item: IProduct, callback) {
    this.process = true;
    this.ds.productRef().doc(item.key).delete().then(() => {
      this.process = false;
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

}