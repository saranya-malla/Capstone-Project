import pandas as pd
import mysql.connector

# Load CSV
df = pd.read_csv("C:/Users/saran/OneDrive/Desktop/india-location-project/data/sub_districts.csv")

# Connect to MySQL
conn = mysql.connector.connect(
    host="127.0.0.1",
    user="saranya",
    password="saranya123",
    database="india_location_db"
)

cursor = conn.cursor()

# Insert data
for _, row in df.iterrows():
    cursor.execute(
        "INSERT INTO sub_districts (sub_district_code, sub_district_name, district_code, state_code) VALUES (%s,%s,%s,%s)",
        (row[0], row[1], row[2], row[3])
    )

conn.commit()

print("Data inserted successfully!")
