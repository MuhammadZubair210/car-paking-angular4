
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackserviceService } from '../services/feedbackservice.service';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { DataService } from "../services/data.service";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})


export class FeedbackComponent implements OnInit {
  currentPersonIndex: any;
  chatForm: FormGroup;
  showChat: FirebaseListObservable<any>;
  uid;
  sendfeedback: FirebaseListObservable<any>

  constructor(public fb: FormBuilder,
    public af: AngularFireAuth,
    private feedbackser: FeedbackserviceService,
    private usersAuthService: DataService,
    private db: AngularFireDatabase,
    public router: Router
  ) {
    this.findd(this);
    // this.find(this.keys);
  }
  keys;
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.chatForm = this.fb.group({
      message: ['', Validators.required]
    })
  }
  items: FirebaseListObservable<any[]>
  fetchslot = [];
  key = [];
  allusersprofile = [];
  alluserskeys = [];
  profiles: FirebaseListObservable<any[]>;

  /*****************************************************************************
                      getting users from firebase node
   *****************************************************************************/
  // find(key) {
  //   this.items = this.db.list('/users/', { preserveSnapshot: true });
  //   this.items
  //     .subscribe(snapshots => {
  //       this.fetchslot = [];
  //       snapshots.forEach(snapshot => {
  //         console.log(snapshot.key)
  //         console.log(snapshot.val())
          // this.key.push(snapshot.key)
          // snapshot.forEach(data => {
          //   this.alluserskeys.push(data.key)
          //   console.log(data.key)
          //   console.log(data.val().name)
          //   this.allusersprofile.push(data.val());
          // })
  //       })
  //     })
  // }

  /*****************************************************************************
                    getting feedbacks from firebase node
 *****************************************************************************/

  allkeys = [];
  findd(key) {
    this.items = this.db.list('/users/', { preserveSnapshot: true });
    this.items
      .subscribe(snapshots => {
        this.allusersprofile = [];
        this.fetchslot = [];
        snapshots.forEach(snapshot => {
          console.log(snapshot.key)
          console.log(snapshot.val())
          this.key.push(snapshot.key)
          snapshot.forEach(data => {
            this.alluserskeys.push(data.key)
            console.log(data.key)
            console.log(data.val().name)
            this.allusersprofile.push(data.val());
          })
        })
      })
    this.currentPersonIndex = key;
    this.profiles = this.db.list("feedback/" + this.key[key])
    console.log(this.key[key]);
  }
  adminreply;
  adkey;

  /*****************************************************************************
                     admin reply function
   *****************************************************************************/
  reply() {
    this.items = this.db.list('/users/', { preserveSnapshot: true });
    this.items
      .subscribe(snapshots => {
        this.fetchslot = [];
        snapshots.forEach(snapshot => {
          console.log(snapshot.key)
          console.log(snapshot.val())
          this.key.push(snapshot.key)
        })
      })

    this.feedbackser.sendReply(this.key[this.currentPersonIndex], { name: "admin", message: this.adminreply });
  }

  logout() {
    this.usersAuthService.logout();
    window.location.reload();
    this.router.navigate(['/login']);
  }
}