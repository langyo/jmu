import { Statement, Expression } from 'meriyah/dist/estree';
import { VariableDeclaration, ScoreboardVariant } from './variantParser';
import { MCExpression } from './expression';

export interface IfStatement {
    type: 'MCIfStatement';
    test: MCExpression;
    consequent: Statement;
    alternate?: Statement;
}

export interface UnlessStatement {
    type: 'MCUnlessStatement';
    test: MCExpression;
    consequent: Statement;
    alternate?: Statement;
}

export interface WhileStatement {
    type: 'MCWhileStatement';
    test: MCExpression;
    body: Statement;
}

export interface DoWhileStatement {
    type: 'MCDoWhileStatement';
    test: MCExpression;
    body: Statement;
}

export interface ForStatement {
    type: 'MCForStatement';
    init?: VariableDeclaration | MCExpression;
    test?: MCExpression;
    update?: MCExpression;
    body: Statement;
}

export interface SwitchStatement {
    type: 'MCSwitchStatement';
    discriminant: MCExpression | ScoreboardVariant;
    cases: [SwitchCase];
}

export interface SwitchCase {
    type: 'MCSwitchCase';
    test: MCExpression | Expression | ScoreboardVariant;
    consequent: [Statement];
}