import { devices } from "/database/devices.js";
import { buildDeviceCard } from "/templates/deviceCard.js";
import { VideoDevice } from "/components/VideoDevice.js";
import { HardDisk } from "/components/HardDisk.js";
import { SSD } from "/components/SSD.js";

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
        console.log("mapping namespaces");
        let devices = deviceObjects[namespace.name];
        console.log(`devices for namespace ${namespace.name}:`,devices);
        
        let card = document.querySelector(`.card[namespace='${namespace.name}'] .device-contents`);

        let row = document.createElement("div");
        row.classList.add("row");

        devices.forEach((device)=>{
            let column = document.createElement("div");
            column.classList.add("col-12","text-center");
            let columnMarkup = "";
            for(let attr in device){
                let name = device[attr].name==undefined ? device[attr] : device[attr].name;
                columnMarkup += name + ": " + device[attr].value + "<br/>";
            }
            column.innerHTML = columnMarkup;
            row.appendChild(column);
        });

        card.appendChild(row);

    });
}



