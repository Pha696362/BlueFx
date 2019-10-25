import { AngularFirestore } from "@angular/fire/firestore";
import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef
} from "@angular/core";
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { MappingService } from "src/app/services/mapping.service";
import { Environment } from 'src/app/stores/environment.store';
import { Subscriber } from 'src/app/stores/subscriber.store';

@Component({
  selector: 'app-apply-package',
  templateUrl: './apply-package.component.html',
  styleUrls: ['./apply-package.component.scss']
})
export class ApplyPackageComponent implements OnInit {

  form: FormGroup;
  note: AbstractControl;

  constructor(
    public dialogRef: MatDialogRef<ApplyPackageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private env: Environment,
    public store: Subscriber,
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      note: [null,]
    });
    this.note = this.form.controls["note"];
  }

  ngOnInit() {
    this.buildForm();
   
  }

  _save(f: any) {
    if (this.form.valid) {
      this.form.disable();

      this.store.savePaidSubscriber(f.note, this.data, this.store.subscriber, this.env.user ,(success, error) => {
          if (success) {
            this.dialogRef.close();
            this.snackBar.open("Invoice have been paid successful.", "done", {
              duration: 2000
            });
          } else {
            this.form.enable();
            this.snackBar.open(error, "Error");
          }
        }
      );

    }
  }
}
