import { getDownloadURL } from 'firebase/storage';
import { addDoc, Firestore, collection } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  requestForm = new FormGroup({
    createdBy: new FormControl('',[Validators.required,Validators.pattern('0x[a-fA-F0-9]{40}$')]),
    recipient: new FormControl('',[Validators.required,Validators.pattern('0x[a-fA-F0-9]{40}$')]),
    description: new FormControl('',Validators.required)
  });

  constructor(private firestore: Firestore,
              private router: Router,
              private toast: HotToastService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    // Add a new document in collection "campaigns"
    const docRef = await
    addDoc(collection(this.firestore, "requests"), {
      campaign: this.route.snapshot.params['id'],
      createdBy: this.requestForm.value.createdBy,
      description: this.requestForm.value.description,
      recipient: this.requestForm.value.recipient,
      isFinalised: false,
      downloadUrl: ''
    })
    .then(() => {
      this.toast.success('Request successfully associated!');
      this.router.navigate(['']);
    })
    .catch((error) => {
        this.toast.error("Error writing Request: ", error);
      });
  }
}
