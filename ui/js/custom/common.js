var productListApiUrl = 'http://localhost:5000/getProdutos';
var productDeleteApiUrl = 'http://localhost:5000/deletarProdutos';
var productSaveApiUrl = 'http://localhost:5000/insertProduto';

function callApi(method, url, data) {
    $.ajax({
        method: method,
        url: url,
        data: data
    }).done(function ( msg ) {
        window.location.reload(); 
    })
}

