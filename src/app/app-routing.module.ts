import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { WeatherComponent } from './pages/weather/weather.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'weather', component: WeatherComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
