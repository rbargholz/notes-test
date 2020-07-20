'use strict';
describe('noteEdit', function() {
    let $componentController;
    let ctrl;
    let $location;
    let Note;
    let User;
    let NoteVersion;
    let httpBackend;
    let $q;
    let $rootScope;
    let note;

    beforeEach(() => {
        module('app');

        inject((_$componentController_, _Note_, _$location_, _$q_, _$rootScope_, _NoteVersion_) => {
            $componentController = _$componentController_;
            Note = _Note_;
            NoteVersion = _NoteVersion_;
            $location = _$location_;
            $q = _$q_;
            $rootScope = _$rootScope_;
        });

        spyOn($location, 'path');
        spyOn(NoteVersion, 'save');

        note = new Note({
            id: 56,
            subject: 'some subject',
            body: 'some body',
            version: 1,
            note_id: '1234-5678-9012-3423'
        });

        ctrl = $componentController('noteEdit', {}, {
            note
        });
        ctrl.$onInit
    });

    describe('_validate', () => {
        it('should return undefined if data is valid', () => {
            ctrl.note.body = 'new body';

            expect(ctrl._validate()).toBeUndefined();
        });

        it('should error if body is not defined', () => {
            ctrl.note.body = null;

            expect(ctrl._validate()).toEqual('The body is empty.');
        });
    });

    describe('updateNote', () => {
        it('should create a new Note version then redirect to note detail page if success', () => {
            NoteVersion.save.and.returnValue({
                $promise: $q.when(),
            });

            ctrl.note.body = 'new body';
            ctrl.note.parent_id   = 56;
            ctrl.createNoteVersion();

            $rootScope.$digest();

            expect(NoteVersion.save).toHaveBeenCalledWith({ 
                subject: 'some subject', 
                body: 'new body', 
                note_id: '1234-5678-9012-3423', 
                parent_id: 56 });

            expect($location.path).toHaveBeenCalledWith('/notes/56/1234-5678-9012-3423');
            expect(ctrl.error).toBeUndefined();
        });

        it('should create a new Note version then set error if success', () => {
            NoteVersion.save.and.returnValue({
                $promise: $q.reject('Error'),
            });

            ctrl.note.body = 'new body';
            ctrl.note.parent_id   = 56;
            ctrl.createNoteVersion();

            $rootScope.$digest();

            expect(NoteVersion.save).toHaveBeenCalledWith({ 
                subject: 'some subject', 
                body: 'new body', 
                note_id: '1234-5678-9012-3423', 
                parent_id: 56 });


            expect($location.path).not.toHaveBeenCalledWith('/notes/56/1234-5678-9012-3423');
            expect(ctrl.error).toEqual('Error occurred while updating the note.');
        });

        it('should do nothing if any validation error', () => {
            ctrl.note.body = null;

            ctrl.createNoteVersion();

            $rootScope.$digest();

            expect(NoteVersion.save).not.toHaveBeenCalled();

            expect($location.path).not.toHaveBeenCalledWith('/notes/56/1234-5678-9012-3423');
            expect(ctrl.error).toEqual('The body is empty.');
        });
    });
});
