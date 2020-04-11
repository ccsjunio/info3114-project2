import { devices, deviceObjects } from "/database/devices.js";
import { VideoDevice } from "/components/VideoDevice.js";
import { HardDisk } from "/components/HardDisk.js";
import { SSD } from "/components/SSD.js";
import { toCurrency, createUniqueId } from "/utils/custom-functions.js";
import { resetDevicesShowInNamespace, resetNavigationButtonsInNamespace, resetDataButtonsInNamespace, showFirstElementOfEachNamespace } from "/utils/markup-resets.js";
import { bindFieldsToChangeEvent, bindNavigationButtons, bindDataButtons } from "/utils/binders.js";
import { messageUser, askUserYesNo } from "/utils/modals.js";

// callback function to add a new device to namespace
// this is called upon pressing the button "new"
// identifies which button was pressed and from
// which namespace
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

// function called by the callback that in fact add
// a new device to the namespace, in database, array,
// localStorage and as a markup in the screen
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
  // if there is no rows in the container due to deletion of
  // all devices, one must be created to hold the devices columns
  if(row===null){
      row = document.createElement("div");
      row.classList.add("row");
      document.querySelector(`.card[namespace='${namespace}'] .device-contents`).appendChild(row);
  }

    // the provisory id for the device will be "new"
    // this will be changed only after the user fill the
    // fields and save the new device
    let id = "new";

    // each column here is a device, following
    // bootstrap pattern. The new device
    // will be a new column in the row in
    // the namespace container. This will
    // follow almost the same code that
    // populates the containers in the
    // initial pass, with the information
    // from database
    let column = document.createElement("div");
    column.classList.add("col-12","text-center","device-window","deviceItem");
    column.setAttribute("deviceId",id);
    column.setAttribute("namespace",namespace);
    column.style.display = "none";
    // the new device markup is placed in the first position
    // of the collection of the devices in the namespace
    row.insertBefore(column,row.childNodes[0]);

    let form = document.createElement("form");
    column.appendChild(form);

    // each attribute from the device will
    // be a field in the form
    for(let attr in device){

        // if the attribute is not defined, for some
        // reason, skip this iteration
        if(device[attr]===null) continue;
        // if the attribute has no name of itself, like
        // the id attribute, skip this iteration
        // the user does not change the identifier
        // of the device
        if(device[attr].name===undefined) continue;
        
        // get the information of each attribute 
        // in order to create the correct fields
        let name = device[attr].name;
        let value = device[attr].value;
        let type = device[attr].type;
        let possibleValues = device[attr].possibleValues;

        //console.log("form inside attr for before field append:",form);
        let field = document.createElement("div");
        field.setAttribute("deviceId",id);
        field.setAttribute("namespace",namespace);
        form.appendChild(field);

        // create the possible dom elements to be used
        // in the form, according to the type of
        // field
        let input = document.createElement("input");
        let select = document.createElement("select");
        let label = document.createElement("label");

        // there will be no values for the fields, 
        // just zero for numeric and empty strings
        // for text. flags and boolen set to inactive
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

    // add a save and cancel button for the new device
    // the user will have the option to save the
    // information entered for a new device or
    // cancel the creation of the new device
    // this block only creates the container for this
    // buttons, a row to contain the button columns
    // following the bootstrap notation 
    let newDeviceActionButtons = document.createElement("div");
    form.appendChild(newDeviceActionButtons);
    newDeviceActionButtons.classList.add("row", "form-group", "newDeviceActionButtons");
    newDeviceActionButtons.setAttribute("namespace",namespace);
    
    // create the column that will be the container 
    // for the save button itself
    let saveButtonColumn = document.createElement("div");
    newDeviceActionButtons.appendChild(saveButtonColumn);
    saveButtonColumn.classList.add("col-6", "text-center");

    // create the column that will be the container
    // for the cancel button itself
    let cancelSaveButtonColumn = document.createElement("div");
    newDeviceActionButtons.appendChild(cancelSaveButtonColumn);
    cancelSaveButtonColumn.classList.add("col-6", "text-center");

    // create the save button itself
    // and add a listener to detect the click
    // and direct to the function that creeate the device
    let saveButton = document.createElement("button");
    saveButtonColumn.appendChild(saveButton);
    saveButton.classList.add("btn", "btn-success", "saveNewDeviceButton");
    saveButton.value = "save new device";
    saveButton.innerHTML = "save";
    saveButton.setAttribute("namespace",namespace);
    saveButton.setAttribute("id","new");
    saveButton.addEventListener("click", saveNewDevice);

    // create the cancel button itself
    // and add a listener to detect the click
    // and direct to the function that cancel the
    // creation of the device
    let cancelSaveButton = document.createElement("button");
    cancelSaveButtonColumn.appendChild(cancelSaveButton);
    cancelSaveButton.classList.add("btn", "btn-danger", "cancelSaveNewDeviceButton");
    cancelSaveButton.value = "cancel saving new device";
    cancelSaveButton.innerHTML = "cancel";
    cancelSaveButton.setAttribute("namespace",namespace);
    cancelSaveButton.setAttribute("id","new");
    cancelSaveButton.addEventListener("click", cancelSaveNewDevice);
      
    // disable all visibilities from namespace
    // this is necessary to show the form for the
    // new device over all others in the namespace
    row.childNodes.forEach((element)=>{
        element.style.display = "none";
    })
    // display only the new device markup
    // that is in the first position of the
    // collection of devices in the namespace
    row.childNodes[0].style.display = "block";

    // disable all navigation and data buttons for the namespace
    // this prevents the user from creating other new device
    // markup
    let navigationButtons = document.querySelectorAll(`.action-buttons-navigation[namespace='${namespace}'] button`);
    let dataButtons = document.querySelectorAll(`.action-buttons-data[namespace='${namespace}'] button`);
    navigationButtons.forEach((button)=>button.disabled = true);
    dataButtons.forEach((button)=>button.disabled=true);

} // end of addNewDeviceToNamespace

// callback function called by the click
// of the save button in the new device markup
function saveNewDevice(event){
    event.preventDefault();
    let button = event.target;
    let namespace = button.getAttribute("namespace");
    let deviceItem = document.querySelector(`.deviceItem[deviceId='new'][namespace='${namespace}']`);
    let fields = document.querySelectorAll(`.deviceField[deviceId='new'][namespace='${namespace}']`);
    console.log("fields = ", fields);
    
    // build a unique id for the new device
    // this is used to save the device to the
    // instance of the database
    // in this case will be only the array in the module database
    // that can be replaced by a real database connection
    let deviceId = createUniqueId();
    
    // collect data from the new device form
    // create a repository variable for the
    // device object, according to the
    // namespace
    let deviceObject; 
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

    // load the id to the device
    deviceObject._id = deviceId;

    // find the markup with the device new in this namespace
    // it is possible to create on markup for each
    // namespace at the same time
    let elementsWithDeviceIdNew = document.querySelectorAll(`[deviceId='new'][namespace='${namespace}']`);
    elementsWithDeviceIdNew.forEach((element)=>element.setAttribute("deviceid",deviceId));

    // build the construct for the
    // device object that will be saved to the 
    // database
    let device = {
        id : deviceId,
        namespace : { 
            name : deviceObject._namespace.name,
            title : deviceObject._namespace.title
        }
     }; // end of device

    // load the device with the fields in the form
    // according to the object parameters
    // in this version the values of the
    // fields are not checked
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
        deviceObject[_for].value = value;
        _for = _for.replace("_","");
        device[_for] = value;
        
    });//fields.forEach((field)=>

    // load the array of instance of device classes
    // with this new object device
    deviceObjects[namespace].push(deviceObject);

    // load the array for database with this
    // new device object
    devices.push(device);

    // remove control buttons
    // save and cancel, since the new
    // device is saved
    let actionButtons = document.querySelector(`.newDeviceActionButtons[namespace='${namespace}']`);
    actionButtons.remove();

    // reset namespace devices in the frame of
    // the namespace
    resetDevicesShowInNamespace(namespace)

    // bind fields to change event
    // as this is a new markup, the
    // fields didn't existed in the
    // DOM before and new listeners must be
    // applied
    bindFieldsToChangeEvent();

    // add device to localStorage
    // so when the browser is reloaded the
    // data will persist
    localStorage.setItem("devices", JSON.stringify(devices));

} // end of saveNewDevice

// callback function to cancel
// the creation of a new device
// responds to the cancel button
// in the markup of the new device
function cancelSaveNewDevice(event){
    event.preventDefault();
    let button = event.target;
    let namespace = button.getAttribute("namespace");

    // ask the user to confirm if they really want to cancel
    // the creation, as all data will be lost
    askUserYesNo("Cancel new device", "Are you sure you want to cancel this new device? All information entered will be lost!");

    // map the buttons from the modal
    let askUserYesNoModal = document.getElementById("askUserYesNoModal");
    let buttonCancel = askUserYesNoModal.querySelector("button#answerCancel");
    let buttonYes = askUserYesNoModal.querySelector("button#answerYes");
    let buttonClose = askUserYesNoModal.querySelector('button.close');

    // add a listener to the cancel button
    // meaning the user does not want to cancel the
    // creation of the new device
    // in this version, this only close the modal
    // the modal is closed by its own native construction
    buttonCancel.addEventListener("click",(event)=>{
        console.log("clicked on close - do not cancel the new device");
        // nothing to do here
    });

    // add a listener to the confirm cancel button
    // this confirms that the user does NOT want to create
    // the new device anymore
    buttonYes.addEventListener("click",(event)=>{
        // delete the new device markup
        let newDevice = document.querySelector(`.deviceItem[deviceid='new'][namespace='${namespace}']`);
        newDevice.remove();
        // rearrange the devices in the namespace and reset buttons state
        resetDevicesShowInNamespace(namespace);
        // hide the modal by triggering a click
        // event and let the native construction of
        // the bootstrap button take action
        buttonClose.click();
    });
    
} // end of cancelSaveNewDevice

export { newDeviceToNamespace }