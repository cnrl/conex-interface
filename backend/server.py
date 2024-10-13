from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/get-components", methods=["GET"])
def get_chunk():
    try:
        return jsonify({"components": []}), 200
    except Exception as e:
        return str(e), 500

# Start the Flask server
if __name__ == "__main__":
    app.run(port=8000, debug=True)
