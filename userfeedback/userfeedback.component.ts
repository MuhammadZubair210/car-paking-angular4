import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackserviceService } from '../services/feedbackservice.service';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { DataService } from "../services/data.service";
import { AngularFireAuth } from "angularfire2/auth";
import { FetchbookingService } from "../services/fetchbooking.service";
import { Observable } from "rxjs/Rx";
import { Router } from "@angular/router";


@Component({
  selector: 'app-userfeedback',
  templateUrl: './userfeedback.component.html',
  styleUrls: ['./userfeedback.component.css']
})


export class UserfeedbackComponent implements OnInit {
  uid;

  constructor(public fb: FormBuilder,
    public af: AngularFireAuth,
    private chatService: FeedbackserviceService,
    private _service: DataService,
    private db: AngularFireDatabase,
    private s_service: FetchbookingService,
    public router: Router
  ) {
    // this.s_service.allusers();
    // this.chatService.fetchbooking();
    this.profiles = this.db.list("feedback/" + this.af.auth.currentUser.uid);

  }
  userprofile;
  ngOnInit() {
  }
  // name = this.chatService.fetchbooking();
  message;
  items: FirebaseListObservable<any[]>;
  profiles: FirebaseListObservable<any[]>
  fetchkey = [];
  keys = [];
  fetchstarttime = [];
  fetchslot = [];
  key;
  fetchdata = [];
  dab = []
  send() {
    this.uid = this.af.auth.currentUser.uid;
    this.items = this.db.list('/users/' + this.uid, { preserveSnapshot: true });
    this.items
      .subscribe(snapshots => {
        this.fetchslot = [];
        snapshots.forEach(snapshot => {
          this.key = (snapshot.val().name)
          console.log(snapshot.val().name)
        })
      })
    this.uid = this.af.auth.currentUser.uid;
    let data = { name: this.key, messagess: this.message }
    this.db.list("/feedback/" + this.uid + "/").push(data);
  }

  logout() {
    this._service.logout();
    window.location.reload();
    this.router.navigate(['/login']);
  }

}
