
"use strict";

import 'angular-resource';
import List from './List';
import Update from './Update';
import '../lib/templates';
import Resource from './Resource';
import Delete from './Delete';

export default angular.module('monad.crud', ['ngResource', 'monad.cms', List, Update, 'monad.crud.templates'])
    .factory('monadResource', Resource)
    .service('monadDelete', Delete)
    .name;

