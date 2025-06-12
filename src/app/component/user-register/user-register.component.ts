import { Component } from '@angular/core';
import { Users } from '../../models/users';
import { Usersservice } from '../../service/usersservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css',
})
export class UserRegisterComponent {
  userobj: Users[] = [];
  user: Users = {
    id: 0,
    username: '',
    password: '',
    email: '',
    role:''
  };
  alert$: boolean = false;
  message: string = '';
  pass$: boolean = true;

  constructor(
    private userService: Usersservice,
    private router: Router
  ) {}

  onSubmit() {
    const obj=this;
    obj.userService.createUser(obj.user).subscribe({
      next: () => {
        obj.user = {
          id: 0,
          username: '',
          password: '',
          email: '',
        };
        obj.message='User Registrated Successfully.'
        obj.alert$=true;
        setTimeout(() => {
              obj.router.navigate(['/auth']);
            }, 500); // wait 1 seconds
      },
      error: (err) => {
        obj.message='Username already taken.'
        obj.alert$=true;
      },
    });
  }

  handleNotification(response: boolean){
    const obj = this;
    if(!response){
      obj.alert$=false;
    }
  }

  toggleicon(){
    const obj = this;
    obj.pass$ = !obj.pass$;
    
  }

}
