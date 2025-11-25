FeedSpider2
===========

This is a port of the Mojo-based FeedSpider RSS client to the Enyo 2 Javascript Framework. Well, technically it's a port. It's really a significant re-write, especially of the UI layer.

Using the Enyo 2 Framework, FeedSpider has been ported to FireFox OS, and is currently in the process of being re-ported to webOS, and later to LuneOS, with further versions to follow.

Feedspider Supports:

* BazQux Reader
* Feedly
* InoReader
* NextCloud News
* Tiny Tiny RSS
* The Old Reader

Now, webOS and Firefox OS users can again sync their RSS feeds across all of their webOS and Firefox OS devices!

Building
========

See the instructions here, to setup a minimum environment (node 14, npm, cordova): [https://sdk.webosarchive.org/index.php?page=cordova](https://sdk.webosarchive.org/index.php?page=cordova)

Run `npm install` from the `/enyo-app/enyo` folder

Be aware that the "Walker" dependency is NOT a NPM package, but a custom Enyo build tool. Claude found it by digging through Git history and included it in this project.

Contact
=======

Author: Brent Hunter  
Twitter: @FeedSpiderApp  
Email: feedspider@feedspider.net  
Web: http://www.feedspider.net  
