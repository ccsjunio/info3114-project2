import { devices } from "/database/devices.js";
import { buildDeviceCard } from "/templates/deviceCard.js";
import { VideoDevice } from "/components/VideoDevice.js";
import { HardDisk } from "/components/HardDisk.js";
import { SSD } from "/components/SSD.js";
import { toCurrency } from "/utils/custom-functions.js";

window.onload = function(){
    initialize();
    
}

function initialize(){

    let deviceObjects = [];
    let namespaces = [];

    //get namespaces
    devices.forEach((element)=>{
        if(namespaces.find((item)=>item.name===element.namespace.name)===undefined){
            namespaces.push(element.namespace);
            deviceObjects[element.namespace.name] = [];
        }

        switch(element.namespace.name){
            case "videoDevice":
                deviceObjects[element.namespace.name].push(new VideoDevice(element.id,element.status,element.replacementCost,element.supplierName,element.serialNumber,element.resolution,element.type));
            break;
            case "hardDisk":
                deviceObjects[element.namespace.name].push(new HardDisk(element.id,element.status,element.replacementCost,element.supplierName,element.serialNumber,element.size,element.transferRate,element.platterSize,element.numberOfPlatters));
            break;
            case "ssd":
                deviceObjects[element.namespace.name].push(new SSD(element.id,element.status,element.replacementCost,element.supplierName,element.serialNumber,element.size,element.transferRate,element.type,element.wearLeveling));
            break;
        }
    });//end of devices.forEach((element)

    console.log("namespaces:",namespaces);
    console.log("deviceObjects",deviceObjects);

    // build html markup for device class cards
    let deviceRowMarkup = namespaces.reduce((acc,current)=>(acc + buildDeviceCard(current)),"");
    let deviceRow = document.getElementById("device-row");
    deviceRow.innerHTML = deviceRowMarkup;

    // build dom components for contents of each class
    // iterate for each class
    console.log("namespaces function:",namespaces);
    namespaces.forEach((namespace)=>{
        console.log("mapping namespace===========================================");
        let devices = deviceObjects[namespace.name];
        console.log(`devices for namespace ${namespace.name}:`,devices);
        
        let card = document.querySelector(`.card[namespace='${namespace.name}'] .device-contents`);

        let row = document.createElement("div");
        row.classList.add("row");
        card.appendChild(row);

        devices.forEach((device)=>{
            console.log("inside devices foreach - device is :",device);

            let id = device._id;
            console.log("id = ",id);

            let column = document.createElement("div");
            column.classList.add("col-12","text-center","device-window");
            column.setAttribute("deviceId",id);
            row.appendChild(column);

            let form = document.createElement("form");
            column.appendChild(form);

            for(let attr in device){
                
                console.log("attr>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                console.log("attr = ",attr);

                if(device[attr].name===undefined) continue;
                
                let name = device[attr].name;
                let value = device[attr].value;
                let type = device[attr].type;
                let possibleValues = device[attr].possibleValues;

                console.log("form inside attr for before field append:",form);

                let field = document.createElement("div");
                field.setAttribute("deviceId",id);
                form.appendChild(field);

                console.log("form inside attr for after field append:",form);

                let input = document.createElement("input");
                let select = document.createElement("select");
                let label = document.createElement("label");

                switch(type){

                    case "flag":
                        field.classList.add("custom-control","custom-switch","text-left");
                        input.setAttribute("type","checkbox");
                        input.classList.add("custom-control-input");
                        input.id = attr+"Switch"+id;
                        if(value===0){
                            input.removeAttribute("checked");
                        } else if (value===1){
                            input.setAttribute("checked","checked");
                        }
                        field.appendChild(input);
                        label.classList.add("custom-control-label");
                        label.setAttribute("for",attr+"Switch"+id);
                        label.innerHTML = name;
                        field.appendChild(label);
                    break;

                    case "boolean":
                        field.classList.add("custom-control","custom-switch","text-left");
                        input.setAttribute("type","checkbox");
                        input.classList.add("custom-control-input");
                        input.id = attr+"Switch"+id;
                        if(!value){
                            input.removeAttribute("checked");
                        } else if (value){
                            input.setAttribute("checked","checked");
                        }
                        field.appendChild(input);
                        label.classList.add("custom-control-label");
                        label.setAttribute("for",attr+"Switch"+id);
                        label.innerHTML = name;
                        field.appendChild(label);
                    break;

                    case "string":
                        field.classList.add("form-group", "text-left");
                        label.setAttribute("for",attr+"Input"+id);
                        label.innerHTML = name;
                        field.appendChild(label);
                        input.setAttribute("type","text");
                        input.setAttribute("placeholder","0.00");
                        input.classList.add("form-control");
                        input.id = attr+"Input"+id;
                        input.value = value;
                        field.appendChild(input);
                    break;

                    case "integer":
                        field.classList.add("form-group", "text-left");
                        label.setAttribute("for",attr+"Input"+id);
                        label.innerHTML = name;
                        field.appendChild(label);
                        input.setAttribute("type","number");
                        input.setAttribute("placeholder","0");
                        input.classList.add("form-control");
                        input.id = attr+"Input"+id;
                        input.value = value;
                        field.appendChild(input);
                    break;

                    case "stringSelect":
                        field.classList.add("form-group", "text-left");
                        label.setAttribute("for",attr+"Select"+id);
                        label.innerHTML = name;
                        field.appendChild(label);
                        select.classList.add("form-control");
                        select.id = attr+"Select"+id;
                        let option = document.createElement("option");
                        option.value = "";
                        option.innerHTML = 'choose ' + name.toLowerCase();
                        select.appendChild(option);
                        possibleValues.forEach((element)=>{
                            let option = document.createElement("option");
                            select.appendChild(option);
                            option.value = element.toLowerCase();
                            option.innerHTML = element;
                            if(element.toLowerCase()==device[attr].value.toLowerCase()){
                                option.setAttribute("selected","selected");
                            }
                        });
                        field.appendChild(select);
                    break;

                    case "currency":
                        field.classList.add("form-group", "text-left");
                        label.setAttribute("for",attr+"Input"+id);
                        label.innerHTML = name;
                        field.appendChild(label);
                        input.setAttribute("type","text");
                        input.setAttribute("placeholder","0.00");
                        input.classList.add("form-control");
                        input.id = attr+"Input"+id;
                        input.value = toCurrency(value);
                        field.appendChild(input);
                    break;

                } // end of switch

            }// end of for(let attr in device)
            
        }); // end of devices.forEach((device)

        console.log("card = ",card);

    }); // end of namespaces.forEach((namespace)

    

}



