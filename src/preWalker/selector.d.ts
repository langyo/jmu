import { Expression } from "meriyah/dist/estree";

export interface Selector extends Expression {
    type: 'MCSelector';
    kind: 'block_from_to' | 'block_at' | 'entity_self' | 'entity_all' | 'entity_random' | 'entity_nearest' | 'entity';
    from?: {
        x: Expression,
        y: Expression,
        z: Expression
    };
    to?: {
        x: Expression,
        y: Expression,
        z: Expression
    };
}