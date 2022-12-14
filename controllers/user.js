const User = require('../models/User');
const MatCan = require('../models/MatCan');
const MatRep = require('../models/MatRep');
const findReplacements = require('../services/findReplacements');
const findCandidates = require('../services/findCandidates');

const getUserDetails = async (req, res, next) => {
    console.log()
    const user = await User.findById(req.params.id);
    const candidate = await MatCan.find({user: req.params.id});
    const replacement = await MatRep.find({user: req.params.id});

    if (!user) {
        res.status(404).end();
    } else {
        if (candidate) {
            res.json({user, candidate});
        } else if (replacement) {
            res.json({user, replacement});
        } else {
            res.json({user});
        }
    }
};

const getAvailableCandidates = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    const replacement = await MatRep.findOne({user: req.params.id});
    if (!user) res.status(404).end();
    if (!replacement) res.status(403).end();
    const candidates = await findCandidates(replacement);
    res.json(candidates);
};

const getAvailableReplacements = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    const candidate = await MatCan.findOne({user: req.params.id});
    if (!user) res.status(404).end();
    if (!candidate) res.status(403).end();
    const replacements = await findReplacements(candidate);
    res.json(replacements);
};

module.exports = {
    getUserDetails,
    getAvailableCandidates,
    getAvailableReplacements
};