import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ConfigUrlService } from './config-url.service';
import { BaseService } from './base.service';
import { Oven, OvenDatabase, Property, } from '../models/oven/oven';
import { OvenRequest, PropertyReservation, Reservation, ReservationDatabase } from '../models/oven/reservation';
import { Observable, Subject } from 'rxjs';
import { CompleteFilter } from '../models/oven/filter';
import { Test } from '../models/oven/test';

@Injectable({
  providedIn: 'root'
})
export class OvenService extends BaseService {


  // eventSourceChanged$: Observable<void>;

  public eventSourceChanged = new Subject<void>();

  public newRequestDate = new Subject<OvenRequest>();

  constructor(http: HttpClient, configUrlService: ConfigUrlService, public toastController: ToastController) {
    super(http, configUrlService);
    this.serviceKey = 'oven';
    this.pathPrefix= 'api/';
  }


  getOvensWithProperties(){
    return this.getGenericJsonObject<any>('Ovens/OvensWithProperty');
  }

  getOvens(){
    return this.getGenericJsonObject<OvenDatabase[]>('Ovens');
  }

  getOvensProperties(){
    return this.getGenericJsonObject<Property[]>('Properties');
  }

  getReservations(){
    return this.getGenericJsonObject<ReservationDatabase[]>('Reservations/ReservationsWithProperty');
  }
  
  addReservation(reservation : Reservation){

    let newReservation = ReservationDatabase.reservationToReservationDb(reservation);

    console.log(newReservation)

    this.postAndReturnGenericObject<ReservationDatabase>('Reservations', newReservation).subscribe({
      next: data => {
        console.log(data);
        this.presentToast("Votre demande a bien été envoyée");
      },
      error: error => {
        console.error(error);
        this.presentToast("Une erreur est survenue lors de l'envoi de votre demande");
      }
    });
  }


  


  answerReservation(response : PropertyReservation){

    // console.log(reservation)
    // let newReservation = ReservationDatabase.reservationToReservationDb(reservation);

    this.putAndReturnGenericObject<any>(`PropertyReservations/${response.id}`, response).subscribe({
      next: data => {
        console.log(data);
        this.presentToast("Votre réponse a bien été envoyée");
      },
      error: error => {
        console.error(error);
        this.presentToast("Une erreur est survenue lors de l'envoi de la réponse");
      }
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, 
      position: 'bottom', 
      // color: 'success', 
    });
    toast.present();
  }

  updateFilterInStorage(customizedFilters : CompleteFilter[]){
   
    console.log(customizedFilters)

    let filterToStorage = []

    for (let filter of customizedFilters){

      if (!filter.automatic){

        // filter.list = [];

        let newFilter = new CompleteFilter();
        newFilter.name = filter.name;
        newFilter.active = filter.active;
        newFilter.automatic = filter.automatic;

        newFilter.list = [];

        newFilter.filters = [...filter.filters];


        for (let f of newFilter.filters){
          f.listOven = [];
          f.listReservation = [];
        }

        filterToStorage.push(newFilter);

      }
    }

    sessionStorage.setItem('customizedFilters', JSON.stringify(filterToStorage));

  }


  addTest(test : Test){

    console.log(test)
    this.postAndReturnGenericObject<Test>('Tests', test).subscribe({
      next: data => {
        console.log(data);
        this.presentToast("Votre test a bien été enregistré");
      },
      error: error => {
        console.error(error);
        this.presentToast("Une erreur est survenue lors de l'envoi du test");
      }
    });
  }

  getTests(){
    return this.getGenericJsonObject<Test[]>('Tests');
  }

  modifyTest(test : Test){

    console.log(test)
    this.putAndReturnGenericObject<Test>(`Tests/${test.id}`, test).subscribe({
      next: data => {
        console.log(data);
        this.presentToast("Votre test a bien été modifié");
      },
      error: error => {
        console.error(error);
        this.presentToast("Une erreur est survenue lors de l'envoi du test");
      }
    });
  }

  deleteTest(test : Test){

    this.deleteGenericObject(`Tests/${test.id}`);
  }




  //Communication between components

  loadEvents() {
    // console.log("loadEvents from oven service")
    this.eventSourceChanged.next();
  }

  newRequest(request : OvenRequest){
    this.newRequestDate.next(request);
  }

}
