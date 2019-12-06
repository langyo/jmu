import t from 'babel-types';

class Tag {

};

const getTemplateInList = template => {
  let ret = {};
  const dfs = (obj, pathStr) => {
    if (typeof obj !== 'object' || obj instanceof Tag) ret[pathStr] = obj;
    else for (let i of Object.keys(obj)) dfs(obj[i], `${pathStr}.${i}`);
  }
  for (let i of Object.keys(template)) dfs(template[i], i);
  return { list: ret, type: template.type };
};

const getTemplateOutTree = (template, tags) => {
  const dfs = path => {
    if (typeof path !== 'object') return path;
    else if (path instanceof Tag) return tags[path.key()];
    else for (let i of Object.keys(path)) path[i] = dfs(path[i]);
    return path;
  }
  return dfs(template);
};

const templateBuildOrder = {
  ThisExpression: [],
  ArrayExpression: ['elements'],
  ObjectExpression: ['properties'],
  Property: ['key', 'value', 'kind'],
  FunctionExpression: [],
  UnaryExpression: ['operator', 'prefix', 'argument'],
  UpdateExpression: ['operator', 'argument', 'prefix'],
  BinaryExpression: ['operator', 'left', 'right'],
  AssignmentExpression: ['operator', 'left', 'right'],
  LogicalExpression: ['operator', 'left', 'right'],
  MemberExpression: ['object', 'property', 'computed'],
  ConditionalExpression: ['test', 'alternate', 'consequent'],
  CallExpression: ['callee', 'arguments'],
  NewExpression: ['callee', 'arguments'],
  SequenceExpression: ['expressions'],
  ImportExpression: ['source'],
  FunctionDeclaration: ['id'],
  VariableDeclaration: ['declartions', 'kind'],
  VariableDeclarator: ['id', 'init'],
  // ... 控制语句部分尚未录入
};

const getTemplateOutBuilder = obj => t[obj.type.toLowerCase()].apply(
  null,
  templateBuildOrder[obj.type].map(key =>
    Array.isArray(obj[key]) ?
      obj[key].map(id => getTemplateOutBuilder(obj[key][id])) :
      typeof obj[key] === 'object' ?
        getTemplateOutBuilder(obj[key]) :
        obj[key]
  )
);

const templates // 从文件导入一个数组
let visitor = {};

for (let i of templates) {
  if (!(i.in && i.out)) throw new Error('Unknown template! ' + i.toString());
  i.in = getTemplateInList(i.in);
  i.out = (path, tags) => path.replaceWith(getTemplateOutBuilder(getTemplateOutTree(i.out, tags)));

  const func = path => {
    let tags = {};
    for(let n of Object.keys(i.in.list)) {
      let t = path.get(n);
      if(i.in.list[n] instanceof Tag) {
        let val = i.in.list[n].value(t);
        if(!val) return;
        tags[i.in.list[n].key()] = val;
      }
      else if(i.in.list[n] !== t) return;
      i.out(path, tags);
    }
  };

  i.in = getTemplateInList(i.in);
  i.out = (path, tags) => path.replaceWith(
    getTemplateOutBuilder(getTemplateOutTree(i.out, tags))
  );

  visitor[i.in.type] = visitor[i.in.type] ? [func] : [...visitor[i.in.type], func];
}

for(let i of Object.keys(visitor)) {
  // 合并各个函数
  let list = visitor[i];
  visitor[i] = path => list.forEach(f => f(path));
}

export default (babel) => ({
  visitor
})