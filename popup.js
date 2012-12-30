$(function() {
	chrome.storage.sync.set({'bookmarks': new Array()});
	afficher();
	
	//Ajout d'une url
	$('#url').change(function() {
		var bookmarkTreeNodes = chrome.bookmarks.getTree(
		function(bookmarkTreeNodes) {
			bookmarkTreeNodes = bookmarkTreeNodes[0].children;
			
			//On ajoute le bookmark
			chrome.bookmarks.create({'parentId': bookmarkTreeNodes[0].id,
					'title': $('#url').val(),
					'url': $('#url').val()});
			
			//On ajoute au storage
			chrome.storage.sync.get('bookmarks', function(list) {
				list.bookmarks[list.bookmarks.length] =  $('#url').val();
				chrome.storage.sync.set({'bookmarks': list.bookmarks}, afficher());
			});
		});
	});
});

function afficher() {
	$('#bookmarks').empty();
	chrome.storage.sync.get('bookmarks', function(list) {
		var i;
		
		for(i=0; i<list.bookmarks.length; i++) {
			var anchor = $('<a>');
			anchor.attr('href', list.bookmarks[i]);
			anchor.text(list.bookmarks[i]);
			
			anchor.click(function() {
				chrome.tabs.create({url: $(this).context.href});
			});
			
			$('#bookmarks').append(anchor);
			$('#bookmarks').append('</br>');
		}
	});
}