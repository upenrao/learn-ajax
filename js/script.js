
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $wikiHeader = $('#wikipedia-header');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    //search
    var $search = $('#search');
    var search = $search.val();

    //Encode
    var strEncoded = encodeURI(search);
    var url = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + strEncoded;
    
    var img = "<img class='bgimg' src='" + url + "'>";

    $body.append(img);

    //NY Times Articles
    var nyTimesURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + strEncoded + "&api-key=XXXXXXXX"
    $.getJSON( nyTimesURL)
        .done(function( data ) {
        $nytHeaderElem.text("NY Times Articles on " + search);
        var articles = data.response.docs;
        var href = "";
        $.each(articles, function(index){
            href = "<a href= '"  + articles[index].web_url + "'>" + articles[index].headline.main + "</a>" + 
                   "<p>" + articles[index].snippet + "</p>" ;
            $nytElem.append("<li>" + href + "</li>");
             })
        })
        .fail(function(){
//            alert("An Error Occurred");
            $nytHeaderElem.css("color", "red");
            $nytHeaderElem.text("An Error Occurred while trying to load NY Times Articles.");
        });

    // Wikipedia Articles
    $.ajax( {
        url: "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + strEncoded + "&format=json&callback=wikiCallback",
        dataType:'jsonp',
        success: function(response){
                 var articleKeywords = response[1];
                 var articleSnippets = response[2];
                 var articleUrls = response[3];
                 var href = "";
                $.each(articleKeywords, function(index){
                   href = "<a href= '"  + articleUrls[index] + "'>" + articleKeywords[index] + "</a>" + 
                   "<p>" + articleSnippets[index] + "</p>";
                   $wikiElem.append("<li>" + href + "</li>");
                });
                 },
        error: function(){
                $wikiHeader.css('color', 'red');
                $wikiHeader.text("An Error Occurred while trying to load Wikipedia Articles");
                }
    });

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
    
    
    $search.val("");
    
    

    // load streetview

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

// loadData();
