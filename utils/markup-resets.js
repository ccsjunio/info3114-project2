// this function resets the arrangement of devices in a
// namespace, displaying the first device in the collection
let resetDevicesShowInNamespace = function(namespace){
  let devices = document.querySelectorAll(`.deviceItem[namespace="${namespace}"]`);
  // if there is no device, do nothing
  if(devices[0]===undefined) return;
  devices[0].style.display = "block";
  // reset the navigation buttons according to the arrangement 
  // of devices in the namespace
  resetNavigationButtonsInNamespace(namespace);
  // reset the data manipulation buttons according to the 
  // arraangement in the namespace
  resetDataButtonsInNamespace(namespace);
} // end of resetDevicesShowInNamespace

// this function reset the state of the navigation button
// according to the arrangement in the namespace
// if there is no device in the namespace, the navigation buttons
// are disabled
// if there is only one device in the namespace, the navigation buttons
// are disabled
// if there is more than one device, only the next button is enabled, as
// the arrangement was reset and the first device in collection is shown
let resetNavigationButtonsInNamespace = function(namespace){
  let container = document.querySelector(`.action-buttons-navigation[namespace='${namespace}']`);
  let devices = document.querySelectorAll(`.deviceItem[namespace="${namespace}"]`);
  let previousButton = document.querySelector(`button.previousDeviceButton[namespace='${namespace}']`);
  let nextButton = document.querySelector(`button.nextDeviceButton[namespace='${namespace}']`);
  // there is only one or none devices in the
  // namespace
  if(devices.length<=1){
      previousButton.disabled = true;
      nextButton.disabled = true;
      container.setAttribute("visibledeviceindex",0);
  } else {
      // there is more than one device in the namespace
      previousButton.disabled = true;
      nextButton.disabled = false;
      container.setAttribute("visibledeviceindex",0);
  } 
} // function resetNavigationButtonsInNamespace(namespace)

// reset the data buttons in the namespace
// if there is no devices, the delete button and update button
// are disabled
// the update button is disabled because upon reset no
// modifications are due
// the new device is always active in the reset
let resetDataButtonsInNamespace = function(namespace){
  let container = document.querySelector(`.data-buttons-navigation[namespace='${namespace}']`);
  let devices = document.querySelectorAll(`.deviceItem[namespace="${namespace}"]`);
  let newDeviceButton = document.querySelector(`button.newDeviceButton[namespace='${namespace}']`);
  let updateDeviceButton = document.querySelector(`button.updateDeviceButton[namespace='${namespace}']`);
  let deleteDeviceButton = document.querySelector(`button.deleteDeviceButton[namespace='${namespace}']`);

  newDeviceButton.disabled = false;
  updateDeviceButton.disabled = devices.length===0 ? true : false;
  deleteDeviceButton.disabled = devices.length===0 ? true : false;
  
} // function resetNavigationButtonsInNamespace(namespace)

// show the first element on the collection of devices
// for each namespace
let showFirstElementOfEachNamespace = function(){
  //show the first element on each namespace
  let namespacesMarkup = document.querySelectorAll(".device-contents");

  namespacesMarkup.forEach((namespace)=>{

      let namespaceDevices = namespace.querySelectorAll(".device-window");
      
      if(namespaceDevices.length==0 || namespaceDevices===undefined) return;

      namespaceDevices[0].style.display = "block";

  });
}

export { resetDevicesShowInNamespace, resetNavigationButtonsInNamespace, resetDataButtonsInNamespace, showFirstElementOfEachNamespace }