import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  campId: string;
  campAddress: string;
  requests: Request[] = [];
  private subs = new Subscription();

  constructor(private route: ActivatedRoute,
              private generalService: GeneralService,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.campId = this.route.snapshot.params['id'];
    this.subs.add(
      this.generalService.getCampaignbyId(this.campId)
      .subscribe(data => {
        this.campAddress = data.address;
      })
    );
    this.subs.add(
      this.generalService.getRequests()
      .subscribe(data => {
        console.log(data)
        this.requests = data;
      })
    );
  }

  newRequest() {
    this.router.navigate([this.campId, 'new']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
