var k = 0;
var container = document.getElementById("container");

var printEach = function(res){
	for (var i = k; i < res.length; i++) {
		$(container).append('<li><input type="radio" id="radio0' + i + '" name="task" class="checks" value="' + res[i] + '"/><label for="radio0' + i + '">' + res[i] + "</label></li>");
		k++;
	}
};

$(document).ready(function() {
	$.get('/api/items', printEach, "json");
});

$('#start').on('click', function(){
	$.post('/results', {
		task: $("#taskText").val()
	}, function() {
	})

	$.get('/api/items', printEach, "json");
});

$('#delete').on('click', function(event){
	event.preventDefault();

	var selected = $('input[type="radio"]:checked');

	$.post('/deletions', {
		task: selected.val()
	}, function(response) {
		selected.parent().css('display', 'none');
	});

});
