import enumData from './enum';

/**
 * Please note that this plugin just only translate the special JavaScript grammar.
 */

export default ({ type: t }) => ({
  visitor: {
    Identifier(path, state) {
      if (path.get('name') === '$') {
        if (path.parent.isMemberExpression()) {
          const typeNode = path.parent;
          if (typeNode.computed && typeNode.property.isIdentifier()) {
            // $.xx
            const type = typeNode.property.name;
            switch (type) {
              // Entity selector
              case 'a': case 'all':
              case 'r': case 'random':
              case 's': case 'self':
              case 'p': case 'nearest':
              case 'e': case 'entity': case 'entities':
                const currentlyType = type === 'a' ? 'all' :
                  type === 'r' ? 'random' :
                    type === 's' ? 'self' :
                      type === 'e' || type === 'entities' ? 'entity' : type;
                if (typeNode.parent.isCallExpression()) {
                  // $.xx(xx)
                  const argsNode = typeNode.parent;

                  // Verify and analyze the selector's argument.
                  for (let arg of argsNode.arguments) {
                    if (!arg.isBinaryExpression() ||
                      (arg.get('right').isBinaryExpression() ?
                        (!(
                          arg.get('left.right').isIdentifier() &&
                          (
                            ['<=', '<'].indexOf(arg.get('operator')) >= 0 &&
                            ['<=', '<'].indexOf(arg.get('left.operator')) >= 0 ||
                            ['>=', '>'].indexOf(arg.get('operator')) >= 0 &&
                            ['>=', '>'].indexOf(arg.get('left.operator')) >= 0
                          )
                        )) :
                        (!(
                          arg.get('left').isIdentifier() &&
                          enumData.selectorArgumentKeys.indexOf(arg.get('left.name')) >= 0 &&
                          ['<=', '<', '>=', '>', '==', '!=', '='].indexOf(arg.get('operator')) >= 0
                        ))
                      )
                    ) throw arg.buildCodeFrameError('Unknown argument type!');
                  }

                  let args = argsNode.arguments.reduce((prev, next) => ({
                    ...prev,
                    [next.get('left').isBinaryExpression() ? next.get('left.right.name') : next.get('left.name')]: {
                      equals: (!next.get('left').isBinaryExpression()) &&
                        ['=', '=='].indexOf(next.get('operator')) >= 0 ?
                        next.get('right') : null,
                      notEquals: (!next.get('left').isBinaryExpression()) &&
                        next.get('operator') === '!=' ?
                        next.get('right') : null,
                      moreThan: next.get('left').isBinaryExpression() &&
                        (next.get('operator') === '<' || next.get('left.operator') === '>') ?
                        (next.get('operator') === '<' ? next.get('right') : next.get('left.left')) :
                        (next.get('operator') === '>' ? next.get('right') : null),
                      lessThan: next.get('left').isBinaryExpression() &&
                        (next.get('operator') === '>' || next.get('left.operator') === '<') ?
                        (next.get('operator') === '>' ? next.get('right') : next.get('left.left')) :
                        (next.get('operator') === '<' ? next.get('left') : null),
                      moreThanOrEqual: next.get('left').isBinaryExpression() &&
                        (next.get('operator') === '<=' || next.get('left.operator') === '>=') ?
                        (next.get('operator') === '<=' ? next.get('right') : next.get('left.left')) :
                        (next.get('operator') === '>=' ? next.get('right') : null),
                      lessThanOrEqual: next.get('left').isBinaryExpression() &&
                        (next.get('operator') === '>=' || next.get('left.operator') === '<=') ?
                        (next.get('operator') === '>=' ? next.get('right') : next.get('left.left')) :
                        (next.get('operator') === '<=' ? next.get('left') : null)
                    }
                  }), {});

                  // Parse the parent node's type.
                  if(argsNode.parent.isMemberExpression() && !argsNode.parent.computed) {
                    // $.xx(xx)[xx]
                    // Scoreboard variant visitor.
                    argsNode.parent.replaceWith(
                      t.callExpression(t.identifier('__score'),[
                        t.callExpression(t.identifier(`__${currentlyType}`, [
                          t.objectExpression(
                            Object.keys(args).map(key => t.property(key, t.objectExpression(
                              Object.keys(args[key]).map(type => t.property(type, args[key][type] || t.literal('null')))
                            )))
                          )
                        ])), argsNode.parent.property
                      ])
                    );
                  } else {
                    // $.xx(xx).xx
                    // NBT path visitor.
                    argsNode.replaceWith(
                      t.callExpression(t.identifier(`__${currentlyType}`), [
                        t.objectExpression(
                          Object.keys(args).map(key => t.property(key, t.objectExpression(
                            Object.keys(args[key]).map(type => t.property(type, args[key][type] || t.literal('null')))
                          )))
                        )
                      ])
                    );
                  }
                  return;
                } else {
                  // $.xx
                  // Just only a selector.
                  typeNode.replaceWith(t.callExpression(
                    t.identifier(`__${currentlyType}`),[
                      t.objectExpression([])
                    ]
                  ));
                }
                
              // Block selector
              case 'from':

              // Unknown type handle
              default:
                throw typeNode.buildCodeFrameError('Unknown method!');
            }
          }
        }
      }
    }
  }
})