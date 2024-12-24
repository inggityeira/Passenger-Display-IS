from flask import Blueprint, render_template
import requests

main = Blueprint('main', __name__)

@main.route('/<int:id>', methods=['GET'])
def index(id):
    laravel_api_url = f'https://manajemenstasiun.my.id/api/posts/{id}'

    try:
        # Mengambil data dari API Laravel
        response = requests.get(laravel_api_url)
        response.raise_for_status()
        data = response.json()

        # Berikan nilai default jika `rute` atau `points` adalah None
        data['data']['rute'] = data['data'].get('rute') or {'points': []}

        print(data)
        return render_template('base.html', data=data)
    
    except requests.exceptions.RequestException as e:
        return f'Error: {e}'