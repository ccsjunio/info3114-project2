import { devices } from "/database/devices.js";
import { buildDeviceCard } from "/templates/deviceCard.js";
import { Device } from "/components/Device.js";

window.onload = function(){
    initialize();
}

function initialize(){
    let deviceRowMarkup = devices.reduce((acc,current)=>(acc + buildDeviceCard(current)),"");
    let deviceRow = document.getElementById("device-row");
    deviceRow.innerHTML = deviceRowMarkup;
}



