'use strict';

const Sequelize = require('sequelize');
const config = require('../config');
const sequelize = new Sequelize(config.postgresql.url, {
    logging: false
});

const User = require('./user');
const Note = require('./note');
const NoteVersion = require('./noteVersion.js')
const userNoteAssociation = require('./userNote');

const models = {
    sequelize,
    User: User.define(sequelize),
    Note: Note.define(sequelize),
    NoteVersion: NoteVersion.define(sequelize)
};

userNoteAssociation.define(models);

module.exports = models;
