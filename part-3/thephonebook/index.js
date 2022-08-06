require("dotenv").config()
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Contact = require("./models/contact");

morgan("tiny");

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

// morgan(':method :url :status :res[content-length] - :response-time ms');

const documentCount = Contact.countDocuments({}, function (err, count) {
    return count;
})

app.get("/api/persons", (req, res) => {
    Contact.find({}).then(person => {
        res.json(person);
    })
});

app.get("/api/persons/:id", (req, res, next) => {
    
    Contact.findById(req.params.id).then(contact => {
        if (contact) {
            res.json(contact);
        } else {
            res.status(404).end();
        }
    })
    .catch(error => next(error));
});

app.get("/info", (req, res) => {
    res.write(`<p>Phonebook has info for ${documentCount} people.</p>`);
    res.write(`<p>${new Date()}</p>`);
    res.end();
});

app.delete("/api/persons/:id", (req, res, next) => {
    Contact.findByIdAndRemove(req.params.id).then(result => {
        res.status(204).end();
    })
    .catch(error => next(error));
});

app.post("/api/persons", (req, res, next) => {

    const person = req.body;

    // Contact.findOne(person.name).then(contact => {
    //     console.log(contact);
    // });

    // if (personName) {
    //     return res.status(404).json({
    //         error: "Name must be unique"
    //     });
    // }

    const newPerson = new Contact({
        name: person.name,
        number: person.number
    });
    
    newPerson.save().then(savedPerson => {
        res.json(savedPerson);
    })
    .catch(error => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
    const {name, number} = req.body;

    Contact.findByIdAndUpdate(req.params.id, {name, number}, {new: true, runValidators: true, context: "query"})
        .then(contact => {
            res.json(contact)
        })
        .catch(error => next(error));
})

const errorHandlers = (error, req, res, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === "ValidationError") {
        return res.status(404).json({error: error.message});
    }

    next(error);
}

app.use(errorHandlers);

const PORT = process.env.PORT;

app.listen(PORT, ()=> {
    console.log(`App is running on port ${PORT}.`);
});