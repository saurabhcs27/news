import { Component, OnInit } from '@angular/core';
import { News } from '../_model/news.model';
import { NewsService } from '../_service/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  newsList:News[]=[]
  constructor(public newsService:NewsService) { }

  ngOnInit(): void {
    this.newsService.getNewsList();
   this.newsService.getNewsListUpdateListener().subscribe((newsList:News[])=>{
     this.newsList=newsList;
     console.log(this.newsList);
   })
  }

  onDelete(id:string|null){
    if(!!id){
      this.newsService.deleteNews(id);
    }

}

}
