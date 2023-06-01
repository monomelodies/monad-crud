# monad-crud
Easy support for CRUD-style operations for the Monad CMS

## Installation
```sh
$ npm i monad-crud
```

## Usage
Define routes and components for all pages of your admin that need CRUD
support. This example uses `foo`:

```js
"use strict";

import list from '/path/to/list.html';
import schema from '/path/to/schema.html';

angular.module('my-admin', [])
    .config(['$routeProvider', $routeProvider => {
        $routeProvider.when('/foo/', {
            template: '<foo-list resource="$resolve.resource" count="$resolve.count"></foo-list>',
            resolve: {
                resource: ['monadResource', monadResource => monadResource('/api/foo/')],
                count: ['$http', $http => $http.get('/api/foo/count/').then(result => result.data.count)]
            }
        });
        $routeProvider.when('/foo/:id/', {
            template: '<foo-detail data="$resolve.data" clients="$resolve.clients"></foo-detail>',
            resolve: {
                data: ['monadResource', '$route', (monadResource, $route) => {
                    const res = monadResource('/api/foo/:id/', {id: '@id'});
                    if ($route.current.params.id == 'create') {
                        return {item: res};
                    } else {
                        return {item: res.get({id: $route.current.params.id})};
                    }
                }],
            }
        });
    }])
    .component('fooList', {
        template: list,
        bindings: {resource: '<', count: '<'},
        controller: 'monadListCtrl'
    })
    .component('fooDetail', {
        template: schema,
        bindings: {data: '<'}
    });
```

Anything in `$resolve.data` will be watched by `monad-crud` to determine whether
or not to show the "save" button (it is hidden when the form is pristine).

The HTML for the list will typically look something like this:

```html
<div class="container-fluid">
    <monad-list-header create="'/admin/foo/create/'">Invoice</monad-list-header>
    <monad-list-table rows="$ctrl.items" update="'/admin/foo/:id/'">
        <table><tr>
            <!--
            These should specify the fields you want shown in the list
            (typically, not everything is relevant for an overview).
            The `property` attribute specifies the property on the JSON
            objects in the list.
            -->
            <th property="id">ID</th>
            <th property="subject">Subject</th>
        </tr></table>
    </monad-list-table>
    <div class="text-center" ng-if="$ctrl.count > 10">
        <ul uib-pagination total-items="$ctrl.count" ng-model="$ctrl.page" boundary-links="true" max-size="10"></ul>
    </div>
</div>
```

The HTML for the "schema" should contain form fields for everything you want to
show or be editable. By convention, we use `$ctrl.data.item` as the main thing
being edited, but really the name is irrelevant as long as it's placed on
`$ctrl.data`.

Wrap the fields in the `monadUpdate` component:

```html
<monad-update list="/admin/foo/" data="$ctrl.data" type="foo">
    <!-- your form fields -->
</monad-update>
```

...and that's basically it!

