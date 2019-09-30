const compareObject = require('../utils/compareObject');

/**
 * 使用的自定义标签：
 * MCSelector
 */

const templates = {
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
    },
    blockAt: {
        "type": "ExpressionStatement",
        "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "Identifier",
                "name": "$at"
            }
        }
    },
    entitySelf: {
        "type": "ExpressionStatement",
        "expression": {
            "type": "Identifier",
            "name": "$s"
        }
    },
    entityAll: {
        "type": "ExpressionStatement",
        "expression": {
            "type": "Identifier",
            "name": "$a"
        }
    },
    entityRandom: {
        "type": "ExpressionStatement",
        "expression": {
            "type": "Identifier",
            "name": "$r"
        }
    },
    entityNearest: {
        "type": "ExpressionStatement",
        "expression": {
            "type": "Identifier",
            "name": "$p"
        }
    },
    entity: {
        "type": "ExpressionStatement",
        "expression": {
            "type": "Identifier",
            "name": "$e"
        }
    }
};

module.exports = dfs => {
    const templateEvaluators = {
        blockFromTo: n => ({
            type: "MCSelector",
            kind: 'block_from_to',
            from: {
                x: dfs(n.expression.callee.arguments[0]),
                y: dfs(n.expression.callee.arguments[1]),
                z: dfs(n.expression.callee.arguments[2])
            },
            to: {
                x: dfs(n.arguments[0]),
                y: dfs(n.arguments[1]),
                z: dfs(n.arguments[2])
            }
        }),
        blockAt: n => ({
            type: "MCSelector",
            kind: 'block_at',
            at: {
                x: dfs(n.arguments[0]),
                y: dfs(n.arguments[1]),
                z: dfs(n.arguments[2])
            }
        }),
        entitySelf: n => ({
            type: "MCSelector",
            kind: 'entity_self'
        }),
        entityAll: n => ({
            type: "MCSelector",
            kind: 'entity_all'
        }),
        entityRandom: n => ({
            type: "MCSelector",
            kind: 'entity_random'
        }),
        entityNearest: n => ({
            type: "MCSelector",
            kind: 'entity_nearest'
        }),
        entity: n => ({
            type: "MCSelector",
            kind: 'entity'
        })
    };
    return n => {
        for(let i of Object.keys(templates)) {
            if(compareObject(n, templates[i])) return templateEvaluators[i](n);
        }
    }
};