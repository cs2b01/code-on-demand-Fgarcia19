$(function(){
    var url = "http://127.0.0.1:8080/messages";
    var db ="http://127.0.0.1:8080/users"
    $("#grid").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "id",
            loadUrl: url,
            insertUrl: url,
            updateUrl: url,
            deleteUrl: url,
            onBeforeSend: function(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        }),
        remoteOperations: true,
        columns: [{
                dataField: "id",
                dataType: "number",
                allowEditing: false
                },

                {dataField: "sent_on",
                 dataType: "datetime",
                allowEditing:false },

                {
                dataField: "content",
            },  {
                dataField: "user_from_id",
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "id",
                        loadUrl: db,
                        onBeforeSend: function(method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true };
                        }
                    }),
                    valueExpr: "id",
                    displayExpr: "username"
                },
            },{
                dataField: "user_to_id",
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "id",
                        loadUrl: db,
                        onBeforeSend: function(method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true };
                        }
                    }),
                    valueExpr: "id",
                    displayExpr: "username",
                }
            }
        ],
        height: 600,
        showBorders: true,
        editing: {
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true
        },
        grouping: {
            autoExpandAll: false
        },

    }).dxDataGrid("instance");
     $.ajax({
                url: "http://127.0.0.1:8080/messages",
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                     "content":  content,
                     "user_from_id":user_from_id,
                     "user_to_id":user_to_id
                }),
                dataType: 'json'
            });
});


