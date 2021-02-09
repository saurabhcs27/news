import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }
  onRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }
     this.authService.registerUser(form.value.email, form.value.password);
  }

}
