import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateNewsComponent } from './create-news/create-news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'newsList', pathMatch: 'full', component: NewsListComponent},
  { path: 'createNews', pathMatch: 'full', component: CreateNewsComponent},
  { path: '',  redirectTo: '/newsList', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
