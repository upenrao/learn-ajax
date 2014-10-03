
function loadData() {
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;

    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $('#streetview').append('<img src="' + streetviewUrl + '">');


    // load nytimes


    // load wikipedia data
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=wikiCallback';

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function( response ) {
            var articleList = response[1];
            console.log(articleList);
            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $('#wikipedia').append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };

        }
    });
};


$('#submit-btn').click(loadData);