// import modules for the main file
import { devices, deviceObjects } from "/database/devices.js";
import { namespaces } from "/database/namespaces.js";
import { messageUser, askUserYesNo } from "/utils/modals.js";
import { resetDevicesShowInNamespace, resetNavigationButtonsInNamespace, resetDataButtonsInNamespace, showFirstElementOfEachNamespace } from "/utils/markup-resets.js";
import { buildDeviceCard } from "/templates/deviceCard.js";
import { buildDevicesMarkupsForEachNamespace } from "/templates/devicesMarkups.js";
import { bindFieldsToChangeEvent, bindNavigationButtons, bindDataButtons } from "/utils/binders.js";
import { VideoDevice } from "/components/VideoDevice.js";
import { HardDisk } from "/components/HardDisk.js";
import { SSD } from "/components/SSD.js";
import { toCurrency, createUniqueId } from "/utils/custom-functions.js";

/*
*   Functions to be executed when the page finishes loading
*/
window.onload = function(){
    
    // call initialization procedures
    initialize();

    // bind add, delete and update buttons to clicks
    // and attach to callback functions to execute
    // the data procedures
    bindDataButtons();

    // bind navigation buttons with click events
    // and attach to callback functions to navigate
    // through the devices in each namespace
    bindNavigationButtons();

    // bind each and every field to listen to
    // changing on the values by the user
    // then enabling the update button
    bindFieldsToChangeEvent();

} // end of window.onload

/*
* Initialization functions
*/
function initialize(){

    // load namespaces to deviceObjects
    // in order to organize devices into groups
    // of objects based on the classes for
    // each object
    // namespaces here are the separation regions in 
    // the front end and also the classes of devices
    // that are loaded
    namespaces.forEach((namespace)=>{
        if(deviceObjects[namespace.name] === undefined){
            deviceObjects[namespace.name] = [];
        }
    });

    // create instance of the objects models
    // and load them on device objects
    // the devices are loaded from a virtualization
    // of a database
    // in a application connected to a database
    // devices would be updated and loaded from a database
    // here is an object of devices that serves as a database
    // regardless the origin
    devices.forEach((element)=>{
        if(namespaces.find((item)=>item.name===element.namespace.name)===undefined){
            namespaces.push(element.namespace);
        }
        // verify which is the device in order
        // to load in the right "section" on devicesObjects
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

    // this one calls a builder
    // for the skeleton of each namespace (device type)
    // including navigation and data buttons
    // including the container for the devices
    // from each class
    let namespaceCardMarkup = namespaces.reduce((acc,current)=>(acc + buildDeviceCard(current)),"");
    let containerOfNamespaces = document.getElementById("device-row");
    containerOfNamespaces.innerHTML = namespaceCardMarkup;

    // build the markups for each device in each
    // namespace, then fill in each namespace
    // with their respective devices
    buildDevicesMarkupsForEachNamespace();
    

    // in each namespace show the first element
    // of the collection of devices ative
    // for the namespace (type of device)
    showFirstElementOfEachNamespace();

} // end of initialize


