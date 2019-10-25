import { Component, OnInit } from '@angular/core';
import { AddAboutUsComponent } from './add-about-us/add-about-us.component';
import { Bookstore } from 'src/app/stores/bookstore';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { tabs } from 'src/app/dummy/tabs';
import { IAbout } from 'src/app/interfaces/bookstore';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { EditAboutUsComponent } from './edit-about-us/edit-about-us.component';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  tabs = tabs.about;
  constructor(
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData(this.ds.aboutRef());
  }

  create() {
    let dialogRef = this.dialog.open(AddAboutUsComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item: IAbout) {
    let dialogRef = this.dialog.open(EditAboutUsComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item: IAbout) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete About', memo: 'If tag is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.aboutRef(), item, (success, error) => {
          if (success) {
            this.snackBar.open('About has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}



