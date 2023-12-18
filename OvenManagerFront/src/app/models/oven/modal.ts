import { CompleteFilter } from "./filter";
import { ClassifiedOven } from "./oven";
import { Reservation } from "./reservation";


export class ResponseModal{
    show : boolean = false;
    validate? : string = "";
    request? : Reservation;
}

export class FilterModal{
    show : boolean = false;
    // filter? : CompleteFilter;
    initialFilter? : CompleteFilter;
    modify: boolean = false;
}

