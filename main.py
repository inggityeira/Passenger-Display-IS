from flask import Flask
from views import main  # Import views langsung

app = Flask(__name__)

# Register Blueprints
app.register_blueprint(main)

if __name__ == '__main__':
    app.run(debug=True)
