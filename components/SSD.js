import { DiskDevice } from "/components/DiskDevice.js";

export class SSD extends DiskDevice{

    constructor(id=null,status=null,replacementCost=null,supplierName=null,serialNumber=null,size=null,transferRate=null,type=null,wearLeveling=null,update=null){
        super(id,status,replacementCost,supplierName,serialNumber,size,transferRate,update);
        this._type = {
            name: "Type",
            value: type,
            type: "stringSelect",
            possibleValues: ["Flash","DRAM"]
        };
        this._wearLeveling = {
            name: "Wear Leveling",
            value: wearLeveling,
            type: "boolean",
            possibleValues: [true,false]
        };
        this._size = {
            name: "Size",
            value: size,
            type: "string",
            possibleValues: []
        };
        this._transferRate = {
            name: "Transfer Rate",
            value: transferRate,
            type: "string",
            possibleValues: []
        };
        this._namespace = {
            name: "ssd",
            title: "SSD"
        };
    }

}