import { DiskDevice } from "/components/DiskDevice.js";

export class HardDisk extends DiskDevice{

    constructor(id=null,status=null,replacementCost=null,supplierName=null,serialNumber=null,size=null,transferRate=null,platterSize=null,numberOfPlatters=null,update=null){
        super(id,status,replacementCost,supplierName,serialNumber,size,transferRate,update);
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