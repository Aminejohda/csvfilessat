
			var socket = io.connect('http://127.0.0.1:4000');
			if (socket !== undefined){
				console.log("every thing okey")
				} 
 		$(document).on('click', function(event){
					  $("button").click(function(){
                //$("div").css({"color":"red"});     

            });
    socket.emit('next');
})
	$('#myfile').change(function xs(e){

		var file = e.target.files[0];
		var formData = new FormData();
		formData.append('myfile', file);
		$.ajax({
			url:'http://localhost:3000/csv',
			type:'post',
			data:formData,
			processData:false,
			contentType: false,
			success:function(res){
        $('#myfile').hide();
				var result =res.donne
				var keys = Object.keys(result[1]);
   

				for (var i = 0; i < keys.length; i++) {
					$('#copyfirst').append("<td class='td"+i+"'>"+keys[i]+"</td>")
					$('#first').append("<td class='td"+i+"'>"+result[0][keys[i]]+"</td>");
					$('#second').append("<td class='td"+i+"'>"+result[1][keys[i]]+"</td>");
					$('#third').append("<td class='td"+i+"'>"+result[2][keys[i]]+"</td>");
					$('#fourth').append("<td class='td"+i+"'>"+result[3][keys[i]]+"</td>");
					$('#thead').append("<th class='th"+i+"'><input type='text' readonly value='"+keys[i]+"'id ='dob"+i+"' class='head' name='f"+i+"'/><button type='button' class='btn btn-warning okey'>Skip <input type='hidden' id='positionskip' value='"+i+"'/></button><button type='button' class='btn btn-info save'>Save <input type='hidden' id='positionsave' value='"+i+"'/></button></button><p class='skip text-center' id='skipped"+i+"'> Will not be imported <br><a href='#' class='enableinput'>Edit <input type='hidden' id='position' value='"+i+"'/></a> </p> <p class='accept text-center' id='accepted"+i+"'> Will be imported <br> <a href='#' class='enableinput'>Edit <input type='hidden' id='position' value='"+i+"'/></a></p></th> ")
						
					}
					$('foot').append("<button type='submit' id='finish' disabled='true' class='btn btn-success'>Finish</button>");

					//var numberrow= parseInt(document.getElementById('table1').rows[0].cells.length);
					//$("#numrow").prop('value', numberrow);

			},
			crossDomain:true
		})
	})
