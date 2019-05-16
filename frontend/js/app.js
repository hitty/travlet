"use strict";
$(document).ready(function() {
    $(".carousel .list").carousel({
        freeScroll: !0,
        contain: !0,
        pageDots: !1,
        groupCells: "100%"
    }),
    $("header nav").menu(),
    $(".logo span").fitText()
});
