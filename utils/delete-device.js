import { devices, deviceObjects } from "/database/devices.js";
import { VideoDevice } from "/components/VideoDevice.js";
import { HardDisk } from "/components/HardDisk.js";
import { SSD } from "/components/SSD.js";
import { toCurrency, createUniqueId } from "/utils/custom-functions.js";
import { resetDevicesShowInNamespace, resetNavigationButtonsInNamespace, resetDataButtonsInNamespace, showFirstElementOfEachNamespace } from "/utils/markup-resets.js";
import { bindFieldsToChangeEvent, bindNavigationButtons, bindDataButtons } from "/utils/binders.js";
import { messageUser, askUserYesNo } from "/utils/modals.js";



let deleteDeviceFromNamespace = function(event){
  let button = event.target;
  let namespace = button.getAttribute("namespace");

  // confirm that the user really wants to delete the device
  askUserYesNo("Delete this device", "Are you sure you want to delete this device? All information will be permanently be erased!");

  let askUserYesNoModal = document.getElementById("askUserYesNoModal");
  let buttonCancel = askUserYesNoModal.querySelector("button#answerCancel");
  let buttonYes = askUserYesNoModal.querySelector("button#answerYes");
  let buttonClose = askUserYesNoModal.querySelector('button.close');

  buttonCancel.addEventListener("click",(event)=>{
      console.log("clicked on close - do not delete the device");
      // nothing to do here
  });

  buttonYes.addEventListener("click",(event)=>{
      console.log("clicked on yes - to delete the device");
      let visibleDeviceIndex = document.querySelector(`.action-buttons-navigation[namespace='${namespace}']`).getAttribute("visibleDeviceIndex");
      let devicesInNamespace = document.querySelectorAll(`.device-contents[namespace='${namespace}'] .deviceItem`);
      if(devicesInNamespace[visibleDeviceIndex]===undefined) return;
      let deviceId = devicesInNamespace[visibleDeviceIndex].getAttribute("deviceId");
      //reset from devices array
      let indexOfDeviceToRemoveFromDevices = devices.findIndex((device)=>device.id==deviceId);
      devices.splice(indexOfDeviceToRemoveFromDevices,1);
      //reset from deviceObjects array
      console.log("deviceObjects=",deviceObjects);
      console.log("devices=",devices);
      let indexOfDeviceToRemoveFromDevicesObjects = deviceObjects[namespace].findIndex((device)=>device._id==deviceId);
      deviceObjects.splice(indexOfDeviceToRemoveFromDevicesObjects,1);
      //reset on local storage
      localStorage.setItem("devices", JSON.stringify(devices));
      //remove index from namespace markup
      devicesInNamespace[visibleDeviceIndex].remove();
      resetDevicesShowInNamespace(namespace);
      if(devicesInNamespace===undefined){
          button.disabled.true;
      }
      //hide the modal
      buttonClose.click();
  });

}

export { deleteDeviceFromNamespace }