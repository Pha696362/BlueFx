import { ConvertService } from './../../../services/convert.service';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Environment } from 'src/app/stores/environment.store';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Product } from 'src/app/stores/product.store';
import { checkExistDoc } from 'src/app/services/fire-validators.service';
import { IProduct } from 'src/app/interfaces/subscriber';
import { StatusObj } from 'src/app/dummy/status';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  price: AbstractControl;
  period: AbstractControl;
  discount:AbstractControl;
  note:AbstractControl;

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store:Product,
    private afs:AngularFirestore,
    private ds:DataService
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required]),checkExistDoc(this.afs,"products","name")],
      price:[null,Validators.required],
      period:[null,Validators.required],
      discount:[null],
      note:[null],
    })
    this.name = this.form.controls['name'];
    this.period=this.form.controls["period"];
    this.discount=this.form.controls["discount"];
    this.note=this.form.controls["note"];
    this.price=this.form.controls["price"];
  }


  ngOnInit() {
    this.buildForm();
    // console.log(this.env.users);

  }

  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      const {name,price,period,discount,note}=f;
      const item: IProduct = {
        key: this.ds.createId(),
        name: name,
        status: StatusObj.ACTIVE,
        create_date: new Date(),
        create_by: this.env.user,
        page_key:ConvertService.pageKey(),
        update_date: new Date(),
        update_by: this.env.user,
        price:ConvertService.toNumber(price),
        period:ConvertService.toNumber(period),
        discount:ConvertService.toNumber(discount),
        note:note
      }
      // console.log(item);
      this.store.addNew(item, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Package has been created.', 'done', { duration: 2500 });
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
