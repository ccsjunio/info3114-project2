export class Device {

    constructor(id,status,replacementCost,supplierName,serialNumber){
        this._id = id,
        this._status = {
            name: "Status",
            value: status,
            type: "flag",
            possibleValues: [1,0]
        };
        this._replacementCost = {
            name: "Replacement Cost",
            value: replacementCost,
            type: "currency",
            possibleValues: []
        };
        this._supplierName = {
            name: "Supplier Name",
            value: supplierName,
            type: "string",
            possibleValues: []
        };
        this._serialNumber = {
            name: "Serial Number",
            value: serialNumber,
            type: "string",
            possibleValues: []
        };
    }

    enable(){
        this._status = 1;
    }

    disable(){
        this._status = 0;
    }

    get id(){
        return this._id;
    }

    get status(){
        return this._status.value;
    }

    get replacementCost(){
        return this._replacementCost.value;
    }

    get supplierName(){
        return this._supplierName.value;
    }

    get serialNumber(){
        return this._serialNumber.value;
    }

}