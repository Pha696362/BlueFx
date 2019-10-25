import { APP_ENTRY_COMPONENTS } from './dialog/app-entry';
import { APP_STORES } from './stores/app.store';
import { ConvertService } from './services/convert.service';
import { MaterialModule } from './module/material.module';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AppLayoutComponent } from './shared/app-layout/app-layout.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FireValidatorsService } from './services/fire-validators.service';
import { DataService } from './services/data.service';
import { MessageComponent } from './components/message/message.component';
import { NetInfoComponent } from './components/net-info/net-info.component';
import { MobxAngularModule } from 'mobx-angular';
import { FireStoreService } from './services/utils.lib';
import { ModalWarningComponent } from './components/modal-warning/modal-warning.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DashboardNavComponent } from './components/dashboard-nav/dashboard-nav.component';
import { LoadingGridComponent } from './components/loading-grid/loading-grid.component';
import { EmptyComponent } from './components/empty/empty.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import * as firebase from 'firebase/app';
import "firebase/firestore"
import { MoreButtonComponent } from './components/more-button/more-button.component';
import { FooterDashboardComponent } from './components/footer-dashboard/footer-dashboard.component';
import { PaginationLoaderComponent } from './components/pagination-loader/pagination-loader.component';
import { LoginShellComponent } from './components/login-shell/login-shell.component';
import { PrintService } from './services/print.service';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { FilterTermPipe } from './pipes/filter-term.pipe';
import { DateMediumPipe } from './pipes/date-medium.pipe';
import { AlphaGradePipe } from './pipes/alpha-grade.pipe';
import { AlphaPointPipe } from './pipes/alpha-point.pipe';
import { DaysSchedulePipe } from './pipes/days-schedule.pipe';
import { DaysSmallPipe } from './pipes/days-small.pipe';
import { FilterSchedulePipe } from './pipes/filter-schedule.pipe';

import { AgmCoreModule } from '@agm/core';
firebase.initializeApp(environment.firebase);
const fdb = firebase.firestore();
// fdb.settings({ timestampsInSnapshots: true });


import { DeleteComponent } from './components/delete/delete.component';
import { CreditEarnedPipe } from './pipes/credit-earned.pipe';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { MajorBagPipe } from './pipes/major-bag.pipe';
import { HeaderTabsComponent } from './components/header-tabs/header-tabs.component';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';
import { GroupByProgramPipe } from './pipes/group-by-program.pipe';
import { GroupByCoursesPipe } from './pipes/group-by-courses.pipe';
import { ConfirmSuccessComponent } from './components/confirm-success/confirm-success.component';
import { ConfirmWarningComponent } from './components/confirm-warning/confirm-warning.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { TabLayoutComponent } from './shared/tab-layout/tab-layout.component';
import { LoaderTableComponent } from './components/loader-table/loader-table.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MapsComponent } from './pages/maps/maps.component';
import { ToNumberPipe } from './pipes/to-number.pipe';
import { MarkerLabelPipe } from './pipes/marker-label.pipe';
import { UserComponent } from './pages/user/user.component';
import { AddUserComponent } from './dialog/add-user/add-user.component';
import { UploadService } from './services/upload.service';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AccountUsersComponent } from './pages/account-users/account-users.component';
import { AddAccountUserComponent } from './dialog/add-account-user/add-account-user.component';
import { SelectedItemByKeyPipe } from './pipes/selected-item-by-key.pipe';
import { GetAgePipe } from './pipes/get-age.pipe';
import { DisableModalComponent } from './components/disable-modal/disable-modal.component';
import { HttpModule } from '@angular/http';
import { ApiService } from './services/api.service';
import { DateStringPipe } from './pipes/date-string.pipe';
import { DateResolveDatePipe } from './pipes/date-resolve-date.pipe';
import { TagsComponent } from './pages/tags/tags.component';
import { AddNewTagComponent } from './pages/tags/add-new-tag/add-new-tag.component';
import { GenreComponent } from './pages/genre/genre.component';
import { AddNewGenreComponent } from './pages/genre/add-new-genre/add-new-genre.component';
import { SlideComponent } from './pages/slide/slide.component';
import { AddNewSlideComponent } from './pages/slide/add-new-slide/add-new-slide.component';
import { BookComponent } from './pages/book/book.component';
import { AddNewBookComponent } from './pages/book/add-new-book/add-new-book.component';
import { AddCoverSlideComponent } from './pages/slide/add-cover-slide/add-cover-slide.component';
import { AddNewCoverBookComponent } from './pages/book/add-new-cover-book/add-new-cover-book.component';
import { AddNewPdfBookComponent } from './pages/book/add-new-pdf-book/add-new-pdf-book.component';
import { SubscribersComponent } from './pages/subscribers/subscribers.component';
import { AddSubscriberComponent } from './pages/subscribers/add-subscriber/add-subscriber.component';
import { ProductComponent } from './pages/product/product.component';
import { AddProductComponent } from './pages/product/add-product/add-product.component';
import { ClientProfileComponent } from './pages/client-profile/client-profile.component';
import { ClientOverviewComponent } from './pages/client-profile/client-overview/client-overview.component';
import { ClientPaymentComponent } from './pages/client-profile/client-payment/client-payment.component';
import { ClientHistoryComponent } from './pages/client-profile/client-history/client-history.component';
import { ApplyPackageComponent } from './pages/client-profile/apply-package/apply-package.component';
import { EditTagsComponent } from './pages/tags/edit-tags/edit-tags.component';
import { EditGenreComponent } from './pages/genre/edit-genre/edit-genre.component';
import { EditSlideComponent } from './pages/slide/edit-slide/edit-slide.component';
import { EditBookComponent } from './pages/book/edit-book/edit-book.component';
import { EditProductComponent } from './pages/product/edit-product/edit-product.component';
import { AddCoverProductComponent } from './pages/product/add-cover-product/add-cover-product.component';
import { EditSubscribersComponent } from './pages/subscribers/edit-subscribers/edit-subscribers.component';
import { AddCoverSubscribersComponent } from './pages/subscribers/add-cover-subscribers/add-cover-subscribers.component';
import { CourseComponent } from './pages/course/course.component';
import { AddNewCourseComponent } from './pages/course/add-new-course/add-new-course.component';
import { EditCourseComponent } from './pages/course/edit-course/edit-course.component';
import { CategoryComponent } from './pages/category/category.component';
import { AddCategoryComponent } from './pages/category/add-category/add-category.component';
import { EditCategoryComponent } from './pages/category/edit-category/edit-category.component';
import { AddConverCategoryComponent } from './pages/category/add-conver-category/add-conver-category.component';
import { AddNewCourseCoverComponent } from './pages/course/add-new-course-cover/add-new-course-cover.component';
import { CourseDetailComponent } from './pages/course/course-detail/course-detail.component';
import { AddNewVideosComponent } from './pages/course/add-new-videos/add-new-videos.component';
import { EditVideosComponent } from './pages/course/edit-videos/edit-videos.component';
import { AddAboutUsComponent } from './pages/about/add-about-us/add-about-us.component';
import { AboutComponent } from './pages/about/about.component';
import { EditAboutUsComponent } from './pages/about/edit-about-us/edit-about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AddNewContactComponent } from './pages/contact/add-new-contact/add-new-contact.component';
import { EditNewContactComponent } from './pages/contact/edit-new-contact/edit-new-contact.component';
import { ContentComponent } from './pages/content/content.component';
import { TypesNewsComponent } from './pages/types-news/types-news.component';
import { AddTypeNewsComponent } from './pages/types-news/add-type-news/add-type-news.component';
import { AddNewContentComponent } from './pages/content/add-new-content/add-new-content.component';




@NgModule({
  declarations: [
    
    AppComponent,
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LayoutComponent,
    AuthLayoutComponent,
    SigninComponent,
    AppLayoutComponent,
    SpinnerComponent,
    MessageComponent,
    NetInfoComponent,
    ModalWarningComponent,
    LoadingComponent,
    DashboardNavComponent,
    LoadingGridComponent,
    EmptyComponent,
    MoreButtonComponent,
    FooterDashboardComponent,
    PaginationLoaderComponent,
    LoginShellComponent,
    DateFormatPipe,
    FilterTermPipe,
    DateMediumPipe,
    AlphaGradePipe,
    AlphaPointPipe,
    DaysSchedulePipe,
    DaysSmallPipe,
    FilterSchedulePipe,
    DeleteComponent,
    CreditEarnedPipe,
    PrimaryButtonComponent,
    MajorBagPipe,
    HeaderTabsComponent,
    EmptyDataComponent,
    GroupByProgramPipe,
    GroupByCoursesPipe,
    ConfirmSuccessComponent,
    ConfirmWarningComponent,
    ForgotPasswordComponent,
    TabLayoutComponent,
    LoaderTableComponent,
    NotFoundComponent,
    MapsComponent,
    ToNumberPipe,
    MarkerLabelPipe,
    UserComponent,
    AddUserComponent,
    AccountUsersComponent,
    AddAccountUserComponent,
    SelectedItemByKeyPipe,
    GetAgePipe,
    DisableModalComponent,
    DateStringPipe,
    DateResolveDatePipe,
    TagsComponent,
    AddNewTagComponent,
    GenreComponent,
    AddNewGenreComponent,
    SlideComponent,
    AddNewSlideComponent,
    BookComponent,
    AddNewBookComponent,
    AddCoverSlideComponent,
    AddNewCoverBookComponent,
    AddNewPdfBookComponent,
    SubscribersComponent,
    AddSubscriberComponent,
    ProductComponent,
    AddProductComponent,
    ClientProfileComponent,
    ClientOverviewComponent,
    ClientPaymentComponent,
    ClientHistoryComponent,
    ApplyPackageComponent,
    EditTagsComponent,
    EditGenreComponent,
    EditSlideComponent,
    EditBookComponent,
    EditProductComponent,
    AddCoverProductComponent,
    EditSubscribersComponent,
    AddCoverSubscribersComponent,
    CourseComponent,
    EditCourseComponent,
    AddNewCourseComponent,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AddConverCategoryComponent,
    AddNewCourseCoverComponent,
    CourseDetailComponent,
    AddNewVideosComponent,
    EditVideosComponent,
    AddAboutUsComponent,
    AboutComponent,
    EditAboutUsComponent,
    ContactComponent,
    AddNewContactComponent,
    EditNewContactComponent,
    ContentComponent,
    TypesNewsComponent,
    AddTypeNewsComponent,
    AddNewContentComponent,


  ],
  entryComponents: [
    AddNewCourseCoverComponent,
    AddNewContactComponent,
    ModalWarningComponent,
    DeleteComponent,
    ConfirmSuccessComponent,
    ConfirmWarningComponent,
    ForgotPasswordComponent,
    APP_ENTRY_COMPONENTS,
    AddAccountUserComponent,
    EditCourseComponent,
    AddNewCourseComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AddConverCategoryComponent,
    AddNewVideosComponent,
    EditVideosComponent,
    AddAboutUsComponent,
    EditAboutUsComponent,
    EditNewContactComponent,
    AddTypeNewsComponent,
    AddNewContentComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MobxAngularModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    NgbModule.forRoot(),
    TimepickerModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'PUC-CLOUD'),
    AgmCoreModule.forRoot({
    apiKey: environment.mapKey
    }),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MaterialModule,
    InfiniteScrollModule,
    NgxCaptchaModule,
    NgxChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AuthService,
    FireValidatorsService,
    DataService,
    ConvertService,
    APP_STORES,
    FireStoreService,
    PrintService,
    UploadService,
    ApiService,
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
