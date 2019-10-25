import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { IContact } from 'src/app/interfaces/bookstore';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { Bookstore } from 'src/app/stores/bookstore';
import { DataService } from 'src/app/services/data.service';
import { StatusObj } from 'src/app/dummy/status';
import { ConvertService } from 'src/app/services/convert.service';

@Component({
  selector: 'app-edit-new-contact',
  templateUrl: './edit-new-contact.component.html',
  styleUrls: ['./edit-new-contact.component.scss']
})
export class EditNewContactComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  phone:AbstractControl;
  email:AbstractControl;
  constructor(
    public dialogRef: MatDialogRef<EditNewContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store:Bookstore,
    private afs:AngularFirestore,
    private ds:DataService
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [this.data.name, ],
      phone:[this.data.phone, ],
      email:[this.data.email, ]
    })
    this.name = this.form.controls['name'];
    this.phone = this.form.controls['phone'];
    this.email =this.form.controls['email'];
  }


  ngOnInit() {
    this.buildForm();
  }

  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      const {name,phone,email}=f;
      const item: IContact = {
        key: this.data.key,
        name: name,
        phone: phone,
        email:email,
        status: StatusObj.ACTIVE,
        create_date: new Date(),
        create_by: this.env.user,
        page_key:ConvertService.pageKey(),
        update_date: new Date(),
        update_by: this.env.user,
      }
      this.store.update(this.ds.contactRef(),item, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Contact has been update.', 'done', { duration: 2500 });
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