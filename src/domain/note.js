"use strict";

const _ = require("lodash");

class Note {
  constructor(note) {
    this._note = note;
  }

  get id() {
    return this._note.id;
  }

  expose() {
    return _.pick(this._note, [
      "id",
      "subject",
      "body",
      "updatedAt",
      "version",
      "note_id",
    ]);
  }

  async update(note) {
    await this._note.update(note);
  }

  async delete(id) {
    console.log('deleting', id)
    await this._note.destroy({
      where: {
        note_id: id
      }
    });
  }
}

module.exports = Note;
