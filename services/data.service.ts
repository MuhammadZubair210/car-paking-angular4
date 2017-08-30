import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router, Route } from '@angular/router';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';


@Injectable()
export class DataService {
  authstate;
  isSignIn: Observable<boolean>;
  user: Observable<firebase.User>;
  useremail;
  varauth;
  constructor(public af: AngularFireAuth, public db: AngularFireDatabase, public router: Router) {
    this.varauth = this.af.authState;
    this.af.authState.subscribe((auth) => {
      if (auth) {
        this.authstate = auth.uid;
        this.useremail = auth.email;
        console.log(auth.email)
        console.log(this.authstate);
        console.log("Auth Changes");
        if (auth.email != 'admin@gmail.com') {
          this.router.navigate(['/location']);
        }
        else {
          this.router.navigate(['/admin'])
        }
      }
      else {
        console.log("user not logged in")
        this.router.navigate(["/login"])
      }
    })
  }

  email;
  password;
  type;
  uuid;

  userprofile: FirebaseListObservable<any[]>;

  showuser() {
    this.uuid = this.af.auth.currentUser.uid;

    this.userprofile = this.db.list('/users/' + this.uuid, { preserveSnapshot: true });
    this.userprofile
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          if (snapshot.val().type == 'user') {
            this.router.navigate(['/location']);
          }
          else if (snapshot.val().type == 'admin') {
            this.router.navigate(['/admin']);
          }
          else {
            alert("show correct email or password");
            this.router.navigate(['/signup']);
          }
          console.log(snapshot.key);
          console.log(snapshot.val().type);
        });
      })
  }




  register(name: string, email: string, password: string, type: string) {
    console.log("successfull");
    console.log(name, email, password, type);
    this.af.auth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!');
        this.uuid = this.af.auth.currentUser.uid;
        let formdata = { name, email, password, type };
        this.db.list("/users/" + this.uuid).push(formdata);                     //changes
      })
      .catch(err => {
        console.log('Something went wrong:');

      })
  }

  login(email, password) {
    this.af.auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log("success");
        this.showuser();
      })
      .catch(err => {
        console.log("something wrong", err);
        this.router.navigate([""]);
      })
  }
  logout() {
    this.af.auth.signOut();
  }

  getCurrentUserId(): Observable<any> {

    return this.af.authState.map(authState => {
      return authState.uid;
    })
  }

  userRegistration: FirebaseListObservable<any[]>;
  userProfile: FirebaseListObservable<any[]>;
  getUserProfile(): Observable<any> {
    console.log("getUserProfile");
    console.log(this.af.auth.currentUser.uid);
    this.userRegistration = this.db.list('/userRegistration/' + this.af.auth.currentUser.uid, { preserveSnapshot: true });
    return this.userRegistration.map((data) => {
      // this.userProfile = data.val().name;
      console.log(this.userProfile);
      return this.userProfile;
    })

  }

}