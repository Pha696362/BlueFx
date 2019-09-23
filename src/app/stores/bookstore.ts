import { DataService } from 'src/app/services/data.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { observable, action } from "mobx";
import { Injectable } from "@angular/core";
import { pushToArray } from '../services/utils.lib';

@Injectable()
export class Bookstore {
  @observable data = [];
  @observable loading = true;
  @observable empty = false;
  @observable process = false;

  constructor(public ds: DataService) { }

  @action
  async fetchGenre(){
    this.process=true;
    const docs=await this.ds.genreRef().get().toPromise();
    this.process = false;
    return pushToArray(docs)
  }

  @action
  async fetchTag(){
    this.process=true;
    const docs=await this.ds.tagRef().get().toPromise();
    this.process = false;
    return pushToArray(docs)
  }

  @action
  fetchData(ref: AngularFirestoreCollection) {
    this.loading = true;
    ref.valueChanges().subscribe(docs => {
      this.data = docs;
      this.empty = docs.length === 0;
      this.loading = false;
    });
  }

  @action
  addNew(ref: AngularFirestoreCollection, item: any, callback) {
    this.process = true;
    ref.doc(item.key).set(item).then(() => {
      this.process = false;
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  update(ref: AngularFirestoreCollection, item: any, callback) {
    this.process = true;
    ref.doc(item.key).update(item).then(() => {
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  delete(ref: AngularFirestoreCollection, item: any, callback) {
    this.process = true;
    ref.doc(item.key).delete().then(() => {
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  updateFileUrl(ref, item: any, fileName, fileUrl, callback) {
    this.process = true;
    ref.doc(item.key).update({
      fileName: fileName,
      fileUrl: fileUrl
    }).then(() => {
      this.process = false;
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  updateDocUrl(ref, item: any, docName, docUrl, callback) {
    this.process = true;
    ref.doc(item.key).update({
      docName: docName,
      docUrl: docUrl
    }).then(() => {
      this.process = false;
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

}