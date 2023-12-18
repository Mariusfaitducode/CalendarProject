import { Component, OnInit, Input } from '@angular/core';
import { Color } from 'src/app/models/oven/color';
import { Oven } from 'src/app/models/oven/oven';

@Component({
  selector: 'app-event-select',
  templateUrl: './event-select.component.html',
  styleUrls: ['./event-select.component.scss'],
})
export class EventSelectComponent {

  @Input() eventSelectModal : any = {
    show : false,
    date : new Date(),
  };

  @Input() event : any = {}

  @Input() admin : any = {};

  modify : boolean = false;

  constructor() { } 

  // ovenSelectModal : {show : boolean, oven : Oven} = {
  //   show : false,
  //   oven : new Oven(),
  // };

  // ngOnInit() {
    
  // }

  onWillDismiss(){
    console.log("onWillDismiss")
    this.eventSelectModal.show = false;
  }

  onClose(){
    console.log("onClose")
    this.eventSelectModal.show = false;
  }

  formatDateToCustomString() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    let date = this.eventSelectModal.date;

    const day = daysOfWeek[date!.getDay()];
    const dayOfMonth = date!.getDate();
    const month = months[date!.getMonth()];

  
    return `${day}, ${dayOfMonth} ${month}`;
   
  }

  contrastColor(color : string){
    return Color.getCorrectTextColor(color)
  }


  openOvenModal(){
    // this.eventSelectModal.show = false;
    // this.eventSelectModal.openOvenModal.show = true;
  }

  modifyEvent(){
    this.modify = !this.modify;
  }

  sendModification(){
    this.modify = false;
  }
}
