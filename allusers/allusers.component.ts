import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { DataService } from "../services/data.service";
import { AngularFireAuth } from "angularfire2/auth";
import { FetchbookingService } from "../services/fetchbooking.service";
import { Router } from "@angular/router";
import { FeedbackserviceService } from "../services/feedbackservice.service";

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

  constructor(public db: AngularFireDatabase, public _service: DataService, public af: AngularFireAuth, public s_service: FetchbookingService, public router: Router, public _feedback: FeedbackserviceService, public fetchbooking: FetchbookingService) {
    this.allusers()
    this.fetchb()
  }
  ngOnInit() {
  }
  users: FirebaseListObservable<any[]>
  fetchuser = [];
  user = [];

  allusers() {
    this.users = this.db.list('/users', { preserveSnapshot: true });
    this.users
      .subscribe(snapshots => {
        this.fetchuser = [];
        this.user = [];
        snapshots.forEach(snapshot => {
          this.fetchuser.push(snapshot.key)
          snapshot.forEach(data => {
            console.log(data.key)
            this.user.push(data.val());
          })
        })
      })
  }

  items: FirebaseListObservable<any[]>;
  fetchkey = [];
  keys = [];
  fetchstarttime = [];
  fetchslot = [];
  key = [];
  fetchdata = [];
  dab = []
  fetchb() {
    this.items = this.db.list('/bookings', { preserveSnapshot: true });
    this.items
      .subscribe(snapshots => {
        this.fetchslot = [];
        this.dab = [];
        snapshots.forEach(snapshot => {
          this.keys.push(snapshot.key)
          console.log(this.keys)
          snapshot.forEach(data => {
            this.key.push(data.key)
            console.log(data.key)
            this.dab.push(data.val());
            console.log(data.val())
          });
        })
      })
  }
  /*****************************************************************************
                      delete function for all user data
   *****************************************************************************/
  del(index) {
    console.log(this.fetchuser[index])
    this.db.list('feedback/').remove(this.fetchuser[index]);
    this.db.list('bookings/').remove(this.fetchuser[index]);
    this.db.list('users/').remove(this.fetchuser[index]);
  }
  logout() {
    this._service.logout();
    window.location.reload();
    this.router.navigate(['/login']);
  }

}
