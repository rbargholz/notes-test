'use strict';

angular.module('app').factory('Note', function($resource) {
    return $resource('/api/notes/:id/:noteVersionId', {}, {
        // get: {
        //     method: 'GET'
        // },
        // getMostRecent: {
        //     method: 'GET'
        // },
        update: {
            method: 'PUT',
        },
        delete: {
            method: 'DELETE'
        }
    });
});
