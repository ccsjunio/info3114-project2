import { showNextDeviceInNamespace, showPreviousDeviceInNamespace } from  "/utils/navigation.js";
import { newDeviceToNamespace } from "/utils/add-device.js";
import { updateDeviceInNamespace } from "/utils/update-device.js";
import { deleteDeviceFromNamespace } from "/utils/delete-device.js";

// this function add listeners to all fields
// available in the pages. it listen to changes
// in the contents or state of the field
let bindFieldsToChangeEvent = function(){
  //bind each device field in order to enable update button on changing events
  let fields = document.querySelectorAll(".deviceField");
  fields.forEach((field)=>{
      // identify the namespace of the field
      let namespace = field.getAttribute("namespace");
      // identify the button update of this namespace
      let button = document.querySelector(`.updateDeviceButton[namespace="${namespace}"]`);
      // if the button update is disabled
      // add listeners to the field for
      // changing the content of the field and exiting the field
      // changing the contents of the field while still in the field
      // by releasing a key while focusing in the field
      // the listener points to a callback function to enable
      // the update button
      if(button.disabled==true){
          button.setAttribute("toBeEnabled","true");
          field.addEventListener("change",enableUpdateButton);
          field.addEventListener("blur",enableUpdateButton);
          field.addEventListener("keyup",enableUpdateButton);
      }
  }); // end of fields.forEach field

  // function to enable the update button
  function enableUpdateButton(event){
      // get which field was changed
      let field = event.target;
      // get the namespace were the device containing this field is
      let namespace = field.getAttribute("namespace");
      // get the update button
      let button = document.querySelector(`.updateDeviceButton[toBeEnabled="true"][namespace="${namespace}"]`);
      // if the button is defined, enable it and remove the flag
      // "to be enabled"
      if(button!==undefined && button!==null){
          button.disabled = false;
          button.removeAttribute("toBeEnabled");
      }
  }
} // function bindFieldsToChangeEvent()

// add listeners on all navigation buttons for
// the click of the user
let bindNavigationButtons = function(){
  //bind next button
  let nextDeviceButtons = document.querySelectorAll(".nextDeviceButton");
  nextDeviceButtons.forEach((button)=>{
      button.addEventListener("click",showNextDeviceInNamespace);
  });

  //bind previous button
  let previousDeviceButtons = document.querySelectorAll(".previousDeviceButton");
  previousDeviceButtons.forEach((button)=>{
      button.addEventListener("click",showPreviousDeviceInNamespace);
  });
} // end of bindNavigationButtons

// add listeners to all data manipulation buttons
// new, update and delete
// to listen to the click of the user
let bindDataButtons = function(){
  //bind new button
  let newDeviceButtons = document.querySelectorAll(".newDeviceButton");
  newDeviceButtons.forEach((button)=>{
      button.addEventListener("click",newDeviceToNamespace);
  })

  //bind update button
  let updateDeviceButtons = document.querySelectorAll(".updateDeviceButton");
  //console.log("update device buttons ==================================== ",updateDeviceButtons);
  updateDeviceButtons.forEach((button)=>{
      button.addEventListener("click",updateDeviceInNamespace);
  });

  //bind delete button
  let deleteDeviceButtons = document.querySelectorAll(".deleteDeviceButton");
  deleteDeviceButtons.forEach((button)=>{
      button.addEventListener("click",deleteDeviceFromNamespace);
  });
} // end of bindDataButtons

export { bindFieldsToChangeEvent, bindNavigationButtons, bindDataButtons }