var form = document.getElementsByTagName('form')[0];
var errKeyWord = document.getElementById('errKeyWord');
var keyWord = document.getElementById('inputKeyWord');
var errPriceFrom = document.getElementById('errPriceFrom');
var priceFrom = document.getElementById('inputPriceFrom');
var errPriceTo = document.getElementById('errPriceTo');
var priceTo = document.getElementById('inputPriceTo');
var resultsPerPage = document.getElementById('inputResultsPerPage');
var errResultsPerPage = document.getElementById('errResultsPerPage');
var btnSearch = document.getElementById('btnSearch');
var isValidKeyWord = false;
btnSearch.disabled = true;

/**
 * Validation:
 * Required field
 * Should contain only alphabet, numbers or spaces
 */
keyWord.addEventListener('keyup', function(event){
    if(keyWord.value.length < 1)
    {
        errKeyWord.innerHTML = "Please enter some keyword to search";
        errKeyWord.className = "error active";
        isValidKeyWord = false;
        btnSearch.disabled = true;
    }
    else if(!keyWord.value.match(/^[A-Za-z\d\s]+$/))
    {
        errKeyWord.innerHTML = "Please enter keyword containing " +
        "numbers and alphabets only. Multiple keywords should be separated by space";
        errKeyWord.className = "error active";
        isValidKeyWord = false;
        btnSearch.disabled = true;
    }
    else
    {
        errKeyWord.innerHTML = "";
        errKeyWord.className = "error";
        isValidKeyWord = true;
        btnSearch.disabled = false;
    }
}, false);
/**
 * Validations:
 * Should be valid number
 * Value can not be less than 0
 * Value should be less then maximum price
 */
priceFrom.addEventListener('keyup', function(event){
    if(!priceFrom.validity.valid)
    {
        errPriceFrom.innerHTML = "Price should be a valid number";
        errPriceFrom.className = "error active";
        btnSearch.disabled = true;
    }
    else if(parseInt(priceFrom.value) < 0)
    {
        errPriceFrom.innerHTML = "Minimum price cannot be below 0";
        errPriceFrom.className = "error active";
        btnSearch.disabled = true;
    }
    else if(parseInt(priceTo.value) < parseInt(priceFrom.value) && parseInt(priceTo.value) > 0)
    {
        errPriceFrom.innerHTML = "Minimum price cannot be greater than maximum price";
        errPriceFrom.className = "error active";
        btnSearch.disabled = true;
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
        if(isValidKeyWord) {
            btnSearch.disabled = false;
        }
    }
}, false);
/**
 * Validations:
 * Value should be valid number
 * Value can not be less than 0
 * Value can not less than Minimum price
 */
priceTo.addEventListener('keyup', function(event){
    if(!priceTo.validity.valid)
    {
        errPriceTo.innerHTML = "Price should be a valid number";
        errPriceTo.className = "error active";
        btnSearch.disabled = true;
    }
    else if(parseInt(priceTo.value) < 0)
    {
        errPriceTo.innerHTML = "Maximum price cannot be below 0";
        errPriceTo.className = "error active";
        btnSearch.disabled = true;
    }
    else if(parseInt(priceTo.value) < parseInt(priceFrom.value))
    {
        errPriceTo.innerHTML = "Maximum price cannot be less than minimum price";
        errPriceTo.className = "error active";
        btnSearch.disabled = true;
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
        if(isValidKeyWord) {
            btnSearch.disabled = false;
        }
    }
}, false);
/**
 * Validations:
 * Value should be valid number
 * Value can not be less than 1
 */
resultsPerPage.addEventListener('keyup', function(event){
    if(!resultsPerPage.validity.valid)
    {
        errResultsPerPage.innerHTML = "Number of results should a valid number";
        errResultsPerPage.className = "error active";
        btnSearch.disabled = true;
    }
    else if(parseInt(resultsPerPage.value) < 1)
    {
        errResultsPerPage.innerHTML = "Number of results cannot be below 1";
        errResultsPerPage.className = "error active";
        btnSearch.disabled = true;
    }
    else
    {
        errResultsPerPage.innerHTML = "";
        errResultsPerPage.className = "error";
        if(isValidKeyWord) {
            btnSearch.disabled = false;
        }
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