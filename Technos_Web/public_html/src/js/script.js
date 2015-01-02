/*function initMap() {
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
}*/
function middlepop(Tab,a){
    return (a>Tab.length)?false:(Tab.slice(0,a).concat(Tab.slice(a+1,Tab.length)));
}
Array.prototype.clearDoublon=function() {
    ArrayLength=this.length;
    var TempArray = new Array();
    TempArray=this;
    TempArray2=this
    var cleared=false
     
    for (i=0;i<ArrayLength;i++){ 
        for (j=0;j<TempArray.length;j++)
            {   
                if(!cleared &&(i==j))
                {
                    j++;
                }
            cleared=false;
            if(TempArray[i]==TempArray2[j]){
            TempArray2=middlepop(TempArray,j);
            TempArray=TempArray2;
            cleared=true;
            j--;
            }
 
        }
    }
    return TempArray;
}
$(document).ready(function() {
    var map = L.map('map').setView([48.85776, 2.33939], 11);

    L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'examples.map-i875mjb7'
    }).addTo(map);
    var departements = [];
    var station = new Array();
    var markers = [];
    /*
        Récupération données json
     */
    $.getJSON("../json/sncf-gares-et-arrets-transilien-ile-de-france.json",function(result){
        format: "json",
        $.each(result, function(i, field){
            departements.push(field.fields.code_insee_commune.substr(0,2));
            station.push(field.fields.nom_gare);
            station.push(field.fields.code_insee_commune.substr(0,2));
            station.push(field.geometry.coordinates[0]);
            station.push(field.geometry.coordinates[1]);
        });
        /*
            Trie du tableau
         */
        departements.sort();
        /*
            Suppression Doublon
         */
        departements=departements.clearDoublon();
        /*
            Ajout des départements au dropdown menu
         */
        for(var i = 0 ; i < departements.length ; i++)
        {
            $("#menu > #nav > .nav-primary > li").next(".sub-menu").append("<li id='d"+departements[i]+"''><a href='#'>"+departements[i]+"</a></li>");
            /*
                Ajout event listener pour les effets du sous-menu
            */
            document.getElementById("d"+departements[i]).addEventListener("mouseover",function(){
                $(this).css("color","#f5f5f5");
                $(this).css("text-shadow","rgba(255,255,255,0.5) 0px 0px 5px");
            });
            document.getElementById("d"+departements[i]).addEventListener("mouseout",function(){
                $(this).css("color","#a3abb0");
                $(this).css("text-shadow","none");
            });
            document.getElementById("d"+departements[i]).addEventListener("click",function(){
                for(var i=0;i<markers.length;i++)
                {
                    map.removeLayer(markers[i]);
                }
                markers = [];
                var j = 0;
                for(var i=0;i<station.length/4;i=i+4) {
                    if("d"+station[i+1]===$(this).attr("id")){
                        markers[j] = new L.marker([station[i+3], station[i+2]]).addTo(map).bindPopup(station[i]);
                        j++;
                    }
                }
            });
        }
    });
    $("#menu > #nav > .nav-primary > li.level0 > a").click(function(){
        /*
            Fermeture du Dropdown menu
         */
        if($(this).attr("id")!="allStation") {
            if($(this).attr("class")==="level0 active"){
                $(this).parents("li").next(".sub-menu").slideUp();
                $(this).removeClass("active");
            }
            /*
                Ouverture du Dropdown menu
             */
            else{
                $(this).parents("li").next(".sub-menu").slideDown();
                $(this).addClass("active");
            }
        }
        else {
            var j = 0;
            for(var i=0;i<station.length/4;i=i+4) {
                markers[j] = new L.marker([station[i+3], station[i+2]]).addTo(map).bindPopup(station[i]);
                j++;
            }
        }
    });
    
    /*
        Effet mousedown et mouseup menu
    */
    $('#menu .nav-primary > li > a').mousedown(function(ev) {
        $(this).css('backgroundColor','#1f2122');
    });
    $('#menu .nav-primary > li > a').mouseup(function(ev) {
        $(this).css('backgroundColor','#282a2b');
    });
    /*
        Effet hover menu
    */
    $('#menu .nav-primary > li > a').mouseover(function(ev) {
        $(this).css("backgroundColor","#2f3336");
    });
    $('#menu .nav-primary > li > a').mouseout(function(ev) {
        $(this).css("backgroundColor","#282a2b");
    });
});