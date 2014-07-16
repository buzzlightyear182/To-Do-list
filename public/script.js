// $.get('sinatra/URL', function(result) {alert(result);})

var k = 0;

$('#start').on('click', function(){
	console.log("Button clicked");
	console.log(event);

	$.post('/results', {task: $("#taskText").val()}, function() {
			event.preventDefault();
	});

	$.get('/api/items', function(res) {
		var container = document.getElementById("container");
		for (var i = k; i < res.length; i++) {
			$(container).append('<input type="checkbox"/>' + res[i] + "<br>");
		console.log(res[i]);
		k++;
		}
	}, "json");
});