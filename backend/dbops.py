import traceback
from flask import jsonify, Response
import config
import re
from database import User
import uuid
import os


def generate_hexadecimal_token():
    return uuid.uuid4().hex


def get_login_detail(request):
    try:
        token = request.json.get('token')
        if not token:
            return jsonify({'message': 'Token is missing'}), 400

        user = User.query.filter_by(token=token).first()
        if not user:
            return jsonify({'message': 'Invalid token'}), 401

        return jsonify({'subscription': user.subscription, 'status': 'success'}), 200
    except Exception as _e:
        traceback.print_exc()
        return jsonify({'status': 'fail', 'reason': 'invalid detail'})


def get_videos():
    try:
        videos = []
        for filename in os.listdir(config.VIDEOS_FOLDER):
            if filename.endswith('.mp4'):
                video_path = os.path.join(config.VIDEOS_FOLDER, filename)
                video_title = os.path.splitext(filename)[0]
                videos.append({
                    'title': video_title,
                    'filename': f'{filename}'
                })
        return jsonify(videos)
    except Exception as e:
        traceback.print_exc()
        return jsonify({'status': 'fail', 'reason': 'error while fetching the videos'})


def serve_video(request, filename):
    def generate():
        with open(os.path.join(config.VIDEOS_FOLDER, filename), "rb") as video:
            while True:
                data = video.read(1024)
                if not data:
                    break
                yield data

    range_header = request.headers.get('Range', None)
    if not range_header:
        return Response(generate(), mimetype='video/mp4')

    size = os.path.getsize(os.path.join(config.VIDEOS_FOLDER, filename))
    byte1, byte2 = 0, None
    m = re.search(r'(\d+)-(\d*)', range_header)
    g = m.groups()

    if g[0]: byte1 = int(g[0])
    if g[1]: byte2 = int(g[1])

    length = size - byte1
    if byte2 is not None:
        length = byte2 - byte1 + 1

    data = None
    with open(os.path.join(config.VIDEOS_FOLDER, filename), 'rb') as f:
        f.seek(byte1)
        data = f.read(length)

    rv = Response(data, 206, mimetype='video/mp4', content_type='video/mp4', direct_passthrough=True)
    rv.headers.add('Content-Range', f'bytes {byte1}-{byte1 + length - 1}/{size}')
    return rv
