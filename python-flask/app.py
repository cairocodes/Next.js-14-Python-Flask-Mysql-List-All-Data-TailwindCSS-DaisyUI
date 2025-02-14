from flask import Flask, jsonify, request
from flask_marshmallow import Marshmallow #ModuleNotFoundError: No module named 'flask_marshmallow' = pip install flask-marshmallow 
from flask_cors import CORS, cross_origin #ModuleNotFoundError: No module named 'flask_cors' = pip install Flask-Cors
from models import db, Users
 
app = Flask(__name__)
 
app.config['SECRET_KEY'] = 'cairocoders-ednalan'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'
# Databse configuration mysql                             Username:password@hostname/databasename
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost:8889/flasknextjs' #python3 -m pip install PyMySQL https://pypi.org/project/pymysql/
                                                        
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True
  
CORS(app, supports_credentials=True)
 
db.init_app(app)
        
with app.app_context():
    db.create_all()
 
ma=Marshmallow(app)
 
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id','name','email','password')
  
user_schema = UserSchema()
users_schema = UserSchema(many=True)

@app.route("/")
def hello():
    return "Hello, World!"
 
@app.route('/users', methods=['GET']) 
def listusers():
    all_users = Users.query.all()
    results = users_schema.dump(all_users)
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)