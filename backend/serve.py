from flask import Flask, request, jsonify
from flask.wrappers import Response
from mysql.connector import connection
import product_dao
from sql_connection import get_sql_connection
import json


app  = Flask(__name__)

connection = get_sql_connection()

@app.route('/getProdutos', methods=['GET'])
def getProdutos():
    produtos = product_dao.get_all_produtos(connection)
    response = jsonify(produtos)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/deletarProdutos', methods=['POST'])
def deletarProdutos():
    return_id = product_dao.delete_produto(connection, request.form['product_id'])
    response = jsonify({
        'product_id': return_id
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response




@app.route('/insertProduto', methods=['POST'])
def insertProduto():
    request_payload = json.loads(request.form['data'])
    product_id = product_dao.insert_produto(connection, request_payload)
    response = jsonify({
        'product_id': product_id
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response
    

if  __name__ == '__main__':
    print("comesando nosso web site em flask")

    app.run(port=5000)

    