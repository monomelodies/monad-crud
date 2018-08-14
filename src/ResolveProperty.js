
"use strict";

export default (obj, property) => {
    let parts = property.split('.');
    let found = angular.copy(obj);
    while (parts.length) {
        try {
            found = found[parts.shift()];
        } catch (e) {
            return '$title';
        }
    }
    return found;
};

