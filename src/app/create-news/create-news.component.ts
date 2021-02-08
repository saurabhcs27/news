import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { News }  from "../_model/news.model";
import { NewsService } from '../_service/news.service';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  newsCreateForm!: FormGroup;
  private mode='create';
  private newsId:string|null=null;;
  news:News | undefined;
  constructor(public newsService:NewsService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
                                                        if(paramMap.has('newsId')){
                                                          this.newsId=paramMap.get('newsId');
                                                          this.mode='edit';
                                                          if(this.newsId){
                                                            this.newsService.getNewsById(this.newsId).subscribe((newsData)=>{
                                                                this.news={id:newsData._id,
                                                                         title:newsData.title,
                                                                         description:newsData.description}

                                                              this.newsCreateForm.setValue({
                                                                          'title':this.news.title,
                                                                          'description':this.news.description
                                                                        })
                                                            })
                                                          }


                                                        }
                                                        else{
                                                          this.newsId=null;
                                                          this.mode='create';

                                                        }

    })
  }


  createForm(){
    this.newsCreateForm=new FormGroup({
                                       'title':new FormControl(null,{
                                               validators:[Validators.required,Validators.minLength(5)]}),
                                       'description':new FormControl(null,{
                                               validators:[Validators.required]})
    });

  }

  onSaveNews(){
    if(this.newsCreateForm.invalid){
      alert("provide input fields");
     // return ;

    }

    if(this.mode==='create'){
      const news:News={
        "id":null,
        "title":this.newsCreateForm.value.title,
        "description":this.newsCreateForm.value.description
      }
      this.newsService.publishNews(news);
    }
    else if(this.mode==='edit'){
      console.log("component edit Mode one");
      const news:News={
        "id":this.newsId,
        "title":this.newsCreateForm.value.title,
        "description":this.newsCreateForm.value.description
      }

      if(news.id){
        this.newsService.updateNews(news.id,news);
        console.log("component edit Mode");
      }

    }

    this.newsCreateForm.reset();
    this.newsCreateForm.controls.title.setErrors(null);
    this.newsCreateForm.controls.description.setErrors(null);


  }

}
