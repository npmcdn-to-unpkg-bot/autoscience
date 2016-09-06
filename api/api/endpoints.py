from api import api

@api.route('/')
def index():
    return 'Index Page'

@api.route('/hello')
def hello():
    return 'Hello, World'

@api.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    return 'User %s' % username

@api.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id

@api.route('/projects/')
def projects():
    return 'The project page'

@api.route('/about')
def about():
    return 'The about page'