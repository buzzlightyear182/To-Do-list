var k = 0;
var container = document.getElementById("container");

var printEach = function(res){
	for (var i = k; i < res.length; i++) {
		$(container).append('<input type="radio" name="task" class="checks" value="' + res[i] + '"/>' + res[i] + "<br>");
		k++;
	}

	$('input[type="radio"]').on('change', function(evt) {
		if (evt.target.checked) evt.target.classList.add('selected');
		if (!evt.target.checked) evt.target.classList.remove('selected');
	});
};

$('#start').on('click', function(){
	console.log("Button clicked");

	$.post('/results', {task: $("#taskText").val()}, function() {
			event.preventDefault();
	});

	$.get('/api/items', printEach, "json");
});

$('#delete').on('click', function(event){
	console.log("Delete button clicked");

	event.preventDefault();

	var selected = $('input.selected');

	$.post('/deletions', {task: selected.val()}, function(response) {
			selected.css('display', 'none');
	});

});