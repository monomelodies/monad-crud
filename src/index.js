
"use strict";

import List from './List';
import Update from './Update';
import './templates';
import Resource from './Resource';
import Field from './Field';

export default angular.module('monad.crud', ['monad.cms', List, Update, 'monad.crud.templates'])
    .factory('monadResource', Resource)
    .factory('moResource', Resource)
    .directive('monadField', Field)
    .directive('moField', Field)
    .name;

