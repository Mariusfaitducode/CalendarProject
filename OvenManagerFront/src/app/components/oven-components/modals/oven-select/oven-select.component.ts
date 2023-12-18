import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Oven } from 'src/app/models/oven/oven';
import { OvenRequest } from 'src/app/models/oven/reservation';

@Component({
  selector: 'app-oven-select',
  templateUrl: './oven-select.component.html',
  styleUrls: ['./oven-select.component.scss'],
})
export class OvenSelectComponent {

  @Input() ovenSelectModal : {show : boolean} = {show : false};

  @Input() admin : boolean = false;

  @Input() oven : Oven = new Oven();

  @Input() ovenFilters : any[] = [];

  @Output() requestOven = new EventEmitter<Oven>();

  // @Input() request : OvenRequest;
  // @Input() leftPaneMode : string;

  modify : boolean = false;

  constructor() { } 

  // ngOnInit() {
    
  // }

  onWillDismiss(){
    // console.log("onWillDismiss")
    this.ovenSelectModal.show = false;
  }

  onClose(){
    // console.log("onClose")
    this.ovenSelectModal.show = false;
  }

  ovenSelectFilter(){

    this.ovenFilters.push(this.oven);
    this.onClose();
  }


  askRequestOven(){

    console.log("requestOven")

    // this.onClose();
    this.ovenSelectModal.show = false;
    
    setTimeout(() => {
      this.requestOven.emit(this.oven);

    }, 100);

    
  }


  modifyOven(){
    this.modify = !this.modify;
  }

  sendModification(){
    
  }

}
