import { DataService } from "./../services/data.service";
import { observable, computed, action, autorun, toJS } from "mobx";
import { Injectable } from "@angular/core";
import { AuthService } from '../auth/auth.service';
import { IUser } from '../interfaces/user';

@Injectable()
export class Environment {
  @observable user = null;
  @observable sysConfig = null;
  @observable role = null;
  @observable province = null;
  @observable option = null;
  @observable config = null;
  @observable loading = false;
  @observable process = false;
  @observable data = [];
  @observable empty = false;
  @observable isAdmin = false;
  @observable isReadOnly = false;
  @observable isReadWrite = false;

  constructor(
    private ds: DataService,
    private auth: AuthService
  ) {
    this.fetchCanActive();
  }

  @action
  fetchEnvironment() {
    this.loading = true;
    this.ds.environmentRef().valueChanges().subscribe(doc => {
      this.option = doc;
      this.loading = false;
    });
  }

  @action
  fetchSysConfig(callback) {
    this.ds.sysConfigRef().valueChanges().subscribe(doc => {
      this.sysConfig = doc;
      callback(doc)
    });
  }

  @action
  fetchEnvironmentArray(callback) {
    this.loading = true;
    this.ds.environmentRef().valueChanges().subscribe(doc => {
      this.option = doc;
      this.loading = false;
      callback(doc)
    });
  }

  @action
  fetchUser(key) {
    this.loading = true;
    this.ds.userRef().doc<any>(key).valueChanges().subscribe(doc => {
      if (doc) {
         const { role, province } = doc;
        this.user = doc;
        this.province = province;
       this.role = role;
      }
      this.loading = false;
    });
  }

  @action
  fetchUserDoc(callback) {
    this.loading = true;
    this.user = null;
    this.auth.canActiveRef().subscribe(user => {
      if (user) {
        this.user = {
          key: user.uid,
          name: user.displayName?user.displayName:"Unknown",
          email: user.email,
        }

        const { uid } = user;
        this.ds.userRef().doc<any>(uid).valueChanges().subscribe(doc => {
           const { role, province } = doc;
          this.user = doc;
          this.province = province;
          this.role = role;
          this.loading = false;
          callback(this.user)
        });
      }
    });
  }

  @action
  fetchCanActive() {
    this.loading = true;
    this.auth.canActiveRef().subscribe(user => {
      if (user) {
        // this.user = {
        //   key: user.uid,
        //   name: user.displayName?user.displayName:"Unknown",
        //   email: user.email,
        // }
        const { uid } = user;
        this.ds.userRef().doc<any>(uid).valueChanges().subscribe(doc => {
          // const { role, province } = doc;
          this.user = doc;
          // this.province = province;
          // this.role = role;
          this.loading = false;
        });
      }
    })
  }

  @action
  fetchData() {
    this.loading = true;
    this.ds.userRef().valueChanges().subscribe(docs => {
      this.data = docs;
      this.empty = docs.length === 0;
      this.loading = false;
    })
  }

  @action
  addUser(user: IUser, callback) {
    this.process = true;
    this.ds.userRef().doc(user.key).set(user).then(() => {
      this.process = false;
      callback(true, null)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    })
  }

  @action
  updateUser(user: IUser, callback) {
    this.process = true;
    this.ds.userRef().doc(user.key).update(user).then(() => {
      this.process = false;
      callback(true, null)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    })
  }

  @action
  deleteUser(user: IUser, callback) {
    this.process = true;
    this.ds.userRef().doc(user.key).delete().then(() => {
      this.process = false;
      callback(true, null)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    })
  }

}
