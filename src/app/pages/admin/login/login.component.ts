import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface ILoginObj {
  userName: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginObj: ILoginObj = {
    userName: '',
    password: '',
  };

  constructor(private router: Router) {}

  onLogin() {
    if (
      this.loginObj.userName === 'admin' &&
      this.loginObj.password === '12345'
    ) {
      this.router.navigateByUrl('/products');
    } else {
      alert(
        'Wrong credentials! Please, try Username "admin" and Password "12345"'
      );
    }
  }
}
