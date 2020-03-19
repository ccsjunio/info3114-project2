import { DiskDevice } from "/components/DiskDevice.js";

export class SDD extends DiskDevice{

    constructor(status,replacementCost,supplierName,serialNumber,size,transferRate){
        super(status,replacementCost,supplierName,serialNumber,size,transferRate);
        this._type = "";
        this._wearLeveling = "";
        this._namespace = "SDD";
    }

}