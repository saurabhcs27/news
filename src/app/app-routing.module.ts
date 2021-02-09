import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'newsList', pathMatch: 'full', component: NewsListComponent},
  { path: 'createNews', pathMatch: 'full', component: CreateNewsComponent,canActivate: [AuthGuard]},
  { path: 'editNews/:newsId',pathMatch: 'full', component: CreateNewsComponent,canActivate: [AuthGuard]},
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: '',  redirectTo: '/newsList', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
