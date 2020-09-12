import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isformValid = true;

  loginForm = new FormGroup({
    username: new FormControl('' , [ Validators.required, Validators.email ]),
    password: new FormControl('' , [ Validators.required ]),
  });

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

  constructor(private loginService: LoginService, private sharedService: SharedService, private route: Router) { }

  ngOnInit(){
  }

  onSubmitLogin(){
    if (this.loginForm.valid){
      this.sharedService.showSpinner();
      this.loginService.login(this.loginForm.value).subscribe(res => {
        this.sharedService.success('Login Successfully', '');
        localStorage.setItem('ChatAppToken', String(res.token));
        localStorage.setItem('ChatAppUser', String(res.username));
        this.sharedService.hideSpinner();
        this.goToChat();
      },
      err => {
        this.sharedService.error(err.error.message , '');
        this.sharedService.hideSpinner();
        this.loginForm.reset();
      });
    }
    else{
      this.isformValid = false;
    }
  }

  goToChat(){
    this.route.navigate(['/chatroom'])
  }

}
