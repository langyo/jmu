import { Expression, Identifier } from 'meriyah/dist/estree';
import { Selector } from './selector';

export interface NBTPath {
    type: 'MCNBTPath';
    kind: NBTType;
    value: NBTPath | [NBTPath] | number | [number] | string;
}

export interface ScoreboardVariant {
    type: 'MCScoreboardVariant';
    transform?: ScoreboardVariantTransform;
    selector: Selector;
    identity: string;
}

export interface ScoreboardVariantTransform {
    transformTo?: 'byte' | 'short' | 'int' | 'long' | 'float' | 'double';
    scale?: number;
}

export interface VariableDeclaration {
    type: 'MCVariableDeclartion';
    declarations: [ VariableDeclarator ];
}

export interface VariableDeclarator {
    type: 'MCVariableDeclarator';
    id: Identifier;
    init: ScoreboardVariant;
}