import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MsalGuard, MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MsalConfig, MsalGuardConfig, MsalInterceptorConfig } from 'src/environments/environment.msal';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot(new PublicClientApplication(MsalConfig), MsalGuardConfig, MsalInterceptorConfig),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
