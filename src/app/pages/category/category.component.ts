import { DeleteComponent } from './../../components/delete/delete.component';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Bookstore } from './../../stores/bookstore';
import { tabs } from './../../dummy/tabs';
import { Component, OnInit } from '@angular/core';
import { ITag, ICategory } from 'src/app/interfaces/bookstore';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { AddConverCategoryComponent } from './add-conver-category/add-conver-category.component';

// import { AddNewCourseComponent } from './add-new-course/add-new-course.component';
// import { EditCourseComponent } from './edit-course/edit-course.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  tabs = tabs.category;
  constructor(
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData(this.ds.categoryRef());
  }

  create() {
    let dialogRef = this.dialog.open(AddCategoryComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  cover(item) {
    let dialogRef = this.dialog.open(AddConverCategoryComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item: ICategory) {
    let dialogRef = this.dialog.open(EditCategoryComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item: ICategory) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete Category', memo: 'If category is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.categoryRef(), item, (success, error) => {
          if (success) {
            this.snackBar.open('Category has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}
