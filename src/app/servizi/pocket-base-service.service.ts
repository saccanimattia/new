import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PocketBaseService {
  private pocketBase: PocketBase;

  constructor() {
    this.pocketBase = new PocketBase('http://127.0.0.1:8090');
  }

  subscribeToStudentsChanges(): Observable<any> {
    return new Observable((observer) => {
      this.pocketBase.collection('Students').subscribe('*', function (e) {
        console.log("Record ricevuti ===");
        console.log("Record ricevuti:", e.record);
          observer.next(e.record);
        });
    });
  }
}
