let toCurrency = function (value){
    
    let integerPart = (parseInt(+value)).toString();
    let decimalPart = ((+value - parseInt(+value)).toFixed(2)).toString();

    let integerLength = integerPart.length;
    integerPart = integerPart.split("");

    for(let i = integerLength - 3; i > 0; i-=3){
        integerPart.splice(i,0,",");
    }   

    integerPart.join('');

    return `$ ${integerPart.join('')}.${decimalPart.substr(2,2)}`;
};



let createUniqueId = function (){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

export { toCurrency, createUniqueId };
