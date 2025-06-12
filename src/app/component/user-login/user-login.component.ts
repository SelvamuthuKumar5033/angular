import { Component } from '@angular/core';
import { Users } from '../../models/users';
import { Router } from '@angular/router';
import { Usersservice } from '../../service/usersservice';
import { LoaderService } from '../../service/loader.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
  auth = {
    username: 'admin',
    password: 'admin',
  };

  userobj: Users[] = [];
  user: Users = {
    id: 0,
    username: '',
    password: '',
    email: '',
    role: '',
  };

  pass$: boolean = true;
  alert$: boolean = false;
  message: string = '';
  constructor(
    private userService: Usersservice,
    private router: Router,
    private loaderService: LoaderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const obj = this;
    obj.message = 'Try to Log In';
    obj.alert$ = true;
    setTimeout(() => {
      obj.alert$ = false;
    }, 2000);
  }

  tokenauthenticate(auth: any) {
    const obj = this;
    obj.loaderService.show();

    obj.authService.authtoken(auth).subscribe({
      next: (data: any) => {
        sessionStorage.setItem('access_token', data.access_token);
        obj.loaderService.hide();
      },
      error: (err) => {
        console.log(err);
        obj.message = 'Authentication Failed';
        obj.alert$ = true;
        obj.loaderService.hide();
      },
    });
  }

  onSubmit() {
    const obj = this;
    obj.loaderService.show();

    if (obj.user.username) {
      localStorage.setItem('username', obj.user.username);
    }

    obj.tokenauthenticate(obj.auth);

    if (sessionStorage.getItem("access_token")!= null) {
      obj.userService.authentication(obj.user).subscribe({
        next: (isauth) => {
          if (isauth) {
            sessionStorage.setItem('justLoggedIn', 'true');
            obj.router.navigate(['/home']);
          } else {
            obj.message = 'Invalid User or Password register now. ';
            obj.alert$ = true;
          }
        },
        error: (err) => {
          obj.message = 'Something went wrong !!';
          obj.alert$ = true;
        },
      });
    }
    obj.loaderService.hide();
  }

  handleNotification(response: boolean) {
    const obj = this;
    if (!response) {
      obj.alert$ = false;
    }
  }

  toggleicon() {
    const obj = this;
    obj.pass$ = !obj.pass$;
  }
}
