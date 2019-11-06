import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  DataService } from './_services/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { ToastrModule } from 'ngx-toastr';
 import { CommonModule,HashLocationStrategy, LocationStrategy } from '@angular/common';
 import { SafeHtml } from './_helpers/safe-html.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { AddBlogComponent } from './home/add-blog/add-blog.component';
import { BlogComponent } from './home/blog/blog.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { AdminBlogsComponent } from './admin/admin-blogs/admin-blogs.component';
import { AdminNewBlogComponent } from './admin/admin-new-blog/admin-new-blog.component';
import { ProfieComponent } from './home/profie/profie.component';
import { SingleBlogComponent } from './home/single-blog/single-blog.component';
import { AdminSingleBlogComponent } from './admin/admin-single-blog/admin-single-blog.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { ResearchersComponent } from './home/researchers/researchers.component';
import { IndexComponent } from './index/index.component';
import { ResearchItemsComponent } from './home/research-items/research-items.component';
import { AddResearchItemComponent } from './home/add-research-item/add-research-item.component';
import { AdminResearchItemsComponent } from './admin/admin-research-items/admin-research-items.component';
import { ConferencesComponent } from './home/conferences/conferences.component';
import { AddConferenceComponent } from './home/add-conference/add-conference.component';
import { NgDatepickerModule } from 'ng2-datepicker';
import { AdminConferencesComponent } from './admin/admin-conferences/admin-conferences.component';
import { ConferenceSingleComponent } from './home/conference-single/conference-single.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminSidebarComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AddBlogComponent,
    BlogComponent,
    SafeHtml,
    AdminBlogsComponent,
    AdminNewBlogComponent,
    ProfieComponent,
    SingleBlogComponent,
    AdminSingleBlogComponent,
    AdminUsersComponent,
    ResearchersComponent,
    IndexComponent,
    ResearchItemsComponent,
    AddResearchItemComponent,
    AdminResearchItemsComponent,
    ConferencesComponent,
    AddConferenceComponent,
    AdminConferencesComponent,
    ConferenceSingleComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CKEditorModule,
    NgDatepickerModule
    
  ],
  providers: [DataService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
