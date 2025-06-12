import { Component } from '@angular/core';
import { Usersservice } from '../../service/usersservice';
import { Router } from '@angular/router';
import { Users } from '../../models/users';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  newpass?: string;
  emailverify$: boolean = false;
  alert$: boolean = false;
  message: string = '';
  user: Users = {
    username: '',
    password: '',
    email: '',
    role: '',
  };
  pass$: boolean = true;

  reset = {
    email: '',
    newpassword: '',
    confirmpassword: '',
  };

  constructor(
    private userService: Usersservice,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  handleNotification(response: boolean) {
    const obj = this;
    if (!response) {
      // Cancel pressed
      obj.alert$ = false;
    }
  }

  validateemail(): boolean {
    const obj = this;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(obj.reset.email)) {
      obj.userService.verifyEmail(obj.reset.email).subscribe(
        (response) => {
          obj.emailverify$ = true; 
          obj.message = 'Email verified! Please enter your new password.';
          obj.alert$ = true;
          obj.loaderService.hide();
        },
        (error) => {
          obj.message = 'Email verification failed. Please try again.';
          obj.alert$ = true;
          obj.loaderService.hide();
        }
      );
    } else {
      obj.message = 'Please enter a valid email.';
      obj.alert$ = true;
      obj.loaderService.hide();
    }
    return obj.emailverify$;
  }

  validatepass(): boolean {
    const obj = this;
    return (
      obj.reset.newpassword != null &&
      obj.reset.confirmpassword != null &&
      obj.reset.newpassword === this.reset.confirmpassword
      // && obj.reset.newpassword.length >= 6
    );
  }

  onSubmit() {
    const obj = this;
    obj.loaderService.show();
    obj.alert$ = false;

    if (obj.emailverify$) {
      if (obj.validatepass()) {
        obj.userService.resetpassword(obj.reset).subscribe(
          (data: string) => {
            obj.message = data;
            obj.alert$ = true;
            obj.reset = {
              email: obj.reset.email,
              newpassword: '',
              confirmpassword: '',
            };
            obj.router.navigate(['auth']);
            setTimeout(() => {
              obj.emailverify$ = false;
            }, 500);
          },
          (error) => {
            obj.message = 'An error occurred while resetting the password.';
            obj.alert$ = true;
          }
        );
      } else {
        obj.message = 'Passwords do not match or are invalid.';
        obj.alert$ = true;
      }
    }
    obj.loaderService.hide();
  }

  toggleicon(){
    const obj = this;
    obj.pass$ = !obj.pass$;
    
  }

}
