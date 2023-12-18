import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CalendarMode, IEvent } from '../../ionic-calendar/calendar.interface';

import { CalendarComponent } from '../../ionic-calendar/calendar';
import { OvenService } from 'src/app/services/oven.service';
import { Color } from 'src/app/models/oven/color';
import { ClassifiedOven, Oven } from 'src/app/models/oven/oven';
import { OvenRequest, Reservation } from 'src/app/models/oven/reservation';
import { CompleteFilter } from 'src/app/models/oven/filter';



@Component({
  selector: 'app-oven-calendar',
  templateUrl: './oven-calendar.component.html',
  styleUrls: ['./oven-calendar.component.scss'],
})
export class OvenCalendarComponent {

  @ViewChild(CalendarComponent, { static: false }) myCalendar!: CalendarComponent;


  viewTitle: string = "";

  @Input() calendar = {
    mode: 'week' as CalendarMode,
    currentDate: new Date(),
  };

  // @Input() planning : any[] = [];
  @Input() filters : {ovenFilters : Oven[], customizedFilters : CompleteFilter[]} = {ovenFilters : [], customizedFilters : []};

  @Input() reservations : any[] = [];

  @Input() request : OvenRequest = new OvenRequest();
  @Input() leftPaneMode : string = "gestion";

  @Input() user : any = {};


  eventSelectModal : any = {
    show : false,
    date : new Date(),
    events : []
  };

  constructor(private service : OvenService) { }

  ngOnInit() {
    // console.log("ngOnInit")

    console.log(this.reservations)

    // this.events = this.service.generateRandomEvents();
  }


  onViewTitleChanged(title: string) {
    // console.log(title)
    this.viewTitle = title;
  }

  onEventSelected(event: any, click : any = null) {

    if (click != null) click.stopPropagation();

    this.eventSelectModal.show = true;
    this.eventSelectModal.event = event;

    if (event.oven.entity.value === this.user.entity){
      this.eventSelectModal.admin = true;
    }
    else {
      this.eventSelectModal.admin = false;
    }

  }

  onDateClicked(date: Date) {
    console.log("click on day : open day-select")
    console.log(date)

    this.request.startDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    // this.request.startTime = date.getHours() + ":00";

    // let requestString = "request";
    // this.leftPaneMode = requestString;

    this.service.newRequestDate.next(this.request);

  }



  previous() {
    // console.log("NEW SLIDE PREVIOUS")
    this.myCalendar.slidePrev();
    // this.myCalendar.loadEvents();

    //this.currentMonth = moment(this.myCalendar.currentDate).format('MMMM YYYY');

  }

  next() {
    // console.log("NEW SLIDE NEXT")
    this.myCalendar.slideNext();
    // this.myCalendar.update();
    //this.currentMonth = moment(this.myCalendar.currentDate).format('MMMM YYYY');
  }

  eventInFilter(event : Reservation){

    // console.log("Filter reservation")
    // console.log(this.filters.customizedFilters)

    if (event.validated.value !== "valid") return false;

    // Aucun filtre
    if (this.filters.ovenFilters.length === 0 && this.filters.customizedFilters.length === 0) return true;

    let noFilter = true;

    // Customized filters
    for (let filter of this.filters.customizedFilters){
      
      if (filter.active && filter.list.find((resa : Reservation) => resa === event) ) return true;
      if (filter.active) noFilter = false;
    }

    if (this.filters.ovenFilters.length === 0 && noFilter) return true;
    

    return this.filters.ovenFilters.find((oven : any) => oven === event.oven) 
  }

  contrastColor(color : string){
    return Color.getCorrectTextColor(color)
  }

  // removeFilter(filter : any){
  //   filter.selected = false;
  //   this.filters.splice(this.filters.indexOf(filter), 1)
  // }

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setDate(current.getDate() - 1);
    return date < current;
  };


  // Filters Gestions

  addFilter(){

  }
}
