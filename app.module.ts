import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MaterialModule, MdNativeDateModule, MdDatepickerModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { DataService } from "./services/data.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ParkingComponent } from './parking/parking.component';
import { LocationComponent } from './location/location.component';
import { AdminComponent } from './admin/admin.component';
import { FetchbookingService } from "./services/fetchbooking.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AllusersComponent } from './allusers/allusers.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbackserviceService } from "./services/feedbackservice.service";
import { AlluserbookingsComponent } from './alluserbookings/alluserbookings.component';
import { AuthguardGuard } from "./services/authguard.guard";
import { UserfeedbackComponent } from './userfeedback/userfeedback.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// const config = {
//   apiKey: "AIzaSyDtpMy8A7fQ27zGBtiuKpKTRbo7cKf674o",
//   authDomain: "chance-fff20.firebaseapp.com",
//   databaseURL: "https://chance-fff20.firebaseio.com",
//   projectId: "chance-fff20",
//   storageBucket: "chance-fff20.appspot.com",
//   messagingSenderId: "114554906134"
// };
const config = {
    apiKey: "AIzaSyDe3KaUHy_R8Bxbd1mYY_7ZnBALBF-kj2w",
    authDomain: "car-parking-app-e9fa6.firebaseapp.com",
    databaseURL: "https://car-parking-app-e9fa6.firebaseio.com",
    projectId: "car-parking-app-e9fa6",
    storageBucket: "car-parking-app-e9fa6.appspot.com",
    messagingSenderId: "326050994556"
}
const routes: Routes = [
  { path: "", component: SignupComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "users", component: UserComponent },
  { path: "parking", component: ParkingComponent },
  { path: "location", component: LocationComponent },
  { path: "admin", component: AdminComponent },
  { path: "allbookings", component: AlluserbookingsComponent },
  { path: "allusers", component: AllusersComponent },
  { path: "feedback", component: FeedbackComponent },
  { path: "userfeedback", component: UserfeedbackComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    UserComponent,
    ParkingComponent,
    LocationComponent,
    AdminComponent,
    AllusersComponent,
    FeedbackComponent,
    AlluserbookingsComponent,
    UserfeedbackComponent
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    CdkTableModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [DataService, FetchbookingService, FeedbackserviceService, AuthguardGuard, LocationComponent,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
