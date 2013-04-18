var App = (function(lng, undefined) {

    sectionTrigger = function(event) {
        event.stopPropagation();
        setTimeout(function() {
            lng.Notification.success("Event: " + event.type, "Layout events manager", "info", 2);
        }, 500);
    };

    articleTrigger = function(event) {
        event.stopPropagation();
        console.error(event);
    };

    environment = function(event) {
        var environment = lng.Core.environment();
        var el = lng.dom("section > article#environment");

        if (environment.os) {
            el.find("#os > strong").html(environment.os.name);
            el.find("#os > small").html(environment.os.version);
        }
        el.find("#resolution > strong").html(environment.screen.height + "p x " + environment.screen.width + "p");
        el.find("#navigator > strong").html(environment.browser);
        el.find("#navigator > small").html("Mobile: " + environment.isMobile);
    };

    return {
        sectionTrigger: sectionTrigger,
        articleTrigger: articleTrigger,
        environment: environment
    };

})(Lungo);


App.carousel = {prev: null, next: null};

Lungo.Events.init({
    'load section#layoutevents'     : App.sectionTrigger,

    'unload section#layoutevents'   : App.sectionTrigger,

    'load article#environment'      : App.environment,

    'load section#layout'           : function(event) {
        App.carousel = Lungo.Element.Carousel($$('[data-control=carousel]')[0], function(index, element) {
            Lungo.dom("section#photo .carousel_div .title span").html(index + 1);
        });
    },

    'load article#touchevents'      : function(event) {

        ["singleTap", "doubleTap", "hold",
            "swipe", "-swiping", "swipeLeft", "swipeRight", "swipeUp", "swipeDown",
            "rotate", "rotateLeft", "rotateRight",
            "pinch", "pinchIn", "pinchOut",
            "drag", "dragLeft", "dragRight", "dragUp", "dragDown"].forEach(function(type) {
            $$("article#touchevents #gestures").on(type, function(event) {
                $$(this).siblings('.console.output').append(' | ' + type);
            });
        });

        $$("[data-action=clean_console]").tap(function(event) {
            $$('.console.output').html("");
        });

        $$("[data-action=twitter]").tap(function(event) {
            window.open("https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Flungo.tapquo.com%2F&text=@lungojs a framework for developers who want to design, build and share cross device apps", "_blank");
        });

    },


    'load section#carousel': function(event) {
        App.carousel = Lungo.Element.Carousel($$('[data-control=carousel]')[0], function(index, element) {
            Lungo.dom("section#carousel .title span").html(index + 1);
        });
    },
    
    'load section#place_1': function(event) {
        var myScroll3;
        document.getElementById('banner_up').style.height = document.getElementById('circle').offsetHeight + 'px';
        document.getElementById("info").style.fontSize = (window.innerWidth)/36 + 'px';
        document.getElementById("plus").style.fontSize = (window.innerWidth)/13.82 + 'px';
        document.getElementById("place_name").style.fontSize = (window.innerWidth)/17.19 + 'px';
       
        myScroll3 = new iScroll('wrapper_menu');
        var myOptions = {
                center: new google.maps.LatLng(39.8574, -4.02084),
                zoom: 3,
                mapTypeControl: false,
                disableDefaultUI: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);     

    },

       'load section#place_2': function(event) {
        var myScroll3;
        document.getElementById('banner_up').style.height = document.getElementById('circle').offsetHeight + 'px';
        document.getElementById("info").style.fontSize = (window.innerWidth)/36 + 'px';
        document.getElementById("plus").style.fontSize = (window.innerWidth)/13.82 + 'px';
        document.getElementById("place_name_2").style.fontSize = (window.innerWidth)/20 + 'px';
       
        myScroll3 = new iScroll('wrapper_menu');
        var myOptions = {
                center: new google.maps.LatLng(39.8574, -4.02084),
                zoom: 3,
                mapTypeControl: false,
                disableDefaultUI: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);     

    },

    'load section#place_3': function(event) {
        var myScroll3;
        document.getElementById('banner_up').style.height = document.getElementById('circle').offsetHeight + 'px';
        document.getElementById("info").style.fontSize = (window.innerWidth)/36 + 'px';
        document.getElementById("plus").style.fontSize = (window.innerWidth)/13.82 + 'px';
        document.getElementById("place_name_3").style.fontSize = (window.innerWidth)/22 + 'px';
       
        myScroll3 = new iScroll('wrapper_menu');
        var myOptions = {
                center: new google.maps.LatLng(39.8574, -4.02084),
                zoom: 3,
                mapTypeControl: false,
                disableDefaultUI: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);     

    },

    'tap section#carousel > header [data-direction=left]':  App.carousel.prev,

    'tap section#carousel > header [data-direction=right]': App.carousel.next,

    'tap #themeroller li': function(event) {
        var link = $$("#theme-stylesheet");
        var url = link.attr("href");
        var new_url = url.split("/").slice(0, -1);
        new_url.push($$(this).attr("data-theme"));
        link.attr('href', new_url.join("/"));
    },

    'load section#pull': function(event) {
        App.pull = new Lungo.Element.Pull('section#pull article', {
            onPull: "Pull down to refresh",
            onRelease: "Release to get new data",
            onRefresh: "Refreshing...",
            callback: function() {
                alert("Pull & Refresh completed!");
                App.pull.hide();
            }
        });
    },


    'tap article#notification a[data-action=normal]': function() {
        Lungo.Notification.show('Title', 'message', 2);
    },

    'tap article#notification a[data-action=loading]': function() {
        Lungo.Notification.show();
        setTimeout(Lungo.Notification.hide, 3000);
    },

    'tap article#notification a[data-action=success]': function() {
        Lungo.Notification.success('Title', 'Description', 'message', 2);
    },

    'tap article#notification a[data-action=error]': function() {
        Lungo.Notification.error('Title', 'Description', 'message', 2);
    },

    'tap article#notification a[data-action=confirm]': function() {
        Lungo.Notification.confirm({
            icon: 'user',
            title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo amet nulla dolorum hic eum debitis dolorem expedita? Commodi molestiae tempora totam explicabo sed deserunt cum iusto eos perspiciatis ea in.',
            accept: {
                icon: 'checkmark',
                label: 'Accept',
                callback: function(){ alert("Yes!"); }
            },
            cancel: {
                icon: 'close',
                label: 'Cancel',
                callback: function(){ alert("No!"); }
            }
        });
    },

    'tap article#notification a[data-action=html]': function() {
        var myOptions = {
                center: new google.maps.LatLng(54, -2),
                zoom: 6,
                mapTypeId: google.maps.MapTypeId.ROADMAP
                };

        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        Lungo.Notification.html('<div id="map_canvas"></div>', true);
    },

    'tap article#photo #inspire': function() {
        Lungo.Notification.html('<h1>Hello World</h1>', true);
    },

    'tap article#photo #wrapper .scroller .thelist li': function() {

    // remove child
    var tester= this.getAttribute("id");

    /*var node = document.getElementById(tester);*/

    //document.getElementById(tester).innerHTML = "<div id='relleno'>Add</div>";
   /* if (node.parentNode) {
    node.parentNode.removeChild(node);
    }



  var list = document.getElementById("lalala");
    var newnode = document.createElement("li");
    list.insertBefore(newnode,this);
    newnode.innerText = "List node 5";*/

        //this.setAttribute("src", "http://3.bp.blogspot.com/-mDlo3cVYEGc/Th12zxh99jI/AAAAAAAAAGE/yX9RxzubM_8/s1600/6a00d8341bf8f353ef014e5fda5433970c-800wi_large.jpeg");


    },

    'tap article#notification a[data-action=chaining]': function() {
        Lungo.Notification.show('Title', 'message', 2, function() {
            Lungo.Notification.error('Title 2', 'Description 2', 'message',  2, function() {
                Lungo.Notification.show('Title 3', 'Description 3', 'message', false, 2, function() {
                    Lungo.Notification.html('<h1>Hello World</h1>', true);
                    // Lungo.Notification.hide();
                });
            });
        });
    }

});


Lungo.ready(function() {

    // Lungo.Aside.show();
    //  Lungo.Router.section("notification");

    //  var afterNotification = function(){
    //     alert(1);
    // };

    //  Lungo.Notification.show();
    //  setTimeout(Lungo.Notification.hide, 3000);
    //  Lungo.Router.section("app/sections/layout.html");

     //Lungo.Notification.show("Please wait", "loading", 2, afterNotification);
    // Lungo.Notification.error('Lorem ipsum dolor sit amet, consectetur adipisicing.', "tap to continue", 'cancel');
    // Lungo.Notification.success('Lorem ipsum dolor sit amet, consectetur adipisicing.', "tap to continue", 'cancel', 2, function(){alert(1)});
    // Lungo.Notification.confirm({
    //     icon: 'user',
    //     title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo amet nulla dolorum hic eum debitis dolorem expedita? Commodi molestiae tempora totam explicabo sed deserunt cum iusto eos perspiciatis ea in.',
    //     accept: {
    //         icon: 'checkmark',
    //         label: 'Accept',
    //         callback: function(){ alert("Yes!"); }
    //     },
    //     cancel: {
    //         icon: 'close',
    //         label: 'Cancel',
    //         callback: function(){ alert("No!"); }
    //     }
    // });

});
