import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Bookstore } from 'src/app/stores/bookstore';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/services/data.service';
import { checkExistDoc } from 'src/app/services/fire-validators.service';
import { StatusObj } from 'src/app/dummy/status';
import { IAbout } from 'src/app/interfaces/bookstore';
import { ConvertService } from 'src/app/services/convert.service';

@Component({
  selector: 'app-add-about-us',
  templateUrl: './add-about-us.component.html',
  styleUrls: ['./add-about-us.component.scss']
})
export class AddAboutUsComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  value:AbstractControl;
  mission:AbstractControl;
  constructor(
    public dialogRef: MatDialogRef<AddAboutUsComponent>,
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
      value:[null, Validators.compose([Validators.required]),checkExistDoc(this.afs,"tags","value")],
      mission:[null, Validators.compose([Validators.required]),checkExistDoc(this.afs,"tags","mission")]
    })
    this.name = this.form.controls['name'];
    this.value = this.form.controls['value'];
    this.mission =this.form.controls['mission'];
  }


  ngOnInit() {
    this.buildForm();
  }

  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      const {name,mission,value}=f;
      const item: IAbout = {
        key: this.ds.createId(),
        name: name,
        value: value,
        mission:mission,
        status: StatusObj.ACTIVE,
        create_date: new Date(),
        create_by: this.env.user,
        page_key:ConvertService.pageKey(),
        update_date: new Date(),
        update_by: this.env.user,
      }
      this.store.addNew(this.ds.aboutRef(),item, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('About has been created.', 'done', { duration: 2500 });
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