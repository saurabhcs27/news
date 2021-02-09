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
    const newsData = new FormData();
    newsData.append("title", news.title);
    newsData.append("description", news.description);
    if(news.imagePath){
      newsData.append("image", news.imagePath, news.title);
    }

    this.http.post<{message:string,news:News}>('http://localhost:3000/api/news',newsData).subscribe((newlyPublishedNewsData)=>{
                  //news.id=newlyPublishedNewsData.id;
                  const newsItem: News = {
                    id: newlyPublishedNewsData.news.id,
                    title: news.title,
                    description: news.description,
                    imagePath: newlyPublishedNewsData.news.imagePath
                  };
                  this.newsList.push(newsItem);
                  this.newsListUpdated.next([...this.newsList]);
                  this.router.navigate(['newsList']);
    })

  }

  getNewsList(){
    this.http.get<{message:string,fetchedNewsList:any}>('http://localhost:3000/api/news')
    .pipe(map(newsData=>{
            return newsData.fetchedNewsList.map((newsList:{ title: string; description: string; _id: string;imagePath:string })=>{
                                                      return {
                                                            title:newsList.title,
                                                            imagePath:newsList.imagePath,
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
    return this.http.get<{_id:string,title:string,description:string,imagePath:string}>('http://localhost:3000/api/news/'+ id)
  }

  updateNews(id:string,news:News){
    let newsData: News | FormData;
    if (typeof news.imagePath === "object") {
      newsData = new FormData();
      if(news.id){
        newsData.append("id", news.id);
      }
      newsData.append("title", news.title);
      newsData.append("description", news.description);
      if(news.imagePath){
      newsData.append("image", news.imagePath, news.title);
      }
    } else{
      newsData = {
        id: news.id,
        title: news.title,
        description: news.description,
        imagePath: news.imagePath
      };
    }


    console.log("service edit Mode");
    this.http.put<{message:string}>('http://localhost:3000/api/news/'+ id,newsData).subscribe((message)=>{
                  console.log(message);

                  console.log("service edit Mode....2");
                  //const updatedNewsList= this.newsList.filter(news=>news.id !==id);
                  //this.newsList=updatedNewsList;
                  //this.newsListUpdated.next([...this.newsList]);
                  const updatedNewsList=[...this.newsList];
                  const oldNewsIndex=updatedNewsList.findIndex(k=>k.id===news.id);
                  const newsItem: News = {
                    id: id,
                    title: news.title,
                    description: news.description,
                    imagePath: ""
                  };
                  updatedNewsList[oldNewsIndex]=newsItem;
                  this.newsList=updatedNewsList;
                  this.newsListUpdated.next([...this.newsList]);
                  this.router.navigate(['newsList']);
                  //this.router.navigate(["/"]);

    })
  }


}
