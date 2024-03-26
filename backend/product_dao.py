from sql_connection import get_sql_connection
from mysql.connector import connection

def get_all_produtos(connection):


    cursor = connection.cursor()

    query = ("SELECT produtos.product_id, produtos.nome, produtos.categoria, produtos.price_unit")

    cursor.execute(query)

    response = []

    for(product_id, nome, categoria, price_unit)in cursor:
        response.append({

            'produto_id':product_id, 
            'nome':nome, 
            'categoria':categoria, 
            'price_unit':price_unit 
            

        })


    
    return response

def insert_produto(connection, produto):
    cursor = connection.cursor()
    query = ("INSERT INTO produtos" "(nome, categoria, price_unit)"" VALUES (%s,%s,%s)")
    data = (produto['produto_nome'], produto['categoria'], produto['price_unit'])
    
    cursor.execute(query,data)
    connection.commit()

    return cursor.lastrowid

def delete_produto(connection, product_id):
    cursor = connection.cursor()
    query = ("DELETE FROM produtos where product_id=" + str(product_id))
    
    cursor.execute(query)
    connection.commit()
    



if __name__=='__main__':
    connection = get_sql_connection()
    print(delete_produto(connection, 1 ))