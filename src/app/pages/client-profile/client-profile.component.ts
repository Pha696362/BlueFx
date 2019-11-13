import { MatDialog } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Environment } from 'src/app/stores/environment.store';
import { switchMap, debounceTime, tap } from "rxjs/operators";
import { Pages } from "src/app/dummy/pages";
import { MappingService } from "src/app/services/mapping.service";
import { PrintService } from 'src/app/services/print.service';
import { FILTER_OPTIONS } from 'src/app/dummy/status';
import { Subscriber } from 'src/app/stores/subscriber.store';
import { EditSubscribersComponent } from '../subscribers/edit-subscribers/edit-subscribers.component';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  icons = [
    "face",
    "adb",
    "cloud",
    "view_carousel",
    "favorite",
    "verified_user",
  ]
  formFocus: boolean;
  form: FormGroup;
  search: AbstractControl;
  searchType: AbstractControl;
  filterBy = FILTER_OPTIONS;
  loading: boolean = false;
  isAdmin = false;

  id: string = null;
  admissionKey: string = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public env: Environment,
    public store: Subscriber,
  ) { }

  ngOnInit() {
    // this.initialData();
    this.form = this.fb.group({
      searchType: [this.filterBy[0], [Validators.required]],
      search: [null]
    });
    this.search = this.form.controls["search"];
    this.searchType = this.form.controls["searchType"];

    if (this.store.FILTER_OPTIONS_TYPES) {
      this.searchType.patchValue(this.store.FILTER_OPTIONS_TYPES);
    }

    const { searchType } = this.form.value;
    this.store.subscriberSearch(searchType.key);
    this.search.valueChanges
      .pipe(
        debounceTime(300),
        tap(() => (this.loading = true)),
        switchMap(value => this.store.search(this.searchType.value.key, value))
      )
      .subscribe(results => {
        this.store.memberships = results;
        this.loading = false;
      });
  }

  // initialData() {
  //   this.route.params.forEach(param => {
  //     this.id = param["id"];
  //     this.admissionKey = param['admissionKey'];
  //     this.store.fetchStudent(this.id, this.admissionKey, req => { });
  //   })
  // }

  _goBack() {
    this.router.navigate(['/app/subscribers/']); 
    // [routerLink]="['/app/course/' + item?.key]"
  }

  displayItem(item: any): string {
    if (this.searchType) {
      const { key } = this.searchType.value;
      return item ? item[key] : item;
    }
    return item ? item.puc_id : item;
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) {
      return o1.text === o2.text;
    }
  }

  // _onSearch(item: any) {
  //   const { search, searchType } = item;
  //   if (search.key) {
  //     this.store.student = search;
  //     this._linkPage(search, this.store.payPageKey);
  //   }
  //   else {
  //     const students = MappingService.filter(this.store.data, searchType.key, search);
  //     if (students.length > 0) {
  //       const s = students[0];
  //       this.store.student = s;
  //       this._linkPage(s, this.store.payPageKey);
  //     }
  //   }
  // }

  _onFocus(yes) {
    this.formFocus = yes;
  }

  _selectionChange(event) {
    const { value } = event;
    this.store.FILTER_OPTIONS_TYPES = value;
  }

  _optionSelected(item: any) {
    this.router.navigate(["/client/" + item.key + "/overview/"]);
  }

  _linkPage(item) {
    this.router.navigate(["/client/" + item.key + "/overview/"]);
  }

  profile() {
    let dialogRef = this.dialog.open(EditSubscribersComponent, {
      data: this.store.subscriber,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

}

