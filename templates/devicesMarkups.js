import { devices, deviceObjects } from "/database/devices.js";
import { namespaces } from "/database/namespaces.js";
import { toCurrency, createUniqueId } from "/utils/custom-functions.js";

// build the markups for each device in each
// namespace, then fill in each namespace
// with their respective devices
let buildDevicesMarkupsForEachNamespace = function(){
  namespaces.forEach((namespace)=>{

    // load variable devices from the
    // array of objects of devices
    // specific from the current namespace
    // in the iteration
    let devices = deviceObjects[namespace.name];
  
    // if there are no devices for this namespace go to the next namespace
    if(devices===undefined) return;
    
    // set up how navigation buttons will be enabled
    let previousButton = document.querySelector(`.previousDeviceButton[namespace="${namespace.name}"]`);
    let nextButton = document.querySelector(`.nextDeviceButton[namespace="${namespace.name}"]`);
    let updateButton = document.querySelector(`.updateDeviceButton[namespace="${namespace.name}"]`);
    // disable previous because the first device in the list will be visible at first
    previousButton.disabled = true; 
    // if there is only one device in the namespace, next will also be disabled
    if(devices.length===1) {
        nextButton.disabled = true;
    } // end of setup of navigation buttons
    //disable update button, that will be enabled only upon a modification of some field
    updateButton.disabled = true;
  
    // load the container of devices in the 
    // namespace/device type card
    let card = document.querySelector(`.card[namespace='${namespace.name}'] .device-contents`);
  
    // as we are using bootstrap
    // a row will be the container
    // of columns inside the container
    // of the namespace
    let row = document.createElement("div");
    row.classList.add("row");
    card.appendChild(row);
  
    // iterate through each device to
    // build the columns inside the row
    devices.forEach((device)=>{
  
        // get the device id
        // this id is from the database
        // and is an unique name
        let id = device.id;
  
        // each column, as using bootstrap
        // will represent a device
        // each device and field will have
        // the information of the namespace and
        // the device id to be easily referenced
        // the deviceid will be the attribute with
        // the id from the device in the database
        let column = document.createElement("div");
        column.classList.add("col-12","text-center","device-window","deviceItem");
        column.setAttribute("deviceId",id);
        column.setAttribute("namespace",namespace.name);
        column.style.display = "none";
        row.appendChild(column);
  
        // the form element that will contain
        // all fields that define this device
        // in this namespace
        let form = document.createElement("form");
        column.appendChild(form);
  
        // each attribute of the device object
        // is a field in the form
        // as each namespace has different
        // attributes, the iteration is made
        // in a way to have the information 
        // from the field and build the correct 
        // form element
        for(let attr in device){
  
            if(device[attr].name===undefined) continue;
            
            // each attribute/field in the object
            // of the device will have all information
            // necessary to build the correct form
            // element
            // the possible values will allow to
            // mount options for checkbox fieldsets
            // and to select elements
            let name = device[attr].name;
            let value = device[attr].value;
            let type = device[attr].type;
            let possibleValues = device[attr].possibleValues;
    
            // append the field to the form
            // before defining it
            let field = document.createElement("div");
            field.setAttribute("deviceId",id);
            form.appendChild(field);
    
            // build different form elements that will
            // be used according to the attribute/field type
            let input = document.createElement("input");
            let select = document.createElement("select");
            let label = document.createElement("label");
  
            // define which kind of field it is
            // and define all the attributes necessary
            // for easy and accurate reference from the
            // system after they are built
            switch(type){

                // flag indicates on or of and is related to the
                // field status
                case "flag":
                    field.classList.add("custom-control","custom-switch","text-left");
                    input.setAttribute("type","checkbox");
                    input.setAttribute("deviceId",id);
                    input.setAttribute("namespace",namespace.name);
                    input.setAttribute("originalValue",value);
                    input.setAttribute("for",attr);
                    input.setAttribute("contentType","flag");
                    input.classList.add("custom-control-input");
                    input.classList.add("deviceField");
                    input.id = attr+"Switch"+id;
                    // if there is information already loaded from the database
                    // set the field with the corresponding value
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
  
                // this attribute/field accepts true or false
                // and relates to the wear leveling
                case "boolean":
                    field.classList.add("custom-control","custom-switch","text-left");
                    input.setAttribute("type","checkbox");
                    input.setAttribute("deviceId",id);
                    input.setAttribute("namespace",namespace.name);
                    input.setAttribute("originalValue",value);
                    input.setAttribute("for",attr);
                    input.setAttribute("contentType","boolean");
                    input.classList.add("custom-control-input");
                    input.classList.add("deviceField");
                    input.id = attr+"Switch"+id;
                    // verify if the field has already a value
                    // from database and set the field accordingly
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
  
                // field attribute for text contents
                case "string":
                    field.classList.add("form-group", "text-left");
                    label.setAttribute("for",attr+"Input"+id);
                    label.innerHTML = name;
                    field.appendChild(label);
                    input.setAttribute("type","text");
                    input.setAttribute("placeholder","0.00");
                    input.setAttribute("deviceId",id);
                    input.setAttribute("namespace",namespace.name);
                    input.setAttribute("originalValue",value);
                    input.setAttribute("for",attr);
                    input.setAttribute("contentType","string");
                    input.classList.add("form-control");
                    input.classList.add("deviceField");
                    input.id = attr+"Input"+id;
                    // if there is a value already on the database
                    // set the field with this value
                    input.value = value;
                    field.appendChild(input);
                break;
  
                // attribute/field for numeric integer information
                case "integer":
                    field.classList.add("form-group", "text-left");
                    label.setAttribute("for",attr+"Input"+id);
                    label.innerHTML = name;
                    field.appendChild(label);
                    input.setAttribute("type","number");
                    input.setAttribute("placeholder","0");
                    input.setAttribute("deviceId",id);
                    input.setAttribute("namespace",namespace.name);
                    input.setAttribute("originalValue",value);
                    input.setAttribute("for",attr);
                    input.setAttribute("contentType","integer");
                    input.classList.add("form-control");
                    input.classList.add("deviceField");
                    input.id = attr+"Input"+id;
                    // if there is a value already loaded in the 
                    // database, sets the field accordingly
                    input.value = value;
                    field.appendChild(input);
                break;
  
                // attribute/field for a set of possible values
                // to be selected by the user
                // the options are pre-conditioned ones
                case "stringSelect":
                    field.classList.add("form-group", "text-left");
                    label.setAttribute("for",attr+"Select"+id);
                    label.innerHTML = name;
                    field.appendChild(label);
                    select.classList.add("form-control");
                    select.classList.add("deviceField");
                    select.id = attr+"Select"+id;
                    select.setAttribute("deviceId",id);
                    select.setAttribute("namespace",namespace.name);
                    select.setAttribute("originalValue",value);
                    select.setAttribute("for",attr);
                    select.setAttribute("contentType","stringSelect");
                    let option = document.createElement("option");
                    option.value = "";
                    option.innerHTML = 'choose ' + name.toLowerCase();
                    select.appendChild(option);
                    // build the options and attach to the select element
                    possibleValues.forEach((element)=>{
                        let option = document.createElement("option");
                        select.appendChild(option);
                        option.value = element.toLowerCase();
                        option.innerHTML = element;
                        // if there is already a value loaded from
                        // database, set the option as selected
                        if(element.toLowerCase()==device[attr].value.toLowerCase()){
                            option.setAttribute("selected","selected");
                        }
                    });
                    field.appendChild(select);
                break;
  
                // field/attribute for currency information
                case "currency":
                    field.classList.add("form-group", "text-left");
                    label.setAttribute("for",attr+"Input"+id);
                    label.innerHTML = name;
                    field.appendChild(label);
                    input.setAttribute("type","text");
                    input.setAttribute("placeholder","0.00");
                    input.setAttribute("deviceId",id);
                    input.setAttribute("namespace",namespace.name);
                    input.setAttribute("originalValue",value);
                    input.setAttribute("for",attr);
                    input.setAttribute("contentType","currency");
                    input.classList.add("form-control");
                    input.classList.add("deviceField");
                    input.id = attr+"Input"+id;
                    // if there is already information on the
                    // database, load in the field, but
                    // formatting to currency format before
                    input.value = toCurrency(value);
                    field.appendChild(input);
                break;
  
            } // end of switch
  
        }// end of for(let attr in device)
        
    }); // end of devices.forEach((device)
    
  }); // end of namespaces.forEach((namespace)
} // end of buildDevicesMarkupsForEachNamespace

export { buildDevicesMarkupsForEachNamespace }


