import { inject, Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Info } from '../interfaces/Info.interface';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore = inject(Firestore);
  infoCollection = collection(this.firestore, 'info');

  getInfo(): Observable<Info[]> {
    return collectionData(this.infoCollection, {
      idField: "id"
    }) as Observable<Info[]>;
  }

  addInfo(title: string, descr: string, occured: Timestamp, renewalAt: Timestamp, imageUrl: string): Observable<string> {
    const infoToAdd: any = {
      title: title,
      description: descr,
      occured: occured,
      estimatedRenewal: renewalAt,
      imageUrl: imageUrl
    }

    const promise = addDoc(this.infoCollection, infoToAdd).then(
      (response) => response.id
    );

    return from(promise);
  }
}
