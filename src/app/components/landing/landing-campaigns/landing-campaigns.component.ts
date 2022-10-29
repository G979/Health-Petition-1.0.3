import { UsersService } from './../../../services/users.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing-campaigns',
  templateUrl: './landing-campaigns.component.html',
  styleUrls: ['./landing-campaigns.component.css']
})
export class LandingCampaignsComponent implements OnInit {

  private subs = new Subscription();
  user$ = this.usersService.currentUserProfile$;
  role: string = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private usersService: UsersService) { }

  ngOnInit(): void {
    this.subs.add(
      this.user$.subscribe(data => {
        if(data != null){
          this.role = data.role;
        }
      })
    )
  }

  createNewCampaignNav() {
    this.router.navigate(['new'], {relativeTo:this.route});
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
