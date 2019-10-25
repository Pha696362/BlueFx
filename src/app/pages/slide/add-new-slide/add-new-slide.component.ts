import { ConvertService } from './../../../services/convert.service';
import { DataService } from 'src/app/services/data.service';
import { Bookstore } from './../../../stores/bookstore';
import { Environment } from './../../../stores/environment.store';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { ISlide } from 'src/app/interfaces/bookstore';
import { StatusObj } from 'src/app/dummy/status';

@Component({
  selector: 'app-add-new-slide',
  templateUrl: './add-new-slide.component.html',
  styleUrls: ['./add-new-slide.component.scss']
})
export class AddNewSlideComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  order: AbstractControl;
  description: AbstractControl;

  constructor(
    public dialogRef: MatDialogRef<AddNewSlideComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store: Bookstore,
    private ds: DataService
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      order: [null, Validators.required],
      description: [null]
    })
    this.name = this.form.controls['name'];
    this.order = this.form.controls["order"];
    this.description = this.form.controls["description"];
  }


  ngOnInit() {
    this.buildForm();
  }

  create(f: any, isNew) {
    console.log(f);
    if (this.form.valid) {
      this.form.disable();
      const { name, order, description } = f;
      const item: ISlide = {
        key: this.ds.createId(),
        name: name,
        status: StatusObj.ACTIVE,
        create_date: new Date(),
        create_by: this.env.user,
        page_key: ConvertService.pageKey(),
        update_date: new Date(),
        update_by: this.env.user,
        description: description,
        order:order
      }
      this.store.addNew(this.ds.slideRef(), item, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Slide has been created.', 'done', { duration: 2500 });
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
