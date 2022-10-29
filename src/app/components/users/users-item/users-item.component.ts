import { User } from './../../../models/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-users-item',
  templateUrl: './users-item.component.html',
  styleUrls: ['./users-item.component.css']
})
export class UsersItemComponent implements OnInit {

  @Input() userInfo : User[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
