export function toCurrency(value){
    
    let integerPart = (parseInt(+value)).toString();
    let decimalPart = ((+value - parseInt(+value)).toFixed(2)).toString();

    let integerLength = integerPart.length;
    integerPart = integerPart.split("");
    console.log("integerPart splited",integerPart);

    for(let i = integerLength - 3; i > 0; i-=3){
        integerPart.splice(i,0,",");
    }   

    integerPart.join('');

    return `$ ${integerPart.join('')}.${decimalPart.substr(2,2)}`;
}

