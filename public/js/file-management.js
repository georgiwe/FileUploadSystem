$('table')
.on('click', '.del-butt', function () {
	var $this = $(this);
	var id = $this.closest('tr').find('input[type=hidden]').val();

	$.ajax({
		type: 'DELETE',
		url: '/delete',
		data: {
			id: id
		},
		complete: function (res) {
			location.reload();
		}
	});
})
.on('click', '.download-butt', function () {
	var $this = $(this);
	var id = $this.closest('tr').find('input[type=hidden]').val();

	if (id) window.location = '/download?id=' + id;
})
.on('click', '.privacy-butt', function () {
	var $this = $(this);
	var id = $this.closest('tr').find('input[type=hidden]').val();

	$.ajax({
		type: 'PUT',
		url: '/aterprivacy',
		data: {
			id: id
		},
		complete: function () {
			location.reload();
		}
	});
});