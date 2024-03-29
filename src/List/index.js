
"use strict";

const header = {
    transclude: true,
    template: `<h1 class="clearfix">
    <a ng-if="$ctrl.create"
        class="fa fa-plus-circle float-right"
        title="{{ 'Create' | translate }}"
        ng-href="{{ $ctrl.create }}"></a>
    <span ng-transclude></span>
</h1>`,
    controller: ['monadLocation', function (monadLocation) {
        this.url = url => monadLocation.make(url);
    }],
    bindings: {create: '<'}
};

const table = {
    transclude: true,
    controller: ['$transclude', '$element', '$templateCache', function ($transclude, $element, $templateCache) {
        this.columns = [];
        this.headers = [];
        const transcludedElement = $transclude();
        const hdrs = transcludedElement.find('th');
        if (hdrs.length) {
            angular.forEach(hdrs, hdr => {
                const h = angular.element(hdr);
                this.columns.push(h.attr('property'));
                this.headers.push(h.html());
            });
        } else {
            if (this.rows && this.rows.length) {
                for (let key in this.rows[0]) {
                    this.columns.push(key);
                }
            }
        }
        const customs = transcludedElement.find('td');
        this.columns.map(col => {
            let html = '';
            angular.forEach(customs, custom => {
                if (custom.attributes.property.nodeValue == col) {
                    html = custom.innerHTML;
                }
            });
            if (!html.length) {
                html = `{{ ${col} }}`;
            }
            html = `<a ng-href="{{ $ctrl.update.replace(':id', row.id) }}" arguments="row">${html}</a>`;
            $templateCache.put(`Monad/${col}.html`, html);
        });
    }],
    template: `<table class="table table-striped" ng-show="$ctrl.rows.length">
        <thead><tr>
            <th ng-repeat="header in $ctrl.headers" ng-bind-html="header"></th>
        </tr></thead>
        <tbody>
            <tr ng-repeat="row in $ctrl.rows" ng-if="!row.$deleted()">
                <td ng-repeat="column in $ctrl.columns" ng-include="'Monad/' + column + '.html'"></td>
            </tr>
        </tbody>
    </table>
    <div ng-show="!$ctrl.rows.length" uib-alert class="alert-warning"><span translate>Sorry, nothing found.</span></div>`,
    bindings: {rows: '=', update: '<'}
};

import Controller from './Controller';

export default angular.module('monad.crud.list', ['monad.cms'])
    .component('monadListHeader', header)
    .component('moListHeader', header)
    .component('monadListTable', table)
    .component('moListTable', table)
    .controller('monadListCtrl', Controller)
    .controller('moListController', Controller)
    .name
    ;

