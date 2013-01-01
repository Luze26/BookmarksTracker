$(function() {
	//Add a bookmark
	$('#url').change(function() {
		var bookmarkTreeNodes = chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
				bookmarkTreeNodes = bookmarkTreeNodes[0].children;
				//Add the bookmark in chrome
				chrome.bookmarks.create({'parentId': bookmarkTreeNodes[0].id, 'title': $('#url').val(), 'url': $('#url').val()},
						function(bookmark) {
							//Add information to the storage
							
							var callback = function(list) {
								list.bookmarks[list.bookmarks.length] =  {'url': $('#url').val(), 'id': bookmark.id};
								chrome.storage.sync.set({'bookmarks': list.bookmarks});
							}
							
							chrome.storage.sync.get('bookmarks', callback);
						});
			});
	});
});