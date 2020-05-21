import json

from flask import Flask, request, Response
from http import HTTPStatus

from enrichment.process import process_json

app = Flask(__name__)


@app.route('/api/process_json/', methods=["POST"])
def api_process_json():
    request_json = request.json
    processed_json, errors_json = process_json(request_json)

    return Response(
        status=HTTPStatus.OK,
        response=json.dumps({
            "processed_data": json.loads(processed_json),
            "error_data": json.loads(errors_json)
        }),
        mimetype="application/json"
    )


@app.route('/status/', methods=["GET"])
def ping():
    return Response(
        status=HTTPStatus.OK,
        response=json.dumps({"message": "alive"}),
        mimetype="application/json"
    )


if __name__ == '__main__':
    app.run(debug=True, port=5050)
