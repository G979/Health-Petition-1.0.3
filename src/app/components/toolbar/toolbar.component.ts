import { User } from './../../models/user.model';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  user: User | undefined;
  private subs = new Subscription();

  constructor(private generalService: GeneralService,
              private router: Router,
              private usersService: UsersService) { }

  ngOnInit(): void {
    this.subs.add(
      this.usersService.currentUserProfile$
      .subscribe(data => {
        if(data != null){
          this.user = data;
        }
      })
    );
  }

  logout() {
    this.subs.add(
      this.generalService.logout().subscribe(() => {
        this.router.navigate(['/'])
        .then(() => {
          window.location.reload();
  });
      }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
