    var current_id = 0;var selected_id = 0;
        function send_message(){
            $.ajax({
                url: 'http://127.0.0.1:8080/messagesjs',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                     "content":  $('#content').val(),
                     "user_from_id":current_id,
                     "user_to_id":selected_id
                }),
                dataType: 'json'
            });
            verChat(selected_id);
        document.getElementById("content").value=""
        }
        function verChat(sel_id){
            selected_id = sel_id;
            key = current_id+"/"+sel_id;
            $.getJSON("/chats/"+key, function(data){
               var items = []
               i = 0
               $.each(data, function(){
                    if(data[i]['user_from_id'] == current_id){
                        div = '<div class="alert alert-success" style="text-align: right;" role="alert">';
                    } else {
                        div = '<div class="alert alert-warning"  role="alert">';
                    }
                    div = div+ data[i]['content'] ;
                    div = div+'    </div>';
                    $( "<div/>", {
                        "class":"message",
                        html: div
                    }).appendTo( ".right" );
                    i = i+1;
               });
            });
            $( ".right" ).empty();
        }

        function getChats(){
            $.getJSON("/chats/"+current_id, function(response){
               var items = []
               i = 0
               data = response['response']
               $.each(data, function(){
                    div2 = '<div class="alert " ';
                    div2 = div2 +  "onclick = verChat("+data[i]['id']+") "
                    div2 = div2 + 'role="alert">';
                        div2= div2+' <span class="glyphicon glyphicon-user" aria-hidden="true"></span>';
                        div2 = div2+ data[i]['name']  +" "+ data[i]['fullname'];
                        div2= div2+ "<div>@"+data[i]['username']+"</div>";
                        div2 = div2+' </div>';

                    i = i+1;
                    $( "<div/>", {
                        html: div2
                    }).appendTo( ".left" );
               });
            });
        }
        $.getJSON("/current", function(data){
                current_id = data['id']
                cu = '<div class="alert alert-info" ';
                cu = cu + 'role="alert">';
                    cu = cu+' <span class="glyphicon glyphicon-user" aria-hidden="true"></span>';
                    cu = cu+ data['name']+" "+data['fullname'] ;
                    cu = cu+'<div>@'+data['username']+'</div>';
                    cu = cu+' </div>';
                $( "<div/>", {
                    html: cu
                }).appendTo( ".top" );
                getChats();
        });
