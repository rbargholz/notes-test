'use strict';

const _ = require('lodash');
const uuid = require('uuid');
const { NoteVersion } = require('../../model');

module.exports.create = async (req, res) => {
    if(!req.body.note_id) {
        req.body.note_id = uuid.v4()
    }
    const note = await req.currentUser.createNote(req.body);
    req.body.parent_id = note.id
    const noteVersion = await req.currentUser.createNoteVersion(req.body, false);
    res.json(note.expose());
};

module.exports.list = async (req, res) => {
    const notes = await req.currentUser.notes();
    res.json(_.invokeMap(notes, 'expose'));
};

module.exports.get = async (req, res) => {
    res.json(req.note.expose());
};

module.exports.delete = async (req, res) => {
    await NoteVersion.destroy({
        where: {
            note_id: req.params.noteVersionId
        }
    });
    await req.note.delete();
    res.sendStatus(204);
};
