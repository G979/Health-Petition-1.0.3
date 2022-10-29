import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { doc,docData,Firestore } from '@angular/fire/firestore';
import { Observable, of, switchMap } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore,
              private generalService: GeneralService) {}

  get currentUserProfile$(): Observable<User | null> {
    return this.generalService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<User>;
      })
    );
  }

}
