import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { DataService } from "../services/data.service";
import { AngularFireAuth } from "angularfire2/auth";
import { FetchbookingService } from "../services/fetchbooking.service";
import { Router } from "@angular/router";
import { FeedbackserviceService } from "../services/feedbackservice.service";

@Component({
  selector: 'app-alluserbookings',
  templateUrl: './alluserbookings.component.html',
  styleUrls: ['./alluserbookings.component.css']
})
export class AlluserbookingsComponent implements OnInit {

  constructor(public db: AngularFireDatabase, public _service: DataService, public af: AngularFireAuth, public s_service: FetchbookingService, public router: Router, public _feedback: FeedbackserviceService, public fetchbooking: FetchbookingService) {
    this.fetchbooking.fetchbooking();
    this.bookingdetail();
    console.log(this.bookingdetails);
    this.show();
  }
  ngOnInit() {

  }

  bookingdetails = [];
  items: FirebaseListObservable<any[]>;
  key = this.fetchbooking.key;
  bookingdetail() {
    this.bookingdetails = this.fetchbooking.show;
  }
  show() {
    console.log(this.fetchbooking.dab)
  }

  logout() {
    this._service.logout();
    window.location.reload();
    this.router.navigate(['/login']);
  }

}
