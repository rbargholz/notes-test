'use strict';

require('should');
const sinon = require('sinon');
const route = require('../../../src/api/route');
const uuid = require('uuid');
describe('Tests for api route note', () => {
    let req;
    let res;
    let note;
    let noteVersion;
    let user;

    beforeEach(() => {
        req = {};
        res = {
            json: sinon.spy(),
            sendStatus: sinon.spy(),
        };

        note = {
            expose: sinon.stub().returns('exposedNote'),
            update: sinon.stub().resolves(),
            delete: sinon.stub().resolves(),
        };

        noteVersion = {
            expose: sinon.stub().returns('exposedNote'),
        }

        user = {
            createNote: sinon.stub().resolves(note),
            createNoteVersion: sinon.stub().resolves(noteVersion),
            notes: sinon.stub().resolves([
                note,
                note,
                note,
            ]),
        };
    });


    describe('create', () => {
        it('should create a note, immediately version it as v1, then json expose it', async () => {
            req.currentUser = user;
            req.body = {
                subject: 'some subject',
                body: 'some body',
                note_id: uuid.v4(),
                version: 1
            };

            await route.note.create(req, res);

            req.currentUser.createNote.calledWithExactly(req.body).should.be.true();
            req.currentUser.createNoteVersion.calledWithExactly(req.body, false).should.be.true()
            res.json.calledWithExactly('exposedNote').should.be.true();
        });
    });

    describe('list', () => {
        it('should the json the list of exposed notes', async () => {
            req.currentUser = user;

            await route.note.list(req, res);

            req.currentUser.notes.calledWithExactly().should.be.true();
            res.json.calledWithExactly([
                'exposedNote',
                'exposedNote',
                'exposedNote',
            ]).should.be.true();
        });
    });

    describe('get', () => {
        it('should json the exposed note', () => {
            req.note = note;

            route.note.get(req, res);

            res.json.calledWithExactly('exposedNote').should.be.true();
        });
    });

    describe('update', () => {
        it('should create a new note version, then json the exposed note', async () => {
            req.currentUser = user;
            req.note = note;

            req.body = {
                body: 'some body',
            };

            await route.noteVersion.create(req, res);

            req.currentUser.createNoteVersion.calledWithExactly(req.body, true).should.be.true();
            res.json.calledWithExactly('exposedNote').should.be.true();
        });
    });

    describe('delete', () => {
        it('should delete a note, all versions then send 204 status', async () => {
            req.note = note;
            req.params =  {
                noteVersionId: req.note.note_id
            }
            await route.note.delete(req, res);

            req.note.delete.calledWithExactly().should.be.true();
            res.sendStatus.calledWithExactly(204).should.be.true();
        });
    });
});
