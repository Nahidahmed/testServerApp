var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:Infosoft@35@cluster0.utb0t.mongodb.net/TheGhoriFamily?retryWrites=true&w=majority', { useNewUrlParser: true });

var Schema = mongoose.Schema;

var authorSchema = new Schema(
    {
        name: String,
        affliation: String
    }
);

var bookSchema = new Schema(
    {
        title: {type: String,required: true,unique: true},
        year: Number,
        authers: [authorSchema]
    }
);

module.exports = mongoose.model('Book',personSchema);