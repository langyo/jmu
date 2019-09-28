const { generate } = require('shortid');

let jsCallStack = [{ args: [], vars: [] }];
let mcFuncs = [{ cmds: [], vars: [] }];

const latest = arr => arr[arr.length - 1];

class ASTError extends Error {
    constructor(info, pos) {
        if(pos) super(info + ' At [' + pos.loc.start.line + ':' + pos.loc.start.column + '] [' + pos.loc.end.line + ':' + pos.loc.end.column + ']' );
        else super(info);
    }
};

const dfs = (n, parent, targetFunc) => {
    switch (n.type) {
        // Selectors
        case 'Program':
            for (let i of n.body) dfs(i, n, 0);
            return;
        case 'VariableDeclaration':
            for (let i of n.declarations) dfs(i, n, targetFunc);
            return;
        case 'VariableDeclarator':

            return;
        default:
            throw new ASTError("未知节点", n);
    }
}