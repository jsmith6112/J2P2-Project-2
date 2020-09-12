
# import necessary libraries
import pandas as pd
import json
import pymysql
import os 
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
is_heroku = False
if 'IS_HEROKU' in os.environ:
    is_heroku = True

# Import your config file(s) and variable(s)
if is_heroku == False:
    from config import remote_db_endpoint, remote_db_port, remote_db_name, remote_db_user, remote_db_pwd
else:
    remote_db_endpoint = os.environ.get('remote_db_endpoint')
    remote_db_port = os.environ.get('remote_db_port')
    remote_db_name = os.environ.get('remote_db_name')
    remote_db_user = os.environ.get('remote_db_user')
    remote_db_pwd = os.environ.get('remote_db_pwd')

app = Flask(__name__)

engine = create_engine(f"mysql://{remote_db_user}:{remote_db_pwd}@{remote_db_endpoint}/{remote_db_name}")

# create route that renders ALL template
@app.route("/")
def home():
    return render_template("index.html")
@app.route("/about")
def aboutPage():
    return render_template("about.html")
@app.route("/learn-more")
def learnMore():
    return render_template("learn-more.html")
@app.route("/trends")
def trends():
    return render_template("trends.html")



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
            FranchiseName
        ORDER BY
            GrossApproval DESC
        LIMIT 10
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

# ------------------------ MAP ENDPOINTS ------------------------------------
@app.route("/api/sba_by_state_approvals")
def fy_state_approvals():

    with open('us-states-with-loan-data.json') as json_file:
        sba_json = json.load(json_file)
        # print(sba_json)

    return sba_json

# -------------------------- LOAN Frequency ENDPOINTS -------------------------
@app.route("/loan_frequency")
def loan_freq():
    conn = engine.connect()

    query = '''
        SELECT
        	ApprovalFiscalYear as Year,
        	NaicsCode, NaicsDescription as Industry_Classification,
        	count(NaicsDescription) as Industry_Counts
        FROM `sba-schema`.sba_loan_detail
        GROUP BY Year,NaicsDescription
        ORDER BY Year,Industry_Counts DESC
    '''

    sba_df = pd.read_sql(query, con=conn)
    sba_json = sba_df.to_json(orient='records')
    conn.close()

    return sba_json


# ------------------------ GDP by States ENDPOINTS ------------------------------------
@app.route("/states_gdp")
def st_gdp():

    with open('gdp12to19.json') as json_file:
        st_json = json.load(json_file)

    return jsonify(st_json)

#-------------------------------SBA DATA BY YEAR FOR STATIC GRAPH ON INDEX ------------------
# API Route to add SBA Loan amount by year
@app.route("/api/sba_by_year")
def sba_year():
    conn = engine.connect()
    query = '''
        SELECT 
            ApprovalFiscalYear,
            SUM(GrossApproval) AS GrossApproval
        FROM
	        `sba-schema`.sba_loan_detail
        GROUP BY 
            ApprovalFiscalYear
    '''
    sba_by_year_df = pd.read_sql(query, con=conn)
    sbayear_json = sba_by_year_df.to_json(orient='records')
    conn.close()
    return sbayear_json

# ------------------------ BAR CHART RACE -----------------------------------
@app.route('/barchartrace_sample')
def barchartrace():
    conn = engine.connect()

    query = '''
            SELECT
            	ApprovalFiscalYear
            	,NaicsDescription AS name
            	,SUM(GrossApproval) AS value
            FROM
            	sba_loan_detail
            GROUP BY
            	ApprovalFiscalYear
            	,NaicsDescription
            
           
    '''

    data_df = pd.read_sql(query, con=conn)

    # data_df.set_index('ApprovalFiscalYear', inplace=True)

    data_dict = data_df.to_dict(orient='records')

    data_json = data_df.to_json(orient='records')

    with open('data_naics.json', 'w') as json_file:
        json.dump(data_dict, json_file)
    
    return data_json


# ------------------ POPULATION END POINT ------------------------------------
@app.route('/api/population')
def population():
    conn = engine.connect()

    query = '''
           SELECT 
                STATE,
                FORMAT(Populations,0) AS Populations
            FROM 
                `sba-schema`.`state-population-final`
            WHERE
                Year = '2019'       
    '''

    population_df = pd.read_sql(query, con=conn)
    population_json = population_df.to_json(orient='records')
    conn.close()
    return population_json

# ------------------ WOMEN OWNED BIZ END POINT ------------------------------------
@app.route('/api/women_owned')
def womenBiz():
    conn = engine.connect()

    query = '''
           SELECT 
                *
            FROM 
                `sba-schema`.women_census_view      
    '''

    women_df = pd.read_sql(query, con=conn)
    women_json = women_df.to_json(orient='records')
    conn.close()
    return women_json

# ------------------ VET OWNED BIZ END POINT ------------------------------------
@app.route('/api/vet_owned')
def vetBiz():
    conn = engine.connect()

    query = '''
           SELECT 
                *
            FROM 
                `sba-schema`.vet_census_view     
    '''

    vet_df = pd.read_sql(query, con=conn)
    vet_json = vet_df.to_json(orient='records')
    conn.close()
    return vet_json

# ------------------ VET OWNED BIZ END POINT ------------------------------------
@app.route('/api/minority_owned')
def minorityBiz():
    conn = engine.connect()

    query = '''
           SELECT 
                *
            FROM 
                `sba-schema`.Minority_census_view     
    '''

    minority_df = pd.read_sql(query, con=conn)
    minority_json = minority_df.to_json(orient='records')
    conn.close()
    return minority_json

# ------------------AVG AMOUNG GIVEN END POINT ------------------------------------
@app.route('/api/avg_loan_amount')
def avgLoanAmount():
    conn = engine.connect()

    query = '''
           SELECT 
                *
            FROM 
                `sba-schema`.AvgLoanGiven     
    '''

    avg_loan_df = pd.read_sql(query, con=conn)
    avg_loan_json = avg_loan_df.to_json(orient='records')
    conn.close()
    return avg_loan_json 

# ------------------AVG INTEREST RATE END POINT ------------------------------------
@app.route('/api/avg_int_rate')
def avgIntRate():
    conn = engine.connect()

    query = '''
           SELECT 
                *
            FROM 
                `sba-schema`.AvgInterestRate     
    '''

    avg_int_rate_df = pd.read_sql(query, con=conn)
    avg_int_rate_json = avg_int_rate_df.to_json(orient='records')
    conn.close()
    return avg_int_rate_json 

# ==============================================================================
# ------------------------ STATIC GRAPHS ON TREND.HTML ENDPOINT -----------------------------
@app.route("/api/race_demographics")
def ace_demographics():
    with open('static/data/reshaped_SBA_7A_Loan_Data.json') as json_file:
        try:
            sba_json = json.load(json_file)
        except Exception as e:
            print(e)
        print(sba_json)
   
    return jsonify(sba_json)


# ==============================================================================
# ------------------------- Populations ENDPOINTS ------------------------------
@app.route("/pop")
def pop_by_state():
    conn = engine.connect()
    query = '''
        SELECT
	       Year,
	        STATE_FULL_NAME,
	        Populations,
	        STATE
        FROM `state-population-final`
        GROUP BY STATE_FULL_NAME, Year;
    '''
    sba_df = pd.read_sql(query, con=conn)
    sba_json = sba_df.to_json(orient='records')
    conn.close()
    return sba_json

# ==============================================================================
# --------------------- GDP by States ENDPOINTS --------------------------------
@app.route("/gdp")
def gdp_by_state():
    conn = engine.connect()
    query = '''
        SELECT
	        Year,
            STATE_FULL_NAME,
            `GDP(millions)` as GDP_millions,
            STATE
        FROM `state-gdp`
        GROUP BY STATE_FULL_NAME, Year
        ORDER BY Year ASC
    '''
    sba_df = pd.read_sql(query, con=conn)
    sba_json = sba_df.to_json(orient='records')
    conn.close()
    return sba_json

# ==============================================================================
# ---------------------- Income and Expense ENDPOINTS --------------------------
@app.route("/inc_exp")
def income_expense():
    conn = engine.connect()
    query = '''
        SELECT
	       `state-income`.Year,
	        `state-income`.STATE_FULL_NAME,
	        `state-income`.`Income Per Capita` as inc_per_cap,
	        `PCE-state`.`PCE Per Capita` as exp_per_cap,
	        `state-income`.STATE
        FROM `state-income`
        JOIN `PCE-state`
        ON
            `state-income`.STATE = `PCE-state`.STATE and `state-income`.Year = `PCE-state`.Year
        GROUP BY
            Year, STATE_FULL_NAME;
    '''
    sba_df = pd.read_sql(query, con=conn)
    sba_json = sba_df.to_json(orient='records')
    conn.close()
    return sba_json

# ==============================================================================
# -------------------- Number of Jobs by States ENDPOINTS ----------------------
@app.route("/jobs")
def job_counts():
    conn = engine.connect()
    query = '''
        SELECT
	        Year,
            STATE_FULL_NAME,
            `Total Employments` as total_employments,
            STATE
        FROM `sba-schema`.`state-employment`
        GROUP BY STATE, Year;
    '''
    sba_df = pd.read_sql(query, con=conn)
    sba_json = sba_df.to_json(orient='records')
    conn.close()
    return sba_json

# ==============================================================================
# -------------------------- PCT SBA Guaranteed ENDPOINTS --------------------------
@app.route("/pct_guaranteed")
def percent_guaranteed():
    conn = engine.connect()
    query = '''
        SELECT
        	BorrState as State,
        	NaicsDescription as industry,
        	avg(GrossApproval) as loanAmount,
            avg(SBAGuaranteedApproval) as guaranAmount,
            format((SBAGuaranteedApproval/GrossApproval),2) as guaranPercent
        FROM
        	sba_loan_detail
        GROUP BY
        	BorrState,
        	NaicsDescription
    '''
    sba_df = pd.read_sql(query, con=conn)
    sba_json = sba_df.to_json(orient='records')
    conn.close()
    return sba_json

# ------------------------ GDP MAP ENDPOINTS -----------------------------------
@app.route("/gdp_map")
def gdp_map_fn():
    print('---- TRYING TO OPEN FILE-----------')
    with open('static/data/state_GDP.json') as json_file:
        try:
            sba_json = json.load(json_file)
        except Exception as e:
            print('---- ERROR ----')
            print(e)
        print(sba_json)
    print('---- OPENED FILE-----------')
    print('---- READY T RETURN -----------')
    return jsonify(sba_json)

# ==============================================================================
# ------------------------ Jobs Opening MAP ENDPOINTS -----------------------------------
@app.route("/jobs_map")
def jobs_map_fn():
    print('---- TRYIN TO OPEN FILE-----------')
    with open('static/data/state_employments.json') as json_file:
        try:
            sba_json = json.load(json_file)
        except Exception as e:
            print('---- ERROR ----')
            print(e)
        print(sba_json)
    print('---- OPENED FILE-----------')
    print('---- READY T RETURN -----------')
    return jsonify(sba_json)


if __name__ == "__main__":
    app.run(debug=True)
