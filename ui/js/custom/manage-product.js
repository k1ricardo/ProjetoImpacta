
var productModal = $("#product-modal");
    $(function () {

        $.get(productListApiUri, function (response) {
            if(response) {
                var tablet = '';
                $.each(response, function(index, produto) {
                    tablet += '<tr data-id="'+ produto.produto_id + '" data-nome="'+ produto.nome + '" data-categoria="'+ produto.categoria +'" data-price="' + produto.price_unit +'">' +
                        '<td>'+ produto.nome +'</td>'+
                        '<td>'+ produto.categoria +'</td>'+
                        '<td>'+ produto.price_unit +'</td>'+
                        '<td><span class="btn-xs btn-danger delete-product">Deletar</span></td></tr>';
                        
                });
                $("table").find('tbody').empty().html(tablet);
            }
        })
    });

    $("#saveProduct").on("click", function() {

        var data = $("#productForm").serializeArray();
        var requestPayload = {
            produto_nome: null,
            categoria: null,
            price_unit: null
        };
        for (var i=0; i < data.length; i++) {
            var element = data[i];
            switch(element.name) {
                case 'nome':
                    requestPayload.produto_nome = element.value; 
                    break;
                case 'categoria':
                    requestPayload.categoria = element.value;
                    break;
                case 'price':
                    requestPayload.price_unit = element.value;
                    break;

            }
        }
        callApi("POST", productSaveApiUrl, {
            'data': JSON.stringify(requestPayload)
        })
    });



    $(document).on("click", ".delete-product", function() {
        var tr = $(this).closest( "tr" );
        var data = {
            produto_id : tr.data('id')
        };
        var isDelete = confirm("Deseja realmente deletar este produto"+ tr.data( 'nome' )+" item?");
        if  (isDelete){
             callApi("POST", productDeleteApiUrl, data);
        }
    });

    productModal.on('hide.bs.modal', function(){
        $("#id").val('0');
        $("nome, #unit, #price").val('');
        productModal.find('.modal-title').text("Adicionar Novo  Produto");
    });

    

  
```
  var productModal = $("#product-modal");

$(function () {

    $.get(productListApiUri, function (response) {
        if(response) {
            var tableHtml = '';
            $.each(response, function(index, produto) {
                tableHtml += '<tr data-id="'+ produto.produto_id + '" data-nome="'+ produto.nome + '" data-unit="'+ produto.unico_id +'" data-price="' + produto.price_unit +'">' +
                    '<td>'+ produto.nome +'</td>'+
                    '<td>'+ produto.unico_nome +'</td>'+
                    '<td>'+ produto.price_unit +'</td>'+
                    '<td><span class="btn-xs btn-danger delete-product">Deletar</span></td></tr>';
                    
            });
            $("table").find('tbody').empty().html(tableHtml);
        }
    });

});

$("#saveProduct").on("click", function() {

    var data = $("#productForm").serializeArray();
    var requestPayload = {
        produto_nome: null,
        unico_id: null,
        price_unit: null
    };
    for (var i=0; i < data.length; i++) {
        var element = data[i];
        switch(element.name) {
            case 'nome':
                requestPayload.produto_nome = element.value; 
                break;
            case 'uoms':
                requestPayload.unico_id = element.value;
                break;
            case 'price':
                requestPayload.price_unit = element.value;
                break;

        }
    }
    callApi("POST", productSaveApiUrl, requestPayload);
});



$(document).on("click", ".delete-product", function() {
    var tr = $(this).closest( "tr" );
    var data = {
        produto_id : tr.data('id')
    };
    var isDelete = confirm("Deseja realmente deletar este produto: " + tr.data('nome') + "?");
    if  (isDelete){
         callApi("POST", productDeleteApiUrl, data);
    }
});

productModal.on('hide.bs.modal', function(){
    $("#id").val('0');
    $("#nome, #unit, #price").val('');
    productModal.find('.modal-title').text("Adicionar Novo Produto");
});

productModal.on('shown.bs.modal', function(){

    $.get(uomListApiUrl,  function(response) {
        if(response) {
            var options = '<option value="">--Selecionar--</option> ';
            $.each(response, function(index, uom) {
                options += '<option value="'+ uom.unico_id +'">'+ uom.unico_nome +'</option>';
            });
            $("#uoms").empty().html(options);
        }

    });
});

```