import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }      from 'rxjs';
import { throwError }      from 'rxjs';  // Updated for Angular 6/RxJS 6
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler }    from '@angular/core';

@Injectable()
export class WeatherService {
    constructor(private http: Http) { }

    // Get weather from Yahoo.
    getWeather(city):Observable<string[]> {
       // This is the way the string needs to be to call Yahoo's weather api.
       let url = 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast ' 
       + 'where woeid in (select woeid from geo.places(1) where text="' 
       + city + '") and u="c" &format=json';
   
        return this.http.get(url)
        .pipe(map(this.extractData))
        .pipe(catchError(this.handleError));
   
    }

    // Return good data to calling function.
    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    // Handle error!
    private handleError(error: any) {
        return throwError(error);  
    }  
}
