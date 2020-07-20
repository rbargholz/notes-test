'use strict';

const _ = require('lodash');
const model = require('../model');
const domain = require('../domain');
const { Sequelize } = require('sequelize');

class User {
    constructor(user) {
        this._user = user;
    }

    get id() {
        return this._user.id;
    }

    expose() {
        return _.pick(this._user, [
            'id',
            'name'
        ]);
    }

    async authenticate(password) {
        if (!await this._user.verifyPassword(password)) {
            throw new domain.Error(domain.Error.Code.AUTHENTICATION_FAILED);
        }
    }

    async notes() {
        const notes = await this._user.getNotes({
            attributes: [
                'subject', 
                'updatedAt', 
                'id',
                'version',
                'note_id'
            ]
        });

        return _.map(notes, note => new domain.Note(note));
    }

    async note(id) {
        const notes = await this._user.getNotes({
            where: {
                id
            },
        });
        if (_.size(notes) !== 1) {
            throw new domain.Error(domain.Error.Code.NOTE_NOT_FOUND);
        }
        return new domain.Note(_.head(notes));
    }

    async noteVersions(noteVersionId) {
        const noteVersions = await model.NoteVersion.findAll({
            where: {
                note_id: noteVersionId
            }
        })

        return _.map(noteVersions, version => new domain.NoteVersion(version));
    }

    async mostRecentNoteVersion(noteVersionId) {
        const mostRecentVersion = await model.NoteVersion.max('version', {
             where: { 
                 note_id: noteVersionId 
                }
            })
        return mostRecentVersion
    }

    async createNote(note) {
        const createdNote = await this._user.createNote(note);
        return new domain.Note(createdNote);
    }

    async createNoteVersion(noteToVersion, shouldIncrement) {
        if(shouldIncrement) {
            var noteVersionToIncrememnt = await model.NoteVersion.max('version', {
                where: { 
                    note_id: noteToVersion.note_id 
                }
            })
            
            noteToVersion.version = noteVersionToIncrememnt + 1;
        }
        const createdNoteVersion = await model.NoteVersion.create(noteToVersion)
        return new domain.NoteVersion(createdNoteVersion);
    }

    static async getById(id) {
        const modelUser = await model.User.findOne({
            where: {
                id
            }
        });
        if (!modelUser) {
            throw new domain.Error(domain.Error.Code.USER_NOT_FOUND);
        }
        return new User(modelUser);
    }

    static async getByName(name) {
        const modelUser = await model.User.findOne({
            where: {
                name
            }
        });
        if (!modelUser) {
            throw new domain.Error(domain.Error.Code.USER_NOT_FOUND);
        }
        return new User(modelUser);
    }
}

module.exports = User;
