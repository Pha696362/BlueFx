import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { tabs } from 'src/app/dummy/tabs';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddTypeNewsComponent } from './add-type-news/add-type-news.component';
import { Bookstore } from 'src/app/stores/bookstore';

@Component({
  selector: 'app-types-news',
  templateUrl: './types-news.component.html',
  styleUrls: ['./types-news.component.scss']
})
export class TypesNewsComponent implements OnInit {

  tabs = tabs.types;
  constructor(
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData(this.ds.typenewsRef());
  }

  create() {
    let dialogRef = this.dialog.open(AddTypeNewsComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  // edit(item: ITag) {
  //   let dialogRef = this.dialog.open(EditTagsComponent, {
  //     data: item,
  //     width: '35vw',
  //     height: '100vh',
  //     role: 'dialog',
  //   });
  //   dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  // }

  // delete(item: ITag) {
  //   let dialogRef = this.dialog.open(DeleteComponent, {
  //     data: { title: 'Delete Tag', memo: 'If tag is using by other function in system you cannot delete it.', name: item.name },
  //     width: '35vw',
  //     disableClose: true,
  //     role: 'dialog',
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 'yes') {
  //       this.store.delete(this.ds.tagRef(), item, (success, error) => {
  //         if (success) {
  //           this.snackBar.open('Tag has been deleted.', 'done', { duration: 2000 });
  //         }
  //         else {
  //           this.snackBar.open(error, 'Error')
  //         }
  //       })
  //     }
  //   });
  // }
}
