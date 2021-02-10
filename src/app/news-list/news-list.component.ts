import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { News } from '../_model/news.model';
import { AuthService } from '../_service/auth.service';
import { NewsService } from '../_service/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit,OnDestroy {
  newsList:News[]=[];
  userIsAuthenticated = false;
  userId:string|undefined|null;
  private authStatusSub!: Subscription;
  constructor(public newsService:NewsService,private authService:AuthService) { }

  ngOnInit(): void {
    this.newsService.getNewsList();
    this.newsService.getNewsListUpdateListener().subscribe((newsList:News[])=>{
     this.newsList=newsList;
     console.log(this.newsList);
     });
     this.userIsAuthenticated = this.authService.getIsAuth();
     this.userId=this.authService.getUserId();
     this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId=this.authService.getUserId();
      });
  }

  onDelete(id:string|null){
    if(!!id){
      this.newsService.deleteNews(id);
    }

}
ngOnDestroy(){
  this.authStatusSub.unsubscribe();
}

}
