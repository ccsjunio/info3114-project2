import { Device } from "/components/Device.js";

export class VideoDevice extends Device{

    constructor(status,replacementCost,supplierName,serialNumber){
        super(status,replacementCost,supplierName,serialNumber);
        this._resolution = "";
        this._type = "";
        this._namespace = "videoDevice";
    }

}