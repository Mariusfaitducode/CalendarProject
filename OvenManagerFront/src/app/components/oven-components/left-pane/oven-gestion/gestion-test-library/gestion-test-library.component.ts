import { Component, Input, OnInit } from '@angular/core';
import { Test } from 'src/app/models/oven/test';
import { OvenService } from 'src/app/services/oven.service';

@Component({
  selector: 'app-gestion-test-library',
  templateUrl: './gestion-test-library.component.html',
  styleUrls: ['./gestion-test-library.component.scss'],
})
export class GestionTestLibraryComponent implements OnInit {

  constructor(private service : OvenService) { }

  ngOnInit() {}

  @Input() tests : Test[] = [];

  @Input() user : any = {};

  addTestModal : {show : boolean} = {show : false};

  newTest : Test = new Test();
  initialTest : Test = new Test();

  modify : boolean = false;


  openAddModal(){
    this.addTestModal.show = true;
    this.modify = false;
  }

  openModifyModal(test : Test){
    this.addTestModal.show = true;

    this.initialTest = test;
    this.newTest = {...test};
    this.modify = true;
  }

  onWillDismiss(){
    this.addTestModal.show = false;

    if (this.modify){
      this.newTest = new Test();
    }
  }

  onClose(){
    this.addTestModal.show = false;

    if (this.modify){
      this.newTest = new Test();
    }
  }


  addNewTest(){

    this.newTest.temperatureMin = this.newTest.temperatureMin!.toString();
    this.newTest.temperatureMax = this.newTest.temperatureMax!.toString();

    // this.newTest.entity = this.user.entity;

    this.service.addTest(this.newTest);

    this.tests.push(this.newTest);
    this.newTest = new Test();

    this.addTestModal.show = false;
  }

  canAddTest(){
    return this.newTest.name != "" && this.newTest.name != undefined;
  }


  modifyTest(){

    this.initialTest.name = this.newTest.name;
    this.initialTest.description = this.newTest.description;

    this.initialTest.temperatureMin = this.newTest.temperatureMin!.toString();
    this.initialTest.temperatureMax = this.newTest.temperatureMax!.toString();

    // this.initialTest = {...this.newTest};

    this.service.modifyTest(this.initialTest);

    this.newTest = new Test();

    this.addTestModal.show = false;
  }

 deleteTest(){

    let index = this.tests.indexOf(this.newTest);
    this.tests.splice(index, 1);

    this.service.deleteTest(this.newTest);

    this.newTest = new Test();
    this.addTestModal.show = false;
    

  }

}
