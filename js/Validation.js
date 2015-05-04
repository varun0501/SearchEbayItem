var form = document.getElementsByTagName('form')[0];
var errKeyWord = document.getElementById('errKeyWord');
var keyWord = document.getElementById('inputKeyWord');
var errPriceFrom = document.getElementById('errPriceFrom');
var priceFrom = document.getElementById('inputPriceFrom');
var errPriceTo = document.getElementById('errPriceTo');
var priceTo = document.getElementById('inputPriceTo');
var errMaxDays = document.getElementById('errMaxDays');
var handlingTime = document.getElementById('inputHandlingTime');

keyWord.addEventListener('keyup', function(event){
    if(keyWord.value.length>0)
    {
        errKeyWord.innerHTML = "";
        errKeyWord.className = "error";
    }
    else
    {
        errKeyWord.innerHTML = "Please enter some keyword to search";
        errKeyWord.className = "error active";
    }
}, false);
priceFrom.addEventListener('keyup', function(event){
    if(!priceFrom.validity.valid)
    {
        errPriceFrom.innerHTML = "Price should be a valid number";
        errPriceFrom.className = "error active";
    }
    else if(parseInt(priceFrom.value) < 0)
    {
        errPriceFrom.innerHTML = "Minimum price cannot be below 0";
        errPriceFrom.className = "error active";
    }
    else if(parseInt(priceTo.value) < parseInt(priceFrom.value) && parseInt(priceTo.value) > 0)
    {
        errPriceFrom.innerHTML = "Minimum price cannot be greater than maximum price";
        errPriceFrom.className = "error active";
    }
    else
    {
        errPriceFrom.innerHTML = "";
        errPriceFrom.className = "error";
        if(parseInt(priceTo.value) > 0)
        {
            errPriceTo.innerHTML = "";
            errPriceTo.className = "error";
        }
    }
}, false);
priceTo.addEventListener('keyup', function(event){
    if(!priceTo.validity.valid)
    {
        errPriceTo.innerHTML = "Price should be a valid number";
        errPriceTo.className = "error active";
    }
    else if(parseInt(priceTo.value) < 0)
    {
        errPriceTo.innerHTML = "Maximum price cannot be below 0";
        errPriceTo.className = "error active";
    }
    else if(parseInt(priceTo.value) < parseInt(priceFrom.value))
    {
        errPriceTo.innerHTML = "Maximum price cannot be less than minimum price";
        errPriceTo.className = "error active";
    }
    else
    {
        errPriceTo.innerHTML = "";
        errPriceTo.className = "error";
        if(parseInt(priceFrom.value) > 0)
        {
            errPriceFrom.innerHTML = "";
            errPriceFrom.className = "error";
        }
    }
}, false);
handlingTime.addEventListener('keyup', function(event){
    if(!handlingTime.validity.valid)
    {
        errMaxDays.innerHTML = "Max handling time should be a valid digit";
        errMaxDays.className = "error active";
    }
    else if(parseInt(handlingTime.value) < 1)
    {
        errMaxDays.innerHTML = "Max handling time should be greater than or equal to 1";
        errMaxDays.className = "error active";
    }
    else
    {
        errMaxDays.innerHTML = "";
        errMaxDays.className = "error";
    }
}, false);
form.addEventListener('submit', function(event){
    if(keyWord.value.length<1)
    {
        errKeyWord.innerHTML = "Please enter some keyword to search";
        errKeyWord.className = "error active";
        event.preventDefault();
    }
    else
    {
        event.preventDefault();
        getTheResults(1);
    }
},false);