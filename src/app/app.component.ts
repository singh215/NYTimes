import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  links = ['home', 'search', 'login'];
  activeLink = this.links[0];
  title = 'nyApp';

  constructor(private route:Router){}

  routeMethod(link) {
    const routeLink = '/'+ link;
    this.route.navigate([routeLink]);
  }
}
