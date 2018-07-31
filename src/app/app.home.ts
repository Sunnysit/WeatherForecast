import { Component }     from '@angular/core';
import { WeatherService} from './app.weatherservice';

@Component({
    templateUrl:'./home.html',
    providers: [WeatherService],
    styleUrls: ['./app.component.css']
})
export class HomeComponent { 
    // Define some properties at the class level.
    cityArray = ['Vancouver', 'Seattle','Beijing','London'];
    forecastArray:Array<any> = new Array();
    celsiusSymbol = '\u2103';
    fahrenheitSymbol = '\u2109';
    selectSymbol = this.celsiusSymbol;
    _weatherService: WeatherService;
    searchCity: String;
    todayDate : number =Date.now();
    outPutErrorMessage : String;

    // Since we are using a provider above we can receive 
    // an instance of the Weather Service through an instructor.
    constructor(weatherService: WeatherService) {
        // Store reference to weather service. 'this' points to the class level
        // declaration.
        this._weatherService = weatherService;

        // Loop through cities and call weather service for each.
        for(var i=0; i<this.cityArray.length; i++) {
            let forecastObject = this.getWeather(this.cityArray[i]);    
        }
      
    
    }
     
     searchWeather(inputCity)
     {
         
        if(inputCity!=""&&inputCity.length>=3){

            this._weatherService.getWeather(inputCity).subscribe(data =>{

                this.cityArray=[];
                this.cityArray.push(inputCity);
                this.forecastArray=[];
                 // Get current temperature. 
                 let currentCondition = data["query"].results.channel.item.condition;
         
                 // You can show JSON objects in the console if you convert them to strings.
                 //  \n means new line. 
                 console.log("***\n Current Condition:\n" + JSON.stringify(currentCondition));
    
                 // Show all content.
                 let myresult =JSON.stringify(data["query"]);
                 console.log(JSON.parse(myresult));
    
                 // Store data in the array the application can use it.
                 this.forecastArray.push(currentCondition);         
                 this.outPutErrorMessage="";
             }, error => {
                alert(error)
            });

        }
        else{
            this.outPutErrorMessage = "Please input valid city name.";
        }
     

     }

     resetCityArray(){
        this.searchCity = "";
        if(this.cityArray.length!=4)
        {
            this.forecastArray=[];
            this.cityArray = ['Vancouver', 'Seattle','Beijing','London'];
            for(var i=0; i<this.cityArray.length; i++) {
               let forecastObject = this.getWeather(this.cityArray[i]);    
           }
        }
        

     }

     convertSymbol(){
         switch(this.selectSymbol){
             default:
             case "\u2103": 
             this.forecastArray.forEach(element => {
                element.temp = element.temp*1.8+32;
                    });
            this.selectSymbol="\u2109";
             
             break;
             case "\u2109": 
             this.forecastArray.forEach(element => {
                element.temp = (element.temp-32)*5/9;
            });
            this.selectSymbol="\u2103";
             
             break;
         }

     }

     getWeather(city) {
        this._weatherService.getWeather(city)
            
            // Subscribe to changes in the observable object
            // that is returned by getRemoteData.
            .subscribe(
                
            // 1. Handle successful data response.
            data => {
                console.log(city);

                // Get current temperature. 
                let currentCondition = data["query"].results.channel.item.condition;
     
                // You can show JSON objects in the console if you convert them to strings.
                //  \n means new line. 
                console.log("***\n Current Condition:\n" + JSON.stringify(currentCondition));

                // Show all content.
                let myresult =JSON.stringify(data["query"]);
                console.log(JSON.parse(myresult));

                // Store data in the array the application can use it.
                this.forecastArray.push(currentCondition);         
                
            },
            // 2. Handle error.
            error => {
                alert(error)
            }
        );
            
            
    }
}
