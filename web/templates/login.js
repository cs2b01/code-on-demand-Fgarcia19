
function getData(){
        $('#loading').show();
        $('#fail').hide();
        $('#success').hide();
        var username = $('#username').val();
        var password = $('#password').val();
        var message = JSON.stringify({
                "username": username,
                "password": password
            });

        $.ajax({
            url:'/authenticate',
            type:'POST',
            contentType: 'application/json',
            data : message,
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
            },
            error: function(response){
              if(response['status']=='401'){
                //alert(JSON.stringify(response));
                $('#loading').hide();
                $('#fail').show();
              }else{
                $('#loading').hide();
                $('#success').show();
              }
            }
        });
    }