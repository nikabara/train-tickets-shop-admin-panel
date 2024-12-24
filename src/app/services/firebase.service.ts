import { inject, Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Info } from '../interfaces/Info.interface';
import { AdminUser } from '../interfaces/AminUser.interface';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore = inject(Firestore);

  // Collection of info table on DB
  infoCollection = collection(this.firestore, 'info');

  // Collection of admin users table on DB
  adminUserCollection = collection(this.firestore, 'admin-users')

  getInfo(): Observable<Info[]> {
    return collectionData(this.infoCollection, {
      idField: "id"
    }) as Observable<Info[]>;
  }

  getAdminUsers(): Observable<AdminUser[]> {
    return collectionData(this.adminUserCollection, {
      idField: "id"
    }) as Observable<AdminUser[]>;
  }

  // addInfo(title: string, descr: string, occured: Timestamp, renewalAt: Timestamp, imageUrl: string): Observable<string> {
  //   const infoToAdd: any = {
  //     info: {
  //       title: title,
  //       description: descr,
  //       occured: occured,
  //       estimatedRenewal: renewalAt,
  //       imageUrl: imageUrl
  //     }
  //   }

  //   const promise = addDoc(this.infoCollection, infoToAdd).then(
  //     (response) => response.id
  //   );

  //   return from(promise);
  // }

  addInfo(formData: any): Observable<string> {
    const infoToAdd: any = {
      info: formData // Directly pass the raw form data
    };
  
    console.log(infoToAdd, 'info to add');
  
    const promise = addDoc(this.infoCollection, infoToAdd).then(
      (response) => response.id
    );
  
    return from(promise);
  }
  
}
