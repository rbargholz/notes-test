const _ = require("lodash");
module.exports.create = async (req, res) => {
    const noteVersion = await req.currentUser.createNoteVersion(req.body);
    res.json(noteVersion.expose());
};

module.exports.get = async (req, res) => {
    res.json(_.invokeMap(req.noteVersions, 'expose'));
};

module.exports.getMostRecentVersion = async (req, res) => {
    console.log(req.mostRecentNoteVersion)
    res.json(req.mostRecentNoteVersion)
};
