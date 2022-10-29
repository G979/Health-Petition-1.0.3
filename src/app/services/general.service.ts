import { Campaign } from '../models/campaign.model';
import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { collection, collectionData, doc, docData, Firestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth, private firestore:Firestore) { }

  login(address:string, password:string) {
    return from(signInWithEmailAndPassword(this.auth, address, password ));
  }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  getUsers(){
    let $usersRef=collection(this.firestore,"users");
    return collectionData($usersRef,{idField:"id"}) as Observable<User[]>;
  }

  getCampaigns(){
    let $campRef=collection(this.firestore,"campaigns");
    return collectionData($campRef,{idField:"id"}) as Observable<Campaign[]>;
  }

  getRequests(){
    let $reqRef=collection(this.firestore,"requests");
    return collectionData($reqRef,{idField:"id"}) as Observable<Request[]>;
  }

  getUserById(id:string){
    let $userRef=doc(this.firestore,"users/"+id);
    return docData($userRef,{idField:"id"}) as Observable<User>;
  }

  getCampaignbyId(id:string){
    let $campRef=doc(this.firestore,"campaigns/"+id);
    return docData($campRef,{idField:"id"}) as Observable<Campaign>;
  }

  // async requestsByCId() {
  //   let $reqRef=collection(this.firestore,"requests");
  //   let query = $reqRef.where("")
  //   ref => ref.where('campaign', '==', "o0xKaywsQSA1pjpxJT1D"));
  //   return collectionData(requests,{idField:"id"}) as Observable<Campaign>;
  //}
}
