import { ActivatedRoute } from '@angular/router';
import { AddSubscriberComponent } from './add-subscriber/add-subscriber.component';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DeleteComponent } from './../../components/delete/delete.component';
import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { Subscriber } from 'src/app/stores/subscriber.store';
import { AddCoverSubscribersComponent } from './add-cover-subscribers/add-cover-subscribers.component';
import { EditSubscribersComponent } from './edit-subscribers/edit-subscribers.component';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements OnInit {
  tabs = tabs.subscriber;
  constructor(
    public store: Subscriber,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private ds: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.forEach(params => {
      if (params) {
        const { id } = params;
        this.store.fetchData(id);
      }
    })
  }

  create() {
    let dialogRef = this.dialog.open(AddSubscriberComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  cover(item) {
    let dialogRef = this.dialog.open(AddCoverSubscribersComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item: any) {
    let dialogRef = this.dialog.open(EditSubscribersComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item: any) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete Subdcriber', memo: 'If subdcriber is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.subscriberRef(), item, (success, error) => {
          if (success) {
            this.snackBar.open('Subdcriber has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}
