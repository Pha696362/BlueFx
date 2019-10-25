import { ConvertService } from './../../../services/convert.service';
import { DeleteComponent } from './../../../components/delete/delete.component';
import { MatDialog, MatSnackBar } from "@angular/material";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Environment } from "src/app/stores/environment.store";
import { Subscriber } from 'src/app/stores/subscriber.store';
import { ApplyPackageComponent } from '../apply-package/apply-package.component';

@Component({
  selector: 'app-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.scss']
})
export class ClientOverviewComponent implements OnInit {

  packages: any = [];
  constructor(
    private route: ActivatedRoute,
    public env: Environment,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public store: Subscriber
  ) { }

  async ngOnInit() {
    this.packages = await this.store.fetchPackage();
    // this.packages = await this.store.fetchSubscriber();
    
    
    this.store.subscriberKey = null;
    this.route.parent.params.forEach(params => {
      this.store.subscriberKey = params['id'];
      this.store.fetchSubscriberDoc(this.store.subscriberKey);
    })
  }

  _applyPackage(item) {
    let dialogRef = this.dialog.open(ApplyPackageComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
      disableClose: true,
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

}
