enyo.kind({
	name: "FeedSpider2.ArticleView",
	kind: "FeedSpider2.BaseView",

	published: {
		article: "",
		scrollingIndex: "",
		articleContainer: ""
	},
	
	components:[
		{kind: "enyo.Scroller", fit: true, components: [
			{name: "articleHeader", kind: "FittableColumns", classes: "article-header", components: [
				{fit: true, components: [
					{name: "title", classes: "article-title", style: "font-weight: bold;"},
					{name: "subscription", classes: "article-subscription"},
					{name: "author", classes: "article-author"}
				]},
				{tag: "div", style:"background: url('assets/rightarrow.png') no-repeat center; width: 20px; height: 56px"},
			], ontap: "openInBrowser"},
			{name: "summary", allowHtml: true, classes: "article-summary"},
		]},
		{kind: "onyx.Toolbar", style: "padding-left: 0px; padding-right: 0px", components: [
			{style: "width: 18%; text-align:center; margin-left: 0px; margin-right: 0px;", components: [
				{name: "previousButton", kind: "onyx.IconButton", ontap: "previousArticle", src: "assets/previous-article.png"},
			]},
			{style: "width: 16%; text-align:center; margin-left: 0px; margin-right: 0px;", components: [
				{name: "goBackButton", kind: "onyx.IconButton", ontap: "handleGoBack", src: "assets/go-back-footer.png"},
			]},
			{style: "width: 16%; text-align:center; margin-left: 0px; margin-right: 0px;", components: [
				{name: "readButton", kind: "onyx.IconButton", ontap: "setRead", src: "assets/read-footer.png"},
			]},
			{style: "width: 16%; text-align:center; margin-left: 0px; margin-right: 0px;", components: [
				{name: "starredButton", kind: "onyx.IconButton", ontap: "setStarred", src: "assets/starred-footer.png"},
			]},
			{style: "width: 16%; text-align:center; margin-left: 0px; margin-right: 0px;", components: [
				{name: "sendToButton", kind: "onyx.IconButton", ontap: "helloWorldTap", src: "assets/sendto-footer.png"},
			]},
			{style: "width: 18%; text-align:center; margin-left: 0px; margin-right: 0px;", components: [
				{name: "nextButton", kind: "onyx.IconButton", ontap: "nextArticle", src: "assets/next-article.png"},
			]},
		]}
	],
	
	rendered: function() {
		this.inherited(arguments);
	},

	activate: function(changes) {
		this.$.title.setContent(this.article.title)
		this.$.subscription.setContent(this.articleContainer.api.titleFor(this.article.subscriptionId))
		this.$.author.setContent(this.article.author ? "by " + this.article.author : "")
		this.$.summary.setContent(this.article.summary)
		//TODO: Do when implementing search
		//this.articleContainer.highlight(this.controller.get("summary"))

		this.setIcons();
		
		if(!this.article.isRead && !this.article.keepUnread) {
			this.toggleState(this.$.readButton, "Read")
		}
	},

	setFontSize: function(fontSize) {
		this.$.summary.removeClass("tiny")
		this.$.summary.removeClass("small")
		this.$.summary.removeClass("medium")
		this.$.summary.removeClass("large")
		this.$.summary.addClass(fontSize)
	},
	
	setIcons: function(){
		if (this.article.isRead)
		{
			this.$.readButton.setSrc("assets/read-footer-on.png")
			this.$.readButton.addClass("on")
		}
		
		if (!this.article.isRead)
		{
			this.$.readButton.setSrc("assets/read-footer.png")
			this.$.readButton.removeClass("on")
		}
		
		if (this.article.isStarred)
		{
			this.$.starredButton.setSrc("assets/starred-footer-on.png")
			this.$.starredButton.addClass("on")
		}
		
		if (!this.article.isStarred)
		{
			this.$.starredButton.setSrc("assets/starred-footer.png")
			this.$.starredButton.removeClass("on")
		}
	},

	setStarred: function(inSender, inEvent) {
		this.toggleState(inSender, "Star")
	},

	setRead: function(inSender, inEvent) {
		this.toggleState(inSender, "Read", true)
	},

	toggleState: function(target, state, sticky) {
		var self = this
		
		if(!target.hasClass("working")) {
			target.addClass("working")

			var onComplete = function(success) {
				target.removeClass("working")
				
				if(success) {
					self.setIcons()
				}
			}

			this.article["turn" + state + (target.hasClass("on") ? "Off" : "On")](onComplete, function() {}, sticky)
		}
	},

	handleGoBack: function() {
		this.doGoBack({lastPage: this.previousPage, scrollingIndex: this.scrollingIndex})
	},

	previousArticle: function() {
		this.scrollingIndex = this.scrollingIndex - 1
		this.article.getPrevious(this.gotAnotherArticle.bind(this))
	},

	nextArticle: function() {
		this.scrollingIndex = this.scrollingIndex + 1
		//TODO: Handle continuation, get more articles, etc. add spinner
		this.article.getNext(this.gotAnotherArticle.bind(this))//, this.loadingMoreArticles.bind(this, "next-article"))
	},

	gotAnotherArticle: function(article) {
		if(article) {
			this.doSwitchPanels({target: "article", article: article, scrollingIndex: this.scrollingIndex, articleContainer: this.articleContainer, previousPage: this.previousPage})
			//this.controller.stageController.swapScene({name: "article", transition: Mojo.Transition.crossFade}, article, this.scrollingIndex, this.articleContainer)
		}
		else {
			this.doGoBack({lastPage: this.previousPage, scrollTarget: this.scrollingIndex < 0 ? "top" : "bottom"})
		}
	},

//TODO PORT FROM HERE

	sendTo: function(event) {
		this.controller.popupSubmenu({
			placeNear: this.controller.get("sendto"),
			items: Sharing.getPopupFor(this.article),
			onChoose: Sharing.handleSelection.bind(Sharing, this.article, this.controller)
		})
	},

	openInBrowser: function() {
		if(this.article.url) {
			this.controller.serviceRequest("palm://com.palm.applicationManager", {
				method: "open",
				parameters: {
					id: "com.palm.app.browser",
					params: {
						target: this.article.url
					}
				}
			})
		}
	},

	loadingMoreArticles: function(arrow) {
		this.controller.get(arrow).addClassName("working")
		this.workingSpinner.spinning = true
		this.controller.modelChanged(this.workingSpinner)
	},
});