"use strict";

const _ = require("lodash");

class NoteVersion {
  constructor(noteVersion) {
    this._noteVersion = noteVersion;
  }

  get id() {
    return this._noteVersion.id;
  }

  expose() {
    return _.pick(this._noteVersion, [
      "id",
      "subject",
      "body",
      "updatedAt",
      "version",
      "note_id",
    ]);
  }
}

module.exports = NoteVersion;