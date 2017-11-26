$(document).ready(function(){
	var major = ['content', 'design', 'marketing', 'programming'];
	for(majorKey in major){
		$(`#ywc-result-section_${major[majorKey]} .ywc-result-content`).append($(".template-section .ywc-result-table").clone());
	}

	$.getJSON("https://ywc15.ywc.in.th/api/interview", function(data){
		for(key in data){
			var dataElem = $(`#ywc-result-section_${data[key].major} .ywc-result-content .ywc-list-item.template`).clone();

			dataElem.find('.ywc-list-item-key').html(data[key].interviewRef);
			dataElem.find('.ywc-list-item-name').html(data[key].firstName+' '+data[key].lastName);
			dataElem.data('major', data[key].major);
			dataElem.removeClass('template');

			$(`#ywc-result-section_${data[key].major} .ywc-result-content tbody`).append(dataElem);
		}
		$(".ywc-result-section .ywc-result-table .ywc-list-item.template").remove();
	});

	$("#ywc-search-form").submit(function(e){
		e.preventDefault();

		var searchValue = $.trim($("#ywc-search-text").val());
		var searchElem = $(`.ywc-result-section .ywc-result-table .ywc-list-item:contains(${searchValue})`);
		if(searchElem.length){
			$('.ywc-result .collapsible').collapsible('open', major.indexOf(searchElem.data('major')));
		}

	});
});