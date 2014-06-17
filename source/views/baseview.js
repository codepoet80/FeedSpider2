enyo.kind({
	name: "FeedSpider2.BaseView",
	kind: "FittableRows",
	fit: true,

	published: {
		previousPage: "",
	},

	events: {
		onSwitchPanels: "switchPanels",
		onOpenPreferences: "openPreferences",
		onOpenHelp: "openHelp",
		onGoBack: ""
	},
	
	handlers: {
		onSourceTap: "sourceTapped",
	},
	
	openPreferences: function() {
		this.doOpenPreferences(this)
	},
	
	openHelp: function() {
		this.doOpenHelp(this)
	},
	
	create: function() {
		this.inherited(arguments);
		
		//TODO: Implement Theming		
		//this.setTheme()
    	//this.setLeftyClass()
	},
	
	rendered: function() {
		this.inherited(arguments);
		
		//Handle orientation for webOS Devices
		//TODO: Figure out how to handle orientation for other devices
		if (window.PalmSystem) {
			PalmSystem.setWindowOrientation(Preferences.allowLandscape() ? "free" : "up");
		}
	},

	//TODO: BEGIN PORTING FROM HERE
	setTheme: function() {
		var body = this.controller.document.body

		$w(body.className).each(function(className) {
			if(className.startsWith("theme-")) {
				body.removeClassName(className)
			}
		})

		body.addClassName("theme-" + Preferences.getTheme())
	},

  	refreshList: function(list, items) {
  	    for (var i = 0; i < items.length; i++) { 
    		if(i == items.length - 1)
    		{
    			items[i].last = true;
    		}
    		items[i].setContainer(list)
    	}
    	//list.mojo.noticeUpdatedItems(0, items)
    	//list.mojo.setLength(items.length)
  	},

	//TODO: Port
	setLeftyClass: function() {
		var body = this.controller.document.body

		if(Preferences.isLeftyFriendly()) {
			body.addClassName("lefty")
		}
		else {
			body.removeClassName("lefty")
		}
	},

	searchTextEntry: function(event) {
		if(event.originalEvent && Mojo.Char.enter === event.originalEvent.keyCode) {
			this.search()
		}
	},

	cancelSearch: function(event) {
		this.menuPanelOff()
	},

	startSearch: function(event) {
		if(!this.panelOpen && event.keyCode != 27) {
			event.stop()
			this.menuPanelOn()

			var textEntry = this.controller.get("search-text")
			textEntry.mojo.setValue(String.fromCharCode(event.charCode))
			textEntry.mojo.setCursorPosition(1, 1)
			textEntry.mojo.focus()
		}
	},

	search: function() {
		if(this.searchText.value.strip().length) {
			this.menuPanelOff()
			this.doSearch(this.searchText.value.strip())
		}
		else {
			this.controller.get("search-text").mojo.focus()
		}
	},

	setupSearch: function() {
		this.controller.setupWidget("search-text", {changeOnKeyPress: true, hintText: $L("Search...")}, this.searchText)
		this.controller.setupWidget("search-cancel", {}, {buttonClass: "secondary", buttonLabel: $L("Cancel")})
		this.controller.setupWidget("search-submit", {}, {buttonLabel: $L("Search")})
		this.controller.listen("search-text", Mojo.Event.propertyChange, this.searchTextEntry = this.searchTextEntry.bind(this))
		this.controller.listen("search-cancel", Mojo.Event.tap, this.cancelSearch = this.cancelSearch.bind(this))
		this.controller.listen("search-submit", Mojo.Event.tap, this.search = this.search.bind(this))
	},

	cleanupSearch: function() {
		this.controller.stopListening("search-cancel", Mojo.Event.tap, this.cancelSearch)
		this.controller.stopListening("search-submit", Mojo.Event.tap, this.search)
	},

	listenForSearch: function() {
		if(this.api.supportsSearch())
		{
			$(this.controller.document).observe("keypress", this.startSearch)
			this.controller.get("search-text").mojo.setConsumesEnterKey(false)
		}
	},

	stopListeningForSearch: function() {
		if(this.api.supportsSearch())
		{
			$(this.controller.document).stopObserving("keypress", this.startSearch)
		}
	},

	//TODO: Set up event handlers to trigger this when the top bar is tapped 
	scrollToTop: function() {
		this.controller.getSceneScroller().mojo.scrollTo(0, 0, true)
	},

	orientationChanged: function(orientation) {
		this.orientation = orientation
	},

	inLandscape: function() {
		return this.orientation == "left" || this.orientation == "right"
	},

	//NOTE this deals with gesture scrolling, which will probably be removed in this version. See base-assistant.js handleCommand function for usage.
	landscapeScroll: function(backOrForward) {
		var scroller = this.controller.getSceneScroller()
		var currentPosition = scroller.mojo.getScrollPosition()
		var scrollerSize = scroller.mojo.scrollerSize()

		var fixedHeader = this.controller.sceneElement.querySelector(".palm-page-header.fixed")
		var headerHeight = fixedHeader ? fixedHeader.getHeight() : 0

		var fixedFooter = this.controller.sceneElement.querySelector("#footer")
		var footerHeight = fixedFooter ? fixedFooter.getHeight() : 0

		var goingDown = (this.orientation == "right" && backOrForward == Mojo.Event.back) || (this.orientation == "left" && backOrForward == Mojo.Event.forward)
		var adjustBy = goingDown ? (-(scrollerSize.height) + headerHeight + footerHeight + 10) : (scrollerSize.height - headerHeight - footerHeight - 10)
		scroller.mojo.scrollTo(0, currentPosition.top + adjustBy, true)
		Mojo.Event.send.delay(.5, scroller, Mojo.Event.dragging, {})
	},
	//TODO PORT TO HERE
})