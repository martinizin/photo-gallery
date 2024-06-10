import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen'
import { Observable, Subscribable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
splash: any;
isLoggedIn: Observable<unknown> | Subscribable<unknown> | Promise<unknown> | undefined;
  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    
  
    SplashScreen.show();
  }
}