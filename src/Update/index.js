
"use strict";

let gettext = undefined;
let $q = undefined;
let monadReport = undefined;
let $route = undefined;
let monadLocation = undefined;
let monadProgress = undefined;

class controller {

    constructor(_gettext_, _$q_, _monadReport_, _$route_, _monadLocation_, monadDelete, _monadProgress_) {
        gettext = _gettext_;
        $q = _$q_;
        monadReport = _monadReport_;
        $route = _$route_;
        monadLocation = _monadLocation_;
        monadProgress = _monadProgress_
        this['delete'] = (item, newurl) => {
            monadDelete.ask(item, newurl);
        };
        this.creating = false;
        this.$onInit = () => {
            if (typeof this.data.item == 'function') {
                this.creating = true;
                this.data.item = new this.data.item;
            }
            let data = undefined;
            if (data = monadLocation.search().data) {
                data = angular.fromJson(data);
                for (let prop in data) {
                    if (this.data[prop] != undefined) {
                        for (let sub in data[prop]) {
                            if (this.data[prop][sub] == undefined) {
                                this.data[prop][sub] = data[prop][sub];
                            }
                        }
                        this.data[prop].$markClean();
                    }
                }
            }
        };
    }

    save() {

        function $save(item) {
            if (angular.isArray(item)) {
                item.$save(true);
                return;
            }
            if (item.$deleted && item.$deleted()) {
                monadProgress.schedule(item, '$delete');
            } else if (item.$dirty && item.$dirty()) {
                monadProgress.schedule(item, '$save');
            }
        };

        for (let i in this.data) {
            $save(this.data[i]);
        }
        monadReport.add(
            'info',
            '<p style="text-align: center" translate>' + gettext('Saving...') + '</p>' +
            '<uib-progressbar type="info" class="progress-striped" value="msg.data.progress"></uib-progressbar>',
            this,
            monadProgress.run().then(() => {
                $route.reset();
                if (this.creating) {
                    monadLocation.path(this.list);
                }
            })
        );
    }

    ['$dirty']() {
        for (let i in this.data) {
            if (this.data[i] == undefined) {
                // A resolving promise, so ignore (it'll show up on the next iteration)
                continue;
            }
            if (angular.isArray(this.data[i])) {
                for (let j = 0; j < this.data[i].length; j++) {
                    // Deleted, dirty or new
                    if (this.data[i][j].$deleted() || this.data[i][j].$dirty() || !('$save' in this.data[i][j])) {
                        return true;
                    }
                }
            } else if (this.data[i].$deleted() || this.data[i].$dirty()) {
                return true;
            }
        }
        return false;
    }

}

controller.$inject = ['gettext', '$q', 'monadReport', '$route', 'monadLocation', 'monadDelete', 'monadProgress'];

const Update = {
    templateUrl: 'Monad/Crud/Update/template.html',
    transclude: true,
    bindings: {data: '=', list: '@', type: '@', title: '@'},
    controller
};

export default angular.module('monad.crud.update', ['monad.cms'])
    .component('monadUpdate', Update)
    .component('moUpdate', Update)
    .name
    ;

