import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs/Observable';
import { DataService } from 'src/app/services/data.service';
import { Bookstore } from './../../../stores/bookstore';
import { Environment } from './../../../stores/environment.store';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-conver-category',
  templateUrl: './add-conver-category.component.html',
  styleUrls: ['./add-conver-category.component.scss']
})
export class AddConverCategoryComponent implements OnInit {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  fileName: string;

  constructor(
    public dialogRef: MatDialogRef<AddConverCategoryComponent>,
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
    const filePath = `category/${key}/${file.name}`;
    this.fileName = filePath;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.downloadURL = fileRef.getDownloadURL())).subscribe()
  }

  update() {
    this.downloadURL.subscribe(file => {
      this.store.updateFileUrl(this.ds.categoryRef(), this.data, this.fileName, file, (success, error) => {
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
