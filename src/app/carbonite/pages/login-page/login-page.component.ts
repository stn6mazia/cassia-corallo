import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { map } from 'rxjs/operators'
import { User } from '../../shared/user';
import  * as  md5 from  'md5';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  pageStep = 1
  login: FormGroup
  register: FormGroup
  users: any;
  user: User = new User()

  needLoginToCheckout
  
  submitted = true

  existentUser = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UsersService
  ) { }

  ngOnInit() {
    if(sessionStorage.getItem('loginToCheckout')) {
      this.needLoginToCheckout = true
    } else {
      this.needLoginToCheckout = false
    }
    this.mountLoginForm()
    this.mountRegisterForm()
  }

  mountLoginForm() {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

    this.login.valueChanges.subscribe().unsubscribe()
  }
  mountRegisterForm() {
    this.register = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      password: ['', [Validators.required]]
    })

    this.register.valueChanges.subscribe().unsubscribe()
  }


  newCustomer(): void {
    this.user = new User();
  }
  
  save() {
    this.user.password = md5(this.user.password)
    this.userService.createUser(this.user);
    this.user = new User();
    // this.submitted = true;
    this.pageStep = 1
  }
  
  onSubmit() {
    this.submitted = false
    this.save();
  }

  checkUser() {
    this.userService.getUsersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(users => {
      for(let i = 0; i < users.length; i++) {
        if(this.register.get('email').value === users[i].email) {
          this.existentUser = true
          break
        } else {
          this.existentUser = false
        }
      }
    });
  }

  doLogin() {
    this.userService.getUsersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(users => {
      for(let i = 0; i < users.length; i++) {
        if(this.login.get('email').value === users[i].email && md5(this.login.get('password').value) === users[i].password) {
          sessionStorage.setItem('userName', users[i].name)
          sessionStorage.setItem('phone', users[i].phone)
          sessionStorage.setItem('userEmail', users[i].email)
          sessionStorage.setItem('userKey', users[i].key)

          if(users[i].key === '-LwIyJs0fxiWHMdxc-uN') {
            sessionStorage.setItem('admin', 'true')
            this.router.navigateByUrl('full-orders')
          } else {
            if(sessionStorage.getItem('loginToCheckout')) {
              sessionStorage.removeItem('loginToCheckout')
              this.router.navigateByUrl('cart')
            } else {
              this.router.navigateByUrl('products')
            }

          }

        }
      }

    });
  }

}
