import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/campaign.model';
import { GeneralService } from 'src/app/services/general.service';


@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {

  private subs = new Subscription();
  campaigns: Campaign[] = [];

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.subs.add(
      this.generalService.getCampaigns()
      .subscribe(data => {
        this.campaigns = data;
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
