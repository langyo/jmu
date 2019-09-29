import { Expression } from 'meriyah/dist/estree';
import { Selector } from './selector';
import { EntityType, NBTGlobal } from '../utils/nbtStructure';

export interface SelectorArguments extends Expression {
    type: 'MCSelectorArguments';
    arguments: [SelectorArgument];
}

export interface SelectorArgument {
    type: 'MCSelectorArgument';
    kind: string;
}

export interface Round {
    type: 'MCRound';
    from?: number;
    to?: number;
}

export interface SelectDim extends SelectorArgument {
    kind: 'dim';
    value: 'overworld' | 'dim-1' | 'dim1';
}

export interface SelectPosition extends SelectorArgument {
    kind: 'position';
    x: number;
    y: number;
    z: number;
}

export interface SelectDistance extends SelectorArgument {
    kind: 'distance';
    value: Round;
}

export interface SelectCubeDistance extends SelectorArgument {
    kind: 'cube';
    x: number;
    y: number;
    z: number;
}

export interface SelectRotate extends SelectorArgument {
    kind: 'rotate';
    to: SelectPosition | Selector;
}

export interface SelectAlign extends SelectorArgument {
    kind: 'align';
    x: boolean;
    y: boolean;
    z: boolean;
}

export interface SelectFrom extends SelectorArgument {
    kind: 'from';
    from: 'feet' | 'eyes';
}

export interface SelectRotation extends SelectorArgument {
    kind: 'rotation';
    direction: 'x' | 'y';
    value: Round;
}

export interface SelectType extends SelectorArgument {
    kind: 'type';
    opposite: boolean;
    value: EntityType;
}

export interface SelectTag extends SelectorArgument {
    kind: 'tag';
    opposite: boolean;
    value: string;
}

export interface SelectName extends SelectorArgument {
    kind: 'name';
    opposite: boolean;
    value: string;
}

export interface SelectTeam extends SelectorArgument {
    kind: 'team';
    opposite: boolean;
    value: string;
}

export interface SelectGameMode extends SelectorArgument {
    kind: 'name';
    opposite: boolean;
    value: 'survival' | 'creative' | 'adventure' | 'spectator'
}

export interface SelectScore extends SelectorArgument {
    kind: 'score';
    key: string;
    value: number | Round;
}

export interface SelectLevel extends SelectorArgument {
    kind: 'level';
    value: number | Round;
}

export interface SelectNBT extends SelectorArgument {
    kind: 'nbt';
    value: NBTGlobal;
}

export interface SelectAdvancement extends SelectorArgument {
    kind: 'advancement';
    criterias: [AdvancementCriteria]
}

export interface AdvancementCriteria {
    criteria: string;
    is: boolean;
}

export interface SelectSort extends SelectorArgument {
    kind: 'sort';
    mode: 'nearest' | 'random' | 'furthest' | 'arbitrary';
}

export interface SelectLimit extends SelectorArgument {
    kind: 'limit';
    size: number;
}