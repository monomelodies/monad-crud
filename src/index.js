
"use strict";

import List from './List';
import Update from './Update';
import '../lib/templates';
import Resource from './Resource';
import Field from './Field';
import Delete from './Delete';

export default angular.module('monad.crud', ['ngResource', 'monad.cms', List, Update, 'monad.crud.templates'])
    .factory('monadResource', Resource)
    .factory('moResource', Resource)
    .directive('monadField', Field)
    .directive('moField', Field)
    .service('monadDelete', Delete)
    .service('moDelete', Delete)
    .name;

