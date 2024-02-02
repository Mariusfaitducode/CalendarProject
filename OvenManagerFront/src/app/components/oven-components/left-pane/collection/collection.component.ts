import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClassifiedOven, Oven } from 'src/app/models/oven/oven';
import { OvenRequest, Reservation } from 'src/app/models/oven/reservation';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent  implements OnInit {

  @Input() classifiedOvens : {ovensSBZ : ClassifiedOven[],
                             ovensBCT : ClassifiedOven[]} = {ovensSBZ : [], ovensBCT : []};

  @Input() results = this.classifiedOvens;

  @Input() ovens : Oven[] = [];
  @Input() ovenFilters : Oven[] = [];
  @Input() user : any = {};

  @Output() requestOven = new EventEmitter<Oven>();

  // @Input() leftPaneMode : string;
  // @Input() request : OvenRequest;

  ovenSelectModal : {show : boolean, oven : Oven, admin : boolean} = {
    show : false,
    oven : new Oven(),
    admin : false
  };

  constructor() { }

  ngOnInit() {
    // console.log(this.ovens)
  }


  selectOven(oven : any, event : any){
    // event.stopPropagation()
    // console.log(oven)

    console.log("open oven modal")

    this.ovenSelectModal.show = true;
    this.ovenSelectModal.oven = oven;

    if (oven.entity.value === this.user.entity) {
      this.ovenSelectModal.admin = true;
    }
    else {
      this.ovenSelectModal.admin = false;
    }
  }

  addOven(event : any){

    // this.ovenAddModal.show = true;
  }

  handleInput(event : any) {
    const query = event.target.value.toLowerCase();

    this.results = JSON.parse(JSON.stringify(this.classifiedOvens));

    for (let entity of this.results.ovensSBZ) {
      
      // console.log(entity)

      if (!(entity.key!.toLowerCase().indexOf(query) > -1)){
        entity.list = [...entity.list.filter((oven : any) => {

          return oven.name.toLowerCase().indexOf(query) > -1;

        })]
      }
    }
    for (let entity of this.results.ovensBCT) {

      if (!(entity.key!.toLowerCase().indexOf(query) > -1)){
        entity.list = [...entity.list.filter((oven : any) => {

          return oven.name.toLowerCase().indexOf(query) > -1;

        })]
      }
    }

    if (query == '') {
      // console.log('query empty')
      this.results = {...this.classifiedOvens};
    }

    // console.log(this.results)
  }


  askRequestOven(oven : Oven){

    this.requestOven.emit(oven);
  }

}
