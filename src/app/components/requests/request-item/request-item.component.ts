import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.css']
})
export class RequestItemComponent implements OnInit {

  @Input() reqInfo: Request;
  itIsSelected: boolean = false;

  constructor() { }

  ngOnInit(): void {}

  onReqSelected() {
    this.itIsSelected = !this.itIsSelected;
  }

}
