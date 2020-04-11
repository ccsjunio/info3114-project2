let showNextDeviceInNamespace = function (event){
  event.stopPropagation();
  event.preventDefault();
  let button = event.target;
  let namespace = button.getAttribute("namespace");
  let previousButton = document.querySelector(`.previousDeviceButton[namespace="${namespace}"]`);
  let actionButtonsNavigation = document.querySelector(`.action-buttons-navigation[namespace="${namespace}"]`);
  let visibleDeviceIndex = actionButtonsNavigation.getAttribute("visibleDeviceIndex");
  let namespaceDevices = document.querySelectorAll(`.device-contents[namespace="${namespace}"] .deviceItem`);
  if( namespaceDevices.length - 1 == +visibleDeviceIndex ) return false;
  namespaceDevices[visibleDeviceIndex].style.display = "none";
  namespaceDevices[++visibleDeviceIndex].style.display = "block";
  actionButtonsNavigation.setAttribute("visibleDeviceIndex",visibleDeviceIndex);
  previousButton.disabled = false;
  if( visibleDeviceIndex == namespaceDevices.length - 1 ){
      //console.log("disable button", button);
      button.disabled = true;
  }
}

let showPreviousDeviceInNamespace = function (event){
  event.stopPropagation();
  event.preventDefault();
  let button = event.target;
  let namespace = button.getAttribute("namespace");
  let nextButton = document.querySelector(`.nextDeviceButton[namespace="${namespace}"]`);
  let actionButtonsNavigation = document.querySelector(`.action-buttons-navigation[namespace="${namespace}"]`);
  let visibleDeviceIndex = actionButtonsNavigation.getAttribute("visibleDeviceIndex");
  let namespaceDevices = document.querySelectorAll(`.device-contents[namespace="${namespace}"] .deviceItem`);
  if( 0 == +visibleDeviceIndex ) return false;
  namespaceDevices[visibleDeviceIndex].style.display = "none";
  namespaceDevices[--visibleDeviceIndex].style.display = "block";
  actionButtonsNavigation.setAttribute("visibleDeviceIndex",visibleDeviceIndex);
  nextButton.disabled = false;
  if( visibleDeviceIndex == 0 ){
      //console.log("disable button", button);
      button.disabled = true;
  }
} // end of function showPreviousDeviceInNamespace

export { showNextDeviceInNamespace, showPreviousDeviceInNamespace }