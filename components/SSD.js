import { DiskDevice } from "/components/DiskDevice.js";

export class SSD extends DiskDevice{

    constructor(id,status,replacementCost,supplierName,serialNumber,size,transferRate,type,wearLeveling){
        super(id,status,replacementCost,supplierName,serialNumber,size,transferRate);
        this._type = {
            name: "Type",
            value: type,
            type: "string",
            possibleValues: ["Flash","DRAM"]
        };
        this._wearLeveling = {
            name: "Wear Leveling",
            value: wearLeveling,
            type: "boolean",
            possibleValues: [true,false]
        };
        this._namespace = "ssd";
        this._namespaceTitle = "SSD"
    }

}