$(document).ready(function () {
    if (currentPageNumber == 1) {
        $("#previousPage").prop('disabled', true);
    }
});
document.getElementById('navigatePage').style.display = "none";
var currentPageNumber = 1;
function processJSON(root) {
    console.log(root);
    var html = [];
    var status = root.findItemsAdvancedResponse[0].ack;
    if (status == 'Success') {
        var items = root.findItemsAdvancedResponse[0].searchResult[0].item || [];
        var resultsPerPage = document.getElementById('inputResultsPerPage').value;
        if (items.length > 0) {
            var numberOfPages = root.findItemsAdvancedResponse[0].paginationOutput[0].totalPages;
            if(numberOfPages > 1)
            {
                document.getElementById('navigatePage').style.display = "block";
            }
            for (var i = 0; i < items.length; ++i) {
                var item = items[i];
                var itemURL = item.viewItemURL;
                var title = item.title;
                var pic = item.galleryURL;
                var viewitem = item.viewItemURL;
                var price = item.sellingStatus[0].currentPrice[0].__value__;
                var condition = item.condition[0].conditionDisplayName;
                var category = item.primaryCategory[0].categoryName;
                var location = item.location;
                var shippingType = item.shippingInfo[0].shippingType;
                var shippingLocations = item.shippingInfo[0].shipToLocations;
                var expShipping = item.shippingInfo[0].expeditedShipping;
                var oneDayShipping = item.shippingInfo[0].oneDayShippingAvailable;
                var handlingTime = item.shippingInfo[0].handlingTime;
                var returnAccepted = item.returnsAccepted;
                var oneDayShippingHTML, returnAcceptedHTML, expShippingHTML;

                if (oneDayShipping == 'true') {
                    oneDayShippingHTML = '<span class="glyphicon glyphicon-ok" style="color:green;"></span>'
                }
                else {
                    oneDayShippingHTML = '<span class="glyphicon glyphicon-remove" style="color:red;"></span>'
                }

                if (returnAccepted == 'true') {
                    returnAcceptedHTML = '<span class="glyphicon glyphicon-ok" style="color:green;"></span>'
                }
                else {
                    returnAcceptedHTML = '<span class="glyphicon glyphicon-remove" style="color:red;"></span>'
                }

                if (expShipping == 'true') {
                    expShippingHTML = '<span class="glyphicon glyphicon-ok style="color:green;""></span>'
                }
                else {
                    expShippingHTML = '<span class="glyphicon glyphicon-remove" style="color:red;"></span>'
                }

                if (null != title && null != viewitem) {
                    html.push('<div class="media">' +
                    '<a class="pull-left" href="#">' +
                    '<img class="media-object" width="100" height="100" src="' + pic + '" alt="Media Object"></a>' +
                    '<div class="media-body">' +
                    '<h4 class="media-heading"><a target="_blank" href="' + itemURL + '">' + title + '</a></h4>' +
                    '<h5 class="media-heading">Price: $' + price + '</h5>' +
                    '<button type="button" class="btn btn-info pull-right" data-toggle="collapse" data-target="#detail' + i + '">view detail</button>' +
                    '<div id="detail' + i + '" class="collapse in>"' +
                    '<div class="container">' +
                    '<ul class="nav nav-tabs">' +
                    '<li role="presentation" class="active"><a data-toggle="tab" href="#basicInfo' + i + '">Basic Info</a></li>' +
                    '<li role="presentation"><a data-toggle="tab" href="#shippingInfo' + i + '">Shipping Info</a></li>' +
                    '</ul>' +
                    '<div class="tab-content">' +
                    '<div id="basicInfo' + i + '" class="tab-pane fade in active">' +
                    '<table class="table">' +
                    '<tr><td><strong>Category name</strong></td><td>' + category + '</td></tr>' +
                    '<tr><td><strong>Condition</strong></td><td>' + condition + '</td></tr>' +
                    '<tr><td><strong>Location</strong></td><td>' + location + '</td></tr>' +
                    '</table>' +
                    '</div>' +
                    '<div id="shippingInfo' + i + '" class="tab-pane fade">' +
                    '<table class="table">' +
                    '<tr><td><strong>Shipping type</strong></td><td>' + shippingType + '</td></tr>' +
                    '<tr><td><strong>Handling time</strong></td><td>' + handlingTime + '</td></tr>' +
                    '<tr><td><strong>Shipping locations</strong></td><td>' + shippingLocations + '</td></tr>' +
                    '<tr><td><strong>Expedited shipping</strong></td><td>' + expShippingHTML + '</td></tr>' +
                    '<tr><td><strong>One day shipping</strong></td><td>' + oneDayShippingHTML + '</td></tr>' +
                    '<tr><td><strong>Returns accepted</strong></td><td>' + returnAcceptedHTML + '</td></tr>' +
                    '</table>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
                }
            }
        }
        else {
            html.push('<h4>No results to display</h4>')
        }
    }
    else {
        html.push('<h4>The result does not contain any data</h4>')
    }
    document.getElementById("results").innerHTML = html.join("");
}

function getTheResults(pageNumber) {
    var keyWords = document.getElementById('inputKeyWord').value;
    keyWords = keyWords.replace(/\s/g, '%20');

    var sortBy = document.getElementById('inputSortBy');
    var sortByText = sortBy.options[sortBy.selectedIndex].text;

    var resultsPerPage = document.getElementById('inputResultsPerPage').value;
    if (resultsPerPage == '') {
        resultsPerPage = 5;
    }
    var minPrice = document.getElementById('inputPriceFrom').value;
    minPrice = minPrice.replace(/\s/g, '');
    var maxPrice = document.getElementById('inputPriceTo').value;
    maxPrice = maxPrice.replace(/\s/g, '');
    if (minPrice == '') {
        minPrice = 0;
    }
    if (maxPrice == '') {
        maxPrice = 99999;
    }

    var url = "http://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsAdvanced";
    url += "&SERVICE-VERSION=1.0.0";
    url += "&SECURITY-APPNAME=USCca6bc1-74c5-422d-a3af-abf0af4399e";
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&callback=processJSON";
    url += "&REST-PAYLOAD";
    //url += "&categoryId=139973";
    url += "&keywords=" + keyWords;
    url += "&paginationInput.entriesPerPage=" + resultsPerPage;
    url += "&paginationInput.pageNumber=" + pageNumber;
    url += "&sortOrder=" + sortByText;
    url += "&itemFilter(0).name=MinPrice";
    url += "&itemFilter(0).value=" + minPrice;
    url += "&itemFilter(0).paramName=Currency";
    url += "&itemFilter(0).paramValue=USD";
    url += "&itemFilter(1).name=MaxPrice";
    url += "&itemFilter(1).value=" + maxPrice;
    url += "&itemFilter(1).paramName=Currency";
    url += "&itemFilter(1).paramValue=USD";


    // Create a new script element
    var script_element = document.createElement('script');

    // Set its source to the JSONP API
    script_element.src = url;

    // Stick the script element in the page <head>
    document.body.appendChild(script_element);
}
function goToNextPage() {
    currentPageNumber += 1;
    getTheResults(currentPageNumber);
}
function goToPreviousPage() {
    if (currentPageNumber > 1) {
        currentPageNumber -= 1;
        getTheResults(currentPageNumber);
    }
}
