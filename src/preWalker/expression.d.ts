import { Expression } from 'meriyah/dist/estree';
import { ScoreboardVariant } from './variantParser';

export interface MCExpression extends Expression {}

export interface UnaryExpression extends MCExpression {
    type: 'MCUnaryExpression';
    kind: '+' | '-' | '!' | '~';
    argument: MCExpression;
}

export interface BinaryExpression extends MCExpression {
    type: 'MCBinaryExpression';
    kind: '==' | '!=' | '===' | '!==' | '<' | '<=' | '>' | '>=' | '+' | '-' | '*' | '/' | '%';
    left: MCExpression;
    right: MCExpression;
}

export interface AssignmentExpression extends MCExpression {
    type: 'MCAssignmentExpression';
    kind: '=' | '+=' | '-=' | '*=' | '/=' | '%=';
    target: MCExpression | ScoreboardVariant;
    source: MCExpression | ScoreboardVariant;
}

export interface UpdateExpression extends MCExpression {
    type: 'MCUpdateExpression';
    kind: '++' | '--';
    argument: MCExpression;
    prefix: boolean;
}