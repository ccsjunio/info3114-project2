import { devices, deviceObjects } from "/database/devices.js";
import { VideoDevice } from "/components/VideoDevice.js";
import { HardDisk } from "/components/HardDisk.js";
import { SSD } from "/components/SSD.js";
import { toCurrency, createUniqueId } from "/utils/custom-functions.js";
import { resetDevicesShowInNamespace, resetNavigationButtonsInNamespace, resetDataButtonsInNamespace, showFirstElementOfEachNamespace } from "/utils/markup-resets.js";
import { bindFieldsToChangeEvent, bindNavigationButtons, bindDataButtons } from "/utils/binders.js";
import { messageUser, askUserYesNo } from "/utils/modals.js";


// this function is a callback to delete a device
// called upon the press of the delete button in the namespace
let deleteDeviceFromNamespace = function(event){
    // identify the button pressed and its namespace
    let button = event.target;
    let namespace = button.getAttribute("namespace");

    // confirm that the user really wants to delete the device
    askUserYesNo("Delete this device", "Are you sure you want to delete this device? All information will be permanently be erased!");

    // maps the buttons from the modal
    let askUserYesNoModal = document.getElementById("askUserYesNoModal");
    let buttonCancel = askUserYesNoModal.querySelector("button#answerCancel");
    let buttonYes = askUserYesNoModal.querySelector("button#answerYes");
    buttonYes.setAttribute("namespace",namespace);
    let buttonClose = askUserYesNoModal.querySelector('button.close');

    // listener to the user when it does not confirm the deletion
    // nothing to do in this version
    // the modal is closed as native programming from
    // bootstrap
    buttonCancel.addEventListener("click",(event)=>{
        // nothing to do here
    });

    // listenet to the user when they confirm the deletion action
    buttonYes.addEventListener("click", deleteDevice);
        
} // let deleteDeviceFromNamespace = function(event)

function deleteDevice(){
    event.stopPropagation();
    event.preventDefault();
    let button = event.target; 
    let namespace = button.getAttribute("namespace");
    // map button close
    let buttonCancel = askUserYesNoModal.querySelector("button#answerCancel");
    // map which device is visible, to identify the element to be deleted
    let visibleDeviceIndex = document.querySelector(`.action-buttons-navigation[namespace='${namespace}']`).getAttribute("visibleDeviceIndex");
    // map all the devices in the namespace. the index got above will point to
    // a device in this collection
    let devicesInNamespace = document.querySelectorAll(`.device-contents[namespace='${namespace}'] .deviceItem`);
    // if the index points to a non-existent object for some reason,
    // do not execute anything
    if(devicesInNamespace[visibleDeviceIndex]===undefined) return;
    // gets the device id in order to delete the device from
    // the database and collection of objects
    let deviceId = devicesInNamespace[visibleDeviceIndex].getAttribute("deviceId");
    // reset from devices array, in our instantiation of a database
    let indexOfDeviceToRemoveFromDevices = devices.findIndex((device)=>device.id==deviceId);
    devices.splice(indexOfDeviceToRemoveFromDevices,1);
    // reset from deviceObjects array
    let indexOfDeviceToRemoveFromDevicesObjects = deviceObjects[namespace].findIndex((device)=>device._id==deviceId);
    deviceObjects.splice(indexOfDeviceToRemoveFromDevicesObjects,1);
    // reset on local storage
    localStorage.setItem("devices", JSON.stringify(devices));
    // remove index from namespace markup
    // this erases the markup from the namespace
    // in the screen 
    // devicesInNamespace.splice(visibleDeviceIndex,1);
    devicesInNamespace[visibleDeviceIndex].remove();
    // hide the modal by triggering the
    // close button and letting the construct
    // from bootstrap take the action
    buttonCancel.click();
    // reset the arrangement of devices remaining in the
    // namespace
    resetDevicesShowInNamespace(namespace);
} // end of deleteDevice

export { deleteDeviceFromNamespace }