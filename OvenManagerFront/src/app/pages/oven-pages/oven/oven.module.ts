import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OvenPageRoutingModule } from './oven-routing.module';

import { OvenPage } from './oven.page';
import { LeftPaneComponent } from 'src/app/components/oven-components/left-pane/left-pane.component';
import { RightPaneComponent } from 'src/app/components/oven-components/right-pane/right-pane.component';
import { OvenSelectorComponent } from 'src/app/components/oven-components/left-pane/oven-selector/oven-selector.component';
import { OvenCalendarComponent } from 'src/app/components/oven-components/right-pane/oven-calendar/oven-calendar.component';
import { DaySelectComponent } from 'src/app/components/oven-components/modals/day-select/day-select.component';
import { OvenSelectComponent } from 'src/app/components/oven-components/modals/oven-select/oven-select.component';
import { AddOvenComponent } from 'src/app/components/oven-components/modals/add-oven/add-oven.component';
import { OvenRequestComponent } from 'src/app/components/oven-components/left-pane/oven-request/oven-request.component';
import { OvenGestionComponent } from 'src/app/components/oven-components/left-pane/oven-gestion/oven-gestion.component';
import { EventSelectComponent } from 'src/app/components/oven-components/modals/event-select/event-select.component';

import { NgCalendarModule } from '../../../components/oven-components/ionic-calendar';
import { AddFilterComponent } from 'src/app/components/oven-components/modals/add-filter/add-filter.component';
import { GestionRequestsComponent } from 'src/app/components/oven-components/left-pane/oven-gestion/gestion-requests/gestion-requests.component';
import { GestionPlanningComponent } from 'src/app/components/oven-components/left-pane/oven-gestion/gestion-planning/gestion-planning.component';
import { GestionTestLibraryComponent } from 'src/app/components/oven-components/left-pane/oven-gestion/gestion-test-library/gestion-test-library.component';
import { CalendarService } from 'src/app/components/oven-components/ionic-calendar/calendar.service';
import { ChooseOvenComponent } from 'src/app/components/oven-components/modals/choose-oven/choose-oven.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OvenPageRoutingModule,
    NgCalendarModule,
  ],
  declarations: [OvenPage, 
    LeftPaneComponent, 
    RightPaneComponent,
    OvenSelectorComponent,
    OvenCalendarComponent,
    DaySelectComponent,
    OvenSelectComponent,
    AddOvenComponent,
    OvenRequestComponent,
    OvenGestionComponent,
    EventSelectComponent,
    AddFilterComponent,
    GestionRequestsComponent,
    GestionPlanningComponent,
    GestionTestLibraryComponent,
    ChooseOvenComponent
  ],
})
export class OvenPageModule {}
