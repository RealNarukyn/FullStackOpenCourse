require('dotenv').config()

const express   = require('express');
const morgan    = require('morgan');
const cors      = require('cors');
const Person    = require('./models/persons.model');
// const path      = require('path');

const app = express();

// * Middlewares
app.use(express.static('dist'));
app.use(cors());
app.use(express.json());

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan((tokens, req, res) => {
    if (req.method == 'POST') {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            tokens['body'](req, res)
        ].join(' ')
    }

    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}));


// * [ GET ] Routing

app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(res => response.json(res))
        .catch(err => response.json({ error: err }));
})

app.get('/api/persons/info', (request, response) => {
    Person.find({})
        .then(res => {
            const entryNums = res.length;
            const entryTimestamp = new Date().toString();

            const RESPONSE_HTML =
                `
                    <p>Phonebook has info for: ${entryNums} people</p>
                    <p>${entryTimestamp}</p>
                `;

            response.send(RESPONSE_HTML);
        })
        .catch(err => response.json({ error: err }));
})

app.get('/api/persons/:id', (request, response) => {
    const { id } = request.params;

    Person.findById(id)
        .then(res => {
            if (!res)
                return response.status(404).json({ error: 'Content Missing' });

            response.json(res);
        })
        .catch(err => response.json({ error: err }));
});


// * [ POST ] Routing
app.post('/api/persons', (request, response) => {
    const { name, number } = request.body;

    if (!name.trim()) {
        return response.status(409).json({ error: 'name must be filled' });
    }

    if (!number.trim()) {
        return response.status(409).json({ error: 'number must be filled' });
    }

    Person.find({ name })
        .then(res => {
            if (res.length > 0)
                return response.status(500).json({ error: 'name must be unique' });

            const newPerson = new Person({ name, number });

            newPerson.save()
                .then(p => response.status(201).json(p))
                .catch(err => response.status(500).json({ error: err }));
        })
        .catch(err => response.status(500).json({ error: err }));
});


// * [ DELETE ] Routing
app.delete('/api/persons/:id', (request, response) => {
    const { id } = request.params;

    PERSONS = PERSONS.filter(p => p.id != id);

    response.status(204).end();
});



// * APP Listening...
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`));