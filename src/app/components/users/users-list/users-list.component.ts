import { GeneralService } from './../../../services/general.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  private subs = new Subscription();
  users: User[] = [];

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.subs.add(
      this.generalService.getUsers()
      .subscribe(data => {
        this.users = data;
      })
    );
  }

}
