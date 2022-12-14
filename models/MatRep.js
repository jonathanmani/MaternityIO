const mongoose = require('mongoose');

const MatRepSchema = new mongoose.Schema({
    startDate: Date,
    endDate: Date,
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    allowedJobTitles: [String],
    industries: [String],
    yearsOfExperience: Number,
});

const MatRep = mongoose.model('MatRep', MatRepSchema);

module.exports = MatRep;