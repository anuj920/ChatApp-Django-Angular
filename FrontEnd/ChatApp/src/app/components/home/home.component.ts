import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn = false;

  constructor(private route: Router) { }

  ngOnInit(){
    const token = localStorage.getItem('ChatAppToken');
    if (token && token.length > 0 && token !== null && token !== ''){
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
    }
  }




  goToChat(){

    this.route.navigate(['/chatroom']);

  }

}
