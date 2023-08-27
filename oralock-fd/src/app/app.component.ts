import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from "src/enviroments/enviroment";
import { routeTransitionAnimations  } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    routeTransitionAnimations 
  ]
})

export class AppComponent {

  constructor(public translate: TranslateService) {
    translate.addLangs(['es','va','en']);
    translate.setDefaultLang(environment.defaultLang);
    this.translate.use(environment.defaultLang);    
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && 
      outlet.activatedRouteData && 
      outlet.activatedRouteData['animation'];
   }

}