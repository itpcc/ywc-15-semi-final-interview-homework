$(document).ready(function(){
	var major = ['content', 'design', 'marketing', 'programming'];
	var hilightRowClass = 'indigo darken-4 white-text';

	for(majorKey in major){
		$(`#ywc-result-section_${major[majorKey]} .ywc-result-content`).append($(".template-section .ywc-result-table").clone());
	}
	$('.modal').modal();

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
		$('.ywc-result-section .ywc-result-table .ywc-list-item').removeClass(hilightRowClass);

		if(searchElem.length){
			var interviewRef = searchElem.find('ywc-list-item-key').text();
			$('.ywc-result .collapsible').collapsible('open', major.indexOf(searchElem.data('major')));
			$('#ywc-event-link').attr("href", `https://www.google.com/calendar/render?action=TEMPLATE&text=YWC%2315+interview+(Code ${interviewRef})&location=CP+Tower%2C+Si+Lom%2C+Bangkok&dates=20171126T023600Z`);
			$('.ywc-interview-code').text(interviewRef);

			searchElem.addClass(hilightRowClass);
			var $container = $(window);
			var scrollValue = (searchElem.offset().top - $container.offset().top + $container.scrollTop());
			$container.animate({
				scrollTop: scrollValue
			})
			
			$('#modal-not_found').modal('close');
			$('#modal-congreat').modal('open');
		}else{
			$('#modal-not_found').modal('open');
			$('#modal-congreat').modal('close');
		}

	});
});