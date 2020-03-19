import { Device } from "/components/Device.js";

export class DiskDevice extends Device{

    constructor(status,replacementCost,supplierName,serialNumber){
        super(status,replacementCost,supplierName,serialNumber);
        this._size = "";
        this._transferRate = "";
        this._namespace = "diskDevice";
    }

}