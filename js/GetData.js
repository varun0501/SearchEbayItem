$(document).ready(function(){
    if(currentPageNumber == 1)
    {
        $("#previousPage").prop('disabled', true);
    }
});
function processJSON (root) {
    var items = root.findItemsAdvancedResponse[0].searchResult[0].item || [];
    var html = [];
    for (var i = 0; i < items.length; ++i) {
        var item     = items[i];
        var title    = item.title;
        var pic      = item.galleryURL;
        var viewitem = item.viewItemURL;
        var price    = item.sellingStatus[0].currentPrice[0].__value__;

        if (null != title && null != viewitem) {
            html.push('<div class="media">' +
            '<a class="pull-left" href="#">' +
            '<img class="media-object" width="100" height="100" src="' + pic + '" alt="Media Object"></a>' +
            '<div class="media-body">' +
            '<h4 class="media-heading">' + title + '</h4>' +
            '<button type="button" class="btn btn-info pull-right" data-toggle="collapse" data-target="#detail' + i + '">view detail</button>' +
            '<div id="detail' + i + '" class="collapse in>"' +
            '<div class="container">' +
            '<ul class="nav nav-tabs">' +
            '<li role="presentation" class="active"><a data-toggle="tab" href="#basicInfo' + i + '">Basic Info</a></li>' +
            '<li role="presentation"><a data-toggle="tab" href="#sellerInfo' + i + '">Seller Info</a></li>' +
            '<li role="presentation"><a data-toggle="tab" href="#shipperInfo' + i + '">Shipper Info</a></li>' +
            '</ul>' +
            '<div class="tab-content">' +
            '<div id="basicInfo' + i + '" class="tab-pane fade in active">' +
            '<h3>Basic Info</h3>' +
            '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' +
            '</div>' +
            '<div id="sellerInfo' + i + '" class="tab-pane fade">' +
            '<h3>Seller Info</h3>' +
            '<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' +
            '</div>' +
            '<div id="shipperInfo' + i + '" class="tab-pane fade">' +
            '<h3>Shipper Info</h3>' +
            '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>');
        }
    }
    document.getElementById("results").innerHTML = html.join("");
}
function getTheResults(pageNumber)
{
    var url = "http://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsAdvanced";
    url += "&SERVICE-VERSION=1.0.0";
    url += "&SECURITY-APPNAME=USCca6bc1-74c5-422d-a3af-abf0af4399e";
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&callback=processJSON";
    url += "&REST-PAYLOAD";
    url += "&categoryId=139973";
    url += "&keywords=harry%20potter";
    url += "&paginationInput.entriesPerPage=5";
    url += "&paginationInput.pageNumber=" + pageNumber;

    // Create a new script element
    var script_element = document.createElement('script');

    // Set its source to the JSONP API
    script_element.src = url;

    // Stick the script element in the page <head>
    document.body.appendChild(script_element);
}
var currentPageNumber = 1;
function goToNextPage()
{
    currentPageNumber += 1;
    getTheResults(currentPageNumber);
}
function goToPreviousPage()
{
    if(currentPageNumber>1)
    {
        currentPageNumber -= 1;
        getTheResults(currentPageNumber);
    }
}
