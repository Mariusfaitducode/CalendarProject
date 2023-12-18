import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
// import { LeftPaneComponent } from '../components/left-pane/left-pane.component';
// import { RightPaneComponent } from '../components/right-pane/right-pane.component';
// import { OvenSelectorComponent } from '../components/left-pane/oven-selector/oven-selector.component';
// import { OvenCalendarComponent } from '../components/right-pane/oven-calendar/oven-calendar.component';


import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgCalendarModule } from '../ionic-calendar/calendar.module';
// import { DaySelectComponent } from '../components/modals/day-select/day-select.component';
// import { OvenSelectComponent } from '../components/modals/oven-select/oven-select.component';
// import { AddOvenComponent } from '../components/modals/add-oven/add-oven.component';
// import { OvenRequestComponent } from '../components/left-pane/oven-request/oven-request.component';
// import { UserLoginComponent } from '../components/user-login/user-login.component';


import { MsalGuard, MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MsalConfig, MsalGuardConfig, MsalInterceptorConfig } from 'src/environments/environment.msal';

// import { HttpClientModule } from '@angular/common/http';
// import { OvenGestionComponent } from '../components/left-pane/oven-gestion/oven-gestion.component';
// import { EventSelectComponent } from '../components/modals/event-select/event-select.component';

// export function initializeMsal(msalService: MsalService) {
//   return () => msalService.initialize(); // Fonction d'initialisation de MSAL
// }

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgCalendarModule,
    


  ],
  declarations: [
  ],
})
export class HomePageModule {}
