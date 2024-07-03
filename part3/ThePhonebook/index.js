const express = require('express');
const morgan = require('morgan');

const app = express();

// * Defines
const PORT = 3001;
const URL = `http://localhost:${PORT}`;

// * Database ( fake )
let PERSONS = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


// * Middlewares
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

// * My Functions
const generateID = () => {
    const persons = PERSONS.sort((a, b) => b.id - a.id);
    return parseInt(persons[0].id) + 1;
}

const generateRandID = () => Math.floor(Math.random() * 10_000);


// * [ GET ] Routing
app.get('/', (request, response) => {
    const INDEX_HTML =
        `
            <h1>The Phonebook backend service</h1>
            <p>Please make the right calls to:</p>
            <ul>
                <li><a href="${URL}/api/persons">/api/persons</a></li>
                <li><a href="${URL}/api/persons/info">/api/persons/info</a></li>
                <li>/api/person/[id]</li>
            </ul>
        `;

    response.send(INDEX_HTML);
})

app.get('/api/persons', (request, response) => {
    response.json(PERSONS);
})

app.get('/api/persons/info', (request, response) => {
    const entryNums = PERSONS.length;
    const entryTimestamp = new Date().toString();

    const RESPONSE_HTML =
        `
            <p>Phonebook has info for: ${entryNums} people</p>
            <p>${entryTimestamp}</p>
        `;

    response.send(RESPONSE_HTML);
})

app.get('/api/persons/:id', (request, response) => {
    const { id } = request.params;

    const person = PERSONS.find(p => p.id == id);

    if (!person)
        return response.status(404).json({ error: 'Content Missing' });

    response.json(person);
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

    if (PERSONS.find(p => p.name == name)) {
        return response.status(409).json({ error: 'name must be unique' });
    }


    const newPerson = {
        id: generateRandID(),
        name,
        number
    };

    PERSONS.push(newPerson);

    response.status(201).json(newPerson);
});


// * [ DELETE ] Routing
app.delete('/api/persons/:id', (request, response) => {
    const { id } = request.params;

    PERSONS = PERSONS.filter(p => p.id != id);

    response.status(204).end();
});



// * APP Listening...
app.listen(PORT, () => console.log(`Server listening at: ${URL}`));