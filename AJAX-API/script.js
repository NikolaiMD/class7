// 1)AJAX -> fixer
// 2)data <- currencies
const URL = 'http://data.fixer.io/api/latest';
const KEY = 'a95f86ba6e1a66f31205337bdead6576';
var data = null;

function saveData(data){
    localStorage.setItem(
        'data', JSON.stringify(data)
    );
}

function readData(){
    var data = JSON.parse(
        localStorage.getItem('data')
    );
    if(data==null){
        return null;
    }
    var today = new Date();
    var day = new Date(data.date);
    if(
        today.getFullYear()==day.getFullYear()
        &&
        today.getMonth()==day.getMonth()
        &&
        today.getDate()==day.getDate()
    ){
        return data;
    }else{
        return null;
    }
    console.log(data);
    return data;
}

function loadCurrencies(){
    data=readData();
    if(data==null){
        var xhr = new XMLHttpRequest;
        // FUNCTION WAITING FOR DATA
        xhr.onload=function(){
            data = JSON.parse(xhr.responseText);
            saveData(data);
            showSelect(data.rates);
        }
        xhr.open('GET',URL + '?access_key=' + KEY);
        xhr.send();
    }else{showSelect(data.rates);}
    
}

function showSelect(rates){
    for(var code in rates){
        console.log(code, rates[code]);
        // creating variable of SELECT
        var select = document.getElementById('currency-select');
        // creating variable of OPTION
        var option = document.getElementsByTagName('option')[0];
        // creating element OPTION
        var o = document.createElement('option');
        // adding OPTION into SELECT
        select.appendChild(o);
        // inner text of created OPTION element
        o.innerText= code;
    }
    console.log(rates);
}