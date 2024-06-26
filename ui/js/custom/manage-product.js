
var productModal = $("#productModal");
    $(function () {

        $.get(productListApiUrl, function (response) {
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
            product_id : tr.data('id')
        };
        var isDelete = confirm("Deseja realmente deletar este produto"+ tr.data( 'nome' )+" categoria?");
        if  (isDelete){
             callApi("POST", productDeleteApiUrl, data);
        }
    });

    productModal.on('hide.bs.modal', function(){
        $("#id").val('0');
        $("nome, #categoria, #price").val('');
        productModal.find('.modal-title').text("Adicionar Novo  Produto");
    });



  


