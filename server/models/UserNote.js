const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserNoteSchema = new Schema({
    _id : {type: String, required: true},
    colors: [{type: String}],
    notes: [{ 
        id_note: Number,  
        Title: {type: String},
        description: { type:String, default: "without description"},
        final_time: { type: String, default:"00:00"},
        initial_time: { type: String, default:"00:00"}, 
        dia: { type: Number, default: 0},
        color: { type:String, default:"#ffffff"}
    }] 
});

module.exports = mongoose.model('UserNote',UserNoteSchema);