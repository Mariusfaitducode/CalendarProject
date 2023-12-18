import { Component, OnInit, Input } from '@angular/core';
import { OvenService } from 'src/app/services/oven.service';
import { Color } from 'src/app/models/oven/color';
import { ClassifiedOven, Oven } from 'src/app/models/oven/oven';
import { Reservation } from 'src/app/models/oven/reservation';
import { Test } from 'src/app/models/oven/test';
import { CompleteFilter } from 'src/app/models/oven/filter';

@Component({
  selector: 'app-oven-gestion',
  templateUrl: './oven-gestion.component.html',
  styleUrls: ['./oven-gestion.component.scss'],
})
export class OvenGestionComponent implements OnInit {
  @Input() ovens : Oven[] = [];
  @Input() user : any = {};

  @Input() ovenFilters : Oven[] = [];
  @Input() customizedFilters : CompleteFilter[] = [];
  

  @Input() reservations : Reservation[] = [];

  @Input() tests : Test[] = [];


  response : Reservation[] = [];

  gestionMode : string = "library";

  inProgressOvens : {oven : Oven, reservation : Reservation}[] = [];
  freeOvens :  {oven : Oven, reservation : Reservation}[] = [];

  // numberRequest : number = 0;

  constructor( private service : OvenService) {

    
   }

  ngOnInit(){

    if (this.user.entity){
      this.getOvenOfUserEntity();
    }
    // this.getOvenOfUserEntity();

    this.service.eventSourceChanged.subscribe(() => {
            
      this.getOvenOfUserEntity();
    });
  }

  getOvenOfUserEntity(){

    // console.log(this.ovens)
    // console.log(this.user)

    let ovensEntity = this.ovens.filter(oven => oven.entity?.value == this.user.entity);

    // console.log(ovensEntity)

    let date = new Date();
    // let classifiedOvensEntity : ClassifiedOven[] = [{key : 'inProgress', list : []}, {key : 'free', list : []}]; 

    let inProgressOvens : {oven : Oven, reservation : Reservation}[] = [];
    let freeOvens : {oven : Oven, reservation : Reservation}[] = [];

    for (let oven of ovensEntity){

        // let reservation = [...oven.reservations.filter(r => r.validated.value === 'valid')];
        // let actualReservation : Reservation = reservation.find(r => r.startTime < date && r.endTime > date);

        // if (actualReservation){
        //     inProgressOvens.push({oven, reservation : actualReservation});
        // }
        // else{
        //     let futureReservations = [...reservation.filter(r => r.startTime > date)];
        //     futureReservations.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

        //     freeOvens.push({oven, reservation : futureReservations[0]});
        // }
    }

    this.inProgressOvens = inProgressOvens;
    this.freeOvens = freeOvens;

    // console.log(inProgressOvens, freeOvens);

    // return {inProgressOvens : inProgressOvens, freeOvens : freeOvens};
  }
}
