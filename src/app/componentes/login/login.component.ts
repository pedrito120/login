import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  register = {
    user:'',
    password:''
  }
  constructor(private service:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  login(){
   this.service.login(this.register.user,this.register.password).subscribe(res => {
      console.log(res.jwt);
      this.router.navigate(['home']);
   })
  }
}
