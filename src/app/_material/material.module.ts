import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
const MaterialComponents=[
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatExpansionModule,
  MatSliderModule
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
