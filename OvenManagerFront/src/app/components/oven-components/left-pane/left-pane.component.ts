import { Component, OnInit, Input } from '@angular/core';
import { CompleteFilter } from 'src/app/models/oven/filter';
import { ClassifiedOven, Oven } from 'src/app/models/oven/oven';
import { OvenRequest, Reservation } from 'src/app/models/oven/reservation';
import { Test } from 'src/app/models/oven/test';
import { OvenPage } from 'src/app/pages/oven-pages/oven/oven.page';
import { OvenService } from 'src/app/services/oven.service';

@Component({
  selector: 'app-left-pane',
  templateUrl: './left-pane.component.html',
  styleUrls: ['./left-pane.component.scss'],
})
export class LeftPaneComponent implements OnInit {

  @Input() classifiedOvens : {ovensSBZ : ClassifiedOven[],
                              ovensBCT : ClassifiedOven[]} = {ovensSBZ : [], ovensBCT : []};
                              
  @Input() ovens : Oven[] = [];
  
  // @Input() planning : any[] = [];
  @Input() ovenFilters : Oven[] = [];
  @Input() customizedFilters : CompleteFilter[] = [];

  @Input() reservations : Reservation[] = [];

  @Input() user : any = {};

  @Input() tests : Test[] = [];

  @Input() leftPaneMode : string = "gestion";
  @Input() request : OvenRequest = new OvenRequest();


  constructor(private service : OvenService) {
  }


  ngOnInit() {
    const resizeHandle = document.getElementById('resizeHandle') as HTMLElement;
    const leftPane = document.getElementById('leftPane') as HTMLElement;
    const rightPane = document.getElementById('rightPane') as HTMLElement;

    let isResizing = false;
    let lastX = 0;

    resizeHandle.addEventListener('mousedown', (e) => {
      isResizing = true;
      lastX = e.clientX;
    });

    document.addEventListener('mousemove', (e) => {
      if (!isResizing) return;
      
      if (e.clientX < 300 || e.clientX > 800) return;

      const offset = e.clientX - lastX;
      const newWidthLeft = leftPane.offsetWidth + offset;
      const newWidthRight = rightPane.offsetWidth - offset;

      const percentLeft = newWidthLeft / (newWidthLeft + newWidthRight) * 100;
      const percentRight = newWidthRight / (newWidthLeft + newWidthRight) * 100;
    
      leftPane.style.width = `${percentLeft}%`;
      rightPane.style.width = `${percentRight}%`;
    
      lastX = e.clientX;
    });
    
    document.addEventListener('mouseup', () => {
      isResizing = false;
    });

    this.request.firstName = this.user.firstName;
    this.request.lastName = this.user.lastName;
    this.request.entity = this.user.entity;

    this.service.newRequestDate.subscribe((request : OvenRequest) => {
      this.leftPaneMode = "request";
      this.request = request;
    })
  }


  askRequestOven(oven : Oven){

    this.request.oven = oven;
    this.leftPaneMode = "request";
  }

}
