"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sortOnRelevance = (values, query) => values.sort((a, b) => {
    a = a.value.toLowerCase();
    b = b.value.toLowerCase();
    const indexA = a.indexOf(query);
    const indexB = b.indexOf(query);
    if (indexA > indexB)
        return 1;
    if (indexA < indexB)
        return -1;
    if (indexA === indexB) {
        if (a > b)
            return 1;
        if (a < b)
            return -1;
    }
    return 0;
});
const sortOnAlphabet = (a, b) => {
    a = a.value.toLowerCase();
    b = b.value.toLowerCase();
    if (a > b)
        return 1;
    else if (a < b)
        return -1;
    return 0;
};
exports.sortValues = (query, sortOn, values) => {
    let sortedValues = values;
    if (sortOn === 'alphabet') {
        sortedValues = sortedValues.sort(sortOnAlphabet);
    }
    else if (sortOn === 'relevance') {
        sortedValues = sortOnRelevance(sortedValues, query);
    }
    return sortedValues;
};
