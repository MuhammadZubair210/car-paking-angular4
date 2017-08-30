import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { DataService } from "../services/data.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { FetchbookingService } from "../services/fetchbooking.service";
import { Router, Routes } from "@angular/router";
import { FeedbackserviceService } from "../services/feedbackservice.service";
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MdSnackBar } from '@angular/material';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  user: Observable<firebase.User>;
  authstate;
  form: FormGroup
  constructor(public db: AngularFireDatabase,
    public _service: DataService,
    public af: AngularFireAuth,
    public s_service: FetchbookingService,
    public router: Router,
    public _feedback: FeedbackserviceService,
    public modalService: NgbModal,
    public snackBar: MdSnackBar,
  ) {
    // this.chec();

    this.getLocation();
    this.s_service.fetchbooking();
    this.checkby();
    this.slotcheck();
    this.s_service.checkreserve(this.data, this.data.duration);
  }

  /*******************************************************************************************
                                DECLARATIONS
  *******************************************************************************************/
  uid;
  alert: boolean;
  noalert: boolean;
  check: boolean = false;
  i;
  time: boolean = false;
  showslots: boolean = true;
  // rese;
  data = { UserEmail: '', location: '', slot: '', userdate: '', duration: '', userstarttime: '', userendtime: '', uid: '' };





  // book() {
  //   this.time = true;
  // }

  isTrue = true;
  bookslot() {
    if (this.isTrue == true) {
      this.isTrue = false;
    }
    else {
      this.isTrue = true;
    }
  }
  // refresh = false;
  // norefresh = true;
  // showrefresh() {
  //   if (this.refresh == false) {
  //     this.refresh = true;
  //     this.norefresh = false;
  //     // this.cleararray();
  //   }
  //   else {
  //     this.refresh = false;
  //     this.norefresh = true;
  //   }

  // }

  reserveslot = [];
  done = false;
  submitcheck() {
    this.done = true;
  }

  mydate = new Date(this.data.userdate)
  nowdate = new Date();


  /*******************************************************************************************
                                view slots button function
  *******************************************************************************************/


  rese;
  slotcheck() {
    // if (this.mydate < this.nowdate) {
    this.s_service.checkreserve(this.data, this.data.duration)
    this.rese = []
    // this.rese = this.s_service.reserve;
    // console.log(this.rese);
    this.check = true;
    var nowtime = parseInt(this.data.userstarttime);
    console.log(nowtime)
    var from = parseInt(this.data.duration);
    let to = nowtime;
    this.data.userendtime = to + from + ":00";
    // }
    // else {
    //   this.router.navigate(['/location'])

    // }
  }
  /*******************************************************************************************
                              getting selected values of slots and location
*******************************************************************************************/
  butvalue(val) {
    this.data.slot = val;
  }
  locationvalue(val) {
    this.data.location = val;
  }
  ngOnInit() { }
  locations: FirebaseListObservable<any[]>
  key = [];
  array = [];
  /*******************************************************************************************
                                getting locations from firebase
  *******************************************************************************************/
  getLocation() {
    this.locations = this.db.list('/locations', { preserveSnapshot: true });
    this.locations
      .subscribe(snapshots => {
        this.array = [];
        snapshots.forEach(snapshot => {
          console.log(snapshot.key)
          console.log(snapshot.val())
          this.key.push(snapshot.key)
          this.array.push(snapshot.val());
        });
      })
  }

//   chec() {
//     this.getLocation();
//     for (let i = 0; i < 6; i++) {
//       if (this.array[i].slot == this.s_service.reserve[i]) {
//         console.log(this.array[i].slot)
//       }
//       else {
//         console.log(this.s_service.fetchdata.length)
//         console.log(this.s_service.reserve[i])
//       }
//     }
//     console.log(this.array[this.ii])
//     console.log("true")
//   }

// ii;

  /*******************************************************************************************
                                reserved slots function
  *******************************************************************************************/
  checkby() {
    for (let i = 0; i < (this.s_service.fetchdata.length); i++) {
      // console.log(this.s_service.fetchdata[i].userdate)
      if (this.s_service.fetchdata[i].location == this.data.location && this.s_service.fetchdata[i].userdate == this.data.userdate && (this.s_service.fetchdata[i].slot == this.data.slot)) {
        console.log("Date is mateched with selecected date");
        if (((this.data.userendtime > this.s_service.fetchdata[i].userstarttime) && (this.data.userstarttime < this.s_service.fetchdata[i].userendtime))
          || ((this.data.userendtime <= this.s_service.fetchdata[i].endTime) && (this.data.userendtime > this.s_service.fetchdata[i].userstarttime))) {
          console.log("This slot is not avalible one " + this.s_service.fetchdata[i].slot);
          this.s_service.fetchdata[i].slot
          return true;

        }
        else if (this.data.userstarttime < this.s_service.fetchdata[i].userstarttime && this.data.userendtime > this.s_service.fetchdata[i].userendtime) {
          console.log("This slot is not avalible " + this.s_service.fetchdata[i].slot)
          return true;
        }
      }
    }
  }
  // noslot;

  /***********************************************************************
                             submisson
  ***********************************************************************/

  submit() {
    this.uid = this.af.auth.currentUser.uid;

    if (this.checkby()) {
      console.log("already reserved");
      this.noalert = true;
      this.alert = false;
    }
    else {
      console.log("slots available ");
      this.data.UserEmail = this._service.useremail;
      this.db.list("/bookings/" + this.af.auth.currentUser.uid + "/").push(this.data);
      this.router.navigate(['/location']);
      this.alert = true;
      this.noalert = false;
    }

  }

  /***********************************************************************
                             small functions
  ***********************************************************************/

  logout() {
    this._service.logout();
    // window.location.reload();
    this.router.navigate(['/login']);
  }
  cleararray() {

    this.reset();
    this.alert = false;
    this.noalert = false;
  }
  reset() {
    this.data.userdate = "";
    this.data.userstarttime = "";
    this.data.duration = "";
    // this.rese = [];
  }
  close() {
    this.router.navigate(['/location'])
  }



}