'use strict';

const _ = require('lodash');
const uuid = require('uuid');
const { NoteVersion } = require('../../model');

module.exports.create = async (req, res) => {
    if(!req.body.note_id) {
        req.body.note_id = uuid.v4()
    }
    const note = await req.currentUser.createNote(req.body);
    const initialNoteVersion = await NoteVersion.create(req.body);
    res.json(note.expose());
};

module.exports.list = async (req, res) => {
    const notes = await req.currentUser.notes();
    res.json(_.invokeMap(notes, 'expose'));
};

module.exports.get = async (req, res) => {
    console.log(req.note)
    res.json(req.note.expose());
};

module.exports.delete = async (req, res) => {
    await req.note.delete();
    res.sendStatus(204);
};
