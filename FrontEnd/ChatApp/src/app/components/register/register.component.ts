import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  passwordCheck = true;
  isformValid = true;
  student = true;
  teacher = false;

  registerFrom =  new FormGroup({
    username: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
    password2: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
  });

  get username(){
    return this.registerFrom.get('username');
  }

  get password(){
    return this.registerFrom.get('password');
  }

  get password2(){
    return this.registerFrom.get('password2');
  }

  constructor(private registerService: RegisterService, private route: Router, private sharedService: SharedService) { }

  ngOnInit(): void{
  }

  checkPassword(){
    if (this.password.value && this.password2.value){
      if (this.password.value !== this.password2.value){
        this.passwordCheck = false;
      }
      else{
        this.passwordCheck = true;
      }
    }
  }


  onSubmit(): void{

    if (this.registerFrom.valid){
      this.sharedService.showSpinner();
      this.registerService.register(this.registerFrom.value).subscribe(res => {
        if (res){
          this.sharedService.success(res.message, '');
          this.sharedService.hideSpinner();
          this.route.navigate(['login/']);
        }
      },
      err => {
        this.sharedService.error(err.error.message, '');
        this.sharedService.hideSpinner();
        this.registerFrom.reset();
      }
      );
    }
    else{
      this.isformValid = false;
    }

  }

}
