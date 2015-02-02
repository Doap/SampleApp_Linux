(function (e) { e.widget("thomaskahn.smoothDivScroll", { options: { scrollingHotSpotLeftClass: "scrollingHotSpotLeft", scrollingHotSpotRightClass: "scrollingHotSpotRight", scrollableAreaClass: "scrollableArea", scrollWrapperClass: "scrollWrapper", hiddenOnStart: !1, getContentOnLoad: {}, countOnlyClass: "", startAtElementId: "", hotSpotScrolling: !0, hotSpotScrollingStep: 15, hotSpotScrollingInterval: 10, hotSpotMouseDownSpeedBooster: 3, visibleHotSpotBackgrounds: "hover", hotSpotsVisibleTime: 5e3, easingAfterHotSpotScrolling: !0, easingAfterHotSpotScrollingDistance: 10, easingAfterHotSpotScrollingDuration: 300, easingAfterHotSpotScrollingFunction: "easeOutQuart", mousewheelScrolling: "", mousewheelScrollingStep: 70, easingAfterMouseWheelScrolling: !0, easingAfterMouseWheelScrollingDuration: 300, easingAfterMouseWheelScrollingFunction: "easeOutQuart", manualContinuousScrolling: !1, autoScrollingMode: "", autoScrollingDirection: "endlessLoopRight", autoScrollingStep: 1, autoScrollingInterval: 10, touchScrolling: !1, scrollToAnimationDuration: 1e3, scrollToEasingFunction: "easeOutQuart" }, _create: function () { var t = this, n = this.options, r = this.element; r.data("scrollWrapper", r.find("." + n.scrollWrapperClass)), r.data("scrollingHotSpotRight", r.find("." + n.scrollingHotSpotRightClass)), r.data("scrollingHotSpotLeft", r.find("." + n.scrollingHotSpotLeftClass)), r.data("scrollableArea", r.find("." + n.scrollableAreaClass)), r.data("scrollingHotSpotRight").length > 0 && r.data("scrollingHotSpotRight").detach(), r.data("scrollingHotSpotLeft").length > 0 && r.data("scrollingHotSpotLeft").detach(), r.data("scrollableArea").length === 0 && r.data("scrollWrapper").length === 0 ? (r.wrapInner("<div class='" + n.scrollableAreaClass + "'>").wrapInner("<div class='" + n.scrollWrapperClass + "'>"), r.data("scrollWrapper", r.find("." + n.scrollWrapperClass)), r.data("scrollableArea", r.find("." + n.scrollableAreaClass))) : r.data("scrollWrapper").length === 0 ? (r.wrapInner("<div class='" + n.scrollWrapperClass + "'>"), r.data("scrollWrapper", r.find("." + n.scrollWrapperClass))) : r.data("scrollableArea").length === 0 && (r.data("scrollWrapper").wrapInner("<div class='" + n.scrollableAreaClass + "'>"), r.data("scrollableArea", r.find("." + n.scrollableAreaClass))), r.data("scrollingHotSpotRight").length === 0 ? (r.prepend("<div class='" + n.scrollingHotSpotRightClass + "'></div>"), r.data("scrollingHotSpotRight", r.find("." + n.scrollingHotSpotRightClass))) : r.prepend(r.data("scrollingHotSpotRight")), r.data("scrollingHotSpotLeft").length === 0 ? (r.prepend("<div class='" + n.scrollingHotSpotLeftClass + "'></div>"), r.data("scrollingHotSpotLeft", r.find("." + n.scrollingHotSpotLeftClass))) : r.prepend(r.data("scrollingHotSpotLeft")), r.data("speedBooster", 1), r.data("scrollXPos", 0), r.data("hotSpotWidth", r.data("scrollingHotSpotLeft").innerWidth()), r.data("scrollableAreaWidth", 0), r.data("startingPosition", 0), r.data("rightScrollingInterval", null), r.data("leftScrollingInterval", null), r.data("autoScrollingInterval", null), r.data("hideHotSpotBackgroundsInterval", null), r.data("previousScrollLeft", 0), r.data("pingPongDirection", "right"), r.data("getNextElementWidth", !0), r.data("swapAt", null), r.data("startAtElementHasNotPassed", !0), r.data("swappedElement", null), r.data("originalElements", r.data("scrollableArea").children(n.countOnlyClass)), r.data("visible", !0), r.data("enabled", !0), r.data("scrollableAreaHeight", r.data("scrollableArea").height()), r.data("scrollerOffset", r.offset()), r.data("initialAjaxContentLoaded", !1), n.touchScrolling && r.data("enabled") && r.data("scrollWrapper").kinetic({ y: !1, moved: function (e) { n.manualContinuousScrolling && (r.data("scrollWrapper").scrollLeft() <= 0 ? t._checkContinuousSwapLeft() : t._checkContinuousSwapRight()) }, stopped: function (e) { r.data("scrollWrapper").stop(!0, !1), t.stopAutoScrolling() } }), r.data("scrollingHotSpotRight").bind("mousemove", function (e) { if (n.hotSpotScrolling) { var t = e.pageX - (this.offsetLeft + r.data("scrollerOffset").left); r.data("scrollXPos", Math.round(t / r.data("hotSpotWidth") * n.hotSpotScrollingStep)), (r.data("scrollXPos") === Infinity || r.data("scrollXPos") < 1) && r.data("scrollXPos", 1) } }), r.data("scrollingHotSpotRight").bind("mouseover", function () { n.hotSpotScrolling && (r.data("scrollWrapper").stop(!0, !1), t.stopAutoScrolling(), r.data("rightScrollingInterval", setInterval(function () { r.data("scrollXPos") > 0 && r.data("enabled") && (r.data("scrollWrapper").scrollLeft(r.data("scrollWrapper").scrollLeft() + r.data("scrollXPos") * r.data("speedBooster")), n.manualContinuousScrolling && t._checkContinuousSwapRight(), t._showHideHotSpots()) }, n.hotSpotScrollingInterval)), t._trigger("mouseOverRightHotSpot")) }), r.data("scrollingHotSpotRight").bind("mouseout", function () { n.hotSpotScrolling && (clearInterval(r.data("rightScrollingInterval")), r.data("scrollXPos", 0), n.easingAfterHotSpotScrolling && r.data("enabled") && r.data("scrollWrapper").animate({ scrollLeft: r.data("scrollWrapper").scrollLeft() + n.easingAfterHotSpotScrollingDistance }, { duration: n.easingAfterHotSpotScrollingDuration, easing: n.easingAfterHotSpotScrollingFunction })) }), r.data("scrollingHotSpotRight").bind("mousedown", function () { r.data("speedBooster", n.hotSpotMouseDownSpeedBooster) }), e("body").bind("mouseup", function () { r.data("speedBooster", 1) }), r.data("scrollingHotSpotLeft").bind("mousemove", function (e) { if (n.hotSpotScrolling) { var t = this.offsetLeft + r.data("scrollerOffset").left + r.data("hotSpotWidth") - e.pageX; r.data("scrollXPos", Math.round(t / r.data("hotSpotWidth") * n.hotSpotScrollingStep)), (r.data("scrollXPos") === Infinity || r.data("scrollXPos") < 1) && r.data("scrollXPos", 1) } }), r.data("scrollingHotSpotLeft").bind("mouseover", function () { n.hotSpotScrolling && (r.data("scrollWrapper").stop(!0, !1), t.stopAutoScrolling(), r.data("leftScrollingInterval", setInterval(function () { r.data("scrollXPos") > 0 && r.data("enabled") && (r.data("scrollWrapper").scrollLeft(r.data("scrollWrapper").scrollLeft() - r.data("scrollXPos") * r.data("speedBooster")), n.manualContinuousScrolling && t._checkContinuousSwapLeft(), t._showHideHotSpots()) }, n.hotSpotScrollingInterval)), t._trigger("mouseOverLeftHotSpot")) }), r.data("scrollingHotSpotLeft").bind("mouseout", function () { n.hotSpotScrolling && (clearInterval(r.data("leftScrollingInterval")), r.data("scrollXPos", 0), n.easingAfterHotSpotScrolling && r.data("enabled") && r.data("scrollWrapper").animate({ scrollLeft: r.data("scrollWrapper").scrollLeft() - n.easingAfterHotSpotScrollingDistance }, { duration: n.easingAfterHotSpotScrollingDuration, easing: n.easingAfterHotSpotScrollingFunction })) }), r.data("scrollingHotSpotLeft").bind("mousedown", function () { r.data("speedBooster", n.hotSpotMouseDownSpeedBooster) }), r.data("scrollableArea").mousewheel(function (e, i, s, u) { if (r.data("enabled") && n.mousewheelScrolling.length > 0) { var a; n.mousewheelScrolling === "vertical" && u !== 0 ? (t.stopAutoScrolling(), e.preventDefault(), a = Math.round(n.mousewheelScrollingStep * u * -1), t.move(a)) : n.mousewheelScrolling === "horizontal" && s !== 0 ? (t.stopAutoScrolling(), e.preventDefault(), a = Math.round(n.mousewheelScrollingStep * s * -1), t.move(a)) : n.mousewheelScrolling === "allDirections" && (t.stopAutoScrolling(), e.preventDefault(), a = Math.round(n.mousewheelScrollingStep * i * -1), t.move(a)) } }), n.mousewheelScrolling && r.data("scrollingHotSpotLeft").add(r.data("scrollingHotSpotRight")).mousewheel(function (e) { e.preventDefault() }), e(window).bind("resize", function () { t._showHideHotSpots(), t._trigger("windowResized") }), jQuery.isEmptyObject(n.getContentOnLoad) || t[n.getContentOnLoad.method](n.getContentOnLoad.content, n.getContentOnLoad.manipulationMethod, n.getContentOnLoad.addWhere, n.getContentOnLoad.filterTag), n.hiddenOnStart && t.hide(), e(window).load(function () { n.hiddenOnStart || t.recalculateScrollableArea(), n.autoScrollingMode.length > 0 && !n.hiddenOnStart && t.startAutoScrolling(); if (n.autoScrollingMode !== "always") switch (n.visibleHotSpotBackgrounds) { case "always": t.showHotSpotBackgrounds(); break; case "onStart": t.showHotSpotBackgrounds(), r.data("hideHotSpotBackgroundsInterval", setTimeout(function () { t.hideHotSpotBackgrounds(250) }, n.hotSpotsVisibleTime)); break; case "hover": r.mouseenter(function (e) { n.hotSpotScrolling && (e.stopPropagation(), t.showHotSpotBackgrounds(250)) }).mouseleave(function (e) { n.hotSpotScrolling && (e.stopPropagation(), t.hideHotSpotBackgrounds(250)) }); break; default: } t._showHideHotSpots(), t._trigger("setupComplete") }) }, _setOption: function (e, t) { var n = this, r = this.options, i = this.element; r[e] = t, e === "hotSpotScrolling" ? t === !0 ? n._showHideHotSpots() : (i.data("scrollingHotSpotLeft").hide(), i.data("scrollingHotSpotRight").hide()) : e === "autoScrollingStep" || e === "easingAfterHotSpotScrollingDistance" || e === "easingAfterHotSpotScrollingDuration" || e === "easingAfterMouseWheelScrollingDuration" ? r[e] = parseInt(t, 10) : e === "autoScrollingInterval" && (r[e] = parseInt(t, 10), n.startAutoScrolling()) }, showHotSpotBackgrounds: function (e) { var t = this, n = this.element, r = this.option; e !== undefined ? (n.data("scrollingHotSpotLeft").addClass("scrollingHotSpotLeftVisible"), n.data("scrollingHotSpotRight").addClass("scrollingHotSpotRightVisible"), n.data("scrollingHotSpotLeft").add(n.data("scrollingHotSpotRight")).fadeTo(e, .35)) : (n.data("scrollingHotSpotLeft").addClass("scrollingHotSpotLeftVisible"), n.data("scrollingHotSpotLeft").removeAttr("style"), n.data("scrollingHotSpotRight").addClass("scrollingHotSpotRightVisible"), n.data("scrollingHotSpotRight").removeAttr("style")), t._showHideHotSpots() }, hideHotSpotBackgrounds: function (e) { var t = this.element, n = this.option; e !== undefined ? (t.data("scrollingHotSpotLeft").fadeTo(e, 0, function () { t.data("scrollingHotSpotLeft").removeClass("scrollingHotSpotLeftVisible") }), t.data("scrollingHotSpotRight").fadeTo(e, 0, function () { t.data("scrollingHotSpotRight").removeClass("scrollingHotSpotRightVisible") })) : (t.data("scrollingHotSpotLeft").removeClass("scrollingHotSpotLeftVisible").removeAttr("style"), t.data("scrollingHotSpotRight").removeClass("scrollingHotSpotRightVisible").removeAttr("style")) }, _showHideHotSpots: function () { var e = this, t = this.element, n = this.options; n.hotSpotScrolling ? n.manualContinuousScrolling && n.hotSpotScrolling && n.autoScrollingMode !== "always" ? (t.data("scrollingHotSpotLeft").show(), t.data("scrollingHotSpotRight").show()) : n.autoScrollingMode !== "always" && n.hotSpotScrolling ? t.data("scrollableAreaWidth") <= t.data("scrollWrapper").innerWidth() ? (t.data("scrollingHotSpotLeft").hide(), t.data("scrollingHotSpotRight").hide()) : t.data("scrollWrapper").scrollLeft() === 0 ? (t.data("scrollingHotSpotLeft").hide(), t.data("scrollingHotSpotRight").show(), e._trigger("scrollerLeftLimitReached"), clearInterval(t.data("leftScrollingInterval")), t.data("leftScrollingInterval", null)) : t.data("scrollableAreaWidth") <= t.data("scrollWrapper").innerWidth() + t.data("scrollWrapper").scrollLeft() ? (t.data("scrollingHotSpotLeft").show(), t.data("scrollingHotSpotRight").hide(), e._trigger("scrollerRightLimitReached"), clearInterval(t.data("rightScrollingInterval")), t.data("rightScrollingInterval", null)) : (t.data("scrollingHotSpotLeft").show(), t.data("scrollingHotSpotRight").show()) : (t.data("scrollingHotSpotLeft").hide(), t.data("scrollingHotSpotRight").hide()) : (t.data("scrollingHotSpotLeft").hide(), t.data("scrollingHotSpotRight").hide()) }, _setElementScrollPosition: function (t, n) { var r = this.element, i = this.options, s = 0; switch (t) { case "first": return r.data("scrollXPos", 0), !0; case "start": if (i.startAtElementId !== "" && r.data("scrollableArea").has("#" + i.startAtElementId)) return s = e("#" + i.startAtElementId).position().left, r.data("scrollXPos", s), !0; return !1; case "last": return r.data("scrollXPos", r.data("scrollableAreaWidth") - r.data("scrollWrapper").innerWidth()), !0; case "number": if (!isNaN(n)) return s = r.data("scrollableArea").children(i.countOnlyClass).eq(n - 1).position().left, r.data("scrollXPos", s), !0; return !1; case "id": if (n.length > 0 && r.data("scrollableArea").has("#" + n)) return s = e("#" + n).position().left, r.data("scrollXPos", s), !0; return !1; default: return !1 } }, jumpToElement: function (e, t) { var n = this, r = this.element; if (r.data("enabled") && n._setElementScrollPosition(e, t)) { r.data("scrollWrapper").scrollLeft(r.data("scrollXPos")), n._showHideHotSpots(); switch (e) { case "first": n._trigger("jumpedToFirstElement"); break; case "start": n._trigger("jumpedToStartElement"); break; case "last": n._trigger("jumpedToLastElement"); break; case "number": n._trigger("jumpedToElementNumber", null, { elementNumber: t }); break; case "id": n._trigger("jumpedToElementId", null, { elementId: t }); break; default: } } }, scrollToElement: function (e, t) { var n = this, r = this.element, i = this.options, s = !1; r.data("enabled") && n._setElementScrollPosition(e, t) && (r.data("autoScrollingInterval") !== null && (n.stopAutoScrolling(), s = !0), r.data("scrollWrapper").stop(!0, !1), r.data("scrollWrapper").animate({ scrollLeft: r.data("scrollXPos") }, { duration: i.scrollToAnimationDuration, easing: i.scrollToEasingFunction, complete: function () { s && n.startAutoScrolling(), n._showHideHotSpots(); switch (e) { case "first": n._trigger("scrolledToFirstElement"); break; case "start": n._trigger("scrolledToStartElement"); break; case "last": n._trigger("scrolledToLastElement"); break; case "number": n._trigger("scrolledToElementNumber", null, { elementNumber: t }); break; case "id": n._trigger("scrolledToElementId", null, { elementId: t }); break; default: } } })) }, move: function (e) { var t = this, n = this.element, r = this.options; n.data("scrollWrapper").stop(!0, !0); if (e < 0 && n.data("scrollWrapper").scrollLeft() > 0 || e > 0 && n.data("scrollableAreaWidth") > n.data("scrollWrapper").innerWidth() + n.data("scrollWrapper").scrollLeft()) r.easingAfterMouseWheelScrolling ? n.data("scrollWrapper").animate({ scrollLeft: n.data("scrollWrapper").scrollLeft() + e }, { duration: r.easingAfterMouseWheelScrollingDuration, easing: r.easingAfterMouseWheelFunction, complete: function () { t._showHideHotSpots(), r.manualContinuousScrolling && (e > 0 ? t._checkContinuousSwapRight() : t._checkContinuousSwapLeft()) } }) : (n.data("scrollWrapper").scrollLeft(n.data("scrollWrapper").scrollLeft() + e), t._showHideHotSpots(), r.manualContinuousScrolling && (e > 0 ? t._checkContinuousSwapRight() : t._checkContinuousSwapLeft())) }, getFlickrContent: function (t, n) { var r = this, i = this.element; e.getJSON(t, function (t) { function c(t, a) { var p = t.media.m, d = p.replace("_m", s[a].letter), v = e("<img />").attr("src", d); v.load(function () { this.height < i.data("scrollableAreaHeight") ? a + 1 < s.length ? c(t, a + 1) : h(this) : h(this); if (l === f) { switch (n) { case "addFirst": i.data("scrollableArea").children(":first").before(o); break; case "addLast": i.data("scrollableArea").children(":last").after(o); break; default: i.data("scrollableArea").html(o) } i.data("initialAjaxContentLoaded") ? r.recalculateScrollableArea() : i.data("initialAjaxContentLoaded", !0), r._showHideHotSpots(), r._trigger("addedFlickrContent", null, { addedElementIds: u }) } }) } function h(t) { var n = i.data("scrollableAreaHeight") / t.height, r = Math.round(t.width * n), s = e(t).attr("src").split("/"), a = s.length - 1; s = s[a].split("."), e(t).attr("id", s[0]), e(t).css({ height: i.data("scrollableAreaHeight"), width: r }), u.push(s[0]), o.push(t), l++ } var s = [{ size: "small square", pixels: 75, letter: "_s" }, { size: "thumbnail", pixels: 100, letter: "_t" }, { size: "small", pixels: 240, letter: "_m" }, { size: "medium", pixels: 500, letter: "" }, { size: "medium 640", pixels: 640, letter: "_z" }, { size: "large", pixels: 1024, letter: "_b"}], o = [], u = [], a, f = t.items.length, l = 0; i.data("scrollableAreaHeight") <= 75 ? a = 0 : i.data("scrollableAreaHeight") <= 100 ? a = 1 : i.data("scrollableAreaHeight") <= 240 ? a = 2 : i.data("scrollableAreaHeight") <= 500 ? a = 3 : i.data("scrollableAreaHeight") <= 640 ? a = 4 : a = 5, e.each(t.items, function (e, t) { c(t, a) }) }) }, getAjaxContent: function (t, n, r) { var i = this, s = this.element; e.ajaxSetup({ cache: !1 }), e.get(t, function (o) { var u; r !== undefined ? r.length > 0 ? u = e("<div>").html(o).find(r) : u = t : u = o; switch (n) { case "addFirst": s.data("scrollableArea").children(":first").before(u); break; case "addLast": s.data("scrollableArea").children(":last").after(u); break; default: s.data("scrollableArea").html(u) } s.data("initialAjaxContentLoaded") ? i.recalculateScrollableArea() : s.data("initialAjaxContentLoaded", !0), i._showHideHotSpots(), i._trigger("addedAjaxContent") }) }, getHtmlContent: function (t, n, r) { var i = this, s = this.element, o; r !== undefined ? r.length > 0 ? o = e("<div>").html(t).find(r) : o = t : o = t; switch (n) { case "addFirst": s.data("scrollableArea").children(":first").before(o); break; case "addLast": s.data("scrollableArea").children(":last").after(o); break; default: s.data("scrollableArea").html(o) } s.data("initialAjaxContentLoaded") ? i.recalculateScrollableArea() : s.data("initialAjaxContentLoaded", !0), i._showHideHotSpots(), i._trigger("addedHtmlContent") }, recalculateScrollableArea: function () { var t = 0, n = !1, r = this.options, i = this.element; i.data("scrollableArea").children(r.countOnlyClass).each(function () { r.startAtElementId.length > 0 && e(this).attr("id") === r.startAtElementId && (i.data("startingPosition", t), n = !0), t += e(this).outerWidth(!0) }), n || i.data("startAtElementId", ""), i.data("scrollableAreaWidth", t), i.data("scrollableArea").width(i.data("scrollableAreaWidth")), i.data("scrollWrapper").scrollLeft(i.data("startingPosition")), i.data("scrollXPos", i.data("startingPosition")) }, getScrollerOffset: function () { var e = this.element; return e.data("scrollWrapper").scrollLeft() }, stopAutoScrolling: function () { var e = this, t = this.element; t.data("autoScrollingInterval") !== null && (clearInterval(t.data("autoScrollingInterval")), t.data("autoScrollingInterval", null), e._showHideHotSpots(), e._trigger("autoScrollingStopped")) }, startAutoScrolling: function () { var e = this, t = this.element, n = this.options; t.data("enabled") && (e._showHideHotSpots(), clearInterval(t.data("autoScrollingInterval")), t.data("autoScrollingInterval", null), e._trigger("autoScrollingStarted"), t.data("autoScrollingInterval", setInterval(function () { if (!t.data("visible") || t.data("scrollableAreaWidth") <= t.data("scrollWrapper").innerWidth()) clearInterval(t.data("autoScrollingInterval")), t.data("autoScrollingInterval", null); else { t.data("previousScrollLeft", t.data("scrollWrapper").scrollLeft()); switch (n.autoScrollingDirection) { case "right": t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft() + n.autoScrollingStep), t.data("previousScrollLeft") === t.data("scrollWrapper").scrollLeft() && (e._trigger("autoScrollingRightLimitReached"), clearInterval(t.data("autoScrollingInterval")), t.data("autoScrollingInterval", null), e._trigger("autoScrollingIntervalStopped")); break; case "left": t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft() - n.autoScrollingStep), t.data("previousScrollLeft") === t.data("scrollWrapper").scrollLeft() && (e._trigger("autoScrollingLeftLimitReached"), clearInterval(t.data("autoScrollingInterval")), t.data("autoScrollingInterval", null), e._trigger("autoScrollingIntervalStopped")); break; case "backAndForth": t.data("pingPongDirection") === "right" ? t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft() + n.autoScrollingStep) : t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft() - n.autoScrollingStep), t.data("previousScrollLeft") === t.data("scrollWrapper").scrollLeft() && (t.data("pingPongDirection") === "right" ? (t.data("pingPongDirection", "left"), e._trigger("autoScrollingRightLimitReached")) : (t.data("pingPongDirection", "right"), e._trigger("autoScrollingLeftLimitReached"))); break; case "endlessLoopRight": t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft() + n.autoScrollingStep), e._checkContinuousSwapRight(); break; case "endlessLoopLeft": t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft() - n.autoScrollingStep), e._checkContinuousSwapLeft(); break; default: } } }, n.autoScrollingInterval))) }, _checkContinuousSwapRight: function () { var t = this.element, n = this.options; t.data("getNextElementWidth") && (n.startAtElementId.length > 0 && t.data("startAtElementHasNotPassed") ? (t.data("swapAt", e("#" + n.startAtElementId).outerWidth(!0)), t.data("startAtElementHasNotPassed", !1)) : t.data("swapAt", t.data("scrollableArea").children(":first").outerWidth(!0)), t.data("getNextElementWidth", !1)); if (t.data("swapAt") <= t.data("scrollWrapper").scrollLeft()) { t.data("swappedElement", t.data("scrollableArea").children(":first").detach()), t.data("scrollableArea").append(t.data("swappedElement")); var r = t.data("scrollWrapper").scrollLeft(); t.data("scrollWrapper").scrollLeft(r - t.data("swappedElement").outerWidth(!0)), t.data("getNextElementWidth", !0) } }, _checkContinuousSwapLeft: function () { var t = this.element, n = this.options; t.data("getNextElementWidth") && (n.startAtElementId.length > 0 && t.data("startAtElementHasNotPassed") ? (t.data("swapAt", e("#" + n.startAtElementId).outerWidth(!0)), t.data("startAtElementHasNotPassed", !1)) : t.data("swapAt", t.data("scrollableArea").children(":first").outerWidth(!0)), t.data("getNextElementWidth", !1)), t.data("scrollWrapper").scrollLeft() === 0 && (t.data("swappedElement", t.data("scrollableArea").children(":last").detach()), t.data("scrollableArea").prepend(t.data("swappedElement")), t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft() + t.data("swappedElement").outerWidth(!0)), t.data("getNextElementWidth", !0)) }, restoreOriginalElements: function () { var e = this, t = this.element; t.data("scrollableArea").html(t.data("originalElements")), e.recalculateScrollableArea(), e.jumpToElement("first") }, show: function () { var e = this.element; e.data("visible", !0), e.show() }, hide: function () { var e = this.element; e.data("visible", !1), e.hide() }, enable: function () { var e = this.element; e.data("enabled", !0) }, disable: function () { var e = this, t = this.element; e.stopAutoScrolling(), clearInterval(t.data("rightScrollingInterval")), clearInterval(t.data("leftScrollingInterval")), clearInterval(t.data("hideHotSpotBackgroundsInterval")), t.data("enabled", !1) }, destroy: function () { var t = this, n = this.element; t.stopAutoScrolling(), clearInterval(n.data("rightScrollingInterval")), clearInterval(n.data("leftScrollingInterval")), clearInterval(n.data("hideHotSpotBackgroundsInterval")), n.data("scrollingHotSpotRight").unbind("mouseover"), n.data("scrollingHotSpotRight").unbind("mouseout"), n.data("scrollingHotSpotRight").unbind("mousedown"), n.data("scrollingHotSpotLeft").unbind("mouseover"), n.data("scrollingHotSpotLeft").unbind("mouseout"), n.data("scrollingHotSpotLeft").unbind("mousedown"), n.unbind("mousenter"), n.unbind("mouseleave"), n.data("scrollingHotSpotRight").remove(), n.data("scrollingHotSpotLeft").remove(), n.data("scrollableArea").remove(), n.data("scrollWrapper").remove(), n.html(n.data("originalElements")), e.Widget.prototype.destroy.apply(this, arguments) } }) })(jQuery)