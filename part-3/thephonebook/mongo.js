const mongoose = require('mongoose')

const processLength = process.argv.length;

if (processLength < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2];
const name = process.argv[3];
const contactNumber = process.argv[4];

const personShema = new mongoose.Schema({
    name: String,
    number: Number
});

const Person = mongoose.model('Person', personShema);

const url = `mongodb+srv://dbFullStack:${password}@cluster0.nnvb595.mongodb.net/contactApp?retryWrites=true&w=majority`

mongoose
.connect(url)
.then((result) => {
    console.log('connected')

    if (processLength === 3) {
        console.log("Phonebook:");
        Person.find({}).then(result => {
            result.forEach(note => {
                console.log(`${note.name} ${note.number}`);
            })
            mongoose.connection.close()
        })
    } else {
        const person = new Person({
            name: name,
            number: contactNumber
        });
        return person.save()
    }
})
.then((person) => {
    processLength === 3 || console.log(`Added ${person.name} number ${person.number} to the phonebook.`);
    return mongoose.connection.close()
})
.catch((err) => console.log(err));