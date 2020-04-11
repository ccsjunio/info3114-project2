import { devices, deviceObjects } from "/database/devices.js";
import { VideoDevice } from "/components/VideoDevice.js";
import { HardDisk } from "/components/HardDisk.js";
import { SSD } from "/components/SSD.js";
import { toCurrency, createUniqueId } from "/utils/custom-functions.js";
import { resetDevicesShowInNamespace, resetNavigationButtonsInNamespace, resetDataButtonsInNamespace, showFirstElementOfEachNamespace } from "/utils/markup-resets.js";
import { bindFieldsToChangeEvent, bindNavigationButtons, bindDataButtons } from "/utils/binders.js";
import { messageUser, askUserYesNo } from "/utils/modals.js";

// callback function to update information on a device
// called upon the click of the update button, that is
// only enabled by the changing of some field
// in this version, the user may change the field
// back to the original information but the update button
// will be still enabled
let updateDeviceInNamespace = function(event){
    event.stopPropagation();
    event.preventDefault();
    // identity which button from which 
    // namespace was clicked
    let button = event.target;
    let namespace = button.getAttribute("namespace");
    // map the index of the device to be updated in the
    // collection of devices in the namespace
    let actionButtonsNavigation = document.querySelector(`.action-buttons-navigation[namespace="${namespace}"]`);
    let visibleDeviceIndex = actionButtonsNavigation.getAttribute("visibleDeviceIndex");
    // map the collection of devices in namespace in order
    // to identify the device to be updated
    let namespaceDevices = document.querySelectorAll(`.device-contents[namespace="${namespace}"] .deviceItem`);
    // map the device to be updated
    let device = namespaceDevices[visibleDeviceIndex];
    // collect the device id in order to update the information also
    // in the database
    let deviceId = namespaceDevices[visibleDeviceIndex].getAttribute("deviceId");
    // create an array to fill with the
    // fields to be updated
    let updateBatch = [];
    // map all the fields in the form
    // they were tagged with a class in order
    // to easy the process of mapping them
    let fields = device.querySelectorAll(`.deviceField`);
    // iterate through each field
    // each field in the form has the information of
    // the original value
    // only values that in fact were changed will be included in
    // the batch
    fields.forEach((field)=>{
      let originalValue = field.getAttribute("originalValue");
      let newValue = field.value;
      let contentType = field.getAttribute("contentType");
      // this convert the values according to what is 
      // necessary to store in the database,
      // e.g. boolean values are converted from "on" to true
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

      // if the values are the same, there is no change
      // skip to the next iteration/field
      if(originalValue==newValue) return false;

      // fill the update batch with the value/field
      // to be updated, with information of attribute
      // for the array that contains the database
      updateBatch.push({
          "id" : deviceId,
          "for" : field.getAttribute("for"),
          "value" : newValue
      });

  }); // end of field.forEach
  
    // get the update batch and iterate through each
    // to update the modified information in the 
    // database
    updateBatch.forEach((updateElement)=>{
    // identify the device id to pont to the correct device in the
    // database and array of objects
    let deviceId = updateElement.id;
    let objectToUpdate = deviceObjects[namespace].find((device)=>device._id==deviceId);
    // update the value of the field in the array of objects
    objectToUpdate[updateElement.for].value = updateElement.value;
    // update in database, finding the device through the id
    let deviceToUpdate = devices.find((device)=>device.id==deviceId);
    deviceToUpdate[(updateElement.for).replace("_","")] = updateElement.value;
    // persistence of data
    // update the device in the local storage
    // uopdating in fact the whole collection of devices
    // formatttin the collection as a string before
    localStorage.setItem("devices", JSON.stringify(devices));

  });

    // disable the update button, as the information is
    // updated
    button.disabled = true;
    button.setAttribute("toBeEnabled",true);

    // indicate to user the data was updated
    messageUser("SUCCESS", "The contents were updated with success");

} // end of function updateDeviceInNamespace

export { updateDeviceInNamespace }