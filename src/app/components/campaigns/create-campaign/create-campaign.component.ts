import { addDoc, Firestore, collection } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {

  campaignForm = new FormGroup({
    address: new FormControl('',[Validators.required,Validators.pattern('0x[a-fA-F0-9]{40}$')]),
    patient: new FormControl('',Validators.required)
  });

  constructor(private firestore: Firestore,
              private router: Router,
              private toast: HotToastService) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    // Add a new document in collection "campaigns"
    const docRef = await
    addDoc(collection(this.firestore, "campaigns"), {
      address: this.campaignForm.value.address,
      patient: this.campaignForm.value.patient
    })
    .then(() => {
      this.toast.success('Campaign successfully associated!');
      this.router.navigate(['/campaigns/list']);
    })
    .catch((error) => {
        this.toast.error("Error writing Campaign: ", error);
      });
  }

}
