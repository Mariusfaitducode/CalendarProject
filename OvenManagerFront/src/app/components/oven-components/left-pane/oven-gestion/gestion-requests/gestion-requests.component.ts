import { Component, OnInit, Input } from '@angular/core';
import { Color } from 'src/app/models/oven/color';
import { ResponseModal } from 'src/app/models/oven/modal';
import { PropertyReservation, Reservation } from 'src/app/models/oven/reservation';
import { OvenService } from 'src/app/services/oven.service';


@Component({
  selector: 'app-gestion-requests',
  templateUrl: './gestion-requests.component.html',
  styleUrls: ['./gestion-requests.component.scss'],
})
export class GestionRequestsComponent implements OnInit {

  @Input() reservations : Reservation[] = [];

  @Input() user : any = {};


  responseModal : ResponseModal = new ResponseModal();

  comment : string = "";

  constructor(private service : OvenService) { }

  ngOnInit() {}


  containResponse(req : any){

    // for (let r of req.jobs){
    //   if (r.validate != undefined) return true;
    // }
    return false;
  }
  
  contrastColor(color : string | undefined){
    return Color.getCorrectTextColor(color!)
  }


  acceptRequest(request : Reservation){

    this.responseModal.show = true;
    this.responseModal.validate = "valid";
    this.responseModal.request = request;

  }

  refuseRequest(request : Reservation){
    this.responseModal.show = true;
    this.responseModal.validate = "refused";
    this.responseModal.request = request;
  }

  


  canSendResponse(){
    
    if (!this.responseModal.validate && this.comment === undefined || this.comment === ""){
      return false;
    }

    return true;
  }

  sendResponse(){

    console.log(this.responseModal.request)

    let response = new Reservation();

    let validatedProperty = this.responseModal.request!.validated;

    // validatedProperty.value = this.responseModal.validate;
    
    // response.id = this.responseModal.request.id;
    // response.username = this.responseModal.request.username;
    // response.entity = this.responseModal.request.entity;
    // response.project = this.responseModal.request.project;
    // response.description = this.responseModal.request.description;
    // response.idOven = this.responseModal.request.idOven;
    // response.startDate = this.responseModal.request.startDate;
    // response.duration = this.responseModal.request.duration;


    // response.validated.value = this.responseModal.validate;
    // this.responseModal.request.validated.value = this.responseModal.validate;

    this.responseModal.show = false;
    // this.comment = undefined;
    
    // console.log(response)

    this.service.answerReservation(validatedProperty);
  }


  //Response modal

  onWillDismiss(){
    console.log("onWillDismiss")
    this.responseModal.show = false;
  }

  onClose(){
    console.log("onClose")
    this.responseModal.show = false;
  }


}
