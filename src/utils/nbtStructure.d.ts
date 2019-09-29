export type NBTType = 'byte' | 'short' | 'int' | 'long' | 'float' | 'double' | 'byte_array' | 'string' | 'list' | 'compound' | 'int_array' | 'long_array';

export type EntityType = 'bat' | 'blaze' | 'cat' | 'cave_spider' | 'chicken' | 'cod' | 'cow' | 'creeper' | 'dolphin' | 'donkey' | 'drowned' | 'elder_guardian' | 'ender_dragon' | 'enderman' | 'endermite' | 'evoker' | 'fox' | 'ghast' | 'giant' | 'guardian' | 'horse' | 'husk' | 'illusioner' | 'iron_golem' | 'llama' | 'magma_cube' | 'mooshroom' | 'mule' | 'ocelot' | 'panda' | 'parrot' | 'phantom' | 'pig' | 'pillager' | 'polar_bear' | 'pufferfish' | 'rabbit' | 'ravager' | 'salmon' | 'sheep' | 'shulker' | 'silverfish' | 'skeleton' | 'skeleton_horse' | 'slime' | 'snow_golem' | 'spider' | 'squid' | 'stray' | 'trader_llama' | 'tropical_fish' | 'turtle' | 'vex' | 'villager' | 'vindicator' | 'wandering_trader' | 'witch' | 'wither' | 'wither_skeleton' | 'wolf' | 'zombie' | 'zombie_horse' | 'zombie_pigman' | 'zombie_villager';
export type BlockType = '';
export type ItemType = '';
export type SoundType = '';
export type EffectType = '';
export type EnchantType = '';
export type PracticleType = '';

export enum ItemPosition {
    hotbar0 = 0,
    hotbar1 = 1,
    hotbar2 = 2,
    hotbar3 = 3,
    hotbar4 = 4,
    hotbar5 = 5,
    hotbar6 = 6,
    hotbar7 = 7,
    hotbar8 = 8,
    helmet = 103,
    chestplace = 102,
    leggings = 101,
    boots = 100,
    right_head = -106,
    slot0_0 = 9,
    slot0_1 = 10,
    slot0_2 = 11,
    slot0_3 = 12,
    slot0_4 = 13,
    slot0_5 = 14,
    slot0_6 = 15,
    slot0_7 = 16,
    slot0_8 = 17,
    slot1_0 = 18,
    slot1_1 = 19,
    slot1_2 = 20,
    slot1_3 = 21,
    slot1_4 = 22,
    slot1_5 = 23,
    slot1_6 = 24,
    slot1_7 = 25,
    slot1_8 = 26,
    slot2_0 = 27,
    slot2_1 = 28,
    slot2_2 = 29,
    slot2_3 = 30,
    slot2_4 = 31,
    slot2_5 = 32,
    slot2_6 = 33,
    slot2_7 = 34,
    slot2_8 = 35
};

export interface Entity {

}

export interface Block {

}

export interface Item {

}

export interface NBTGlobal extends Entity, Block, Item {}