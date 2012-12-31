$(function() {
	chrome.storage.sync.set({'bookmarks': new Array()});
	
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

/*function display() {
	//Display bookmarks in the popup
	$('#bookmarks').empty();
	chrome.storage.sync.get('bookmarks', function(list) {
		var i;
		
		for(i=0; i<list.bookmarks.length; i++) {
			var anchor = $('<a>');
			anchor.attr('href', list.bookmarks.url[i]);
			anchor.text(list.bookmarks.url[i]);
			
			anchor.click(function() {
				chrome.tabs.create({url: $(this).context.href});
			});
			
			$('#bookmarks').append(anchor);
			$('#bookmarks').append('</br>');
		}
	});
}*/