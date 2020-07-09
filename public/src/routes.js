'use strict';

angular.module('app').config(function($routeProvider) {
    const loginPage = {
        template: '<login session="$resolve.session"></login>',
        resolve: {
            session: Session => Session.current().$promise.catch(angular.noop),
        }
    };

    const errorPage = {
        template: '<error session="$resolve.session"></error>',
        resolve: {
            session: Session => Session.current().$promise.catch(angular.noop),
        }
    };

    const noteListPage = {
        template: '<note-list session="$resolve.session" notes="$resolve.notes"></note-list>',
        resolve: {
            session: Session => Session.current().$promise,
            notes: Note => Note.query().$promise,
        }
    };

    const noteCreatePage = {
        template: '<note-create session="$resolve.session" note="$resolve.note"></note-create>',
        resolve: {
            session: Session => Session.current().$promise
        }
    };

    const noteDetailPage = {
        template: '<note-detail session="$resolve.session" note="$resolve.note" versions="$resolve.versions"></note-detail>',
        resolve: {
            session: Session => Session.current().$promise,
            note: (Note, $route) => Note.get({
                id: $route.current.params.noteId
            }).$promise,
            versions: $route => fetch('/api/noteVersions/' + $route.current.params.noteVersionId, {
                method: 'GET'
            }).then(r => r.json()),
        }
    };

    const noteEditPage = {
        template: '<note-edit session="$resolve.session" note="$resolve.note" currentNoteVersion="$resolve.currentNoteVersion"></note-edit>',
        resolve: {
            session: Session => Session.current().$promise,
            note: (Note, $route) => Note.get({
                id: $route.current.params.noteId
            }).$promise,
        }
    };

    $routeProvider.when('/', noteListPage)
        .when('/login', loginPage)
        .when('/error', errorPage)
        .when('/notes/create', noteCreatePage)
        .when('/notes/:noteId/:noteVersionId', noteDetailPage)
        .when('/notes/:noteId/:noteVersionId/edit', noteEditPage)
        .otherwise('/error');
});
