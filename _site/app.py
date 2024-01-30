from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from api.user import user_api  # Importing the API blueprint from user.py

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Register the API blueprint
app.register_blueprint(user_api, url_prefix='/api/users')  # Registering the database blueprint with URL prefix

if __name__ == "__main__":
    from model.users import initUsers  # Assuming initUsers is defined in model/users.py
    with app.app_context():
        db.create_all()
        initUsers()
    app.run(debug=True)


