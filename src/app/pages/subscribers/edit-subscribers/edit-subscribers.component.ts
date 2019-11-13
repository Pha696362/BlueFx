import { ConvertService, toNearExpiredDate } from './../../../services/convert.service';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Environment } from 'src/app/stores/environment.store';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { checkExistDoc } from 'src/app/services/fire-validators.service';
import { IProduct, ISubscriber } from 'src/app/interfaces/subscriber';
import { StatusArray } from 'src/app/dummy/status';
import { Subscriber } from 'src/app/stores/subscriber.store';
import { status } from '../../../dummy/status';

@Component({
  selector: 'app-edit-subscribers',
  templateUrl: './edit-subscribers.component.html',
  styleUrls: ['./edit-subscribers.component.scss']
})
export class EditSubscribersComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  phone: AbstractControl;
  email: AbstractControl;
  firstName: AbstractControl;
  lastName: AbstractControl;
  product: AbstractControl;
  disableaccount:AbstractControl;
  statusList=StatusArray;
  
  products: any;
  constructor(
    public dialogRef: MatDialogRef<EditSubscribersComponent>,
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
      // phone: [null, Validators.compose([]), checkExistDoc(this.afs, "subscribers", "phoneNumber")],
      firstName: [this.data.firstName],
      lastName: [this.data.lastName],
      disableaccount: [this.data.disableaccount],
      email: [this.data.email],
    })
    // this.phone = this.form.controls['phone'];
    this.firstName = this.form.controls["period"];
    this.lastName = this.form.controls["lastName"];
    this.disableaccount = this.form.controls["disableaccount"];
    this.email = this.form.controls["email"];
    // this.products = await this.store.fetchPackage();
    // this.product.patchValue(this.products[0])
  }


  ngOnInit() {
    this.buildForm();
    // console.log(this.data)
    this.disableaccount.patchValue(this.statusList[0]);
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
  }


  create(f: any) {
    if (this.form.valid) {
      this.form.disable();
      const { firstName, lastName, email, disableaccount} = f;
      // const statusTypeKey=statusType.map(m=>(m.key));
      const item: ISubscriber = {
        key: this.data.key,
        update_date: new Date(),
        update_by: this.env.user,
        firstName: firstName.toUpperCase(),
        lastName: lastName.toUpperCase(),
        fullName: `${lastName.toUpperCase()} ${firstName.toUpperCase()}`,
        email: email,
        disableaccount:disableaccount,
      }
      this.store.update(this.ds.subscriberRef(), item, (success, error) => {
        if (success) {
          this.dialogRef.close();
          this.snackBar.open('Membership has been updated.', 'done', { duration: 2500 });
          this.form.enable();
          this.form.reset();
        }
        else {
          alert(error)
        }
      })
    }
  }

}
