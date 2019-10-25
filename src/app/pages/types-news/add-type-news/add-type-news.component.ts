import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { Bookstore } from 'src/app/stores/bookstore';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Environment } from 'src/app/stores/environment.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { checkExistDoc } from 'src/app/services/fire-validators.service';
import { ITag, ITypes } from 'src/app/interfaces/bookstore';
import { StatusObj } from 'src/app/dummy/status';
import { ConvertService } from 'src/app/services/convert.service';

@Component({
  selector: 'app-add-type-news',
  templateUrl: './add-type-news.component.html',
  styleUrls: ['./add-type-news.component.scss']
})
export class AddTypeNewsComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;

  constructor(
    public dialogRef: MatDialogRef<AddTypeNewsComponent>,
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
    })
    this.name = this.form.controls['name'];
  }


  ngOnInit() {
    this.buildForm();
  }

  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      const {name}=f;
      const item: ITypes = {
        key: this.ds.createId(),
        name: name,
        status: StatusObj.ACTIVE,
        create_date: new Date(),
        create_by: this.env.user,
        page_key:ConvertService.pageKey(),
        update_date: new Date(),
        update_by: this.env.user,
      }
      this.store.addNew(this.ds.typenewsRef(),item, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Tag has been created.', 'done', { duration: 2500 });
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
