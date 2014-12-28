var fileCount = 1;

$('form').on('change', 'input[type=file]', function () {
	var $topGroup = $('.form-group:first-of-type .select-pair:first-of-type');
	var $changed = $(this);
	
	if ($changed.val()) {

		fileCount++;

		var $clonedGroup = $topGroup.clone(true);
		var $input = $clonedGroup.find('input[type=file]')
			.val('')
			.attr('id', 'file-select' + fileCount)
			.attr('name', 'file' + fileCount);
		var $chkbox = $clonedGroup.find('input[type=checkbox]')
			.prop('checked', false)
			.prop('name', 'isprivate' + fileCount);
		$topGroup.before($clonedGroup);
	} else if (fileCount > 1) {
		$('.select-pair:last-of-type').remove();
	}
});