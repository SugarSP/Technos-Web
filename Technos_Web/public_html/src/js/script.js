function initMap() {
    var map = L.map('map').setView([48.85776, 2.33939], 11);

    L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'examples.map-i875mjb7'
    }).addTo(map);


    L.marker([48.85776, 2.33939]).addTo(map)
            .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
}

$(document).ready(function() {
    $("#menu > #nav > .nav-primary > li.level0 > a").click(function(ev){
        if($(this).attr("class")=="active"){
            $(this).parents("li").next(".sub-menu").slideUp();
            $(this).removeClass("active");
        }
        else{
            $(this).parents("li").next(".sub-menu").slideDown();
            $(this).addClass("active");
        }
    });
})