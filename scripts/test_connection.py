import mysql.connector

try:
    conn = mysql.connector.connect(
        host="127.0.0.1",
        user="saranya",
        password="saranya123"
    )
    print("Connected Successfully!")
except Exception as e:
    print("Error:", e)
