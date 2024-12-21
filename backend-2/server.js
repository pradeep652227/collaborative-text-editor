function startServer() {
    try {
        /* External Modules */
        const
            express = require('express'),
            { Router } = express,
            http = require('http'),
            ejs = require('ejs');
        require('dotenv').config(); // Load environment variables from .env file

        /* Declarations */
        const
            router = Router(),
            app = express(),
            httpServer = http.createServer(app),
            PORT = process.env.PORT || 3000;

        /* Initialisation */
        app.set('views', './views') // Set the views directory
           .set('view engine', 'ejs') // Set the template engine to EJS
           .use(express.json()) // Middleware for parsing JSON payloads
           .use(express.urlencoded({ extended: true })); // Middleware for form submissions

        /* Routes */
        router.get('/', (req, res) => {
            res.render('index', { title: 'Welcome to the App' }); // Render the index.ejs file
        });

        router.post('/submit', (req, res) => {
            console.log(req.body); // Log the form data received
            res.send('Form submitted successfully!'); // Respond to the client
        });

        router.get('/about', (req, res) => {
            res.send('About Page'); // Simple response for the /about route
        });

        /* Mount the Router */
        app.use('/', router); // Attach the router to the root path

        /* Start the Server */
        httpServer.listen(PORT, () => console.log('Server is running on PORT', PORT));

    } catch (error) {
        console.log('Error in server :-', error);
    }
}

startServer();
