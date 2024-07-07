import os
from flask import Flask, request, send_file, jsonify
import config
from database import app, User
import dbops


@app.route('/')
@app.errorhandler(404)
def index(*args, **kwargs):
    return send_file("static/index.html")


@app.route('/get_token', methods=['GET'])
def get_token():
    return dbops.generate_hexadecimal_token()


@app.route('/login', methods=['POST'])
def login():
    return dbops.get_login_detail(request)

@app.route('/list_videos')
def list_videos():
    return dbops.get_videos()


@app.route('/play_video/<filename>')
def serve_video(filename):
    return dbops.serve_video(request, filename)


if __name__ == '__main__':
    app.run(host=config.HOST, port=config.PORT, debug=config.DEBUG)
