//Listen tabs
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


//Listen when a bookmark is removed
chrome.bookmarks.onRemoved.addListener(function (id, info) {
	chrome.storage.sync.get('bookmarks', function(list) {
		if(list.bookmarks != undefined) { //if the user has tracked bookmarks we look if they have been deleted
			removeBookmark(0, false, list.bookmarks);
		}
	});
});


//update bookmarks, if the url given correspond to the base url of a tracked bookmark
function updateBookmark(list, url) {
	if(list.bookmarks != undefined) {
		var i;
		var length = list.bookmarks.length;
		
		//we look for bookmarks based on the new url
		for(i=0; i<length; i++) {

			if(String(url).indexOf(list.bookmarks[i].url) == 0) { // if the url starts with a base url of a bookmark, we updated it
				//Update
				var callback = function(bookmark) {
					chrome.bookmarks.update(bookmark[0].id, {title: bookmark[0].title, url: url});
				}
				
				chrome.bookmarks.get(list.bookmarks[i].id, callback);
			}
		}
	}
}


//Look if a removed bookmark in chrome was tracked, and in this case delete the trace in the storage
function removeBookmark(index, removed, bookmarks) {
	if(index == bookmarks.length) {
		if(removed) {
			chrome.storage.sync.set({'bookmarks': bookmarks}); //update the storage
		}
	}
	else {
		chrome.bookmarks.get(bookmarks[index].id, function(bookmark) {
					if (bookmark == undefined) { //if the bookmark is missing, we removed it from the storage
						bookmarks.splice(index, 1);
						removed = true;	
						index--;
					}
					removeBookmark(index+1, removed, bookmarks);
		});
	}
}
