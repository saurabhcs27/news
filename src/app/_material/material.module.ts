import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';

const MaterialComponents=[
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatExpansionModule,
  MatToolbarModule
]

@NgModule({
  //declarations: [],
  imports: [
   // CommonModule
   MaterialComponents
  ],
  exports:[
    MaterialComponents

  ]
})
export class MaterialModule { }
