import { devices, deviceObjects } from "/database/devices.js";
import { VideoDevice } from "/components/VideoDevice.js";
import { HardDisk } from "/components/HardDisk.js";
import { SSD } from "/components/SSD.js";
import { toCurrency, createUniqueId } from "/utils/custom-functions.js";
import { resetDevicesShowInNamespace, resetNavigationButtonsInNamespace, resetDataButtonsInNamespace, showFirstElementOfEachNamespace } from "/utils/markup-resets.js";
import { bindFieldsToChangeEvent, bindNavigationButtons, bindDataButtons } from "/utils/binders.js";
import { messageUser, askUserYesNo } from "/utils/modals.js";

let updateDeviceInNamespace = function(event){
  event.stopPropagation();
  event.preventDefault();
  let button = event.target;
  let namespace = button.getAttribute("namespace");
  //let updateButton = document.querySelector(`.updateDeviceButton[namespace="${namespace}"]`);
  let actionButtonsNavigation = document.querySelector(`.action-buttons-navigation[namespace="${namespace}"]`);
  let visibleDeviceIndex = actionButtonsNavigation.getAttribute("visibleDeviceIndex");
  let namespaceDevices = document.querySelectorAll(`.device-contents[namespace="${namespace}"] .deviceItem`);
  let device = namespaceDevices[visibleDeviceIndex];
  let deviceId = namespaceDevices[visibleDeviceIndex].getAttribute("deviceId");
  //get through each attribute of device to check what's changed
  let updateBatch = [];
  let fields = device.querySelectorAll(`.deviceField`);
  console.log('fields ======================= ',fields);
  fields.forEach((field)=>{
      let originalValue = field.getAttribute("originalValue");
      let newValue = field.value;
      let contentType = field.getAttribute("contentType");
      switch(contentType){
          case "currency":
              newValue = parseFloat(newValue.replace("$","")).toFixed(2);
              originalValue = parseFloat(originalValue).toFixed(2);
          break;
          case "flag":
              newValue = field.checked == true ? 1 : 0;
          break;
          case "boolean":
              newValue = field.checked == true ? 1 : 0;
          break;
          case "stringSelect":
              newValue = newValue.toLowerCase() == originalValue.toLowerCase() ? originalValue : newValue;
          break;
          default:
              newValue = field.value;
      } // end of switch newValue

      if(originalValue==newValue) return false;

      updateBatch.push({
          "id" : deviceId,
          "for" : field.getAttribute("for"),
          "value" : newValue
      });

  }); // end of field.forEach
  
  // find object to update on deviceObjects array
  // for each element of update
  updateBatch.forEach((updateElement)=>{
      let deviceId = updateElement.id;
      let objectToUpdate = deviceObjects[namespace].find((device)=>device._id==deviceId);
      console.log("objectToUpdate =>", objectToUpdate);
      objectToUpdate[updateElement.for].value = updateElement.value;
      console.log("objectUpdated =>", objectToUpdate);

      //update in database
      let deviceToUpdate = devices.find((device)=>device.id==deviceId);
      console.log("deviceToUpdate =>", deviceToUpdate);
      deviceToUpdate[(updateElement.for).replace("_","")] = updateElement.value;
      console.log("deviceUpdated =>" , deviceToUpdate);

      //persistence of data
      localStorage.setItem("devices", JSON.stringify(devices));

  });

  // disable the update button
  button.disabled = true;
  button.setAttribute("toBeEnabled",true);

  // indicate to user the data was updated
  messageUser("SUCCESS", "The contents were updated with success");

} // end of function updateDeviceInNamespace

export { updateDeviceInNamespace }