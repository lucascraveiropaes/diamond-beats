function getGradient(prevGradient) {
	var g = [
	    "primary-gradient",
	    "red-gradient",
	    "pink-gradient",
	    "baby-gradient",
	    "blue-gradient",
	    "blue-darker-gradient"
	];

	var i = Math.floor((Math.random() * g.length) + 1);

	if (g[i] == undefined) {
		g[i] = "primary-gradient";
	}

	//alert(g[i] + " - " + prevGradient);

	if (g[i] == prevGradient) {
    	g[i] = getGradient(prevGradient);
    }

	return g[i];
}

function clearString(string, search) {
    string = string.replace(/\(.*?\)/g, '');  // Remove () and inside content
    string = string.replace(/\{.*?\}/g, '');  // Remove {} and inside content
    string = string.replace(/\[.*?\]/g, '');  // Remove [] and inside content
    string = string.replace('VEVO', '');

    searchSize = search.length;
    test = string.substr(0,searchSize);

    /*if( test.toLowerCase() == search.toLowerCase() ){
        string = string.(searchSize, string.length);
    }*/

    return string;
}

function shortString(string) {
    string = string.substr(0, 20);
    string = string.slice(0,-1);
    string += "...";

    return string;
}

function getRequestFromSearch(searchTerm) {
    url = 'https://www.googleapis.com/youtube/v3/search';

    var params = {
        maxResults: 12,
        type: 'video',
        order: 'relevance',
        part: 'snippet',
        key: 'AIzaSyDAKDaBy_JDwcScSHqDQimOOLjdPImLanc',
        q: searchTerm
    };

    $.getJSON(url, params, function (data) {
        showResultsFromSearch(data);
    });
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

function getRequest(params) {
    url = 'https://www.googleapis.com/youtube/v3/search';

    $.getJSON(url, params, function (searchTerm) {
        showResults(searchTerm);
    }); 
        
}

function showResults(results, placeIt) {
    var html = "";
    var entries = results.items;
	var prevGradient = null;
    
    $.each(entries, function (index, value) {

        var title = shortString(clearString(value.snippet.title));
        var thumbnail = value.snippet.thumbnails.default.url;
        var channel = clearString(value.snippet.channelTitle);

        var gradient = getGradient(prevGradient);

        html += '<div class="col s12"><div class="card-panel transparent">';
        html += '<img src="' + thumbnail + '" class="thumbnail">';
        html += '<div class="content"><span class="title">'+ title + '</a></span>';
        html += '<span class="subtitle">by <a href="#">' + channel + '</a></span>';
        html += '</div></div></div>';
        html += '<hr class="simple-line-85">';

        prevGradient = gradient;
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

    url = 'https://www.googleapis.com/youtube/v3/search';

    $.getJSON(url, params, function (searchTerm) {
        showResults(searchTerm, "#alta");
    });
}

$(document).ready(function () {
    $('#search-bar').submit(function (event) {
        event.preventDefault();

        var searchTerm = $('#search-term').val();

        getRequestFromSearch(searchTerm);
    });

    getTrends();
});