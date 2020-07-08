'use strict';

const _ = require('lodash');
const express = require('express');
const routerProxy = require('../../router/proxy');
const route = require('../route');
const apiMiddleware = require('./middleware');
const apiParam = require('./param');

function setupRoutesWithoutAuthentication(router) {
    // Session
    router.post(
        '/sessions',
        apiMiddleware.jsonParser,
        route.session.create
    );
}

function setupRoutesWithRequiredAuthentication(router) {
    // Session
    router.get(
        '/sessions/current',
        route.session.get
    );
    router.delete(
        '/sessions/:sessionId',
        route.session.delete
    );

    // Note
    router.get(
        '/notes',
        route.note.list
    );
    router.post(
        '/notes',
        apiMiddleware.jsonParser,
        route.note.create
    );
    router.get(
        '/notes/:noteId',
        route.note.get
    );
    // router.put(
    //     '/notes/:noteId',
    //     apiMiddleware.jsonParser,
    //     route.noteVersion.create
    // );
    router.delete(
        '/notes/:noteId',
        route.note.delete
    );
    router.get(
        '/noteVersions?id=:noteVersionId',
        route.noteVersion.get
    );
    router.post(
        '/noteVersions',
        apiMiddleware.jsonParser,
        route.noteVersion.create
    )
}

function setup(router) {
    router.use(apiMiddleware.startSession);

    _.each(apiParam, (param, name) => {
        router.param(name, param);
    });

    setupRoutesWithoutAuthentication(router);
    router.use(apiMiddleware.checkAuthentication);
    setupRoutesWithRequiredAuthentication(router);
}

module.exports = () => {
    const router = express.Router();
    routerProxy.setup(router, setup, apiMiddleware.errorHandler);
    return router;
};
