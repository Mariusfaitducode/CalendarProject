import { Oven } from "./oven";
import { Test } from "./test";


export class ReservationDatabase {
    id?: number;
    idOven? : number = 0;
    idTest? : number = 0;
    propertyReservations: PropertyReservation[] = [];

    oven? : Oven = undefined;

    public static reservationToReservationDb(reservation : Reservation) : ReservationDatabase
    {
        let reservationDb = new ReservationDatabase();
        // reservationDb.id = reservation.id;
        reservationDb.idOven = reservation.idOven;
        reservationDb.idTest = reservation.idTest;
        reservationDb.propertyReservations = [];

        // for (let prop in reservation){
        //     if (prop != 'oven' && prop != 'startTime' && prop != 'idOven' && prop != 'idTest'){
        //         if (reservation[prop] == undefined){
        //             reservationDb.propertyReservations.push({name : prop, value : ""});
        //         }
        //         else if (reservation[prop] == null){
        //             reservationDb.propertyReservations.push({name : prop, value : null});
        //         }
        //         else{
        //             reservationDb.propertyReservations.push({name : prop, value : reservation[prop].value});
        //         }
        //     }
        // }
        return reservationDb;
    }
}


export class Reservation {

    id? : number;
    idOven? : number = undefined;
    idTest? : number = undefined;
    
    username : PropertyReservation = {name : "username", value : ""};
    entity : PropertyReservation = {name : "entity", value : ""};
    project : PropertyReservation = {name : "project", value : ""};
    description : PropertyReservation = {name : "description", value : ""};
    
    startDate : PropertyReservation = {name : "startDate", value : ""};
    duration : PropertyReservation = {name : "duration", value : ""} ;
    validated : PropertyReservation = {name : "validated", value : ""};

    temperatureMin : PropertyReservation = {name : "temperatureMin", value : ""};
    temperatureMax : PropertyReservation = {name : "temperatureMax", value : ""};
    
    oven? : Oven = undefined;
    startTime? : Date = undefined;
    endTime? : Date = undefined;

    // Ajouter test, temperature, comment

    public static reservationDbListToReservationList(reservationsDb : ReservationDatabase[], ovens : Oven[]) : Reservation[]
    {
        let reservations : Reservation[] = [];

        for (let resaDb of reservationsDb){

            let newResa = new Reservation();
            newResa.id = resaDb.id;
            newResa.idOven = resaDb.idOven;
            newResa.idTest = resaDb.idTest;
            newResa.oven = ovens.find(o => o.id == resaDb.idOven);
            // newResa.validated = true;

            // for (let prop of resaDb.propertyReservations){
          
            //     newResa?[prop.name] = {id : prop.id, idReservation : prop.idReservation, name : prop.name, value : prop.value};
            // }

            newResa.startTime = new Date(newResa.startDate.value);
            newResa.endTime = new Date(newResa.startDate.value);
            newResa.endTime.setHours(newResa.endTime.getHours() + +newResa.duration.value);

            reservations.push(newResa);

            if (newResa.oven){
                newResa.oven.reservations!.push(newResa);
            }
        }
        return reservations;
    }
}


export class OvenRequest {

    id?: number;
    test : Test = new Test();
    firstName : string = "";
    lastName : string = "";
    entity : string = "";
    project : string = "";
    description : string = "";
    oven : Oven = new Oven();
    startDate : Date | string = "";
    startTime : string = "";
    duration : number = 0;
    temperatureMin : string = "";
    temperatureMax : string = "";

    fastForm : boolean = false;
}

export class PropertyReservation {
    id?: number;
    idReservation?: number;
    name: string = "";
    value: string = "";
}