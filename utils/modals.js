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