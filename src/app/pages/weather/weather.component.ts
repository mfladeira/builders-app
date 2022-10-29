import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { WeatherService } from 'src/app/services/weather.service';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { take } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  latitude = 0;
  longitude = 0;
  temperature = 0;
  locationName = '';
  currentWeather = '';
  country = '';
  locationFormControl = new FormControl('');
  constructor(
    private router: Router,
    private auth: AuthService,
    private weather: WeatherService,
    private readonly geolocation: GeolocationService
  ) { }

  ngOnInit(): void {
    this.auth.isLoggedIn() ? this.router.navigateByUrl('/weather') : this.router.navigateByUrl('/');
    this.geolocation.pipe(take(1)).subscribe(geolocation => this.setWeather(geolocation.coords.latitude, geolocation.coords.longitude));
  }

  capitalizeWord(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  setWeather(latitude: number, longitude: number) {
    this.weather.getCurrentWeather(latitude, longitude).subscribe((response: any) => {
      this.latitude = latitude;
      this.longitude = longitude;
      this.temperature = response.main.temp;
      this.locationName = response.name;
      this.currentWeather = response.weather[0].description;
      this.country = response.sys.country;
    });
  }

  getCoordinatesByLocationName() {
    if (this.locationFormControl.value) {
      this.weather.getCoordinatesByLocationName(this.locationFormControl.value).subscribe((response: any) => {
        this.setWeather(response[0].lat, response[0].lon);
      })
    }
  }

  logout() {
    this.auth.loggout();
    this.router.navigateByUrl('/');
  }
}
