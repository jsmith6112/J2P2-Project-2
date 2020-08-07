# import necessary libraries
import pandas as pd
import json
import pymysql
#from sqlalchemy import create_engine

from config import remote_db_endpoint, remote_db_port, remote_db_user, remote_db_pwd, remote_db_name
pymysql.install_as_MySQLdb()

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

from sqlalchemy import func, create_engine

app = Flask(__name__)

engine = create_engine(f"mysql://{remote_db_user}:{remote_db_pwd}@{remote_db_endpoint}/{remote_db_name}")

# create route that renders index.html template
@app.route("/")
def home():    
    return render_template("index.html")

# create route that renders about.html template
@app.route("/about")
def aboutPage():    
    return render_template("about.html") 

@app.route("/learn-more copy")
def learnMoreCopy():    
    return render_template("learn-more copy.html")  
             
# API enpoint with ALL the Data 
@app.route("/api/sba_loan_detail")
def sba_startup():
    conn = engine.connect()
    
    query = '''
        SELECT 
            *
        FROM
            sba_loan_detail 
        Limit 10000    
    ''' 

    sba_df = pd.read_sql(query, con=conn)

    sba_json = sba_df.to_json(orient='index')

    conn.close()

    return sba_json


    
#Loop used to export data to Json For Chloropleth 
    with open('us-states-with-loan-data.json') as json_file:
        sba_json = json.load(json_file)
        #print(sba_json)

    return sba_json



# Rouute that Groups data by both State and Business type. Route used for the horzonatal pargraph by type and State
@app.route("/api/business_type_state")
def jobs_supported():
    conn = engine.connect()
    
    query = '''
       SELECT
            BusinessType
            ,BorrState
            ,Count(BusinessType) AS CountBusinessType 
            ,Sum(GrossApproval) AS GrossApproval
        FROM
	        `sba-schema`.sba_loan_detail
        GROUP BY
            BorrState,
            BusinessType
        ORDER BY
	        BorrState 
    ''' 

    jobs_df = pd.read_sql(query, con=conn)

    jobs_json = jobs_df.to_json(orient='records')

    conn.close()

    return jobs_json


# Used to group franchise and year 
@app.route("/api/top_franchise")
def top_franchise():
    conn = engine.connect()
    
    query = '''
        SELECT 
            ApprovalFiscalYear,
            FranchiseName,
            sum(GrossApproval) AS GrossApproval
        FROM
            `sba-schema`.sba_loan_detail
        WHERE
            FranchiseName IS NOT NULL
        GROUP BY 
            ApprovalFiscalYear,
            FranchiseName
        ORDER BY 
            GrossApproval DESC
        LIMIT 20
    ''' 

    franchise_df = pd.read_sql(query, con=conn)

    franchise_json = franchise_df.to_json(orient='records')

    conn.close()

    return franchise_json


#Route for table of top banks 
@app.route("/api/top_banks")
def top_banks():
    conn = engine.connect()
    
    query = '''
        SELECT 
            BankName,
            ROUND(avg(GrossApproval)) AS AverageApproval,
            BankCity,
            BankState
        FROM 
            `sba-schema`.sba_loan_detail
        GROUP BY 
            BankName,
            BankState
        ORDER BY
           AverageApproval DESC
    ''' 

    banks_df = pd.read_sql(query, con=conn)

    banks_json = banks_df.to_json(orient='records')

    conn.close()

    return banks_json


if __name__ == "__main__":
    app.run(debug=True)