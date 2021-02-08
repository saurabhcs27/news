import { Injectable } from '@angular/core';
import { News } from '../_model/news.model';
import {Observable,of,Subject} from 'rxjs';
import {map} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  newsList:News[]=[];
  private newsListUpdated=new Subject<News[]>();

  constructor(private http:HttpClient,private router:Router) { }

  getNewsListUpdateListener():Observable<News[]>{
    return this.newsListUpdated.asObservable();
   }

  publishNews(news:News){
    this.http.post<{message:string,id:string}>('http://localhost:3000/api/news',news).subscribe((newlyPublishedNewsData)=>{
                  news.id=newlyPublishedNewsData.id;
                  this.newsList.push(news);
                  this.newsListUpdated.next([...this.newsList]);
                  this.router.navigate(['newsList']);
    })

  }

  getNewsList(){
    this.http.get<{message:string,fetchedNewsList:any}>('http://localhost:3000/api/news')
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


  deleteNews(id:string){
    this.http.delete<{message:string}>('http://localhost:3000/api/news/'+ id).subscribe((message)=>{
                  console.log(message);
                  const updatedNewsList= this.newsList.filter(news=>news.id !==id);
                  this.newsList=updatedNewsList;
                  this.newsListUpdated.next([...this.newsList]);

    })
  }

  getNewsById(id:string){
    return this.http.get<{_id:string,title:string,description:string}>('http://localhost:3000/api/news/'+ id)
  }

  updateNews(id:string,news:News){
    console.log("service edit Mode");
    this.http.put<{message:string}>('http://localhost:3000/api/news/'+ id,news).subscribe((message)=>{
                  console.log(message);
                  this.router.navigate(['newsList']);
                  console.log("service edit Mode....2");
                  //const updatedNewsList= this.newsList.filter(news=>news.id !==id);
                  //this.newsList=updatedNewsList;
                  //this.newsListUpdated.next([...this.newsList]);
                  //const updatedNewsList=[...this.newsList];
                  //const oldNewsIndex=updatedNewsList.findIndex(k=>k.id===news.id);
                  //updatedNewsList[oldNewsIndex]=news;
                  //this.newsList=updatedNewsList;
                  //this.newsListUpdated.next([...this.newsList]);


    })
  }


}
