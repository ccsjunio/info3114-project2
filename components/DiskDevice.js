import { Device } from "/components/Device.js";

export class DiskDevice extends Device{

    constructor(id,status,replacementCost,supplierName,serialNumber,size,transferRate,update){
        super(id,status,replacementCost,supplierName,serialNumber,update);
        this._size = {
            value: size,
            type: "string",
            possibleValues: []
        };
        this._transferRate = {
            value: transferRate,
            type: "string",
            possibleValues: []
        };
        this._namespace = {
            name: "diskDevice",
            title: "Disk Device"
        }
    }

}