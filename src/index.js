
"use strict";

import 'angular-resource';
import List from './List';
import Update from './Update';
import '../lib/templates';
import Resource from './Resource';
import Field from './Field';
import Delete from './Delete';
import ResolveProperty from './ResolveProperty';

export default angular.module('monad.crud', ['ngResource', 'monad.cms', List, Update, 'monad.crud.templates'])
    .factory('monadResource', Resource)
    .directive('monadField', Field)
    .service('monadDelete', Delete)
    .service('monadResolveProperty', ResolveProperty)
    .name;

