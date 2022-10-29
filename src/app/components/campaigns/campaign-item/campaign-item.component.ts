import { Component,Input, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/campaign.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign-item',
  templateUrl: './campaign-item.component.html',
  styleUrls: ['./campaign-item.component.css']
})
export class CampaignItemComponent implements OnInit {

  @Input() campInfo: Campaign;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  allRequests() {
    this.router.navigate([this.campInfo.id, 'requests']);
  }

}
