import { devices, deviceObjects } from "/database/devices.js";
import { VideoDevice } from "/components/VideoDevice.js";
import { HardDisk } from "/components/HardDisk.js";
import { SSD } from "/components/SSD.js";
import { toCurrency, createUniqueId } from "/utils/custom-functions.js";
import { resetDevicesShowInNamespace, resetNavigationButtonsInNamespace, resetDataButtonsInNamespace, showFirstElementOfEachNamespace } from "/utils/markup-resets.js";
import { bindFieldsToChangeEvent, bindNavigationButtons, bindDataButtons } from "/utils/binders.js";
import { messageUser, askUserYesNo } from "/utils/modals.js";


let newDeviceToNamespace = function(event){
  event.stopPropagation();
  event.preventDefault();
  let button = event.target;
  let namespace = button.getAttribute("namespace");
  // let updateButton = document.querySelector(`.updateDeviceButton[namespace="${namespace}"]`);
  let actionButtonsNavigation = document.querySelector(`.action-buttons-navigation[namespace="${namespace}"]`);
  // add new device markup to namespace
  addNewDeviceMarkupToNamespace(namespace);
  return true;
} // end of function newDeviceToNamespace

function addNewDeviceMarkupToNamespace(namespace){
  
  // setup a new instance of the device according to namespace
  let device;
  switch(namespace){
      case "videoDevice":
          device = new VideoDevice;
      break;
      case "hardDisk":
          device = new HardDisk;
      break;
      case "ssd":
          device = new SSD;
      break;
  }

  // set up how navigation buttons will be enabled
  let newButton = document.querySelector(`.newDeviceButton[namespace="${namespace}"]`);
  // disable new device button so that no other functions with overlap
  newButton.disabled = true; 

  // select the card that is the container for the devices in the namespace
  //let card = document.querySelector(`.card[namespace='${namespace}'] .device-contents`);

  // each bootstrap row contains columns that are devices inside the namespace
  let row = document.querySelector(`.card[namespace='${namespace}'] .device-contents .row`);
  if(row===null){
      row = document.createElement("div");
      row.classList.add("row");
      document.querySelector(`.card[namespace='${namespace}'] .device-contents`).appendChild(row);
  }

      //console.log("inside devices foreach - device is :",device);

      // the provisory id for the device will be "new"
      // this will be changed only after the user fill the
      // fields and save the new device
      let id = "new";
      //console.log("id = ",id);

      // each column is a field
      let column = document.createElement("div");
      column.classList.add("col-12","text-center","device-window","deviceItem");
      column.setAttribute("deviceId",id);
      column.setAttribute("namespace",namespace);
      column.style.display = "none";
      row.insertBefore(column,row.childNodes[0]);

      let form = document.createElement("form");
      column.appendChild(form);

      console.log("device on new device = ", device);

      for(let attr in device){

          console.log("attr = ", attr);

          if(device[attr]===null) continue;
          if(device[attr].name===undefined) continue;
          
          let name = device[attr].name;
          let value = device[attr].value;
          let type = device[attr].type;
          let possibleValues = device[attr].possibleValues;

          //console.log("form inside attr for before field append:",form);
          let field = document.createElement("div");
          field.setAttribute("deviceId",id);
          field.setAttribute("namespace",namespace);
          form.appendChild(field);

          //console.log("form inside attr for after field append:",form);
          let input = document.createElement("input");
          let select = document.createElement("select");
          let label = document.createElement("label");

          switch(type){

              case "flag":
                  field.classList.add("custom-control","custom-switch","text-left");
                  input.setAttribute("type","checkbox");
                  input.setAttribute("deviceId",id);
                  input.setAttribute("namespace",namespace);
                  input.setAttribute("originalValue",0);
                  input.setAttribute("for",attr);
                  input.setAttribute("contentType","flag");
                  input.classList.add("custom-control-input");
                  input.classList.add("deviceField");
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
                  input.setAttribute("deviceId",id);
                  input.setAttribute("namespace",namespace);
                  input.setAttribute("originalValue",false);
                  input.setAttribute("for",attr);
                  input.setAttribute("contentType","boolean");
                  input.classList.add("custom-control-input");
                  input.classList.add("deviceField");
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
                  input.setAttribute("placeholder","write the " + name);
                  input.setAttribute("deviceId",id);
                  input.setAttribute("namespace",namespace);
                  input.setAttribute("originalValue",value);
                  input.setAttribute("for",attr);
                  input.setAttribute("contentType","string");
                  input.classList.add("form-control");
                  input.classList.add("deviceField");
                  input.id = attr+"Input"+id;
                  input.value = "";
                  field.appendChild(input);
              break;

              case "integer":
                  field.classList.add("form-group", "text-left");
                  label.setAttribute("for",attr+"Input"+id);
                  label.innerHTML = name;
                  field.appendChild(label);
                  input.setAttribute("type","number");
                  input.setAttribute("placeholder","0");
                  input.setAttribute("deviceId",id);
                  input.setAttribute("namespace",namespace);
                  input.setAttribute("originalValue",value);
                  input.setAttribute("for",attr);
                  input.setAttribute("contentType","integer");
                  input.classList.add("form-control");
                  input.classList.add("deviceField");
                  input.id = attr+"Input"+id;
                  input.value = 0;
                  field.appendChild(input);
              break;

              case "stringSelect":
                  field.classList.add("form-group", "text-left");
                  label.setAttribute("for",attr+"Select"+id);
                  label.innerHTML = name;
                  field.appendChild(label);
                  select.classList.add("form-control");
                  select.classList.add("deviceField");
                  select.id = attr+"Select"+id;
                  select.setAttribute("deviceId",id);
                  select.setAttribute("namespace",namespace);
                  select.setAttribute("originalValue",value);
                  select.setAttribute("for",attr);
                  select.setAttribute("contentType","stringSelect");
                  let option = document.createElement("option");
                  option.value = "";
                  option.innerHTML = 'choose ' + name.toLowerCase();
                  select.appendChild(option);
                  possibleValues.forEach((element)=>{
                      let option = document.createElement("option");
                      select.appendChild(option);
                      option.value = element.toLowerCase();
                      option.innerHTML = element;
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
                  input.setAttribute("deviceId",id);
                  input.setAttribute("namespace",namespace);
                  input.setAttribute("originalValue",value);
                  input.setAttribute("for",attr);
                  input.setAttribute("contentType","currency");
                  input.classList.add("form-control");
                  input.classList.add("deviceField");
                  input.id = attr+"Input"+id;
                  input.value = toCurrency(value);
                  field.appendChild(input);
              break;

          } // end of switch

      }// end of for(let attr in device)

      // add a save button
      let newDeviceActionButtons = document.createElement("div");
      form.appendChild(newDeviceActionButtons);
      newDeviceActionButtons.classList.add("row", "form-group", "newDeviceActionButtons");
      newDeviceActionButtons.setAttribute("namespace",namespace);
      
      let saveButtonColumn = document.createElement("div");
      newDeviceActionButtons.appendChild(saveButtonColumn);
      saveButtonColumn.classList.add("col-6", "text-center");

      let cancelSaveButtonColumn = document.createElement("div");
      newDeviceActionButtons.appendChild(cancelSaveButtonColumn);
      cancelSaveButtonColumn.classList.add("col-6", "text-center");

      let saveButton = document.createElement("button");
      saveButtonColumn.appendChild(saveButton);
      saveButton.classList.add("btn", "btn-success", "saveNewDeviceButton");
      saveButton.value = "save new device";
      saveButton.innerHTML = "save";
      saveButton.setAttribute("namespace",namespace);
      saveButton.setAttribute("id","new");
      saveButton.addEventListener("click", saveNewDevice);

      let cancelSaveButton = document.createElement("button");
      cancelSaveButtonColumn.appendChild(cancelSaveButton);
      cancelSaveButton.classList.add("btn", "btn-danger", "cancelSaveNewDeviceButton");
      cancelSaveButton.value = "cancel saving new device";
      cancelSaveButton.innerHTML = "cancel";
      cancelSaveButton.setAttribute("namespace",namespace);
      cancelSaveButton.setAttribute("id","new");
      cancelSaveButton.addEventListener("click", cancelSaveNewDevice);
      
      
  //console.log("card = ",card);

  // disable all visibilities from namespace
  row.childNodes.forEach((element)=>{
      element.style.display = "none";
  })
  row.childNodes[0].style.display = "block";

  // disable all navigation and data buttons for the namespace
  let navigationButtons = document.querySelectorAll(`.action-buttons-navigation[namespace='${namespace}'] button`);
  let dataButtons = document.querySelectorAll(`.action-buttons-data[namespace='${namespace}'] button`);

  navigationButtons.forEach((button)=>button.disabled = true);
  dataButtons.forEach((button)=>button.disabled=true);

} // end of addNewDeviceToNamespace

function saveNewDevice(event){
    event.preventDefault();
    let button = event.target;
    let namespace = button.getAttribute("namespace");
    let deviceItem = document.querySelector(`.deviceItem[deviceId='new'][namespace='${namespace}']`);
    let fields = document.querySelectorAll(`.deviceField[deviceId='new'][namespace='${namespace}']`);
    console.log("fields = ", fields);
    
    // build a unique id for the new device
    let deviceId = createUniqueId();
    console.log("unique id created for new device: ", deviceId);
    
    // collect data from the new device form
    
    let deviceObject; // for the array of device objects from models
    switch(namespace){
        case "videoDevice":
            deviceObject = new VideoDevice;
        break;
        case "hardDisk":
            deviceObject = new HardDisk;
        break;
        case "ssd":
            deviceObject = new SSD;
        break;
    }
    deviceObject._id = deviceId;
    console.log("device to insert the new values = ", deviceObject);

    // change every element with device that has the attribute new
    let elementsWithDeviceIdNew = document.querySelectorAll(`[deviceId='new'][namespace='${namespace}']`);
    elementsWithDeviceIdNew.forEach((element)=>element.setAttribute("deviceid",deviceId));

    let device = {
        id : deviceId,
        namespace : { 
            name : deviceObject._namespace.name,
            title : deviceObject._namespace.title
        }
     }; // for the array of device objects from database

    fields.forEach((field)=>{
        field.setAttribute("deviceId",deviceId);
        let _for = field.getAttribute("for");
        field.id = _for + deviceId;
        let contentType = field.getAttribute("contenttype");
        let value = field.value;
        switch(contentType){
            case "flag":
                value = value==="on" ? 1 : 0;
            break;
            case "boolean":
                value = value==="on" ? true : false;
            break;
            case "string":
                value = value;
            break;
            case "currency":
                value = parseFloat(value.replace("$","")).toFixed(2);
            break;
            case "integer":
                value = parseInt(+value);
            case "stringSelect":
                value = value;
            break;
            default:
                value = value;
            break;
        } // end of switch contentType
        field.setAttribute("originalValue",value);
        field.setAttribute("deviceId",deviceId);
        console.log("_for = ", _for);
        deviceObject[_for].value = value;
        _for = _for.replace("_","");
        device[_for] = value;
        
    });//fields.forEach((field)=>
    console.log("device with values attributed", device);
    
    console.log("deviceObjects before = ", deviceObjects);
    deviceObjects[namespace].push(deviceObject);
    console.log("deviceObjects after = ", deviceObjects);

    console.log("devices before = ", devices);
    devices.push(device);
    console.log("devices after = ", devices);

    // change attributes from the device card
    //TODO: check the original value for the check fields

    // remove control buttons
    let actionButtons = document.querySelector(`.newDeviceActionButtons[namespace='${namespace}']`);
    actionButtons.remove();

    // reset namespace framework buttons
    resetDevicesShowInNamespace(namespace)

    // add device to devices and device objects
    // done

    //bind fields to change event
    bindFieldsToChangeEvent();

    // add device to localStorage
    localStorage.setItem("devices", JSON.stringify(devices));


    console.log("clicked to save new device");
} // end of saveNewDevice

function cancelSaveNewDevice(event){
    event.preventDefault();
    let button = event.target;
    let namespace = button.getAttribute("namespace");

    console.log("clicked to cancel save new device - confirming.....");

    askUserYesNo("Cancel new device", "Are you sure you want to cancel this new device? All information entered will be lost!");

    let askUserYesNoModal = document.getElementById("askUserYesNoModal");
    let buttonCancel = askUserYesNoModal.querySelector("button#answerCancel");
    let buttonYes = askUserYesNoModal.querySelector("button#answerYes");
    let buttonClose = askUserYesNoModal.querySelector('button.close');

    buttonCancel.addEventListener("click",(event)=>{
        console.log("clicked on close - do not cancel the new device");
        // nothing to do here
    });

    buttonYes.addEventListener("click",(event)=>{
        console.log("clicked on yes - to cancel the new device");
        //delete the new device markup
        let newDevice = document.querySelector(`.deviceItem[deviceid='new'][namespace='${namespace}']`);
        console.log(`query selector: .deviceItem[deviceid='new'][namespace='${namespace}']`);
        console.log("new device to delete: ", newDevice);
        newDevice.remove();
        //rearrange the devices in the namespace and reset buttons state
        resetDevicesShowInNamespace(namespace);
        //hide the modal
        buttonClose.click();
    });

    
} // end of cancelSaveNewDevice

export { newDeviceToNamespace }