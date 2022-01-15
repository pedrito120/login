import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Idle } from 'idlejs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  interval:any;
  constructor(private service: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.activityUser();
    this.refreshToken();
  }

  refreshToken() { 
    this.interval =  setInterval(() => {
      console.log('refresh Token');
      this.service.refreshToken().subscribe(res => {
        console.log(res.jwt); 
      });
    }, 3000);
  }
  activityUser() {
    const idle = new Idle()
      .whenNotInteractive()
      .within(30, 1000)
      .do(() => this.logOut())
      .start();
    console.log(idle);
  }
  logOut() {
    this.service.logOut().subscribe((res) => {
      console.log(res);
      localStorage.clear();
      this.router.navigate(['login']);
    });
  }
  interactuar() {
    console.log('hola como te va');
  }
  ngOnDestroy(){
      clearInterval(this.interval);
  }
}
