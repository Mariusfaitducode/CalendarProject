import { Component, OnInit, Input } from '@angular/core';
import { CompleteFilter } from 'src/app/models/oven/filter';
import { Oven } from 'src/app/models/oven/oven';
import { Reservation } from 'src/app/models/oven/reservation';

@Component({
  selector: 'app-gestion-planning',
  templateUrl: './gestion-planning.component.html',
  styleUrls: ['./gestion-planning.component.scss'],
})
export class GestionPlanningComponent implements OnInit {


  @Input() inProgressOvens! : {oven : Oven, reservation : Reservation}[];
  @Input() freeOvens : {oven : Oven, reservation : Reservation}[] = [];

  @Input() ovenFilters : Oven[] = [];
  @Input() entityFilter : CompleteFilter = new CompleteFilter();

  // activeFilter : CompleteFilter = new CompleteFilter();

  entity = 'BU2.3'

  ovenSelectModal : any = {
    show : false,
    oven : {},
    events : []
  };


  constructor() { }

  ngOnInit() {
    console.log(this.freeOvens)
  }

  selectOven(oven : Oven){
    // event.stopPropagation()
    // console.log(oven)

    this.ovenSelectModal.show = true;
    this.ovenSelectModal.oven = oven;
  }

}
