import { DeleteComponent } from './../../components/delete/delete.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { Product } from 'src/app/stores/product.store';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddCoverProductComponent } from './add-cover-product/add-cover-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  tabs = tabs.product;

  constructor(
    public store: Product,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData();
  }

  create() {
    let dialogRef = this.dialog.open(AddProductComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  cover(item) {
    let dialogRef = this.dialog.open(AddCoverProductComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item: any) {
    let dialogRef = this.dialog.open(EditProductComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item: any) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete Package', memo: 'If package is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(item, (success, error) => {
          if (success) {
            this.snackBar.open('Product has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}
