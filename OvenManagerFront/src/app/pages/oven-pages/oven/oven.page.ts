import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/components/oven-components/ionic-calendar/calendar.service';
import { CompleteFilter, Filter } from 'src/app/models/oven/filter';
import { ClassifiedOven, Oven, OvenDatabase, Property } from 'src/app/models/oven/oven';
import { OvenRequest, Reservation, ReservationDatabase } from 'src/app/models/oven/reservation';
import { Test } from 'src/app/models/oven/test';
import { OvenService } from 'src/app/services/oven.service';

@Component({
  selector: 'app-oven',
  templateUrl: './oven.page.html',
  styleUrls: ['./oven.page.scss'],
})
export class OvenPage implements OnInit {

  ovens : Oven[] = [];
  classifiedOvens :{ovensSBZ : ClassifiedOven[],
                    ovensBCT : ClassifiedOven[]} = {ovensSBZ : [], ovensBCT : []};

  reservations : Reservation[] = [];
  jobList : Reservation[] = [];

  tests : Test[] = [];

  ovenFilters : Oven[] = [];
  customizedFilters : CompleteFilter[] = [];

  request : OvenRequest = new OvenRequest();

  leftPaneMode : string = "gestion";

  // requests : Reservation[] = [];

  user : any = {
    firstName : 'Marius',
    lastName : 'Diguat',
    admin : true,
    entity : 'BU2.3',
  };

  constructor(private service : OvenService) { }

  ngOnInit(){
    // console.log(this.service.getAllDatas())

    let entityFilter = new CompleteFilter();
    entityFilter.name = this.user.entity;
    // entityFilter.value = this.user.entity;
    entityFilter.active = true;
    entityFilter.automatic = true;

    let filterReason : Filter = new Filter();
    filterReason.type = 'oven';
    filterReason.key = 'entity';
    // filterReason.values.push(this.user.entity);

    entityFilter.filters.push(filterReason);
    this.customizedFilters.push(entityFilter);


    //registered filters
    let filtersInStorage = JSON.parse(sessionStorage.getItem('customizedFilters') || '[]');

    if (filtersInStorage.length > 0){
      for (let filter of filtersInStorage){


        let newFilter = new CompleteFilter();
        newFilter.name = filter.name;
        newFilter.active = filter.active;
        newFilter.automatic = filter.automatic;
        newFilter.filters = filter.filters;
        newFilter.list = filter.list;

        this.customizedFilters.push(newFilter);
      }
    }
    
    this.service.getOvensWithProperties().subscribe((data : OvenDatabase[]) => {

      console.log(data);

      this.ovens = Oven.ovenDbListToOvenList(data);

      console.log(this.ovens)

      this.classifiedOvens = ClassifiedOven.getOvenBySiteEntity(this.ovens);

        // filterReason.listOven = Oven.getOvenByEntity(this.ovens, filterReason.values[0]);

      this.service.getReservations().subscribe((data : ReservationDatabase[]) => {

        console.log(data)
        this.reservations = Reservation.reservationDbListToReservationList(data, this.ovens);

        CompleteFilter.duduceAllFilters(this.customizedFilters, this.reservations, this.ovens);


        

        this.service.getTests().subscribe((data : Test[]) => {

          console.log(data);

          // this.tests = data.filter((test : Test) => {test?.entity !== this.user.entity});

          for (let test of data){
            if (test.entity && test.entity == this.user.entity){
              this.tests.push(test);
            }
          }

          console.log(this.tests)


          console.log(entityFilter)

          console.log(this.reservations)

          this.service.loadEvents();

          console.log(this.customizedFilters)

          console.log(this.ovens)

        });


      });

    });

    let userRole = sessionStorage.getItem('userRole');
    let userEntity = sessionStorage.getItem('userEntity');
    let userGroup = sessionStorage.getItem('userGroup');

    // console.log(userRole, userEntity, userGroup)

  }


}
