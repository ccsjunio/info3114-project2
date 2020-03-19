export class Device {

    constructor(status,replacementCost,supplierName,serialNumber){
        this._status = status;
        this._replacementCost = replacementCost;
        this._supplierName = supplierName;
        this._serialNumber = serialNumber;
    }

    enable(){
        this._status = 1;
    }

    disable(){
        this._status = 0;
    }

    get status(){
        return this._status;
    }

    get replacementCost(){
        return this._replacementCost;
    }

}