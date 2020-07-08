const _ = require("lodash");
module.exports.create = async (req, res) => {
    const noteVersion = await req.currentUser.createNoteVersion(req.body);
    res.json(noteVersion.expose());
};

module.exports.get = async (req, res) => {
    console.log(req.noteVersions)
    res.json(_.invokeMap(req.noteVersions, 'expose'));
};
