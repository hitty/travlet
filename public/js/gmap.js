"use strict";

var map;

function initGoogleMap() {
  map = new google.maps.Map(document.getElementById("gmap"), {
    center: new google.maps.LatLng(-33.91722, 151.23064),
    zoom: 16,
    zoomControl: !1,
    scaleControl: !0,
    disableDefaultUI: !0
  });
  var e,
      n,
      o = new google.maps.LatLngBounds(),
      t = "img/map-icon-",
      i = {
    building: {
      icon: t + "building.svg"
    },
    gym: {
      icon: t + "gym.svg"
    },
    coffee: {
      icon: t + "coffee.svg"
    },
    restaurant: {
      icon: t + "restaurant.svg"
    }
  },
      a = '<div class="infobox-inner"><div class="image" style="background-image:url(img/gmap-image.png)"></div><div class="description"><p class="title">McDonalds restaurant</p><p class="text">An American fast food company, founded in 1940.</p><ul><li><img src="img/svg/location.svg">89 Shacklewell Ln, London, E8 2EB<span class="opacity-light text-small">110 meters approx.</span></li><li> <img src="img/svg/clock.svg">06:30–20:00</li></ul></div><a href="#" class="btn mc">See Directions<i class="icon icon-arrow-right"></a>',
      s = [{
    position: new google.maps.LatLng(-33.91701, 151.226),
    type: "restaurant",
    title: "Restaurant of Kings",
    content: a
  }, {
    position: new google.maps.LatLng(-33.91639, 151.2322),
    type: "building",
    title: "Old Royal Building",
    content: a
  }, {
    position: new google.maps.LatLng(-33.91539, 151.2282),
    type: "coffee",
    title: "Royal Coffee",
    content: a
  }, {
    position: new google.maps.LatLng(-33.92549, 151.2293),
    type: "gym",
    title: "Gym Palace",
    content: a
  }],
      g = new google.maps.InfoWindow();

  for (n = 0; n < s.length; n++) {
    o.extend(s[n].position), e = new google.maps.Marker({
      position: s[n].position,
      icon: i[s[n].type].icon,
      map: map,
      title: s[n].title
    }), google.maps.event.addListener(e, "click", function (e, n) {
      return function () {
        g.setContent(s[n].content), g.open(map, e);
      };
    }(e, n)), map.fitBounds(o);
  }

  var l = google.maps.event.addListener(map, "bounds_changed", function (e) {
    this.setZoom(14), google.maps.event.removeListener(l);
  });
}