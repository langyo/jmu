const compareObject = require('./utils/compareObject');

/**
 * 自定义标签遍历顺序：
 * 
 * MCSelector
 * ------
 * MCSelectorArguments
 * ------
 * MCNBTPath
 * MCScoreboardVariant
 * MCScoreboardVariantTransform     // 用在 data 指令的 byte, int 这些类型，以及放缩常量 scale
 * MCVariableDeclaration            // 定义、初始化
 * ------
 * MCUnaryExpression                // 一元运算
 * MCBinaryExpression               // 二元运算
 * MCAssignmentExpression           // 赋值
 * MCUUpdateExpression              // 自增、自减
 * MCLogicalExpression              // 逻辑
 * ------
 * MCCommandCall
 * ------
 * MCIfStatement
 * MCUnlessStatement
 * MCWhileStatement
 * MCDoWhileStatement
 * MCForStatement
 * MCSwitchStatement
 * ------
 * MCInitialization                 // 在文件最外围的 "init" 或 "ticks"，分别用于表示初始化时执行的函数与随游戏刻循环运行的函数
 */

export const dfs = n => {
    if(!n) return null;

    for(const i of templates) {
        let ret = i(n);
        if(ret) return ret;
    }

    switch (n.type) {
        // ES5
        case 'Program':
        case 'BlockStatement':
        case 'FunctionBody':
        case 'LabeledStatement':
            n.body.map(n => dfs(n));
            break;
        case 'Function':
            n.params.map(n => dfs(n));
            n.body = dfs(n.body);
            break;
        case 'ExpressionStatement':
            n.expression = dfs(n.expression);
            break;
        case 'WithStatement':
            n.object = dfs(n.object);
            n.body = dfs(n.body);
            break;
        case 'ReturnStatement':
            n.arguments = dfs(n.arguments);
            break;
        case 'VariableDeclaration':
            n.declarations = dfs(n.declarations);
            break;
        case 'VariableDeclarator':
            n.init = dfs(n.init);
            n.id = dfs(n.id);
            break;
        case 'ArrayExpression':
            n.elements.map(n => dfs(n));
            break;
        case 'ObjectExpression':
            n.properties.map(n => dfs(n));
            break;
        case 'Property':
            n.value = dfs(n.value);
            break;
        case 'UnaryExpression':
        case 'UpdateExpression':
            n.argument = dfs(n.argument);
            break;
        case 'BinaryExpression':
        case 'AssignmentExpression':
        case 'LogicalExpression':
            n.left = dfs(n.left);
            n.right = dfs(n.right);
            break;
        case 'MemberExpression':
            n.object = dfs(n.object);
            n.property = dfs(n.property);
            break;
        case 'ConditionalExpression':
            n.test = dfs(n.test);
            n.alternate = dfs(n.alternate);
            n.consequent = dfs(n.consequent);
            break;
        case 'CallExpression':
        case 'NewExpression':
            n.callee = dfs(n.callee);
            n.arguments.map(n => dfs(n));
            break;
        case 'SequenceExpression':
            n.expressions.map(n => dfs(n));
            break;

        // ES2015
        case 'ArrowFunctionExpression':
            n.body = dfs(n.body);
            break;
        case 'YieldExpression':
            n.argument = dfs(n.argument);
            break;
        case 'TemplateLiteral':
            n.quasis.map(n => dfs(n));
            n.expressions.map(n => dfs(n));
            break;
        case 'TaggedTemplateExpression':
            n.tag = dfs(n.tag);
            n.quasi = dfs(n.quasi);
            break;
        case 'AssignmentProperty':
            n.value = dfs(n.value);
            break;
        case 'ObjectPattern':
            n.properties.map(n => dfs(n));
            break;
        case 'ArrayPattern':
            n.elements.map(n => dfs(n));
            break;
        case 'RestElement':
            n.argument = dfs(n.argument);
            break;
        case 'AssignmentPattern':
            n.left = dfs(n.left);
            n.right = dfs(n.right);
            break;
        case 'ClassBody':
            n.body.map(n => dfs(n));
            break;
        case 'MethodDefinition':
            n.key = dfs(n.key);
            n.value = dfs(n.value);
            break;
    }

    return n;
}

let templates = [
    require('./preWalker/selector')(dfs),
    require('./preWalker/selectorArguments')(dfs),
    require('./preWalker/variantParser')(dfs),
    require('./preWalker/expression')(dfs),
    require('./preWalker/commandCall')(dfs),
    require('./preWalker/logicStatement')(dfs),
    require('./preWalker/initialization')(dfs)
];