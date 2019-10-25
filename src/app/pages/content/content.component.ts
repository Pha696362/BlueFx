import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { Bookstore } from 'src/app/stores/bookstore';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { AddNewContentComponent } from './add-new-content/add-new-content.component';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { IContent } from 'src/app/interfaces/bookstore';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  tabs = tabs.course;
  constructor(
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData(this.ds.contentRef());
  }

  create() {
    let dialogRef = this.dialog.open(AddNewContentComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  // edit(item: ICourse) {
  //   let dialogRef = this.dialog.open(EditCourseComponent, {
  //     data: item,
  //     width: '35vw',
  //     height: '100vh',
  //     role: 'dialog',
  //   });
  //   dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  // }

  // cover(item) {
  //   let dialogRef = this.dialog.open(AddNewCourseCoverComponent, {
  //     data: item,
  //     width: '35vw',
  //     height: '100vh',
  //     role: 'dialog',
  //   });
  //   dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  // }


  

  delete(item: IContent) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete Content', memo: 'If content is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });

     dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.contentRef(), item, (success, error) => {
          if (success) {
            this.snackBar.open('Content has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}