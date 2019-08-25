# JMU

The upgrade from JavaScript to MCFunction.

从 JavaScript 到 MCFunction 的升级。

## API 大纲

1. 主语
    - ```which(<selector>)```       => execute positioned | data entity | scoreboard players
    - ```as(<selector>)```          => execute as | data eneity | scoreboard players
    - ```at(<x>, <y>, <z>)```       => data block | setblock
    - ```from(<x>, <y>, <z>).to(<x>, <y>, <z>)```
                                    => clone | fill

2. 形容词
    - ```.dim(<dimension>)```       => execute in
    - ```.at(<x>, <y>, <z>)```      => execute at
    - ```.rotateAt(<rotation>)```   => execute rotated
    - ```.rotateTo(<selector>)```   => execute rotated as
    - ```.alignX() | .alignY() |. alignZ() | .alignXY() | .alignXZ() | .alignYZ() | .alignXYZ() | .alignAll()```
                                    => execute align x|y|z|xy|xz|yz|xyz
    - ```.fromFeet()```             => execute anchored feet
    - ```.fromEyes()```             => execute anchored eyes

3. 从句
    a. 条件从句
        - ```.whether```            => execute if
        - ```.unless```             => execute unless
            - ```.at(<x>, <y>, <z>).is(<blockId>)```
                                    => execute if|unless block
            - ```.from(<x>, <y>, <z>).to(<x>, <y>, <z>).compare(<x>, <y>, <z>){.all() | .masked()}```
                                    => execute if|unless blocks
            - ```.which(<selector>).exist()```
                                    => execute if|unless entity
            - ```.which(<selector>).score(<objective>)```
                - ```.equals(<selector>).score(<objective>)```
                - ```.moreThan(<selector>).score(<objective>)```
                - ```.lessThan(<selector>).score(<objective>)```
                - ```.moreThanOrEquals|notLessThan(<selector>).score(<objective>)```
                - ```.lessThanOrEquals|notMoreThan(<selector>).score(<objective>)```
                - ```.round```
                    - ```.from(<value>).to(<value>)```
                    - ```.at(<value>)```
                    - ```.moreThan(<value>)```
                    - ```.lessThan(<value>)```
                    - ```.moreThanOrEquals|notLessThan(<value>)```
                    - ```.lessThanOrEquals|notMoreThan(<value>)```
                                    => execute if|unless score
            - ```.at(<x>, <y>, <z>).get(<path>).exist()```
                                    => data block
            - ```.which(<selector>).get(<path>).exist()```
                                    => data entity
    b. 结果从句
        - ```.save.result```        => execute store result
        - ```.save.status```        => execute store success
            - ```.at(<x>, <y>, <z>).set(<path>)[.type(<type = 'int'>)][.scale(<times = 1>)]```
                                    => execute store ... block
            - ```.which(<selector>).set(<path>)[.type(<type = 'int'>)][.scale(<times = 1>)]```
                                    => execute store ... entity
            - ```[.which(<selector>)].score(<objective>)```
                                    => execute store ... score
            - ```.bossbar(<id>){.currentValue|value() | .maxValue()}```
                                    => execute store ... bossbar ... value|max
    c. 行为从句
        - ```.get(<path>)[.scale(<times>)]```
                                    => data get
        - ```.set(<path>, <value>)```
                                    => data modify ... value ...
        - ```.set(<nbt>)```
                                    => data merge
        - ```.copy(<path>) | .insert(<path>, <index>) | .push(<path>) | .unshift(<path>)```
                                    => data modify merge|insert|append|pretend
            - ```.at(<x>, <y>, <z>).get(<path>)```
                                    => data modify ... from block
            - ```.which(<selector>).get(<path>)```
                                    => data modify ... from entity
        - ```.remove(<path>)```     => data remove
        - ```.score(<objective>)```
            - ```.add|plus(<value>)```
                                    => scoreboard players add
            - ```.remove|minus(<value>)```
                                    => scoreboard players remove
            - ```.set(<value>)```   => scoreboard players set
            - ```.get()```          => scoreboard players get
            - ```.reset()```        => scoreboard players reset
            - ```.enable()```       => scoreboard players enable
            - ```.list()```         => scoreboard players list
            - ```.[operator].where(<selector>).score(<objective>)```
                - ```.add```        => scoreboard players operation ... += ...
                - ```.min```        => scoreboard players operation ... -= ...
                - ```.mul```        => scoreboard players operation ... *= ...
                - ```.div```        => scoreboard players operation ... /= ...
                - ```.mod```        => scoreboard players operation ... %= ...
                - ```.assign```     => scoreboard players operation ... = ...
                - ```.min```        => scoreboard players operation ... < ...
                - ```.max```        => scoreboard players operation ... > ...
                - ```.swap```       => scoreboard players operation ... >< ...
        - ```.status.[path]``` alias ```.store(<embedded_status_variant>)```

4. 选择器
    a. 总选择器
        - self                      => @s
        - players|players.all       => @a
        - players.random            => @r
        - players.nearest           => @p
        - entities|entity           => @e
    b. 具体生物类型选择器
        JMU 为每种实体都做了实现，并将其作为常量接口开放。在源码中，它是这样实现的：
        ```javascript
        // 其实不止于此，但这里仅为展示概念！
        const creeper = entities.typeIs('creeper');
        ```
    c. 具体方块类型选择器
        JMU 也为每种方块做了实现，并将其作为常量接口开放。不过不像实体类型常量，方块类型常量没有什么可供调用的方法。
    d. 附加标签
        - ```.point(<x>, <y>, <z>)```
                                    => \[x, y, z]
            . ```.round```
                .```.from(<value>).to(<value>) | .is(<value>)```
                                    => \[x, y, z, distance=...]

> 正在编辑
