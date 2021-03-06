import { Device } from "/components/Device.js";

export class VideoDevice extends Device{

    constructor(id=null,status=null,replacementCost=null,supplierName=null,serialNumber=null,resolution=null,type=null,update=null){
        super(id,status,replacementCost,supplierName,serialNumber,update);
        this._resolution = {
            name: "Resolution",
            value: resolution,
            type: "string",
            possibleValues: []
        },
        this._type = {
            name: "Type",
            value: type,
            type: "stringSelect",
            possibleValues: ["LCD","LED","Plasma"]
        };
        this._namespace = {
            name: "videoDevice",
            title: "Video Device"
        };
    }

}