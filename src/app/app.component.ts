import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template:   
      `<h1>Weather Forecast</h1>
    <nav>
    <a routerLink="/home" routerLinkActive="active">Home</a> 
    </nav>
    <!-- The child view is displayed here where the router exists -->
    <router-outlet></router-outlet>

    <footer>
    <!-- Yahoo requests that we include a note - powered by yahoo when using their service -->
    <div>
    <a href="https://www.yahoo.com/?ilc=401" target="_blank"> 
    <img class="brand" src="https://poweredby.yahoo.com/purple.png" width="134" height="29"/> 
    </a>
    </div>
    </footer>
    
    
    
    `

})
export class AppComponent { 
  celsiusSymbol = '\u2103'

}
