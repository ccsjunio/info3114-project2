// controls the behaviour and results
// of navigation buttons on each namespace
// next device and previous device

// controls the navigation button to show the next device
// in the namespace
let showNextDeviceInNamespace = function (event){
  event.stopPropagation();
  event.preventDefault();
  // get which button was pressed that
  // activated the event
  let button = event.target;
  // get which namespace the button belongs
  let namespace = button.getAttribute("namespace");
  // maps the previous device in the namespace
  let previousButton = document.querySelector(`.previousDeviceButton[namespace="${namespace}"]`);
  // maps the container of the navigation buttons in the namespace
  // to configure the index of the device being showed
  let actionButtonsNavigation = document.querySelector(`.action-buttons-navigation[namespace="${namespace}"]`);
  // gets the information about the index of the device being showed
  // considering the order in the collection of devices
  // in this namespace
  let visibleDeviceIndex = actionButtonsNavigation.getAttribute("visibleDeviceIndex");
  // get the collection of devices in this namespace
  let namespaceDevices = document.querySelectorAll(`.device-contents[namespace="${namespace}"] .deviceItem`);
  // if there is only one device in the namespace do nothing
  // this is in the case something fails in the logic
  // of disabling this button when there is only one
  // device in the namespace
  if( namespaceDevices.length - 1 == +visibleDeviceIndex ) return false;
  // hide the current device being displayed
  namespaceDevices[visibleDeviceIndex].style.display = "none";
  // increment the pointer on the collection of devices
  // and show the next device in the collection
  namespaceDevices[++visibleDeviceIndex].style.display = "block";
  // update the attribute in the buttons container indicating
  // which device is being showed, in the order of the device
  // in the collection of devices markup in the namespace
  actionButtonsNavigation.setAttribute("visibleDeviceIndex",visibleDeviceIndex);
  // enable the previous button, to be able to come back
  previousButton.disabled = false;
  // if the current device is the last one in the collection
  // disable the next device button
  if( visibleDeviceIndex == namespaceDevices.length - 1 ){
      button.disabled = true;
  }
} // end of showNextDeviceInNamespace

// controls the behaviour and tasks of the
// previous button when pressed
let showPreviousDeviceInNamespace = function (event){
  event.stopPropagation();
  event.preventDefault();
  // get which button was clicked
  let button = event.target;
  // get which namespace the button belongs to
  let namespace = button.getAttribute("namespace");
  // map the next device button in this namespace
  let nextButton = document.querySelector(`.nextDeviceButton[namespace="${namespace}"]`);
  // map the container of the navigation buttons
  let actionButtonsNavigation = document.querySelector(`.action-buttons-navigation[namespace="${namespace}"]`);
  // get the index of the device being showed in this namespace
  // considering the collection of devices markup in this namespace
  let visibleDeviceIndex = actionButtonsNavigation.getAttribute("visibleDeviceIndex");
  // maps the collection of devices in this namespace
  let namespaceDevices = document.querySelectorAll(`.device-contents[namespace="${namespace}"] .deviceItem`);
  // if the device currently being showed is the first (or only) one
  // do nothing
  if( 0 == +visibleDeviceIndex ) return false;
  // hide the current device in the namespace
  namespaceDevices[visibleDeviceIndex].style.display = "none";
  // decrement the pointer to the visible device
  // and show the previous device in the collection
  namespaceDevices[--visibleDeviceIndex].style.display = "block";
  // update the attribute of the visible device
  actionButtonsNavigation.setAttribute("visibleDeviceIndex",visibleDeviceIndex);
  // enable the next device button
  nextButton.disabled = false;
  // if we came to the beginning of the collection
  // disable the previous device button
  if( visibleDeviceIndex == 0 ){
      //console.log("disable button", button);
      button.disabled = true;
  }
} // end of function showPreviousDeviceInNamespace

export { showNextDeviceInNamespace, showPreviousDeviceInNamespace }