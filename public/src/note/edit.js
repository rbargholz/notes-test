'use strict';

angular.module('app').component('noteEdit', {
    templateUrl: '/src/note/edit.html',
    bindings: {
        session: '<',
        note: '<',
    },
    controller: function(NoteVersion, $location) {
        this.createNoteVersion = function() {
            this.error = this._validate();

            if (!this.error) {
                NoteVersion.save({
                    subject: this.note.subject,
                    body: this.note.body,
                    version: this.note.version + 1,
                    note_id: this.note.note_id
                }).$promise.then(() => {
                    $location.path(`/notes/${ this.note.id }`);
                }).catch(reason => {
                    this.error = 'Error occurred while updating the note.';
                });
            }
        };

        this._validate = function() {
            if (!this.note.body) {
                return 'The body is empty.';
            }
        };
    },
});
