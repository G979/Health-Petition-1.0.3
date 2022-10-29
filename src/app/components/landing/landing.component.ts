import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  private subs = new Subscription();
  user$ = this.usersService.currentUserProfile$;
  role: string = '';

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.subs.add(
      this.user$.subscribe(data => {
        if(data != null){
          this.role = data.role;
        }
      })
    )

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
