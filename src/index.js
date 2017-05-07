
"use strict";

import List from './List';
import Update from './Update';
import './templates';

export default angular.module('monad.crud', ['monad.cms', List, Update, 'monad.crud.templates'])
    .name;

