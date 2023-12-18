import { Component, Input, OnInit } from '@angular/core';
import { Oven } from 'src/app/models/oven/oven';
import { OvenRequest, Reservation } from 'src/app/models/oven/reservation';
import { Test } from 'src/app/models/oven/test';
import { OvenService } from 'src/app/services/oven.service';

@Component({
  selector: 'app-oven-request',
  templateUrl: './oven-request.component.html',
  styleUrls: ['./oven-request.component.scss'],
})
export class OvenRequestComponent {

  @Input() ovens : Oven[] = [];
  @Input() user : any = {};

  @Input() request : OvenRequest = new OvenRequest();

  @Input() tests : Test[] = [];

  // @Input() requests : Reservation[] = [];

  // fastForm : boolean = false;

  response : any[] = [];
  // numberRequest : number = 0;

  openModal : {show : boolean} = {show : false};

  invalidDateMessage : string = "La date n'est pas valide";
  

  constructor( private service : OvenService) { }

  // ngOnInit() {}


  developRequest(req : any){

    req.developped = !req.developped;
  }


  validRequest() {

    if (this.request.fastForm && this.request.oven){return true}

    // for( let r in this.request){

    //   if (this.request[r] == undefined || this.request[r] == "") return false;
    // }

    return true
  }

  setTemperature(){
    this.request.temperatureMin = this.request.test.temperatureMin!.toString();
    this.request.temperatureMax = this.request.test.temperatureMax!.toString();
  }

  validDate() {

    if (this.request.startDate && this.request.startTime && this.request.duration && this.request.oven){

      let startDate = new Date(this.request.startDate);

      startDate.setHours(+this.request.startTime.split(":")[0])
      startDate.setMinutes(+this.request.startTime.split(":")[1]);

      if (startDate < new Date()){
        this.invalidDateMessage = "La date ne peut pas être antérieure à la date actuelle";
        return false;
      }

      let endDate = new Date(startDate.getTime() + this.request.duration * 60 * 1000);

        for (let r of this.request.oven.reservations!){

          if (startDate > r.endTime! || endDate < r.startTime!){
            continue;
          }
          else {
            this.invalidDateMessage = "L'étuve séléctionnée n'est pas compatible avec la date";
            return false;
          }
        }
    }
    return true;
  }

  sendRequest(){


    let reservation: Reservation = new Reservation();

    reservation.username.value = this.request.firstName + " " + this.request.lastName;
    reservation.entity.value = this.request.entity;
    reservation.project.value = this.request.project;
    reservation.description.value = this.request.description;
    reservation.idOven = this.request.oven.id;
    reservation.idTest = this.request.test.id;

    reservation.temperatureMin.value = this.request.temperatureMin.toString();
    reservation.temperatureMax.value = this.request.temperatureMax.toString();

    let date = new Date(this.request.startDate);

    date.setHours(+this.request.startTime.split(":")[0])
    date.setMinutes(+this.request.startTime.split(":")[1]);

    reservation.startDate.value = date.toDateString();
    reservation.duration.value = this.request.duration.toString();
    reservation.validated.value = "await";

    // for (let r of this.request.planning){

    //   console.log("id oven", r.oven.id)

    //   let date = new Date(r.start.date);

    //   date.setHours(r.start.time.split(":")[0]);
    //   date.setMinutes(r.start.time.split(":")[1]);

    //   reservation.jobs.push({
    //     id : 0,
    //     idReservation : 0,
    //     idOven : r.oven.id,
    //     startDate : date,
    //     duration : r.duration,
    //   })
    // }

    console.log(reservation)

    this.service.addReservation(reservation);



    // this.service.addRequest(this.request);
    // this.request = {
    //   user : {},
    //   planning : []
    // };
  }

}
