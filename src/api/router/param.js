'use strict';

module.exports.noteId = async (req, noteId) => {
    req.note = await req.currentUser.note(noteId);
};

module.exports.noteVersionId = async (req, noteVersionId) => {
    req.noteVersions = await req.currentUser.noteVersions(noteVersionId);
};

// module.exports.mostRecentNoteVersion = async(req, noteVersionId) => {
//     req.mostRecentNoteVersion = await req.currentUser.mostRecentNoteVersion(noteVersionId)
// }
