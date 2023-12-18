import { Reservation } from "./reservation";

export class OvenDatabase {
    id?: number;
    name?: string;
    properties: Property[] = [];
}


export class Oven {
    id?: number;
    name?: string;
    color?: string;
    selected: boolean = false;

    site? : Property;
    localisation? : Property;
    entity? : Property;
    centre? : Property;
    responsable? : Property;
    tel? : Property;
    quasar? : Property;
    serialNumber? : Property;
    designation? : Property;
    tolerance? : Property;
    temperature? : Property;
    humidity? : Property;
    warrantyEnd? : Property;
    comissioning? : Property;
    numInfras? : Property;
    numAlim? : Property;
    heatingSpeed? : Property;
    coolingSpeed? : Property;
    volume? : Property;
    noVignettes? : Property;

    reservations? : Reservation[] = [];

    // constructor(){}
    

    public static ovenDbListToOvenList(ovensDb : OvenDatabase[]) : Oven[]
    {
        let ovens : Oven[] = [];

        for (let ovenDb of ovensDb){

            let newOven = new Oven();
            newOven.id = ovenDb.id;
            newOven.name = ovenDb.name;
            newOven.color =  "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," +  Math.floor(Math.random() * 255) + ")";

            // for (let prop of ovenDb.properties){
          
            //     newOven![prop.name] = {id : prop.id, value : prop.value, name : prop.name};
            //   }

            ovens.push(newOven);
        }
        return ovens;
    }

    public static getOvenByEntity(ovens : Oven[], entity : string) {

        let ovensList : Oven[] = [];

        for (let oven of ovens){

            if (oven['entity'] && oven['entity'].value == entity){
                ovensList.push(oven);
            }
        }
        return ovensList;
    }
}

// Group oven with a key, serve to display and filter
export class ClassifiedOven{
    key? : string;
    // develop : boolean;

    list : Oven[] = [];


    public static getOvenBySiteEntity(ovens : Oven[]) {

        let ovensSBZ : ClassifiedOven[] = [];
        let ovensBCT : ClassifiedOven[] = [];

        // for (let oven of ovens){

        //     if (oven['site'] && oven['site'].value == 'SONCEBOZ'){
        //         if (!ovensSBZ.find(g => g.key == oven['entity'].value)){
        //             ovensSBZ.push({key : oven['entity'].value, list : [oven]});
        //         }
        //         else{
        //             ovensSBZ.find(g => g.key == oven['entity'].value)!.list.push(oven);
        //         }
        //     }
        //     else if (oven['site'] && oven['site'].value == 'BONCOURT'){
        //         if (!ovensBCT.find(g => g.key == oven['entity'].value)){
        //             ovensBCT.push({key : oven['entity'].value, list : [oven]});
        //         }
        //         else{
        //             ovensBCT.find(g => g.key == oven['entity'].value)!.list.push(oven);
        //         }
        //     }
        // }
        return {ovensSBZ : ovensSBZ, ovensBCT : ovensBCT};
    }
}

// export class PropertyDatabase {
//     id: number;
    
//     name: string;
//     val: string;
// }

export class Property {
    id?: number;
    idOven?: number;
    name?: string;
    value?: string;
}