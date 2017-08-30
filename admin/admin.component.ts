import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { DataService } from "../services/data.service";
import { FetchbookingService } from "../services/fetchbooking.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  form: FormGroup
  constructor(public fb: FormBuilder, public db: AngularFireDatabase, public _service: DataService, public fetchbooking: FetchbookingService, public router: Router) {
    this.getLocation();
    // this.add();
  }

  //   locationdetail = this.fetchbooking.array;
  // add(){
  //   console.log(this.locationdetail)
  // }
  locationkey = [];
  getLocation() {
    this.locations = this.db.list('/locations', { preserveSnapshot: true });
    this.locations
      .subscribe(snapshots => {
        this.locationkey = [];
        this.array = [];
        snapshots.forEach(snapshot => {
          console.log(snapshot.key)
          console.log(snapshot.val())
          this.locationkey.push(snapshot.key)
          this.array.push(snapshot.val());
        });
      })
  }
  remove(key) {
    this.db.list("locations/").remove(this.locationkey[key]);
  }
  locationName;
  totalSlots;
  ngOnInit() {
    this.form = this.fb.group({
      locationName: ['', Validators.required],
      totalSlots: ['', Validators.required],
      slots: ['', Validators.required]
    });
  }
  addLocations() {
    let u = this.form.value
    this.slots = [];
    for (var a = 0; a < u.totalSlots; a++) {
      this.slots.push(a + 1);
    }
    u.slots = this.slots;
    console.log(this.form.value);
    this.db.list('/locations').push(this.form.value);
  }


  locations: FirebaseListObservable<any[]>
  array = [];
  key = [];
  slots = [];
  numOfSLots;

  logout() {
    this._service.logout();
    window.location.reload();
    this.router.navigate(['/login']);
  }
}
