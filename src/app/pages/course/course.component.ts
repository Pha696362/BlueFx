import { DeleteComponent } from './../../components/delete/delete.component';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Bookstore } from './../../stores/bookstore';
import { tabs } from './../../dummy/tabs';
import { Component, OnInit } from '@angular/core';
import { ITag, ICourse } from 'src/app/interfaces/bookstore';

import { AddNewCourseComponent } from './add-new-course/add-new-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AddNewCourseCoverComponent } from './add-new-course-cover/add-new-course-cover.component';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  tabs = tabs.course;
  constructor(
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData(this.ds.courseRef());
  }

  create() {
    let dialogRef = this.dialog.open(AddNewCourseComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item: ICourse) {
    let dialogRef = this.dialog.open(EditCourseComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  cover(item) {
    let dialogRef = this.dialog.open(AddNewCourseCoverComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }


  

  delete(item: ICourse) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete Course', memo: 'If course is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });

     dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.courseRef(), item, (success, error) => {
          if (success) {
            this.snackBar.open('Course has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}
