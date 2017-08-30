import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LocationComponent } from "../location/location.component";

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent implements OnInit {
  form: FormGroup;
  constructor(public loc: LocationComponent, public af: AngularFireAuth, public db: AngularFireDatabase, public fb: FormBuilder) { }
  ar = this.loc.array;
  isTrue = false;

  ngOnInit() {

  }

  butvalue(val) {
    this.loc.data.slot = val;
  }

}
