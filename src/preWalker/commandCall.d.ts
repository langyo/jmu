import { Expression } from 'meriyah/dist/estree';
import { Selector } from './selector';
import { ScoreboardVariant, NBTPath } from './variantParser';
import { NBTGlobal, Block, Entity, Item , BlockType, EntityType, SoundType, ItemType, EffectType, EnchantType, ItemPosition, PracticleType} from '../utils/nbtStructure';

export interface MCCommand {
    type: 'MCCommandCall';
}

export interface CommandRun extends MCCommand {
    kind: 'run';
    mode: 'declare' | 'single' | 'list';    // declare 为执行已有指令，single 和 list 分别为执行单个和顺序执行多个指令
    value: string | Expression | [Expression];
}

export interface CommandTell extends MCCommand {
    kind: 'tell';
    selector: Selector;
    content: RawTextUnit;
}

export interface CommandTitle extends MCCommand {
    kind: 'title';
    selector: Selector;
    content: RawTextUnit;
}

export interface RawTextUnit {
    text?: string;
    translate?: string;
    with?: string;

    score?: ScoreboardVariant;
    keybind?: string;

    nbt?: NBTPath;
    interpret?: boolean;

    bold?: boolean;
    italic?: boolean;
    underlined?: boolean;
    strikethrough?: boolean;
    obfuscated?: boolean;
    insertion?: string;
    color?: 'black' | 'dark_blue' | 'dark_green' | 'dark_aqua' | 'dark_red' | 'dark_purple' | 'gold' | 'gray' | 'dark_gray' | 'blue' | 'green' | 'aqua' | 'red' | 'light_purple' | 'yellow' | 'white' | 'reset';
    
    selector?: Selector;

    clickEventAction?: 'open_url' | 'open_file' | 'run_command' | 'change_page' | 'suggest_command';
    clickEventValue?: string | MCCommand;

    hoverEventAction?: 'show_text' | 'show_item' | 'show_entity';
    hoverEventValue?: string;

    subText?: [RawTextUnit];
}

export interface CommandSetBlock extends MCCommand {
    kind: 'setblock';
    selector: Selector;
    block: BlockType;
    nbt?: Block;
}

export interface CommandFill extends MCCommand {
    kind: 'fill';
    selector: Selector;
    block: BlockType;
    nbt?: Block;
    mode?: 'destory' | 'hollow' | 'keep' | 'outline' | 'replace';
}

export interface CommandSummon extends MCCommand {
    kind: 'summon';
    selector: Selector;
    entity: EntityType;
    nbt?: Entity;
}

export interface CommandPlaySound extends MCCommand {
    kind: 'playsound';
    selector: Selector;
    sound: SoundType;
    voice?: number;
    minVoice?: number;
    source?: 'master' | 'music' | 'record' | 'weather' | 'block' | 'hostile' | 'neutral' | 'player' | 'ambient' | 'voice';
    grade?: number;
}

export interface CommandTime extends MCCommand {
    kind: 'time';
    mode: 'get' | 'set';
    value?: number;
}

export interface CommandClone extends MCCommand {
    kind: 'clone';
    selector: Selector;
    from: {
        x: Expression,
        y: Expression,
        z: Expression
    },
    to: {
        x: Expression,
        y: Expression,
        z: Expression
    },
    mode?: 'masked' | 'all';
    filter?: 'replace' | 'masked' | 'filtered';
    sourceMode?: 'normal' | 'force' | 'move';
}

export interface CommandGive extends MCCommand {
    kind: 'give';
    selector: Selector;
    item: ItemType;
    nbt?: Item;
    count?: number;
}

export interface CommandClear extends MCCommand {
    kind: 'clear';
    selector: Selector;
    item: ItemType;
    count?: number;
}

export interface CommandKill extends MCCommand {
    kind: 'kill';
    selector: Selector;
}

export interface CommandObjective extends MCCommand {
    kind: 'objective';
    mode: 'setDisplay' | 'setName';
    value: string;
}

export interface CommandDatapack extends MCCommand {
    kind: 'datapack';
    mode: 'enable' | 'disable';
    value: string;
}

export interface CommandBossBar extends MCCommand {
    kind: 'bossbar';
    mode: 'value' | 'maxValue' | 'display' | 'visible';
    value?: string;
}

export interface CommandAdvancement extends MCCommand {
    kind: 'advancement';
    selector: Selector;
    mode: 'give' | 'remove';
    method: 'all' | 'after' | 'before';
}

export interface CommandEffect extends MCCommand {
    kind: 'effect';
    selector: Selector;
    effect: EffectType;
    length?: number;
}

export interface CommandEnchant extends MCCommand {
    kind: 'enchant';
    selector: Selector;
    enchant: EnchantType;
    at: ItemPosition;
}

export interface CommandXp extends MCCommand {
    kind: 'xp';
    selector: Selector;
    mode: 'level' | 'point';
    value?: number;
}

export interface CommandLoot extends MCCommand {
    kind: 'loot';
    selector: Selector;
    path: string;
    at?: ItemPosition;
}

export interface CommandSeed extends MCCommand {
    kind: 'seed';
}

export interface CommandSchedule extends MCCommand {
    kind: 'schedule';
    length: number;
    mode: 'day' | 'seconds' | 'minute';
    command: string | [Expression];
}

export interface CommandTag extends MCCommand {
    kind: 'tag';
    selector: Selector;
    id: string;
    mode: 'give' | 'remove';
}

export interface CommandTeam extends MCCommand {
    kind: 'team';
    selector?: Selector;
    id: string;
    mode: 'join' | 'leave' | 'clear' | 'set';
    status?: string;
    value?: string;
}

export interface CommandTp extends MCCommand {
    kind: 'tp';
    selector: Selector;
    target: Selector | {
        x: Expression;
        y: Expression;
        z: Expression;
    };
}

export interface CommandSpread extends MCCommand {
    kind: 'spread';
    x: number;
    y: number;
    range: number;
    spacing: number;
    teamMeet?: boolean;
}

export interface CommandLoadChunk extends MCCommand {
    kind: 'forceload';
    x?: number;
    y?: number;
    mode: 'load' | 'remove' | 'removeAll';
}

export interface CommandParticle extends MCCommand {
    kind: 'particle';
    selector: Selector;
    practicle: PracticleType;
    extraColor?: {
        x: number;
        y: number;
        z: number;
    };
    extraString?: string;
    rangeCube: {
        x: number;
        y: number;
        z: number;
    };
    speed?: number;
    quantity?: number;
    mode?: 'force' | 'normal';
    to?: Selector;
}
