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
                id: $route.current.params.noteId,
                noteVersionId: $route.current.params.noteVersionId
            }).$promise,
            versions: $route => fetch('/api/noteVersions/' + $route.current.params.noteVersionId, {
                method: 'GET'
            }).then(r => r.json()),
        }
    };

    const noteEditPage = {
        template: '<note-edit session="$resolve.session" note="$resolve.note"></note-edit>',
        resolve: {
            session: Session => Session.current().$promise,
            note: $route => fetch('/api/noteVersions/' + $route.current.params.noteVersionId, {
                method: 'GET'
            }).then(r => r.json()).then(json => json.find(note => note.version === Math.max.apply(Math, json.map(o => { return o.version; }))))
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
