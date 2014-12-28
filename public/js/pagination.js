(function () {
	
	var currPage = 1;
	var lastPageNum = +$('.page-num').last().text();

	$('.prev-arrow').on('click', function () {
		var currPage = +(getParameterByName('page'));
		if (currPage > 1) {
			getPage(currPage - 1);
		}
	});

	$('.next-arrow').on('click', function () {
		var currPage = +(getParameterByName('page'));
		if (currPage < lastPageNum) {
			getPage(currPage + 1);
		}
	});


	$('.pagination').on('click', '.page-num', function () {
		getPage(this.innerText);
	});

	function getPage (pageNum) {
		var newLoc = window.location.pathname + '?page=' + pageNum;
		window.location = newLoc;
	}

	function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	function getUrlNoQueryStr (url) {
		url = url.replace(/\?.$/, '');
		return url;
	}
})();