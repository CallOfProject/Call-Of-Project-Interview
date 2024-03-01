import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../service/login.service";
import {LoginRequestDTO} from "../dto/LoginRequestDTO";
import {FormBuilder, Validators} from "@angular/forms";
import {CURRENT_USER} from "../../util/constants";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [MessageService]
})
export class LoginPageComponent implements OnInit {
  title = 'CallOfProject'

  loginModel: LoginRequestDTO = new LoginRequestDTO()
  submitted = false;


  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })


  ngOnInit() {
    localStorage.clear()
    localStorage.removeItem("username")
    localStorage.removeItem(CURRENT_USER)
  }


  constructor(private router: Router, private loginService: LoginService, private formBuilder: FormBuilder, private messageService: MessageService) {
  }

  handleLoginButton() {
    //this.router.navigate(['/main-menu'])
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.loginModel.username = this.loginForm.controls.username.value
      this.loginModel.password = this.loginForm.controls.password.value
      console.log(this.loginModel)
      this.loginService.sendLoginRequest(this.loginModel).subscribe((response: any) => {
        if (response.success) {
          this.router.navigate(['/main-menu']).then(r => console.log('Login successful'));
        } else {
          if (response.blocked) {
            this.messageService.clear();
            this.messageService.add({
              key: 'fill_all_blanks',
              severity: 'error',
              summary: 'Login failed',
              detail: 'Your account has been blocked'
            });
            return;
          } else {
            this.messageService.clear();
            this.messageService.add({
              key: 'fill_all_blanks',
              severity: 'error',
              summary: 'Login failed',
              detail: 'Invalid username or password'
            });
            return;
          }
        }
      })
    }

  }

}
