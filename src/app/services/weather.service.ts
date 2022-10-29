import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  API_KEY = '9de4dd43e975ca54e9bbcef9487fe540';
  constructor(
    private http: HttpClient
  ) { }

  getCurrentWeather(lat: number, long: number) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${this.API_KEY}&lang=pt_br&units=metric`);
  }

  getCoordinatesByLocationName(location: string) {
    return this.http.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${this.API_KEY}`);
  }
}
