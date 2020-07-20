'use strict';

angular.module('app').factory('Note', function($resource) {
    return $resource('/api/notes/:id/:noteVersionId', {}, {
        update: {
            method: 'PUT',
        },
        delete: {
            method: 'DELETE'
        }
    });
});
