chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
	if (changeInfo.status == "loading") {
		chrome.tabs.get(tabId, function(tab) {
			var callbackProxy = function(bookmarks) {
				updateBookmark(bookmarks, tab.url);
			}
			
			chrome.storage.sync.get('bookmarks', callbackProxy);
		});
		
		
		
	}
});

function updateBookmark(bookmarks, url) {
	
}