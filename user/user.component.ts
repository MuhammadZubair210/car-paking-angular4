import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { DataService } from "../services/data.service";
import { AngularFireAuth } from "angularfire2/auth";
import { FetchbookingService } from "../services/fetchbooking.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  /****************************************************************************
   *                                declarations
   ****************************************************************************/
  arr = [];
  arry = [];
  keys = [];
  parentKeys = [];
  user;
  constructor(public db: AngularFireDatabase,
    public _service: DataService,
    public af: AngularFireAuth,
    public s_service: FetchbookingService,
    public router: Router) {
    this.viewcomp();
  }
  ngOnInit() {
  }
  /*****************************************************************************
   *                     function for showing user bookings
   ******************************************************************************/

  uid = this.af.auth.currentUser.uid;
  viewcomp() {
    this.user = this.db.list('/bookings/' + this.uid, { preserveSnapshot: true });
    this.user
      .subscribe(snapshots => {
        this.arry = [];
        this.keys = [];
        this.parentKeys = [];
        snapshots.forEach(snapshot => {
          this.parentKeys.push(snapshot.key)
          this.keys.push(snapshot.val());
          console.log(snapshot.key)
          snapshot.forEach(child => {
            this.arry.push(child.key)
          });
        });
      });
  }
  /*****************************************************************************
   *                        delete individual booking
   ******************************************************************************/
  delete(i) {
    console.log("working")
    this.db.list('/bookings/' + this.uid).remove(this.parentKeys[i]);
  }


  logout() {
    this._service.logout();
    window.location.reload();
    this.router.navigate(['/login']);
  }
}
