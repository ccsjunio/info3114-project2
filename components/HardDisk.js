import { DiskDevice } from "/components/DiskDevice.js";

export class HardDisk extends DiskDevice{

    constructor(id,status,replacementCost,supplierName,serialNumber,size,transferRate,platterSize,numberOfPlatters){
        super(id,status,replacementCost,supplierName,serialNumber,size,transferRate);
        this._platterSize = {
            name: "Platter Size",
            value: platterSize,
            type: "string",
            possibleValues: []
        };
        this._numberOfPlatters = {
            name: "Number of platters",
            value: numberOfPlatters,
            type: "integer",
            possibleValues: []
        };
        this._namespace = {
            name: "hardDisk",
            title: "Hard Disk"
        };
    }

}