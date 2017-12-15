function clearString(string) {
    string = string.replace(/\(.*?\)/g, '');  // Remove () and inside content
    string = string.replace(/\{.*?\}/g, '');  // Remove {} and inside content
    string = string.replace(/\[.*?\]/g, '');  // Remove [] and inside content
    string = string.replace('VEVO', '');

    return string;
}

function shortString(string) {
    string = string.substr(0, 35);
    string += "...";
    return string;
}

function getRequestFromSearch(searchTerm) {
    url = 'https://www.googleapis.com/youtube/v3/search';
    var params = {
        maxResults: 12,
        order: 'relevance',
        part: 'snippet',
        key: 'AIzaSyDAKDaBy_JDwcScSHqDQimOOLjdPImLanc',
        q: searchTerm
    };
  
    $.getJSON(url, params, function (searchTerm) {
        showResults(searchTerm);
    });
}

function getRequest(params, type, placeIt = null) {
    url = 'https://www.googleapis.com/youtube/v3/search';

    if (type == "s") {
        $.getJSON(url, params, function (searchTerm) {
            showResultsFromSearch(searchTerm);
        });
    }
    else if (type == "t") {
        $.getJSON(url, params, function (searchTerm) {
            showResults(searchTerm);
        });
    }
  
        
}

function showResultsFromSearch(results) {
    var html = "";
    var entries = results.items;
    
    $.each(entries, function (index, value) {
        var title = shortString(clearString(value.snippet.title));
        var thumbnail = value.snippet.thumbnails.default.url;
        var channel = clearString(value.snippet.channelTitle);

        html += '<div class="col s12"><div class="card-list">';
        html += '<img src="' + thumbnail + '" class="thumbnail">';
        html += '<div class="content"><span class="title">'+ title + '</a></span>';
        html += '<span class="subtitle">by <a href="#">' + channel + '</a></span>';
        html += '</div></div></div><hr class="simple-line-85">';
    });
    
    $("#search-results").css("display", "block");
    $(".after-menu").css("display", "none");
    $('#search-results').html(html);
}

function showResults(results, placeIt) {
    var html = "";
    var entries = results.items;
    
    $.each(entries, function (index, value) {
        var title = shortString(clearString(value.snippet.title));
        var thumbnail = value.snippet.thumbnails.default.url;
        var channel = clearString(value.snippet.channelTitle);

        html += '<div class="col s12"><div class="card-panel transparent">';
        html += '<img src="' + thumbnail + '" class="thumbnail">';
        html += '<div class="content"><span class="title">'+ title + '</a></span>';
        html += '<span class="subtitle">by <a href="#">' + channel + '</a></span>';
        html += '</div></div></div><hr class="simple-line-85">';
    });

    $(placeIt).html(html);
}

function getTrends() {
    var params = {
        maxResults: 8,
        order: 'relevance',
        part: 'snippet',
        chart: 'mostPopular',
        kind: 'youtube#videoListResponse',
        regionCode: 'BR',

        key: 'AIzaSyDAKDaBy_JDwcScSHqDQimOOLjdPImLanc'
    };

    getRequest(params, "#alta");
}

$(document).ready(function () {
    $('#search-bar').submit(function (event) {
        event.preventDefault();

        var searchTerm = $('#search-term').val();
        getRequestFromSearch(searchTerm);
    });
});