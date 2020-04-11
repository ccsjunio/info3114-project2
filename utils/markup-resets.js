let resetDevicesShowInNamespace = function(namespace){
  let devices = document.querySelectorAll(`.deviceItem[namespace="${namespace}"]`);
  if(devices[0]===undefined) return;
  devices[0].style.display = "block";
  resetNavigationButtonsInNamespace(namespace);
  resetDataButtonsInNamespace(namespace);
} // end of resetDevicesShowInNamespace

let resetNavigationButtonsInNamespace = function(namespace){
  let container = document.querySelector(`.action-buttons-navigation[namespace='${namespace}']`);
  let devices = document.querySelectorAll(`.deviceItem[namespace="${namespace}"]`);
  let previousButton = document.querySelector(`button.previousDeviceButton[namespace='${namespace}']`);
  let nextButton = document.querySelector(`button.nextDeviceButton[namespace='${namespace}']`);
  if(devices.length<=1){
      previousButton.disabled = true;
      nextButton.disabled = true;
      container.setAttribute("visibledeviceindex",0);
  } else {
      previousButton.disabled = true;
      nextButton.disabled = false;
      container.setAttribute("visibledeviceindex",0);
  } 
} // function resetNavigationButtonsInNamespace(namespace)

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

export { resetDevicesShowInNamespace, resetNavigationButtonsInNamespace, resetDataButtonsInNamespace }