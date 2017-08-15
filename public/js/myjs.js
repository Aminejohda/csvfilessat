 $( document ).ajaxComplete(function( event, request, settings ) {
     	$("#dob0").prop('readonly', false);
     	$("#dob0").focus();
		$(".th0 .save").show();
     	$(".th0 .okey").show();
   $(".okey").click(function(){
   	var pos = $('input', this).attr('value');
   	var namehead
     	$(".th"+pos+" .save").hide();
     	$(".th"+pos+" .okey").hide();
        $("#accepted"+pos).css({"visibility":"hidden"});

        $("#dob"+pos).hide();

     	$("#skipped"+pos).css({"visibility":"visible"});
     	$(".td"+pos).css({"background":"#fbe3e4"});
     	$("#copyfirst .td"+pos).css({"background":"#ee836e"});
     	$(".td"+pos).css({"border-color":"#ee836e"});
     	$(".th"+pos).css({"border-color":"#ee836e"});
     	$("#dob"+pos).prop('value', '');
     	  	
     	pos++;
     	$(".th"+pos+" .save").show();
     	$(".th"+pos+" .okey").show();
     		$("#copyfirst .td"+pos).each(function(){
   			namehead = $(this).html();
		});
     	if($("#dob"+pos).val()===''){
			$("#dob"+pos).val(namehead)
		}
     	$("#dob"+pos).show();
     	$("#dob"+pos).prop('readonly', false);
     	$("#dob"+pos).focus();
     	var filledInputs = $('.box-primary input').length;
     	var hiddeninput = $('input:hidden').length;

     	//alert(hiddeninput +"  " +filledInputs)
		if (filledInputs === hiddeninput) {
     			$("#finish").prop('disabled', false);
     		}
	
    	

  });

   $(".save").click(function(){
   	var namehead


   	var pos = $('input', this).attr('value');
        var emptydob = $("#dob"+pos).val()
   	
   	if(emptydob ===''){
        	alert('not empty')
        return
        };
   		$(".th"+pos+" .save").hide();
     	$(".th"+pos+" .okey").hide();
        $("#skipped"+pos).css({"visibility":"hidden"});
       
        $("#dob"+pos).hide();
        $("#accepted"+pos).css({"visibility":"visible"});
          		$("#copyfirst .td"+pos).each(function(){
   			namehead = $(this).html();
		});
     	$(".td"+pos).css({"background":"#b1e0ec"});
     	$("#copyfirst .td"+pos).css({"background":"#52bad5"});
     	$(".td"+pos).css({"border-color":"#52bad5"});
     	$(".th"+pos).css({"border-color":"#52bad5"});
     	 
     	pos++;
     	     		$("#copyfirst .td"+pos).each(function(){
   			namehead = $(this).html();
		});
     	if($("#dob"+pos).val()===''){
			$("#dob"+pos).val(namehead)
		}
     	$("#dob"+pos).show();
     	$("#dob"+pos).prop('readonly', false);
     	$("#dob"+pos).focus();
     	$(".th"+pos+" .save").show();
     	$(".th"+pos+" .okey").show();
      var filledInputs = $('.box-primary input').length;
     	var hiddeninput = $('input:hidden').length;
     	//alert(hiddeninput +"  " +filledInputs)

		if (filledInputs === hiddeninput) {
     			$("#finish").prop('disabled', false);
     		}

  });






	$('.enableinput').click( function() {
		$("#finish").prop('disabled', true);
   		var pos = parseInt($('input', this).attr('value'));
   		var posuiv = pos+1;
		var namehead
		$(".head").prop('readonly', true);
		$("#dob"+pos).prop('readonly', false);
			$("#copyfirst .td"+pos).each(function(){
   			namehead = $(this).html();
		});
		if($("#dob"+pos).val()===''){
			$("#dob"+pos).val(namehead)
		}
     	$("#dob"+posuiv).prop('readonly', true);
        $(".th"+pos+" .save").show();
     	$(".th"+pos+" .okey").show();
     	$("#dob"+pos).show();
        $("#accepted"+pos).css({"visibility":"hidden"});
        $("#skipped"+pos).css({"visibility":"hidden"});
      var filledInputs = $('.box-primary input').length;
     	var hiddeninput = $('input:hidden').length;
     //	alert(hiddeninput +"  " +filledInputs)
		if (filledInputs === hiddeninput) {
     			$("#finish").prop('disabled', false);
     		}

	});


});
