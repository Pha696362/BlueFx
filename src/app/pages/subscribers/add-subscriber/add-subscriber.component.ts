import { ConvertService, toDateExpiredDate } from './../../../services/convert.service';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Environment } from 'src/app/stores/environment.store';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { checkExistDoc } from 'src/app/services/fire-validators.service';
import { IProduct, ISubscriber } from 'src/app/interfaces/subscriber';
import { StatusObj } from 'src/app/dummy/status';
import { Subscriber } from 'src/app/stores/subscriber.store';

@Component({
  selector: 'app-add-subscriber',
  templateUrl: './add-subscriber.component.html',
  styleUrls: ['./add-subscriber.component.scss']
})
export class AddSubscriberComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  phone: AbstractControl;
  email: AbstractControl;
  firstName: AbstractControl;
  lastName: AbstractControl;
  product: AbstractControl;

  products: any;
  constructor(
    public dialogRef: MatDialogRef<AddSubscriberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store: Subscriber,
    private afs: AngularFirestore,
    private ds: DataService
  ) { }

  async buildForm() {
    this.form = this.fb.group({
      phone: [null, Validators.compose([Validators.required]), checkExistDoc(this.afs, "subscribers", "phoneNumber")],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
       product: [null,],
      email: [null],
    })
    this.phone = this.form.controls['phone'];
    this.firstName = this.form.controls["period"];
    this.lastName = this.form.controls["lastName"];
     this.product = this.form.controls["product"];
    this.email = this.form.controls["email"];
    this.products = await this.store.fetchPackage();
    this.product.patchValue(this.products[0])
  }


  ngOnInit() {
    this.buildForm();
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
  }


  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      const { phone, firstName, lastName, product, email, } = f;
      const { period } = product;
      const expiredDate = toDateExpiredDate(period);
      const item: ISubscriber = {
        key: this.ds.createId(),
        status: StatusObj.ACTIVE,
        page_key: ConvertService.pageKey(),
        create_date: new Date(),
        create_by: this.env.user,
        update_date: new Date(),
        update_by: this.env.user,
        firstName: firstName.toUpperCase(),
        lastName: lastName.toUpperCase(),
        fullName: `${lastName.toUpperCase()} ${firstName.toUpperCase()}`,
        phone: `+855${ConvertService.toNumber(phone)}`,
        phoneNumber: `0${ConvertService.toNumber(phone)}`,
        email: email,
        isPaid: false,
        product: null,
        expiredDate: null,
        expiredDateKey: null,
      }
      this.store.addNew(item, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Membership has been created.', 'done', { duration: 2500 });
          this.form.enable();
          this.form.reset();
          this.inputEl.nativeElement.focus();
        }
        else {
          alert(error)
        }
      })
    }
  }

}
