# pip install pywhatkit
import pywhatkit as kit
import mysql.connector


# Connect to the MySQL database
try:
    connection = mysql.connector.connect(
        host= 'localhost',
        user= 'root',
        password= '',
        database= 'alumni'
    )

    if connection.is_connected():
        print("Connected to MySQL database")

        # Define the SELECT query
        query = "SELECT * FROM users where role='student';"

        # Execute the query
        cursor = connection.cursor()
        cursor.execute(query)

        # Fetch the results
        rows = cursor.fetchall()

        # Print the results
        for row in rows:
            print(row)
            phone_number = "+91"+str(row[0])

            message = "Hello from Python! This is an instant WhatsApp message."

        # Send the message instantl
        # kit.sendwhatmsg(phone_number, message,0,0)
        kit.sendwhatmsg_instantly(phone_number, message)


        # Close cursor and connection
        cursor.close()
        connection.close()
        print("MySQL connection closed")

except mysql.connector.Error as error:
    print("Error while connecting to MySQL", error)
