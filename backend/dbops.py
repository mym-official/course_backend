import traceback
from flask import jsonify, request
import config
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
                video_title = os.path.splitext(filename)[0]
                videos.append({
                    'title': video_title,
                    'filename': f'{filename}'
                })
        return jsonify(videos)
    except Exception as e:
        traceback.print_exc()
        return jsonify({'status': 'fail', 'reason': 'error while fetching the videos'})
