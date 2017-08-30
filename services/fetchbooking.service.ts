
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Router } from "@angular/router";
import { LocationComponent } from "../location/location.component";
import { Observable } from "rxjs/Rx";

@Injectable()
export class FetchbookingService {

  constructor(public af: AngularFireAuth, public db: AngularFireDatabase, public router: Router) {

  }

  /*******************************************************************************
   *                      declarations
   *******************************************************************************/
  items: FirebaseListObservable<any[]>;
  fetchkey = [];
  keys = [];
  fetchstarttime = [];
  fetchslot = [];
  key = [];
  fetchdata = [];
  dab = []
  show = [];
  reserve = [];
  endtimee;
  user = [];
  users: FirebaseListObservable<any[]>;
  profile: FirebaseListObservable<any[]>;
  userprofile: FirebaseListObservable<any[]>;
  usernames = [];


  /*****************************************************************************
   *      getting all booking information for checking already reserved slots
   ******************************************************************************/
sl = [];
  fetchbooking() {
    this.items = this.db.list('/bookings/', { preserveSnapshot: true });
    this.items
      .subscribe(snapshots => {
        this.fetchslot = [];
        this.dab = [];
        this.show = [];
        this.sl=[]
        snapshots.forEach(snapshot => {
          this.keys.push(snapshot.key)
          console.log(snapshot.key)
          snapshot.forEach(data => {
            this.key.push(data.key)
            console.log(data.key)
            this.dab.push(data.val());
                        this.sl.push(data.val().slot);

            this.show.push(data.val());
            console.log(data.val())
            snapshot.forEach(child => {
              console.log(child.key)
              this.fetchdata.push(child.val());
            })
          });
        })
      })
  }

  // checkforreserve() {
  //   for (var i = 0; i < this.fetchdata.length; i++) {
  //     if (this.fetchdata[i].slot == this.reserve[i].slot) {
  //     }
  //   }
  // }

  /*****************************************************************************
 *                     getting reserve slots in array
 ******************************************************************************/
  checkreserve(data, endtime) {
    this.endtimee = data.userstarttime + endtime + ":00"
    this.reserve.length = 0;
    console.log(this.reserve)
    for (let i = 0; i < (this.dab.length); i++) {
      console.log(this.dab[i].userdate)
      if (this.dab[i].location == data.location && this.dab[i].userdate == data.userdate) {
        console.log("Date is mateched with selecected date");
        if (((data.userendtime + this.endtimee > this.dab[i].userstarttime) && (data.userstarttime < this.dab[i].userendtime))
          || ((data.userendtime + this.endtimee <= this.dab[i].endTime) && (data.userendtime + this.endtimee > this.dab[i].userstarttime))
          || data.userstarttime < this.dab[i].userstarttime && data.userendtime + this.endtimee > this.dab[i].userendtime) {
          console.log(this.reserve);
          this.reserve.push(this.dab[i].slot);
        }
      }
    }
  }




  // allusers() {
  //   this.users = this.db.list('/users/', { preserveSnapshot: true });
  //   this.users
  //     .subscribe(snapshots => {
  //       snapshots.forEach(snapshot => {
  //         snapshots.forEach(data => {
  //           this.usernames.push(data.val().name);
  //         })
  //       })
  //     })
  // }

  // locations: FirebaseListObservable<any[]>
  // locationkey = [];
  // array = [];

  // getLocation() {
  //   this.locations = this.db.list('/locations', { preserveSnapshot: true });
  //   this.locations
  //     .subscribe(snapshots => {
  //       this.locationkey = [];
  //       this.array = [];
  //       snapshots.forEach(snapshot => {
  //         console.log(snapshot.key)
  //         console.log(snapshot.val())
  //         this.locationkey.push(snapshot.key)
  //         this.array.push(snapshot.val());
  //       });
  //     })
  // }
}

































