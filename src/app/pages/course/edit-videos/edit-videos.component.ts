import { ConvertService } from './../../../services/convert.service';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Bookstore } from './../../../stores/bookstore';
import { Environment } from './../../../stores/environment.store';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { PAYMENT_TYPES } from 'src/app/dummy/status';
import { IVideos } from 'src/app/interfaces/bookstore';
import { checkExistDoc } from 'src/app/services/fire-validators.service';
import { duration } from 'moment';

@Component({
  selector: 'app-edit-videos',
  templateUrl: './edit-videos.component.html',
  styleUrls: ['./edit-videos.component.scss']
})

export class EditVideosComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  duration:AbstractControl;
  order:AbstractControl;
  description:AbstractControl;
  videos: AbstractControl;
  paymentType: AbstractControl;
  category: AbstractControl;
  category_lists = [];
  paymentData=PAYMENT_TYPES;
  constructor(
    public dialogRef: MatDialogRef<EditVideosComponent>,
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
      name: [this.data.name],
      order:[this.data.order],
      duration:[this.data.duration],
      description: [this.data.description],
      videos: [this.data.videos,],
      category: [this.data.category],
      paymentType: [this.data.paymentType],
    })
    this.name = this.form.controls['name'];
    this.order = this.form.controls['order'];
    this.duration = this.form.controls['duration'];
    this.description = this.form.controls['description']
    this.paymentType = this.form.controls['paymentType']
    this.videos = this.form.controls['videos'];
    this.category = this.form.controls['category']
  }

  async ngOnInit() {
    this.buildForm();
     this.category_lists = await this.store.fetchCategory();
     this.category.patchValue(this.category_lists[0]);
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
  }

  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      const {name,description,videos,order,duration, category,paymentType}=f;
      const paymentTypeKey=paymentType.map(m=>(m.key));
      const item = {
        key: this.data.key,
        name: name,
        order:order,
        duration:duration,
        // course:this.data,
        description:description,
        videos: videos,
        // category:category,
        paymentType:paymentType,
        paymentTypeKey:paymentTypeKey,
        create_date: new Date(),
        create_by: this.env.user,
        page_key:ConvertService.pageKey(),
        update_date: new Date(),
        update_by: this.env.user,
      }
      this.store.update(this.ds.videocRef(),item, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Videos has been update.', 'done', { duration: 2500 });
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
