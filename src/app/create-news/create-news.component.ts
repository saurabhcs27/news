import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { News }  from "../_model/news.model";
import { NewsService } from '../_service/news.service';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  newsCreateForm1!: FormGroup;
  constructor(public newsService:NewsService) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.newsCreateForm1=new FormGroup({
                                       'title':new FormControl(null,{
                                               validators:[Validators.required,Validators.minLength(5)]}),
                                       'description':new FormControl(null,{
                                               validators:[Validators.required]})
    });

  }

  onSaveNews(){
    if(this.newsCreateForm1.invalid){
       return ;
    }
    const news:News={
      "id":null,
      "title":this.newsCreateForm1.value.title,
      "description":this.newsCreateForm1.value.description
    }
    console.log(news);
    this.newsService.publishNews(news);
    this.newsCreateForm1.reset();
    this.newsCreateForm1.controls.title.setErrors(null);
    this.newsCreateForm1.controls.description.setErrors(null);


  }

}
