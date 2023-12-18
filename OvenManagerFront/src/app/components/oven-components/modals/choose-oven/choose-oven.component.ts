import { Component, Input, OnInit } from '@angular/core';
import { Oven } from 'src/app/models/oven/oven';
import { OvenRequest } from 'src/app/models/oven/reservation';

@Component({
  selector: 'app-choose-oven',
  templateUrl: './choose-oven.component.html',
  styleUrls: ['./choose-oven.component.scss'],
})
export class ChooseOvenComponent implements OnInit {

  // @Input() showModal : boolean = false;
  @Input() chooseOvenModal : {show : boolean} = {show : false};

  // @Input() startDate : Date;
  // @Input() startTime : string;
  // @Input() duration : number;

  // @Input() temperature : number;

  @Input() request : OvenRequest = new OvenRequest();

  @Input() ovens : Oven[] = [];

  // ovenList : {oven : Oven, enabled : boolean}[] = [];

  selectedOven : Oven = new Oven();

  ovenList : Oven[] = [];

  label : string = "(toutes)";

  constructor() { }

  ngOnInit() {
      
      this.enabledOven();
  }

  setOpen(){
    this.chooseOvenModal.show = true;
    this.enabledOven();
  }

  onWillDismiss(){
    console.log("onWillDismiss")
    this.chooseOvenModal.show = false;
  }

  onClose(){
    console.log("onClose")
    this.chooseOvenModal.show = false;
  }


  selectOven(oven : Oven){
    // this.selectedOven.selected = false;
    
    oven.selected = true;
    this.selectedOven = oven;
    // this.chooseOvenModal.show = false
  }

  chooseOven(){
    this.request.oven = this.selectedOven;
    this.chooseOvenModal.show = false;
  }

  canChooseOven(){

    return this.selectedOven != undefined;
  }

  enabledOven(){

    this.ovenList = [];

    if (this.request.startDate == undefined || this.request.startTime == undefined || this.request.duration == undefined){

      this.ovenList = this.ovens;
      this.label = "(toutes)";
      return;
    }

    
    let startDate = new Date(this.request.startDate);

    startDate.setHours(+this.request.startTime.split(":")[0])
    startDate.setMinutes(+this.request.startTime.split(":")[1]);

    let endDate = new Date(startDate.getTime() + this.request.duration * 60 * 1000);

    for (let oven of this.ovens){

      // if (this.request.temperature <= oven.maxTemperature && this.request.temperature >= oven.minTemperature) enabledOvens.push(oven);

      let valid = true;

      for (let reservation of oven.reservations!){

        if (startDate > reservation.endTime! || endDate < reservation.startTime!){
          continue;
        }
        else {
          valid = false;
          break;
        }
      }
      if (valid) this.ovenList.push(oven);
    }
    this.label = "("+this.ovenList.length+"/"+this.ovens.length+")";

  }
}
