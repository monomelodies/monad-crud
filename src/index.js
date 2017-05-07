
"use strict";

import List from './List';
import Update from './Update';
import './templates';
import Resource from './Resource';

export default angular.module('monad.crud', ['monad.cms', List, Update, 'monad.crud.templates'])
    .factory('monadResource', Resource)
    .factory('moResource', Resource)
    .name;

