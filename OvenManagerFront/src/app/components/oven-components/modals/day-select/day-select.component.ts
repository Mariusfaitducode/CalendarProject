import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day-select',
  templateUrl: './day-select.component.html',
  styleUrls: ['./day-select.component.scss'],
})
export class DaySelectComponent{

  @Input() daySelectModal : any = {
    show : false,
    date : new Date(),
    events : []
  };

  constructor() { } 

  // ngOnInit() {
    
  // }

  onWillDismiss(){
    console.log("onWillDismiss")
    this.daySelectModal.show = false;
  }

  onClose(){
    console.log("onClose")
    this.daySelectModal.show = false;
  }

  formatDateToCustomString() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    let date = this.daySelectModal.date;

    const day = daysOfWeek[date!.getDay()];
    const dayOfMonth = date!.getDate();
    const month = months[date!.getMonth()];

  
    return `${day}, ${dayOfMonth} ${month}`;
   
  }
}
