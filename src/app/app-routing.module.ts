import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserAuthGuard } from './_guards/user-auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddBlogComponent } from './home/add-blog/add-blog.component';
import { BlogComponent } from './home/blog/blog.component';
import { AdminBlogsComponent } from './admin/admin-blogs/admin-blogs.component';
import { AdminNewBlogComponent } from './admin/admin-new-blog/admin-new-blog.component';
import { ProfieComponent } from './home/profie/profie.component';
import { SingleBlogComponent } from './home/single-blog/single-blog.component';
import { AdminSingleBlogComponent } from './admin/admin-single-blog/admin-single-blog.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { ResearchersComponent } from './home/researchers/researchers.component';
import { IndexComponent } from './index/index.component';
import { AddResearchItemComponent } from './home/add-research-item/add-research-item.component';
import { ResearchItemsComponent } from './home/research-items/research-items.component';
import { AdminResearchItemsComponent } from './admin/admin-research-items/admin-research-items.component';
import { ConferencesComponent } from './home/conferences/conferences.component';
import { AddConferenceComponent } from './home/add-conference/add-conference.component';
import { AdminConferencesComponent } from './admin/admin-conferences/admin-conferences.component';
import { ConferenceSingleComponent } from './home/conference-single/conference-single.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: IndexComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  
  { path: 'admin', component: AdminComponent,canActivate: [AuthGuard]},
  { path: 'admin/blogs', component: AdminBlogsComponent,canActivate: [AuthGuard]},
  { path: 'admin/users', component: AdminUsersComponent,canActivate: [AuthGuard]},
  { path: 'admin/blog/add', component: AdminNewBlogComponent,canActivate: [AuthGuard]},
  { path: 'admin/blog/:blogID', component: AdminSingleBlogComponent,canActivate: [AuthGuard]},
  { path: 'admin/research-items', component: AdminResearchItemsComponent,canActivate: [AuthGuard]},
  { path: 'admin/conferences', component: AdminConferencesComponent,canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent,canActivate: [UserAuthGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'change-password/:id', component: ChangePasswordComponent},
  { path: 'blogs', component: BlogComponent,canActivate: [UserAuthGuard]},
  { path: 'blog/add', component: AddBlogComponent,canActivate: [UserAuthGuard]},
  { path: 'profile', component: ProfieComponent,canActivate: [UserAuthGuard]},
  { path: 'blog/:blogID', component: SingleBlogComponent,canActivate: [UserAuthGuard]},
  { path: 'researcher/:rid', component: ResearchersComponent,canActivate: [UserAuthGuard]},
  { path: 'research-items', component: ResearchItemsComponent,canActivate: [UserAuthGuard]},
  { path: 'research-item/add', component: AddResearchItemComponent,canActivate: [UserAuthGuard]},
  { path: 'conferences', component: ConferencesComponent,canActivate: [UserAuthGuard]},
  { path: 'conference/add', component: AddConferenceComponent,canActivate: [UserAuthGuard]},
  { path: 'conference/:cid', component: ConferenceSingleComponent,canActivate: [UserAuthGuard]},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
