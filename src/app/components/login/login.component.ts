import { Subscription } from 'rxjs';
import { GeneralService } from '../../services/general.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subs = new Subscription();

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required)
  });

  constructor(private generalService: GeneralService,
    private router: Router,
    private toast: HotToastService) {}


  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if(!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.subs = this.generalService.login(String(email), String(password)).pipe(
      this.toast.observe({
        success:'Logged in successfully',
        loading:'Logging in...',
        error: 'Error occured'
      })
    ).subscribe((data) => {
      console.log(data);
      this.generalService.getUserById(data.user.uid).subscribe((data) => {
        this.router.navigate(['']);
      })

    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

