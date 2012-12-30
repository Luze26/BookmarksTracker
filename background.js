var i = 0;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
	if (changeInfo.status == "loading") {
		i++;
		chrome.browserAction.setBadgeText({text:String(i)});
	}
});

chrome.browserAction.setBadgeBackgroundColor({color:[0, 200, 0, 100]});
chrome.browserAction.setBadgeText({text:"0"});