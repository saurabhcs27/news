import { Injectable } from '@angular/core';
import { News } from '../_model/news.model';
import {Observable,of,Subject} from 'rxjs';
import {map} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  newsList:News[]=[];
  private newsListUpdated=new Subject<News[]>();

  constructor(private http:HttpClient) { }



  publishNews(news:News){
    this.http.post<{message:string,id:string}>('http://localhost:3000/api/news',news).subscribe((newlyPublishedNewsData)=>{
                  news.id=newlyPublishedNewsData.id;
                  this.newsList.push(news);
                  this.newsListUpdated.next([...this.newsList]);
    })

  }

  getNewsList(){
    this.http.get<{message:string,fetchedNewsList:any}>('http://localhost:3000/api/newsList')
    .pipe(map(newsData=>{
            return newsData.fetchedNewsList.map((newsList:{ title: string; description: string; _id: string; })=>{
                                                      return {
                                                            title:newsList.title,
                                                            description:newsList.description,
                                                            id:newsList._id
                                                      }
            })
    }))
    .subscribe((transformedNewsList)=>{
      this.newsList=transformedNewsList;
      this.newsListUpdated.next([...this.newsList]);


    })
  }

  getNewsListUpdateListener():Observable<News[]>{
    return this.newsListUpdated.asObservable();
   }
  deleteNews(id:string){
    this.http.delete<{message:string}>('http://localhost:3000/api/news/'+ id).subscribe((message)=>{
                  console.log(message);
                  const updatedNewsList= this.newsList.filter(news=>news.id !==id);
                  this.newsList=updatedNewsList;
                  this.newsListUpdated.next([...this.newsList]);

    })
  }

}
