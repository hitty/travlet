"use strict";
$ && function(d, c, h, e) {
    h.fn.menu = function(e) {
        var s = h.extend({
            links_el: ".visible-links",
            language_el: ".language .dropdown-menu .list",
            links_mobile_template: '<div class="mobile-menu mobile links" id="mobile-menu"><div class="inner"><div class="title">Menu<span class="toggle-off"><i class="icon icon-close"></i></span></div><ul></ul></div></div>',
            links_mobile_el: ".mobile-menu.links ul",
            language_mobile_template: '<div class="mobile-menu mobile language" id="mobile-menu-language"><div class="inner"><div class="title">Language<span class="toggle-off"><i class="icon icon-close"></i></span></div><div class="list flex"></div></div></div>',
            language_mobile_el: ".mobile-menu.language .list",
            statement: "",
            mobile: !1,
            nav: ".greedy-nav",
            hlinks: ".greedy-nav .more .dropdown-menu",
            btn: ".greedy-nav .more",
            breaks: [],
            smth: 'h2[id*="smooth-"',
            navigation_link: ".smooth",
            reset_hover: "reset-hover",
            he: "header details",
            fixedHeader: 0,
            topBtnHeight: 0,
            header: "header",
            topBtn: ".to-top-btn",
            headerMsr: 0,
            frzScrl: !1,
            cards: "section.card",
            button_cards_collapse: ".cards-collapse",
            button_cards_template: '<button class="btn cards-collapse" type="button"><span class="on">Show more</span><span class="off">Show less</span></button>',
            onInit: function() {},
            onFormSuccess: function(e) {}
        }, e || {})
          , i = null
          , t = function() {
            s.mobile ? jQuery(s.cards).each(function() {
                var e = jQuery(this);
                530 < parseInt(e.height()) && e.attr("aria-expanded", "false").prepend(s.button_cards_template)
            }) : (jQuery(s.cards).removeAttr("aria-expanded"),
            h(s.button_cards_collapse).remove())
        }
          , a = function() {
            s.mobile ? (h("body").append(s.links_mobile_template),
            h(s.links_mobile_el).append(h(s.links_el, i).html()),
            h("body").append(s.language_mobile_template),
            h(s.language_mobile_el).append(h(s.language_el, i).html()),
            s.statement = i.html(),
            i.html("")) : (i.html(s.statement),
            s.statement = "",
            h(".mobile-menu").remove())
        }
          , l = function() {
            return d.innerWidth < 736
        }
          , o = function e() {
            if (s.mobile)
                return !1;
            var t = h(s.btn).hasClass("hidden") ? h(s.nav).width() : h(s.nav).width() - h(s.btn).width() - 76;
            h(s.links_el).width() > t ? (s.breaks.push(h(s.links_el).width()),
            h(s.links_el).children().last().prependTo(h(s.hlinks)),
            h(s.btn).hasClass("hidden") && h(s.btn).removeClass("hidden")) : (t > s.breaks[s.breaks.length - 1] && (h(s.hlinks).children().first().appendTo(h(s.links_el)),
            s.breaks.pop()),
            s.breaks.length < 1 && (h(s.btn).addClass("hidden"),
            h(s.hlinks).addClass("hidden"))),
            h(s.btn).attr("count", s.breaks.length),
            h(s.links_el).width() > t && e(),
            h(s.links_el).css({
                opacity: 1
            })
        }
          , r = function() {
            var e = d.pageYOffset || c.documentElement.scrollTop;
            if (0 < s.headerMsr && (e >= s.fixedHeader ? h(s.header).hasClass("fixed") || h(s.header).addClass("fixed") : h(s.header).removeClass("fixed")),
            e >= s.topBtnHeight ? h(s.topBtn).addClass("show") : h(s.topBtn).removeClass("show"),
            !s.frzScrl) {
                if (h(s.smth).eq(0).offset().top - s.headerMsr - 60 > e)
                    return h(s.navigation_link, i).removeClass("active");
                for (var t = e, n = h(s.smth).length - 1; 0 <= n; n -= 1) {
                    var a = h(s.smth).eq(n);
                    if (t >= a.offset().top - s.headerMsr - 60)
                        return h(s.navigation_link, i).removeClass("active").filter('[href="#' + a.attr("id") + '"]').addClass("active")
                }
            }
        };
        return h.fn.fitText = function(e, t) {
            var n = e || 1
              , a = h.extend({
                minFontSize: Number.NEGATIVE_INFINITY,
                maxFontSize: Number.POSITIVE_INFINITY
            }, t);
            return this.each(function() {
                function e() {
                    t.css("font-size", Math.max(Math.min(t.width() / (10 * n), parseFloat(a.maxFontSize)), parseFloat(a.minFontSize)))
                }
                var t = h(this);
                e(),
                h(d).on("resize.fittext orientationchange.fittext", e)
            })
        }
        ,
        this.each(function() {
            i = h(this),
            function() {
                s.mobile = l(),
                s.mobile ? (a(),
                t()) : (o(),
                o()),
                h("button.toggle").each(function() {
                    h(this).on("click", function() {
                        h(".mobile-menu#" + h(this).data("target")).addClass("active"),
                        h("body,html").css({
                            overflow: "hidden"
                        })
                    })
                }),
                h(".mobile-menu .toggle-off,.mobile-menu li a").each(function() {
                    h(this).on("click", function(e) {
                        e.preventDefault();
                        var t = h(this).closest(".mobile-menu");
                        return h("a").removeClass("on"),
                        h(this).addClass("on"),
                        t.removeClass("active"),
                        h("body,html").css({
                            overflow: "visible"
                        }),
                        !1
                    })
                }),
                h(s.btn_el).on("click", function() {
                    h(s.language_el).toggleClass("hidden")
                }),
                h(d).resize(function() {
                    s.mobile != l() && (s.mobile = l(),
                    a(),
                    t()),
                    s.mobile || o()
                }),
                h(s.btn).on("click", function() {
                    h(s.hlinks).toggleClass("hidden")
                }),
                s.fixedHeader = parseInt(h(s.header).height()),
                s.topBtnHeight = s.fixedHeader + 100,
                s.headerMsr = h(s.header).hasClass("sticky") ? parseInt(h(s.header).height()) : 0,
                r(),
                h(d).scroll(function() {
                    r()
                }),
                h(s.topBtn).on("click", function() {
                    return h("html,body").animate({
                        scrollTop: 0
                    }, "slow"),
                    !1
                }),
                h(s.navigation_link).on("click", function(e) {
                    s.frzScrl = !0,
                    e.preventDefault();
                    var t = h(this).data("target");
                    h("body,html").animate({
                        scrollTop: h(t).offset().top - parseInt(s.headerMsr) - 10
                    }, {
                        duration: "slow",
                        complete: function() {
                            s.frzScrl = !1
                        }
                    }),
                    h(s.navigation_link, i).removeClass("active"),
                    h('[data-target="' + t + '"]').addClass("active " + s.reset_hover),
                    h(this).closest(".hidden-links").length && h(this).closest("details").removeAttr("open")
                }),
                h(s.navigation_link).on("mouseout", function() {
                    h(this).hasClass(s.reset_hover) && h(this).removeClass(s.reset_hover)
                }),
                h(s.he).click(function(e) {
                    h(s.he).not(this).removeAttr("open")
                }),
                h(c).mouseup(function(e) {
                    var t = h(s.he);
                    t.is(e.target) || 0 !== t.has(e.target).length || t.removeAttr("open")
                }),
                s.mobile || h(".faq details summary").mouseover(function() {
                    h(this).addClass("hovered")
                }).mouseout(function() {
                    h(this).removeClass("hovered")
                }),
                h(".faq details summary").click(function(e) {
                    h(this).closest("details").siblings().removeAttr("open")
                });
                var n = 0;
                h(s.button_cards_collapse).click(function() {
                    var e = h(this).closest(s.cards)
                      , t = "true" == e.attr("aria-expanded") ? "false" : "true";
                    e.attr("aria-expanded", t),
                    "false" == e.attr("aria-expanded") && h("html,body").animate({
                        scrollTop: n
                    }, "slow"),
                    n = h(c).scrollTop()
                })
            }()
        })
    }
}(window, document, $);
