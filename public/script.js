var k = 0;
var container = document.getElementById("container");

var printEach = function(res){
	for (var i = k; i < res.length; i++) {
		$(container).append('<li><input type="radio" name="task" class="checks" value="' + res[i] + '"/>' + res[i] + "</li>");
		k++;
	}

	$('input[type="radio"]').on('change', function(evt) {
		if (evt.target.checked) evt.target.classList.add('selected');
		if (!evt.target.checked) evt.target.classList.remove('selected');
	});
};

$(document).ready(function() {
	$.get('/api/items', printEach, "json");
});

$('#start').on('click', function(){
	console.log("Button clicked");
	console.log($("#taskText").val());
	$.post('/results', {
		task: $("#taskText").val()
	}, function() {
	})

	$.get('/api/items', printEach, "json");
});

$('#delete').on('click', function(event){
	console.log("Delete button clicked");

	event.preventDefault();

	var selected = $('input.selected');
	$.post('/deletions', {
		task: selected.val()
	}, function(response) {
		selected.parent().css('display', 'none');
	});

});
