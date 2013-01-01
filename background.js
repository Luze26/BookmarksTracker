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

function updateBookmark(list, url) {
	var i;

	for(i=0; i<list.bookmarks.length; i++) {

		if(String(url).indexOf(list.bookmarks[i].url) == 0) {
			//Update
			var callback = function(bookmark) {
				chrome.bookmarks.update(bookmark[0].id, {title: bookmark[0].title, url: url});
			}
			
			chrome.bookmarks.get(list.bookmarks[i].id, callback);
		}
	}
}