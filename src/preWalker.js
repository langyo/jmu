const compareObject = (obj, template) => {
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

/**
 * 自定义标签列表：
 * 
 * MCSelector
 * MCSelectorArguments
 * MCIfStatement
 * MCUnlessStatement
 * MCWhileStatement
 * MCDoWhileStatement
 * MCForStatement
 * MCBinaryExpression               // 二元运算
 * MCNBTPath
 * MCAssignmentExpression           // 赋值
 * MCVariableDeclaration            // 定义、初始化
 * MCPosition
 * MCRound
 * MCInitialization                 // 在文件最外围的 "init" 或 "ticks"，分别用于表示初始化时执行的函数与随游戏刻循环运行的函数
 * MCCommandCall
 * MCScoreboardVariant
 * MCScoreboardVariantTransfrom     // 用在 data 指令的 byte, int 这些类型，以及放缩常量 scale
 */

const template = {
    selectors: {
        blockFromTo: {
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "MemberExpression",
                    "object": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "$from"
                        }
                    },
                    "computed": false,
                    "property": {
                        "type": "Identifier",
                        "name": "to"
                    }
                }
            }
        }
    }
};

const templateEvaluator = {
    selectors: {
        blockFromTo: n => ({
            type: "MCSelector",
            fromMC: true,

        })
    }
}

const dfs = n => {
    for(let i of Object.keys(template))
        for(let j of Object.keys(template[i]))
            if(compareObject(n, template[i][j])) return templateEvaluator[i][j](n);
    switch(n.type) {
        case '':
    }
}