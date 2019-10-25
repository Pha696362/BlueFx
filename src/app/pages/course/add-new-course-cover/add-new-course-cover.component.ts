import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { Environment } from 'src/app/stores/environment.store';
import { Bookstore } from 'src/app/stores/bookstore';
import { DataService } from 'src/app/services/data.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-new-course-cover',
  templateUrl: './add-new-course-cover.component.html',
  styleUrls: ['./add-new-course-cover.component.scss']
})
export class AddNewCourseCoverComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  fileName: string;

  constructor(
    public dialogRef: MatDialogRef<AddNewCourseCoverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storage: AngularFireStorage,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store: Bookstore,
    private ds: DataService
  ) { }


  ngOnInit() { }

  uploadFile(event) {
    const { key } = this.data;
    const file = event.target.files[0];
    const filePath = `course/${key}/${file.name}`;
    this.fileName = filePath;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.downloadURL = fileRef.getDownloadURL())).subscribe()
  }

  update() {
    this.downloadURL.subscribe(file => {
      this.store.updateFileUrl(this.ds.courseRef(), this.data, this.fileName, file, (success, error) => {
        if (success) {
          this.snackBar.open('Cover has been updated.', 'done', { duration: 2500 });
          this.dialogRef.close();
        }
        else {
          alert(error)
        }
      })
    })
  }
}
