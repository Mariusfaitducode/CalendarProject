import { Component, OnInit, Input } from '@angular/core';
import { CompleteFilter, Filter } from 'src/app/models/oven/filter';
import { FilterModal } from 'src/app/models/oven/modal';
import { ClassifiedOven, Oven } from 'src/app/models/oven/oven';
import { Reservation } from 'src/app/models/oven/reservation';
import { OvenService } from 'src/app/services/oven.service';

@Component({
  selector: 'app-add-filter',
  templateUrl: './add-filter.component.html',
  styleUrls: ['./add-filter.component.scss'],
})
export class AddFilterComponent {

  @Input() filterModal : FilterModal = new FilterModal(); 

  @Input() newFilter : CompleteFilter = new CompleteFilter();

  @Input() ovens : Oven[] = [];

  @Input() reservations : Reservation[] = [];

  @Input() customizedFilters : CompleteFilter[] = [];

  // filter : string = "";
  // filterValueList : string[] = [];

  // filterValueSelection : string[] = [];

  // ovensSelection : Oven[] = [];

  constructor(private service : OvenService) { }


  onWillDismiss(){
    console.log("onWillDismiss")
    this.filterModal.show = false;
  }


  onClose(){
    console.log("onClose")
    this.filterModal.show = false;
  }


  setFilterType(filter : Filter){
    filter.key = "";
    filter.values = [];
    filter.listOven = [];
    filter.listReservation = [];
    filter.keyValueList = [];

    CompleteFilter.deduceList(this.newFilter);
  }


  getFilterValue(filter : Filter){

    filter.keyValueList = [];
    filter.values = [];
    filter.listOven = [];
    filter.listReservation = [];
    // this.filterValueSelection = [];

    if (filter.type == "oven"){
      for (let oven of this.ovens){
      
        // if (filter.keyValueList.includes(oven[filter.key].value) == false){
        //   filter.keyValueList.push(oven[filter.key].value)
        // }
      }
      console.log(filter.keyValueList)
    }
    else if (filter.type == "reservation"){

      // console.log(this.reservations)

      for (let reservation of this.reservations){
      
        // console.log(reservation[filter.key])

        // if (filter.keyValueList.includes(reservation[filter.key].value) == false){
        //   filter.keyValueList.push(reservation[filter.key].value)
        // }
      }
    }
    

    CompleteFilter.deduceList(this.newFilter);
  }


  getOvensSelection(filter : Filter){

    filter.listOven = [];
    filter.listReservation = [];

    if (filter.key == "") return;

    if (filter.type == 'oven'){
      for (let oven of this.ovens){

        // console.log(oven[filter.key].value)
        // if (filter.values.includes(oven[filter.key].value)){
        //   filter.listOven.push(oven)
        // }
      }
    }
    else if (filter.type === 'reservation'){
      for (let reservation of this.reservations){

        // if (filter.values.includes(reservation[filter.key].value)){
        //   filter.listReservation.push(reservation)
        // }
      }
    }

    CompleteFilter.deduceList(this.newFilter);
    
    // Update global list
  }


  canAddSubFilter(filter : Filter){
    // return filter.listOven.length > 0 || filter.listReservation.length > 0;
    return false;
  }


  addSubFilter(){

    let newSubFilter = this.newFilter.filters[0];
    this.newFilter.filters.push(newSubFilter);

    this.newFilter.filters[0] = new Filter();
    
    
    CompleteFilter.deduceList(this.newFilter);
  }


  removeSubFilter(index : number){
    this.newFilter.filters.splice(index, 1);
    CompleteFilter.deduceList(this.newFilter);
  }


  canAddFilter(){
    // return this.newFilter.list.length > 0;
    
    if (this.newFilter.filters.length <= 1) return false;

    // for (let filter of this.newFilter.filters){
    //   if (this.newFilter.filters.indexOf(filter) > 0  && 
    //       (filter.key == "" || filter.values.length == 0)) return false;
    // }
    return true;
  }


  canModifyFilter(){
    // return this.newFilter.list != this.filterModal.initialFilter.list
    // || this.newFilter.name != this.filterModal.initialFilter.name
    // || this.newFilter.filters != this.filterModal.initialFilter.filters ;

    if (this.newFilter.filters.length <= 1) return false;

    // for (let filter of this.newFilter.filters){
    //   if (this.newFilter.filters.indexOf(filter) > 0  && 
    //       (filter.key == "" || filter.values.length == 0)) return false;
    // }
    return true;
  }


  addFilter(){

    // newFilter.key = this.filter;
    // newFilter.list = this.ovensSelection;

    this.newFilter.filters.shift();

    this.customizedFilters.push(this.newFilter);

    this.onClose();

    this.service.updateFilterInStorage([...this.customizedFilters]);
  }


  modifyFilter(){

    this.newFilter.filters.shift();

    let filter = this.newFilter;
    // this.filterModal.initialFilter.active = filter.active;
    // this.filterModal.initialFilter.name = filter.name;
    // this.filterModal.initialFilter.filters = filter.filters;
    // this.filterModal.initialFilter.list = filter.list;

    this.onClose();

    this.service.updateFilterInStorage([...this.customizedFilters]);
  }


  switchActivationFilter(){
    this.newFilter.active = !this.newFilter.active;

    this.modifyFilter();

    this.onClose();
  }


  removeFilter(){

    this.customizedFilters.splice(this.customizedFilters.indexOf(this.filterModal.initialFilter!), 1);

    this.service.updateFilterInStorage([...this.customizedFilters]);
    this.onClose();
  }

}
