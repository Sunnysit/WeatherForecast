import { Component }                    from '@angular/core';
import { ActivatedRoute, Params }       from '@angular/router';
import { WeatherService}                from './app.weatherservice';

@Component({
 templateUrl:'./detail.html',
 providers: [WeatherService],
 styleUrls: ['./app.component.css']      
})
export class ForecastDetail {
     city:string;
     forecastArray:  Array<any>;
     _weatherService:WeatherService;
     celsiusSymbol = '\u2103';
     fahrenheitSymbol = '\u2109';
     selectSymbol = this.celsiusSymbol;
    // The constructor sets up the class.
    constructor(private route: ActivatedRoute, weatherService:WeatherService) {
        this._weatherService = weatherService;
    }

    // ngOnInit() is called after the class object is set up (constructed).    
    ngOnInit() {
        // At this point, the class is able to handle the parameters passed to it.
        this.route.params.forEach((params: Params) => {
            this.city = params['city'];
            console.log("This city paramter is: " + this.city);
            this.getWeather( this.city)
        });
    }

     getWeather(city) {
         console.log("Inside getWeather(). Parameter = " + city);
        this._weatherService.getWeather(city)
            // Subscribe to changes in the observable object
            // that is returned by getRemoteData.
            .subscribe(
        
            // 1. Handle successful data response.
            data => {
                this.forecastArray = data["query"].results.channel.item.forecast;             
            },
            // 2. Handle error.
            error => {
                alert(error)
            }
            ,
            ()=>{
                console.log(this.forecastArray);
            }
        
        );
    }    


    
    convertSymbol(){
        switch(this.selectSymbol){
            default:
            case "\u2103": 
            this.forecastArray.forEach(element => {
               element.low = element.low*1.8+32;
               element.high = element.high*1.8+32;
                   });
           this.selectSymbol="\u2109";
            
            break;
            case "\u2109": 
            this.forecastArray.forEach(element => {
               element.low = (element.low-32)*5/9;
               element.high = (element.high-32)*5/9;
           });
           this.selectSymbol="\u2103";
            
            break;
        }

    }
}
