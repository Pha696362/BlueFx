import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Bookstore } from 'src/app/stores/bookstore';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/services/data.service';
import { checkExistDoc } from 'src/app/services/fire-validators.service';
import { IAbout, IContact } from 'src/app/interfaces/bookstore';
import { StatusObj } from 'src/app/dummy/status';
import { ConvertService } from 'src/app/services/convert.service';

@Component({
  selector: 'app-add-new-contact',
  templateUrl: './add-new-contact.component.html',
  styleUrls: ['./add-new-contact.component.scss']
})
export class AddNewContactComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  phone:AbstractControl;
  email:AbstractControl;
  constructor(
    public dialogRef: MatDialogRef<AddNewContactComponent>,
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
      name: [null, Validators.compose([Validators.required]),checkExistDoc(this.afs,"tags","name")],
      phone:[null, Validators.compose([Validators.required]),checkExistDoc(this.afs,"tags","phone")],
      email:[null, Validators.compose([Validators.required]),checkExistDoc(this.afs,"tags","email")]
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
        key: this.ds.createId(),
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
      this.store.addNew(this.ds.contactRef(),item, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('About has been created.', 'done', { duration: 2500 });
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