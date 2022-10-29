import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Request } from './../../../models/request.model';
import { UsersService } from './../../../services/users.service';
import { Subscription } from 'rxjs';
import { doc, updateDoc, Firestore } from '@angular/fire/firestore';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  @Input() req: Request;
  private subs = new Subscription();
  user$ = this.usersService.currentUserProfile$;
  role: string = '';
  requestId: string;
  address: string;
  sender: string;
  ready: boolean = false;

  constructor(private firestore: Firestore,
              private usersService: UsersService,
              private toast: HotToastService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.req) {
      this.requestId = String(this.req.id);
    }
    this.subs.add(
      this.user$.subscribe(data => {
        if(data != null){
          this.role = data.role;
          this.address = data.address;
          this.ready = true;
        }
      })
    );
  }

  async approveRequest() {
    const docRef = doc(this.firestore, "requests", this.requestId);
    await updateDoc(docRef, {
      isFinalised: !this.req.isFinalised
    })
    .then(() => {
      this.toast.success('Request successfully approved!');
    })
    .catch((error) => {
        this.toast.error("Error updating Request: ", error);
    });
  }

  async deleteRequest() {
    const docRef = doc(this.firestore, "requests", this.requestId);
    await updateDoc(docRef, {
      dismiss: !this.req.dismiss
    })
    .then(() => {
      this.toast.success('Request successfully dismissed!');
    })
    .catch((error) => {
        this.toast.error("Error updating Request: ", error);
    });
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
