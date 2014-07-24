enyo.kind({
	name: "FeedSpider2.HelpView",
	kind: "FeedSpider2.BaseView",
	fit: true,
	
	components:[
		{kind: "onyx.Toolbar", layoutKind: "FittableColumnsLayout", noStretch: true, components: [
			{kind: "onyx.IconButton", src: "assets/go-back.png", ontap: "handleGoBack"},
			{tag: "span", content: "Help", style:"font-weight: bold; text-align: center", fit: true},
			{kind: "onyx.Icon"}, //This is here to keep the header centered.
		]},
		{kind: "enyo.Scroller", fit: true, style: "padding: 10px", components: [
			{tag: "div", content: "FeedSpider 2", style: "font-size: 24px; font-weight: bold"},
			{tag: "div", content: "Version 1.0.0 by Othello Ventures Ltd."},
			{tag: "br"},
			{tag: "div", components: [
				{tag: "div", content: "FeedSpider 2 is a cross-platform port of the original FeedSpider RSS Reader for webOS, designed to work with Google Reader compatible applications."},
				{tag: "br"},
				{tag: "div", content: "It currently supports:"},
				{tag: "ul", components: [
					{tag: "li", components: [ {tag: "a", attributes: {"href": "https://reader.aol.com"}, content: "AOL Reader" }]},
					{tag: "li", components: [ {tag: "a", attributes: {"href": "https://bazqux.com"}, content: "BazQux Reader" }]},
					{tag: "li", components: [ {tag: "a", attributes: {"href": "http://feedly.com"}, content: "Feedly" }]},
					{tag: "li", components: [ {tag: "a", attributes: {"href": "https://www.inoreader.com"}, content: "InoReader" }]},
					{tag: "li", components: [ {tag: "a", attributes: {"href": "https://www.owncloud.org"}, content: "OwnCloud News" }]},
					{tag: "li", components: [ {tag: "a", attributes: {"href": "http://tt-rss.org"}, content: "Tiny Tiny RSS" }]},
					{tag: "li", components: [ {tag: "a", attributes: {"href": "http://www.theoldreader.com"}, content: "The Old Reader" }]},
				]}
			]},
			{tag: "br"},
			{tag: "div", components: [
				{tag: "div", content: "Reach us through:"},
				{tag: "ul", components: [
					{tag: "li", components: [ {tag: "a", attributes: {"href": "http://twitter.com/feedspiderapp"}, content: "twitter" }]},
					{tag: "li", components: [ {tag: "a", attributes: {"href": "mailto:feedspider@feedspider.net"}, content: "email" }]},
					{tag: "li", components: [ {tag: "a", attributes: {"href": "http://www.feedspider.net"}, content: "web" }]},
				]}
			]},
			{tag: "br"},
			{tag: "div", content: "History", style: "font-size: 20px; font-weight: bold"},
			{tag: "br"},
			{tag: "div", components: [
				{tag: "div", content: "1.0.0", style: "font-weight: bold" },
				{tag: "ul", components: [
					{tag: "li", content: "Initial Release"},
				]}
			]},
			{tag: "br"},
			{tag: "div", content: "Special Thanks", style: "font-size: 20px; font-weight: bold"},
			{tag: "br"},			
			{tag: "div", content: "Refresh Icon made by Yannick from www.flaticon.com"},
			{tag: "br"},
		]}
	],
	
	handleGoBack: function() {
		this.doGoBack({lastPage: this.previousPage})
	},
})