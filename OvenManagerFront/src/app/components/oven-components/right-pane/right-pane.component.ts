import { Component, Input, OnInit } from '@angular/core';
import { ClassifiedOven, Oven } from 'src/app/models/oven/oven';
import { CalendarMode } from '../ionic-calendar/calendar.interface';
import { Color } from 'src/app/models/oven/color';
import { OvenRequest, Reservation } from 'src/app/models/oven/reservation';
import { FilterModal, ResponseModal } from 'src/app/models/oven/modal';
import { CompleteFilter, Filter } from 'src/app/models/oven/filter';
import { OvenService } from 'src/app/services/oven.service';

@Component({
  selector: 'app-right-pane',
  templateUrl: './right-pane.component.html',
  styleUrls: ['./right-pane.component.scss'],
})
export class RightPaneComponent {

  @Input() ovens : Oven[] = [];
  @Input() reservations : Reservation[] = [];
  @Input() jobList : Reservation[] = [];

  @Input() ovenFilters : Oven[] = [];
 
  @Input() customizedFilters : CompleteFilter[] = [];

  @Input() user : any = {};
  @Input() request : OvenRequest = new OvenRequest();

  @Input() leftPaneMode : string = "gestion";

  filterModal : FilterModal = new FilterModal();

  newFilter : CompleteFilter = new CompleteFilter();

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
  };

  constructor(private service : OvenService) { }

  // ngOnInit() {}

  openModifyFilter(filter : CompleteFilter){
    this.filterModal.show = true;
    this.filterModal.initialFilter = filter;
    // this.filterModal.filter = {...filter};
    this.filterModal.modify = true;

    // this.newFilter = new CompleteFilter();
    // this.newFilter = {...filter};

    this.newFilter = CompleteFilter.deepCopy(filter);

    if (this.newFilter.filters[0].key !== ""){
      this.newFilter.filters.unshift(new Filter());
    }
  }

  removeFilter(filter : Oven){
    // filter.selected = false;
    this.ovenFilters.splice(this.ovenFilters.indexOf(filter), 1)
  }

  removeCustomizedFilter(filter : CompleteFilter){
    // filter.selected = false;
    this.customizedFilters.splice(this.customizedFilters.indexOf(filter), 1)

    this.service.updateFilterInStorage(this.customizedFilters);
  }

  
  openAddFilterModal(){
    this.filterModal.show = true;
    // this.filterModal.filter = new CompleteFilter();
    this.filterModal.modify = false;

    this.newFilter = new CompleteFilter();

    this.newFilter.filters.unshift(new Filter());
  }

  openOvenModal(){
    // this.eventSelectModal.show = false;
    // this.eventSelectModal.openOvenModal.show = true;
  }

  contrastColor(color : string | undefined){
    return Color.getCorrectTextColor(color!)
  }
}
