const _ = require("lodash");
module.exports.create = async (req, res) => {
    if(!req.body.parent_id) {
        req.body.parent_id = req.body.id
    }
    const noteVersion = await req.currentUser.createNoteVersion(req.body, true);
    res.json(noteVersion.expose());
};

module.exports.get = async (req, res) => {
    res.json(_.invokeMap(req.noteVersions, 'expose'));
};
