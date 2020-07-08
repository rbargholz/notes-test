'use strict';

const Sequelize = require('sequelize');

module.exports.define = sequelize => {
    return sequelize.define('NoteVersion', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        note_id: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        subject: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        body: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        version: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })
}