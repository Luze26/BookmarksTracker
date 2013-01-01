$(function() {
	chrome.windows.getCurrent(function(w) {
		chrome.tabs.getSelected(w.id,function (tab){
			$('#title').val(tab.title);
			$('#title').select();
			$('#url').val(tab.url);
		});
	});
  
	//Add a bookmark
	$('#add').click(function() {
		var bookmarkTreeNodes = chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
				bookmarkTreeNodes = bookmarkTreeNodes[0].children;
				//Add the bookmark in chrome
				chrome.bookmarks.create({'parentId': bookmarkTreeNodes[0].id, 'title': $('#title').val(), 'url': $('#url').val()},
						function(bookmark) {
							//Add information to the storage
							
							var callback = function(list) {
								list.bookmarks[list.bookmarks.length] =  {'url': $('#url').val(), 'id': bookmark.id};
								chrome.storage.sync.set({'bookmarks': list.bookmarks}, window.close());
							}
							
							chrome.storage.sync.get('bookmarks', callback);
						});
			});
	});
});