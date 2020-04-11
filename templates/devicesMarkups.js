import { devices, deviceObjects } from "/database/devices.js";
import { namespaces } from "/database/namespaces.js";
import { toCurrency, createUniqueId } from "/utils/custom-functions.js";


let buildDevicesMarkupsForEachNamespace = function(){
  namespaces.forEach((namespace)=>{
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
  
    let card = document.querySelector(`.card[namespace='${namespace.name}'] .device-contents`);
  
    let row = document.createElement("div");
    row.classList.add("row");
    card.appendChild(row);
  
    devices.forEach((device)=>{
  
        let id = device.id;
  
        let column = document.createElement("div");
        column.classList.add("col-12","text-center","device-window","deviceItem");
        column.setAttribute("deviceId",id);
        column.setAttribute("namespace",namespace.name);
        column.style.display = "none";
        row.appendChild(column);
  
        let form = document.createElement("form");
        column.appendChild(form);
  
        for(let attr in device){
  
            if(device[attr].name===undefined) continue;
            
            let name = device[attr].name;
            let value = device[attr].value;
            let type = device[attr].type;
            let possibleValues = device[attr].possibleValues;
  
            //console.log("form inside attr for before field append:",form);
  
            let field = document.createElement("div");
            field.setAttribute("deviceId",id);
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
                    input.setAttribute("namespace",namespace.name);
                    input.setAttribute("originalValue",value);
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
                    input.setAttribute("namespace",namespace.name);
                    input.setAttribute("originalValue",value);
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
                    input.setAttribute("placeholder","0.00");
                    input.setAttribute("deviceId",id);
                    input.setAttribute("namespace",namespace.name);
                    input.setAttribute("originalValue",value);
                    input.setAttribute("for",attr);
                    input.setAttribute("contentType","string");
                    input.classList.add("form-control");
                    input.classList.add("deviceField");
                    input.id = attr+"Input"+id;
                    input.value = value;
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
                    input.setAttribute("namespace",namespace.name);
                    input.setAttribute("originalValue",value);
                    input.setAttribute("for",attr);
                    input.setAttribute("contentType","integer");
                    input.classList.add("form-control");
                    input.classList.add("deviceField");
                    input.id = attr+"Input"+id;
                    input.value = value;
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
                    select.setAttribute("namespace",namespace.name);
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
                        if(element.toLowerCase()==device[attr].value.toLowerCase()){
                            option.setAttribute("selected","selected");
                        }
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
                    input.setAttribute("namespace",namespace.name);
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
        
    }); // end of devices.forEach((device)
  
    //console.log("card = ",card);
  
  }); // end of namespaces.forEach((namespace)
} // end of buildDevicesMarkupsForEachNamespace

export { buildDevicesMarkupsForEachNamespace }


