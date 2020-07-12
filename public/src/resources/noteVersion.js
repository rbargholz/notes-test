'use strict';

angular.module('app').factory('NoteVersion', function($resource) {
    return $resource('/api/noteVersions/:noteVersionId', {}, {
        create: {
            method: 'POST',
            url: '/api/noteVersions'
        },
        // get: {
        //     method: 'GET'
        // }
    });
});
