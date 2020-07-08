'use strict';

angular.module('app').factory('NoteVersion', function($resource) {
    return $resource('/api/noteVersions', {}, {
        create: {
            method: 'POST',
        },
        get: {
            method: 'GET'
        }
    });
});
