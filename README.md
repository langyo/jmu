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
                                => \[```x```, ```y```, ```z```]
    -  ```.round```
        - ```.from(<value>).to(<value>)```
                                => \[```x```, ```y```, ```z```, distance=```a```..```b```]
        - ```.is(<value>)```
                                => \[```x```, ```y```, ```z```, distance=```val```]
        - ```.moreThan(<value>)```
                                => \[```x```, ```y```, ```z```, distance=```val+1```..]
        - ```.lessThan(<value>)```
                                => \[```x```, ```y```, ```z```, distance=..```val-1```]
        - ```.notMoreThan(<value>) | lessThanOrEqual(<value>)```
        - ```.notLessThan(<value>) | moreThanOrEqual(<value>)```
        - ```.cube(<dx>, <dy>, <dz>)```
- ```.scores(<objective>)```
    - ```.is(<value>)```
    - ```.round```
        - ```.from(<value>).to(<value>)```
        - ```.is(<value>)```
        - ```.moreThan(<value>)```
        - ```.lessThan(<value>)```
        - ```.notMoreThan(<value>) | lessThanOrEqual(<value>)```
        - ```.notLessThan(<value>) | moreThanOrEqual(<value>)```
                                => \[scores={```obj1```=```a```, ...}]
- ```.atTeam(<name>)```     => \[team=```name```]
- ```.notAtTeam(<name>)```  => \[team=!```name```]
- ```.atAnyTeam()```        => \[team=]
- ```.notAtAnyTeam()```     => \[team=!]
- ```.limit(<value>)```     => \[limit=```val```]
- ```.sort(<'nearest' | 'random' | 'furthest' | 'arbitrary'>) | nearest() | random() | furthest() | arbitrary()```
                                => \[sort=```val```]
- ```.level```
    - ```.round```
        - ```.from(<value>).to(<value>)```
        - ```.is(<value>)```
        - ```.moreThan(<value>)```
        - ```.lessThan(<value>)```
        - ```.notMoreThan(<value>) | lessThanOrEqual(<value>)```
        - ```.notLessThan(<value>) | moreThanOrEqual(<value>)```
                                => \[level=```a```..```b```]
- ```.gamemodeIs(<mode>)``` => \[gamemode=```m```]
- ```.gamemodeIsNot(<mode>)```
                                => \[gamemode=!```m```]
- ```.name(<name) | .nameIs(<name>)```
                                => \[name=```n```]
- ```.nameIsNot(<name>)```
                                => \[name=!```n```]
- ```.rotation```
    - ```.x | .y```
        - ```.is(<value>)```
        - ```.round```
            - ```.from(<value>).to(<value>)```
            - ```.is(<value>)```
            - ```.moreThan(<value>)```
            - ```.lessThan(<value>)```
            - ```.notMoreThan(<value>) | lessThanOrEqual(<value>)```
            - ```.notLessThan(<value>) | moreThanOrEqual(<value>)```
                                => \[x_rotation=```a```..```b```]
- ```.typeIs(<type>)```         => \[type=```t```]
- ```.typeIsNot(<type>)```      => \[type=!```t```]
- ```.typeTagIs(<type>)```
                                => \[type=#```t```]
- ```.typeTagIsNot(<type>)```
                                => \[type=!#```t```]
- ```.tag(<tag>) | .tagIs(<tag>)```
                                => \[tag=```t```]
- ```.tagIsNot(<tag>)```
                                => \[tag=!```t```]
- ```.tagIsNotHaveAny()```      => \[tag=]
- ```.tagIsHaveAny()```         => \[tag=!]
- ```.nbtCompare(<nbt>)```      => \[nbt={```...```}]
- ```.advancementCompare(<adv>)```
                                => \[advancement={```...```}]

5. 格式化数据

JMU 为方便书写格式化文本，将原本冗余的 JSON/NBT 格式尽可能作了简化。新的表达方式包含若干个数组（可以嵌套）。每个数组均可包含若干个数组（可以嵌套），每个数组均可包含零个或多个控制符、字符串或子数组。值得一提的是，很多其他地方也能部分使用 JMU 的格式化文本（例如 NBT 编辑物品名），在转换时会自动变成样式代码拼接的文本。

a. Raw Text 控制符

- ```bold``` 加粗
- ```italic``` 斜体
- ```underline | underlined``` 下划线
- ```striketThrough | striketthrough | deleteLine | deleteline``` 删除线
- ```black | dark_blue | dark_green | dark_aqua | dark_red | dark_purple | gold | gray | dark_gray | blue | green | aqua | red | light_purple | yellow | white | reset``` 颜色配置
- ```obfuscated``` 阴影
- ```insertion``` 插入标识（玩家按住 ```shift``` 并点击文本可以将文本复制入聊天框）
- ```clickToOpenUrl(<url>)``` 点击事件，打开 URL
- ```clickToOpenFile(<path>)``` 点击事件，打开文件
- ```clickToRun(<command_array>)``` 点击事件，运行指令
- ```hoverToShowText(<formatted_text>)``` 热点事件，显示文本
- ```hoverToShowItem(<nbt>)``` 热点事件，显示物品详情
- ```hoverToShowEntity(<type | name | UUID>)``` 热点事件，显示实体详情
- ```which(<selector>)``` 显示由选择器选择到的实体名
- ```keybind(<key>) | keyBind(<key>)``` 设置按键绑定，用于按键提示
- ```which(<selector>).score(<objective>)[.showAs(<value>)]```
    显示由选择器选择实体的某个计分板项分数；如果设置了```.showAs```，不论怎样都将会改为显示```.showAs```设定的值
- ```translate(<path>)[.with(<list>)]```
    调取语言包，显示指定路径的当前语言文本；如果指定了```.with```，则还会自动替换当前语言文本的对应标识符为所给文本

b. NBT

在 JMU 中，会默认提供一个全局对象```nbt```，其中存储了各个方块、实体拥有的 NBT 结构的生成函数。

```javascript
nbt.creeper({ NoAI: true })
```

对于 NBT 与 JSON 互转的兼容性问题，JMU 由于对每种可能的个体都定义好了 NBT 数据结构，所以一般不会出现所谓的转换兼容性问题（除非同一个位置可能为两种容纳不同类型数据的数组，此时 JMU 会根据优先级选择使用哪一种）。

6. 程序大纲

a. 命名空间

- ```def(<namespace>, <function_path>, <command_list>)```
    最基本的函数，用于定义一个 Minecraft 函数
eg:

```javascript
def('ly', ['util', 'sum'],
    round(1024).map(n =>
        self.score('a').add.self.score('storage' + n)
    ).unshift(self.score('a').set(0))
);
def('ly', 'util.showSum', [
    'execute as @a run gamemode creative',
    self.tell(anyone, ['a = ', whoch(self).score('a')])
]);
```

- ```setAsTick(<namespace>, <function_path>)```
    设置某函数为不间断执行

- ```defAsTick(<namespace>, <function_path>, <command_list>)```
    定义一个不间断执行的函数

- ```setAsInit(<namespace>, <function_path>)```
    设置某函数为数据包初始化时执行

- ```defAsInit(<namespace>, <function_path>, <command_list>)```
    定义一个数据包初始化时执行的函数

> 值得一提的是，\<command_list\> 中的指令是不必人工扁平化的。换句话讲，你可以写嵌套的数组，引擎会自动将其扁平为一维数组，不论多深！
> eg: \[\[say('Hello').to(self)], round(12).map(n => say(self, n))]

b. 根指令

> 提示：在函数定义体内写才有效果

- ```run(<namespace>, <command_path>)```
    执行一个已定义的函数
- ```run(<command_list>) | run(<single_command>)```
    临时定义一批指令并立即执行，相当于 lambda 函数或匿名函数
- ```tell([who], <RAW_JSON>)[.to(<selector>)[.and(<selector>)...]]```
    执行 tellraw，可通过后缀选择器指定多个接收者
- ```say([selector, <RAW_JSON>])[.to(<selector>)[.and(<selector>)...]]```
    执行 say，与 tellraw 类似
- ```setBlock|setblock(<blockId>, <nbt>)```
    执行 setblock，其前需要方块位置主语；NBT 提示可通过工厂函数使 IDE 提供智能感知服务
    > 特化函数 setBlock$\<blockId>(\<nbt>)，可无需工厂函数就能体验到智能感知
- ```fill(<blockId>, <nbt>).mode(<'destroy' | 'hollow' | 'keep' | 'outline' | 'replace'>)```
    执行 fill，其前需要方块范围主语
    > 特化函数 fill$\<blockId(\<nbt>)>，可无需工厂函数就能体验到智能感知
- ```summon(<entity_selector_type>, <nbt>)```
    执行 summon，其前需要方块位置主语或实体主语
    > 特化函数 summon$\<entityId>(\<nbt>)，可无需工厂函数就能体验到智能感知
- ```playSound|playsound(<sound_id>)[.voice(<num>)][.source(<type>)][.minVoice(<num>)][.grade(<level>)]```
- ```stopSound|stopsound()```
    执行 playsound/stopsound，其前可选择提供主语
    > source 为音源，grade 为音调，voice 和 minVoice 分别为默认音量和最小音量
- ```time```
    - ```.get()```          => time get
    - ```.set(<num>)```     => time set
        执行 time，不一定需要主语（带主语仅为转移执行者）
- ```clone.from(<x>, <y>, <z>).to(<x>, <y>, <z>)[.mode('masked' | 'all')][.filter('replace' | 'masked' | 'filtered')][.sourceMode('normal' | 'force' | 'move')]```
    执行 clone，其前需要主语
    > 默认的 mode 为 all，默认的 filter 为 replace，默认的 sourceMode 为 normal
- ```give(<item_id>, <nbt>)```
    执行 give，其前需要玩家实体主语
- ```clear(<item>, [count])```
    执行 clear，其前需要玩家实体主语
    > 如果省略 count，默认为 0
- ```title([selector], <RAW_JSON>)[.subTitle(<RAW_JSON>)[.to(<selector>)[.and(<selector>)...]]```
    执行 title，与 tellraw 类似
- ```kill([selector])```
    执行 kill；如果未指定目标，则直接作用于主语所选对象
- ```objectives(<objective>)```
    - ```.setDisplay(<type>)```
    - ```.setName(<name>)```
        执行 scoreboard objectives
        > 值得一提，JMU 会自动创建所有的编写者用过的计分板变量名，并加前缀以保证区分与其它包的变量（可通过在变量名开头加 # 阻止此行为）
- ```datapack```
    - ```enable(<name>)```
    - ```disable(<name>)```
        执行 datapack，无需主语
- ```bossbar(<id>)```
    - ```currentValue|value(<name>) | maxValue(<num>)```
    - ```setDisplay(<'notched_6' | 'notched_10' | 'notched_12' | 'notched_20' | 'progress'>)```
    - ```visible(<true | false>)```
    执行 bossbar，无需主语
- ```advancement(<path>) | recipe(<path>)```
    - ```give|grank(['all' | 'after' | 'before'])```
    - ```remove|revoke|take(['all' | 'after' | 'before'])```
        执行 advancement/recipe，需要主语
- ```effect(<type>)[.for(<time>)]```
    执行 effect，需要主语
    > 如果省略 for 子句，默认为尽可能长的时间（2 的 31 次方减一秒）
- ```enchant(<type>).at(<item_pos>)```
    执行 enchant，需要主语
- ```experience|exp|xp(<value>)```
- ```experienceLevel|expLevel|xpLevel(<value>)```
    执行 experience，需要主语
- ```loot(<path>)[.at(<item_pos>)]```
    执行 loot，需要主语
    > 如果主语是个非玩家实体，必须要 at 子句，否则不得加子句
- ```replace(<item_pos>)[.as(<item>, [nbt])]```
    执行 replaceitem 需要主语
    > 如果不提供 as 子句，默认为 air 空气
- ```seed()```
    执行 seed
- ```schedule(<time>).run(<...>)```
- ```scheduleSeconds(<time>).run(<...>)```
- ```scheduleDays(<time>.run(<...>))```
    执行 schedule 命令；必须带 run 子句
- ```tag(<id>)```
    - ```.give|add()```
    - ```.take|remove()```
        执行 tag 命令；必须要有主语
- ```team(<id>)```
    - ```.join()```
    - ```.leave()```
    - ```.clear()```                （该子句无需主语）
    - ```.set(<status>, <value>)``` （该子句无需主语）
        执行 team 命令；全局子句不需要主语，个体子句必须要主语
- ```tp|move|teleport (<selector>)|(<x>, <y>, <z>, [x_rotation], [y_rotation])```
    执行 tp 命令，需要主语
- ```spread(<x>, <z>).range(<num>).spacing(<num>)[.teamMeet()]```
    执行 spreadplayers 命令，无需主语
    > range 表示分散最大范围，spacing 为最小间距，teamMeet 为是否同队实体传送在一起
- ```loadChunk|forceLoad|forceload(<x>, <z>)```
    - ```.load()```
    - ```.remove()```
    - ```.removeAll()```
        执行 forceload 命令，无需主语
        > 对于 removeAll 子句，开头无需参数

c. 坐标表达

JMU 可以识别三个与原版 Minecraft 指令格式类似的含文本字符串，也可以识别一个含标识符与数字的数组。

```javascript
at('~1', '~1', '~1')    // ~1 ~1 ~1
at([1], [1], [1])       // ^1 ^1 ^1
at(['^', 1], ['^', 1], ['~', 1])    // ^1 ^1 ~1
at(11, 23, 4567)        // 11 23 4567
at(pos.x(11).yMove(12).zOperand(3)) // 11 ^12 ~3
```


