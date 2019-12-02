class Tag {
  constructor(name) {
    this.name = name;
    this.filterList = [];
    this.modifyList = [];
  }

  filter(func) {
    if(typeof func !== 'function') throw new Error('You must provide a function!');
    this.filterList.push(func);
    return this;
  }

  modify(func) {
    if(typeof func !== 'function') throw new Error('You must provide a function!');
    this.modifyList.push(func);
    return this;
  }

  _verify(value, scope) {
    for(let func of this.filterList) {
      if(!func(value, scope)) return false;
    }
    return true;
  }

  _getValue(value) {
    let ret = value;
    for(let func of this.modifyList) {
      ret = func(ret);
    }
    return ret;
  }
};

export const tag = (name) => new Tag(name);

const matcher = ({ node, scope }, template, tags) => {
  for(let key of Object.keys(template)) {
    if(!node[key]) return false;
    if(template[key] instanceof Tag && typeof node[key] === 'string') {
      if(template[key]._verify(node[key], scope)) tags[template[key].name] = node[key];
      else return false;
    } else if (Array.isArray(template[key])) {
      if(template[key].indexOf(node[key])) return false;
    } else if (typeof template[key] === 'object') {
      let ret = matcher(node[key], template[key], tags);
      if(ret) tags = { ...tags, ...ret };
      else return false;
    } else if (template[key] !== node[key]) return false;
  }
  return tags;
};

const transformer = (template, tags) => {
  let ret = {};
  let tagKeys = Object.keys(tags);
  for(let key of Object.keys(template)) {
    if(template[key] instanceof Tag) {
      if(tagKeys.indexOf(template[key].name) < 0) throw new Error('The tag name cannot be matched by peer!');
      ret[key] = template[key]._getValue(tags[key]);
    } else if(typeof template[key] === 'object') {
      ret[key] = transformer(template[key], tags);
    } else ret[key] = template[key];
  }
  return ret;
};

