import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Router } from "@angular/router";
import { DataService } from "./data.service";

@Injectable()
export class FeedbackserviceService {
  fetchnames = [];
  fetchprofiles = [];
  profiles: FirebaseListObservable<any[]>;
  user: any[];
  userProfiles;

  constructor(public af: AngularFireAuth, public db: AngularFireDatabase, public router: Router, public _service: DataService) {
    // this.fetchbooking();

  }
  feedback = [];
  keys = [];
  key = [];
  dab = [];
  fetchdata = [];
  items: FirebaseListObservable<any[]>;
  uid;
  // fetchbooking() {
  //   this.items = this.db.list('/feedback/', { preserveSnapshot: true });
  //   this.items
  //     .subscribe(snapshots => {
  //       this.feedback = [];
  //       snapshots.forEach(snapshot => {
  //         this.keys.push(snapshot.key)
  //         console.log(snapshot.key)
  //         snapshot.forEach(data => {
  //           this.key.push(data.key)
  //           console.log(data.key)
  //           console.log(data.val())

  //         });
  //       })
  //     })
  // }

    /*****************************************************************************
   *                     admin reply function
   ******************************************************************************/
 sendReply(currrentPersonUid, message) {
    
    this.db.list('feedback/' +currrentPersonUid).push(message)

  }

}
