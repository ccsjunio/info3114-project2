import { DiskDevice } from "/components/DiskDevice.js";

export class HardDisk extends DiskDevice{

    constructor(status,replacementCost,supplierName,serialNumber,size,transferRate){
        super(status,replacementCost,supplierName,serialNumber,size,transferRate);
        this._platterSize = "";
        this._numberOfPlatters = "";
        this._namespace = "hardDisk";
    }

}