'use strict';

const _ = require('lodash');
require('should');
const uuid = require('uuid');
const domain = require('../../src/domain');
const model = require('../../src/model');

describe('Tests for domain Note', () => {
    let noteId;
    let modelUser;
    let domainNote;

    beforeEach(async () => {
        await model.sequelize.sync({
            force: true
        });

        modelUser = await model.User.createUser('user1', 'password1');

        const note = await modelUser.createNote({
            subject: 'some subject',
            body: 'some body',
            note_id: '1234-1234-1234-1234',
            version: 1
        });
        noteId = note.id;
        domainNote = new domain.Note(note);
    });

    describe('instance method', () => {
        describe('getters', () => {
            it('should get the id', () => {
                domainNote.id.should.equal(noteId);
            });
        });

        describe('expose', () => {
            it('should expose the id, subject, body, version, note_id and updatedAt of the note', () => {
                domainNote.expose().should.match({
                    id: noteId,
                    subject: 'some subject',
                    body: 'some body',
                    updatedAt: _.isDate,
                    version: _.isNumber,
                    note_id: '1234-1234-1234-1234'
                });
            });
        });

        describe('update', () => {
            it('should update the body of the note', async () => {
                await domainNote.update({
                    body: 'new body'
                });

                domainNote.expose().should.match({
                    id: noteId,
                    subject: 'some subject',
                    body: 'new body',
                    updatedAt: _.isDate,
                });
            });
        });

        describe('delete', () => {
            it('should delete the note', async () => {
                await domainNote.delete();

                (await modelUser.getNotes()).should.be.empty();
            });
        });
    });
});
