import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { IVideos } from 'src/app/interfaces/bookstore';
import { tabs } from 'src/app/dummy/tabs';
import { Bookstore } from 'src/app/stores/bookstore';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { AddNewVideosComponent } from '../add-new-videos/add-new-videos.component';
import { EditVideosComponent } from '../edit-videos/edit-videos.component';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  tabs = tabs.course;
   id;

   course: any = null;
  constructor(
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public route:ActivatedRoute,
    public dialog: MatDialog) { }

  async ngOnInit() {
    // this.store.fetchData(this.ds.courseRef());
    this.route.params.subscribe(async param=>{
      this.id = param.id;
      this.course = await this.store.fetchDataDoc(this.ds.courseRef(), param.id);
      this.store.fetchData(this.ds.videoRef(param.id));
      
    })
  }

  create() {
    // console.log(this.course)
    let dialogRef = this.dialog.open(AddNewVideosComponent, {
      data: this.course,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item: IVideos) {
    let dialogRef = this.dialog.open(EditVideosComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  
  
  delete(item: IVideos) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete Videos', memo: 'If course is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.videocRef(), item, (success, error) => {
          if (success) {
            this.snackBar.open('Videos has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}