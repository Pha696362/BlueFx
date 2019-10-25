import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { PAYMENT_TYPES } from 'src/app/dummy/status';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Bookstore } from 'src/app/stores/bookstore';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/services/data.service';
import { checkExistDoc } from 'src/app/services/fire-validators.service';
import { ConvertService } from 'src/app/services/convert.service';
import {  IContent } from 'src/app/interfaces/bookstore';

@Component({
  selector: 'app-add-new-content',
  templateUrl: './add-new-content.component.html',
  styleUrls: ['./add-new-content.component.scss']
})
export class AddNewContentComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  createname:AbstractControl;
  reference:AbstractControl;
  description:AbstractControl;
  category: AbstractControl;
  type: AbstractControl;
  videos:AbstractControl;
  category_lists = [];
  type_lists = [];
  // paymentData=PAYMENT_TYPES;
  constructor(
    public dialogRef: MatDialogRef<AddNewContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store:Bookstore,
    private afs:AngularFirestore,
    private ds:DataService,
    
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required]),checkExistDoc(this.afs,"content","name")],
      createname:[null,],
      reference:[null,],
      videos:[null,],
      description: [null,],
      category: [null,],
      type: [null,],
    })
    this.name = this.form.controls['name'];
    this.description = this.form.controls['description'];
    this.type = this.form.controls['type'];
    this.videos = this.form.controls['type'];
    this.category = this.form.controls['category'];
    this.createname = this.form.controls['createname'];
    this.reference = this.form.controls['reference'];
  }

  async ngOnInit() {
    this.buildForm();
    this.category_lists = await this.store.fetchCategory();
    this.category.patchValue(this.category_lists[0]);

    this.type_lists = await this.store.fetchTypes();
    // console.log(this.type_lists);
    this.type.patchValue(this.type_lists[0]);
  }
  
  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
  }

  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      const {name,description,category,type,createname,reference,videos}=f;
      // const paymentTypeKey=paymentType.map(m=>(m.key));
      const item: IContent = {
        key: this.ds.createId(),
        name: name,
        createname:createname,
        description:description,
        videos:videos,
        reference:reference,
        category: category,
        type:type,
        create_date: new Date(),
        create_by: this.env.user,
        page_key:ConvertService.pageKey(),
        update_date: new Date(),
        update_by: this.env.user,
      }
      this.store.addNew(this.ds.contentRef(),item, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Course has been created.', 'done', { duration: 2500 });
          this.form.enable();
          this.form.reset();
          // this.inputEl.nativeElement.focus();
        }
        else {
          alert(error)
        }
      })
    }
  }

}
