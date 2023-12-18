import { Component, OnInit, Input } from '@angular/core';
import { OvenService } from 'src/app/services/oven.service';

@Component({
  selector: 'app-add-oven',
  templateUrl: './add-oven.component.html',
  styleUrls: ['./add-oven.component.scss'],
})
export class AddOvenComponent {

  @Input() ovenSelectModal : any = {
    show : false,
    oven : {},
    events : []
  };

  @Input() ovens : any[] = [];

  newOven : any = {
    name : "",
    site : "",
    localisation : "",
    entity : "",
    centre : "",
    responsable : "",
    tel : "",
  };

  constructor( private service: OvenService) { }

  // ngOnInit() {
    
  // }

  onWillDismiss(){
    console.log("onWillDismiss")
    this.ovenSelectModal.show = false;
  }

  onClose(){
    console.log("onClose")
    this.ovenSelectModal.show = false;
  }


  canSendOven(){

    for (let prop in this.newOven){
      // console.log(prop)
      if (this.newOven[prop] == null || this.newOven[prop] == undefined || this.newOven[prop] == ""){
        return false;
      }
    }
    return true;
  }

  addOven(){
    // this.service.addOven(this.newOven);

    this.ovens.push(this.ovenSelectModal.oven);
    this.ovenSelectModal.oven = {};
    this.ovenSelectModal.show = false;


  }


}
