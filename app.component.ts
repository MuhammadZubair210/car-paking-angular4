import { Component } from '@angular/core';
import { DataService } from './services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public service: DataService) {
    this.checkauth();
  }

  isTrue = false;

  checkauth() {
    if (this.service.authstate) {
      this.isTrue = true;
    }
  }

}
