
import { Reservation } from "./reservation";
import { Oven } from "./oven";


export class CompleteFilter{

    name? : string;
    active : boolean = true;
    automatic? : boolean;

    filters : Filter[] = [];

    list : Reservation[] = [];

    public static deepCopy(filter : CompleteFilter){

        let newFilter = new CompleteFilter();
        newFilter.name = filter.name;
        newFilter.active = filter.active;
        newFilter.automatic = filter.automatic;
        // newFilter.filters = [...filter.filters];
        newFilter.list = [...filter.list];

        for (let f of filter.filters){
            newFilter.filters.push(Filter.deepCopy(f));
        }

        return newFilter;
    }

    public static deduceList(completeFilter : CompleteFilter){
        
        completeFilter.list = [];

        for (let filter of completeFilter.filters){
            let list : Reservation[] = [];

            if (filter.type == 'oven'){
                // list = list.concat(this.deduceOvenList(filter));

                // for (let oven of filter.listOven){
                //     // list = list.concat(oven.reservations);
                //     for (let reservation of oven.reservations){
                //         if (list.includes(reservation) == false){
                //             list.push(reservation);
                //         }
                //     }
                // }

                if (completeFilter.list.length == 0){
                    completeFilter.list = [...list];
                }
                else{
                    completeFilter.list = completeFilter.list.filter(reservation => list.includes(reservation));
                }

            } else if (filter.type == 'reservation'){
                // list = list.concat(filter.listReservation);
                // for (let reservation of filter.listReservation){
                //     if (list.includes(reservation) == false){
                //         list.push(reservation);
                //     }
                // }

                if (completeFilter.list.length == 0){
                    completeFilter.list = [...list];
                }
                else{
                    completeFilter.list = completeFilter.list.filter(reservation => list.includes(reservation));
                }
            }
        }
        // completeFilter.list = list;
    }


    public static duduceAllFilters(completeFilters : CompleteFilter[], reservations : Reservation[], ovens : Oven[]){
        
        for (let completeFilter of completeFilters){
            
            for (let filter of completeFilter.filters){
                if (filter.type == 'oven'){
                    // filter.listOven = this.deduceOvenList(filter);

                    Filter.deduceOvenList(filter, ovens);

                } else if (filter.type == 'reservation'){
                    // filter.listReservation = this.deduceReservationList(filter);

                    Filter.deduceReservationList(filter, reservations);
                }
            }
            console.log(completeFilter)
            CompleteFilter.deduceList(completeFilter);
            console.log(completeFilter)

        }
    
    }
}

export class Filter{

    type : FilterType = 'oven';
    key : string = "";
    values? : string[] = [];
    keyValueList? : string[] = [];

    listOven? : Oven[] = [];
    listReservation? : Reservation[] = [];


    public static deepCopy(filter : Filter){

        let newFilter = new Filter();
        newFilter.type = filter.type;
        newFilter.key = filter.key;
        // newFilter.values = [...filter.values];
        // newFilter.keyValueList = [...filter.keyValueList];
        // newFilter.listOven = [...filter.listOven];
        // newFilter.listReservation = [...filter.listReservation];

        return newFilter;
    }

    public static deduceOvenList(filter : Filter, ovens : Oven[]){

        console.log(ovens)
        
        let list : Oven[] = [];
        // for (let oven of ovens){
        //     if (filter.values.includes(oven[filter.key].value)){
        //         list.push(oven)
        //     }
        // }
        filter.listOven = list;
    }

    public static deduceReservationList(filter : Filter, reservations : Reservation[]){
        
        let list : Reservation[] = [];
        for (let reservation of reservations){


            // if (filter.values.includes(reservation[filter.key].value)){
            //     list.push(reservation)
            // }
        }
        filter.listReservation = list;
    }
}

export type FilterType = 'oven' | 'reservation';