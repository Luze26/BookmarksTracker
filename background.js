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

chrome.bookmarks.onRemoved.addListener(function (id, info) {
	chrome.storage.sync.get('bookmarks', function(list) {
		if(list.bookmarks != undefined) {
			removeBookmark(0, false, list.bookmarks);
		}
	});
});

function updateBookmark(list, url) {
	if(list.bookmarks != undefined) {
		var i;
		var length = list.bookmarks.length;
		
		for(i=0; i<length; i++) {

			if(String(url).indexOf(list.bookmarks[i].url) == 0) {
				//Update
				var callback = function(bookmark) {
					chrome.bookmarks.update(bookmark[0].id, {title: bookmark[0].title, url: url});
				}
				
				chrome.bookmarks.get(list.bookmarks[i].id, callback);
			}
		}
	}
}

function removeBookmark(index, removed, bookmarks) {
	if(index == bookmarks.length) {
		if(removed) {
			chrome.storage.sync.set({'bookmarks': bookmarks});
		}
	}
	else {
		chrome.bookmarks.get(bookmarks[index].id, function(bookmark) {
					if (bookmark == undefined) {
						bookmarks.splice(index, 1);
						removed = true;	
						index--;
					}
					removeBookmark(index+1, removed, bookmarks);
		});
	}
}