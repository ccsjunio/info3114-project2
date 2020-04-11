import { showNextDeviceInNamespace, showPreviousDeviceInNamespace } from  "/utils/navigation.js";
import { newDeviceToNamespace } from "/utils/add-device.js";
import { updateDeviceInNamespace } from "/utils/update-device.js";
import { deleteDeviceFromNamespace } from "/utils/delete-device.js";

let bindFieldsToChangeEvent = function(){
  //bind each device field in order to enable update button on changing events
  let fields = document.querySelectorAll(".deviceField");
  fields.forEach((field)=>{
      //console.log("this field is binding to change *************************", field);
      let namespace = field.getAttribute("namespace");
      let button = document.querySelector(`.updateDeviceButton[namespace="${namespace}"]`);
      if(button.disabled=true){
          button.setAttribute("toBeEnabled","true");
          field.addEventListener("change",enableUpdateButton);
          field.addEventListener("blur",enableUpdateButton);
          field.addEventListener("keyup",enableUpdateButton);
      }
  }); // end of fields.forEach field

  function enableUpdateButton(event){
      //console.log("enableUpdateButton called");
      let field = event.target;
      let namespace = field.getAttribute("namespace");
      let button = document.querySelector(`.updateDeviceButton[toBeEnabled="true"][namespace="${namespace}"]`);
      if(button!==undefined && button!==null){
          button.disabled = false;
          button.removeAttribute("toBeEnabled");
      }
  }
} // function bindFieldsToChangeEvent()

let bindNavigationButtons = function(){
  //bind next button
  let nextDeviceButtons = document.querySelectorAll(".nextDeviceButton");
  //console.log("next device buttons ==================================== ",nextDeviceButtons);
  nextDeviceButtons.forEach((button)=>{
      button.addEventListener("click",showNextDeviceInNamespace);
  });

  //bind previous button
  let previousDeviceButtons = document.querySelectorAll(".previousDeviceButton");
  //console.log("previous device buttons ==================================== ",previousDeviceButtons);
  previousDeviceButtons.forEach((button)=>{
      button.addEventListener("click",showPreviousDeviceInNamespace);
  });
} // end of bindNavigationButtons

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