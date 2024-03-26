import mysql.connector
__connection = None

def get_sql_connection():
    global __connection
    if __connection is None:
        __connection = mysql.connector.connect(user='root', password='220679', host='localhost', database= 'cadastrar')

    return __connection  