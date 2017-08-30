import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Router, CanActivate } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DataService } from "../services/data.service";
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user: Observable<firebase.User>;
  authstate;
  constructor(public af: AngularFireAuth, public router: Router, public _service: DataService) {
  
  }
  email;
  password;
  ngOnInit() {

  }

  login() {
    this._service.login(this.email, this.password)
  }

}
