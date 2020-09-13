var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:Infosoft@35@cluster0.utb0t.mongodb.net/TheGhoriFamily?retryWrites=true&w=majority', { useNewUrlParser: true });

var Schema = mongoose.Schema;

var personSchema = new Schema(
    {
        father: {type: String,required: true},
        child: {type: String}
    }
);

module.exports = mongoose.model('FamilyDetails',personSchema);