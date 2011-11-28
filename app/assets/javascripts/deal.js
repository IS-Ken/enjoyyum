
function shop_InfoInit(shopdata) {
    $("input[name='name']").prop('disabled', true);
}

/* ################################################################################################### */
function deal_create_init() {
    $(".alert-message").alert();
    
    $(".single_field").hover(function(){
    	$(this).addClass("error").children(".input").children("span").fadeIn("slow");
      },function() {
        if($(this).children(".input").children("input").is(":focus")==false)
    	    $(this).removeClass("error").children(".input").children("span").fadeOut("slow");
    });
    
    $("input.xlarge").blur(function() {
        if($(this).parent().parent().is(":hover")==false) {
    	    $(this).siblings("span").fadeOut("slow");
    	    $(this).parent().parent().removeClass("error");
            console.log('Handler for .blur() called.');
        }
    });            

    // bind form using ajaxForm
    var options = { 
      	url: '/api/shops/',
    	type:'POST',
    	dataType:'json',
    	beforeSubmit: validate,
    	success:      team_create_resp_func  // post-submit callback 
    };	

    // bind to the form's submit event 
    $("#formShopInfo").submit(function(event) { 
    	console.log("form.submit:enter");

		// inside event callbacks 'this' is the DOM element so we first 
	    // wrap it in a jQuery object and then invoke ajaxSubmit 
	    $(this).ajaxSubmit(options); 
    
        // !!! Important !!! 
        // always return false to prevent standard browser submit and page navigation 
        return false; 
    }); 

}

function validate(formData, jqForm, options) { 
    // formData is an array; here we use $.param to convert it to a string to display it 
    // but the form plugin does this for you automatically when it submits the data 
    var queryString = $.param(formData); 
	//var drawer = $("#drawer");

    // jqForm is a jQuery object encapsulating the form element.  To access the 
    // DOM element for the form do this: 
    var formElement = jqForm[0]; 

	// 2. .. and all required fields inside the page
	inputs = $('#formShopInfo').find(".required :input").removeClass("error");
    
	// 3. .. which are empty
	empty = inputs.filter(function() {
		return $(this).val().replace(/\s*/g, '') == '';
	});

	if (empty.length) {
		// add a CSS class name "error" for empty & required fields
		empty.parent().parent().addClass("error").children(".input").children("span").fadeIn("slow");
		$(".alert-message.error").fadeIn("slow");
		return false;
	}
    
	// hide the drawer
    $(".alert-message.error").fadeOut("fast");
    $(".alert-message.success").fadeIn("slow");
    console.log('About to submit: \n\n' + queryString); 
 
	return true; 
}

function team_create_resp_func(responseText, statusText, xhr, $form)  { 
	console.log("responseText=",responseText.OK.id);
	//redirect to groups list page.
	location.href = "/views/bstore_edit.html?id="+responseText.OK.id;
}

/*
		// bind form using ajaxForm
		var options = { 
		  	url: (isCreateNew)?'/group_create':'/group_update',
			type:'POST',
			dataType:'json',
			beforeSubmit: validate,
	    	success:      team_create_resp_func  // post-submit callback 
		};	

	    // bind to the form's submit event 
		$(".page").submit(function() { 
			var members_values=[];
			$(".gallery").children(".img_box").each(function() {
				//alert($(this).attr("userid"));
				members_values.push($(this).attr("userid"));
			});
			options['data']={members_json:JSON.stringify(members_values)};
			
			// inside event callbacks 'this' is the DOM element so we first 
	        // wrap it in a jQuery object and then invoke ajaxSubmit 
	        $(this).ajaxSubmit(options); 

	        // !!! Important !!! 
	        // always return false to prevent standard browser submit and page navigation 
	        return false; 
	    }); 
*/	    

        /* get some values from elements on the page:
        var urlReq=String.format("/api/shops/");
        $.post(urlReq, $(this).serialize(),
            function(rtnData) {
                console.log("rtnData:",rtnData);
            }, "json");        */ 
	    