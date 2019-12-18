from flask import (
    Blueprint,
    render_template,
    jsonify
)

module = Blueprint('general', __name__)


@module.app_errorhandler(404)
def handle_404(err):
    #return render_template('404.html'), 404
    ret = {'msg' : 'URL not found'}
    return jsonify(ret), 404


@module.app_errorhandler(500)
def handle_500(err):
    #return render_template('500.html'), 500
    ret = {'msg' : 'Error code 500'}
    return jsonify(ret), 500