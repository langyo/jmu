module.exports = (obj, template) => {
    for (let i of Object.keys(template)) {
        if (template[i] instanceof RegExp) {
            if (!template[i].test(obj[i])) return false;
        } else if (template[i] instanceof Object) {
            if (!compareObject(obj[i], template[i])) return false;
        } else {
            if (template[i] !== obj[i]) return false;
        }
    }
    return true;
};
