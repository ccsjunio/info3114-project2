// controls modals
// and the contents of title
// and message

// modal to acknolledge user of
// some information or results of an action
// like the successful update of a device
// the modal follows the bootstrap format
let messageUser = function(title,message){
  let options = {
      "keyboard":true,
      "focus":true,
      "show":true
  };
  document.getElementById("userMessageModalTitle").innerHTML = title;
  document.getElementById("userMessageModalBody").innerHTML = message;
  document.getElementById("userMessageModalTrigger").click();

}

// modal to ask confirmation from the user
// before taking an action
// like deleting a device
// the modal follows the bootstrap format
let askUserYesNo = function(title,message){
  let options = {
      "keyboard":true,
      "focus":true,
      "show":true
  };
  document.getElementById("askUserYesNoModalTitle").innerHTML = title;
  document.getElementById("askUserYesNoModalBody").innerHTML = message;
  document.getElementById("askUserYesNoModalTrigger").click();

}

export { messageUser, askUserYesNo };