# JMU

The upgrade from JavaScript to MCFunction.

从 JavaScript 到 MCFunction 的升级。

## 一、概念

- 从 V3 版本开始，JMU 以解析 AST 的形式转译指令，抛弃之前的模拟解析模式。
- JMU 可接受文件夹层次类似于 Minecraft 函数包的 JavaScript 源代码项目，转译后写出的同样也是与所给函数包文件夹层次一致的行为包。
- JMU 不存在来自于浏览器与 Node.js 的全局变量，仅有 JMU 提供的专用全局变量。部分 JavaScript 特性也可能会被改变或不可用。

## 二、基本语法

### 1. 主语

#### a. 方块

- ```at(<x>, <y>, <z>)```

- ```from(<x>, <y>, <z>).to(<x>, <y>, <z>)```

#### b. 实体

- ```self```

- ```players | players.all```

- ```players.random```

- ```players.nearest```

- ```entity | entities```

- ```as(<selector>)```

  

### 2. 形容词

#### a.方位

- ```dim = "overworld" | "dim-1" | "dim1"```

- ```x, y, z = <num>```

- ```x, y, z, distance = round(<num> | -NaN, <num> | +NaN)```

- ```x, y, z, dx, dy, dz = <num>```

#### b. 朝向

- ```rotate = at(<x>, <y>, <z>) | <selector>```

- ```align = "x" | "y" | "z" | "xy" | "xz" | "yz" | "xyz"```

- ```from = "feet" | "eyes"```

- ```xRotation | yRotation = round(<num> | -NaN, <num> | +NaN)```

#### c. 身份信息

- ```type (=, ==, !=) // 带 # 以表明这是类型标签```

- ```tag (=, ==, !=)```

- ```name (=, ==, !=)```

- ```team (=, ==, !=) // 可为 null```

- ```gamemode (=, ==, !=)```

#### d. 统计信息

- ```score[...] = round(<num> | -NaN, <num> | +NaN) | <num>```

- ```level = round(<num> | -NaN, <num> | +NaN) | <num>```

- ```nbt = {...}```

- ```advancement = {...}```

#### e. 筛选

- ```sort = "nearest" | "random" | "furthest" | "arbitrary"```

- ```limit = <num>```

### 3. 逻辑控制

#### a. 条件判断

JavaScript 原生的逻辑二元运算符、```if```语句、```switch```语句均会被自动转换为一系列判断指令序列。```while```语句、```do...while```语句和```for```语句也可用，间接依赖于```if```语句。

```if```语句、```while```语句、```do...while```语句与```for```语句可使用以下条件：

- ```<expr> op <expr>```

- ```<selector>[<objective>] // 不为 0 时则为真，为 0 时则为假```

- ```<selector> // 存在则为真，不存在则为假```

- ```at(<x>, <y>, <z>) ==|!= at(<x>, <y>, <z>)|<blockName>```

- ```from(<x>, <y>, <z>).to(<x>, <y>, <z>) ==|!= at(<x>, <y>, <z>)```

- ```<selector><path> // 存在则为真，不存在则为假```

- ```at(<x>, <y>, <z>)<path> // 存在则为真，不存在则为假```

```switch```语句仅可使用：

- ```<expr>```

- ```at(<x>, <y>, <z>)```

- ```from(<x>, <y>, <z>).to(<x>, <y>, <z>)```

- ```<selector><path>```

- ```at(<x>, <y>, <z>)<path>```

#### b. 赋值与表达式

JavaScript 原生的算术运算符、赋值运算符均会自动转换为一系列对计分板的算术操作指令序列。JavaScript 的表达式规则在这里同样适用，包括优先级与结合律规则。另外，```var```与```let```关键字也同样可用。

在赋值时，计分板变量还可限制值的类型与按所给常量放缩数值，以后缀点表达式控制。例如，下面的表达式使得原本的```self[var2]```先转换为 byte 类型再放大到其 2 倍后再存储：

```self[var1] = self[var2].toByte.scale(2);```

可用的后缀表达式有：

- ```toByte```

- ```toShort```

- ```toInt```

- ```toLong```

- ```toFloat```

- ```toDouble```

- ```scale(<num>)```

### 4. 函数导入导出

JMU 使用 ES2015 的包导入导出语法（```inport | export```）做到与其它函数之间的互关联。无论是导入还是导出都是可选的——你可以通过导入来调用其它函数（无论此函数是否有```export```；如果有且导出的是一个函数，那么在调用时将还可提供参数），通过导出含参的函数可使得此源文件由一个“子程序”变为一个“函数”。

```import```的来源如果为 Minecraft 函数路径（例如 "foo:bar"），那么执行此时将会将其当作 Minecraft 中的函数调用，否则会将此作为 JavaScript 语句执行。这样设计的目的是为方便库的编写与调用。

### 5. 格式化数据

JMU 为方便书写格式化文本，将原本冗余的 JSON/NBT 格式尽可能作了简化。新的表达方式包含若干个数组（可以嵌套）。每个数组均可包含若干个数组（可以嵌套），每个数组均可包含零个或多个控制符、字符串或子数组。值得一提的是，很多其他地方也能部分使用 JMU 的格式化文本（例如 NBT 编辑物品名），在转换时会自动变成样式代码拼接的文本。

#### a. Raw Text 控制符

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

#### b. NBT

在 JMU 中，会默认提供一个全局对象```nbt```，其中存储了各个方块、实体拥有的 NBT 结构的生成函数。

```javascript
nbt.creeper({ NoAI: true })
```

对于 NBT 与 JSON 互转的兼容性问题，JMU 由于对每种可能的个体都定义好了 NBT 数据结构，所以一般不会出现所谓的转换兼容性问题（除非同一个位置可能为两种容纳不同类型数据的数组，此时 JMU 会根据优先级选择使用哪一种）。

#### c. 坐标表示

基于世界的相对坐标表示：

```tildes [ +|- <num> ]``` 或 ```~(<num>)```

基于实体的相对坐标表示：

```carets [ +|- <num>]``` 或 ```(void(0))^(<num>)```

绝对坐标表示：

```<num>```

### 6. 根指令

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

## 三、补充细节

> 待编辑