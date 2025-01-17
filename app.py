from flask import Flask, render_template, request, redirect, url_for
from livereload import Server

app = Flask(__name__)
app.jinja_env.auto_reload = True


# Routen für Seiten
@app.route('/')
def hello_world():  # put application's code here
    return render_template('index.html')


@app.route('/start')
def start_page():  # put application's code here
    return render_template('startpage.html')


@app.route('/tipps')
def tipps():  # put application's code here
    return render_template('5tipps.html')


@app.route('/smallbusiness')
def smallbusiness():  # put application's code here
    return render_template('smallbusiness.html')


@app.route('/passwortrichtlinien')
def passwortrichtlinien():  # put application's code here
    return render_template('passwortrichtlinien.html')


@app.route('/blogs')
def blogs():  # put application's code here
    return render_template('posts.html')


@app.route('/snake')
def snake():  # put application's code here
    return render_template('snake.html')


# Route für Kontaktformular
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Formulardaten empfangen
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']

        # Daten in der Konsole anzeigen
        print(f"Name: {name}")
        print(f"E-Mail: {email}")
        print(f"Nachricht: {message}")

        # Rückmeldung an den Nutzer
        return render_template('contactdanke.html', name=name)
    return render_template('contact.html')

@app.route('/thanks')
def thanks():
    name = request.args.get('name', 'Besucher')  # Hol den Namen aus der URL
    return render_template('contactdanke.html', name=name)


server = Server(app)
server.watch('static/*.*')
server.watch('templates/*.html')
server.serve(debug=True, port=5000)

if __name__ == '__main__':
    app.run()
