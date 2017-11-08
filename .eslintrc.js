module.exports = {
    root: true,   //  eslint找到这个标识后，不会再去父文件夹中找eslint的配置文件
    parser: 'babel-eslint',   //使用babel-eslint来作为eslint的解析器
    parserOptions: {      // 设置解析器选项
        sourceType: 'module'    // 表明自己的代码是ECMAScript模块
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',  // 继承eslint-config-standard里面提供的lint规则
    // required to lint *.vue files
    plugins: [    // 使用的插件eslint-plugin-html. 写配置文件的时候，可以省略eslint-plugin-
        // 此插件用来识别.html 和 .vue文件中的js代码
        'html',
        // standard风格的依赖包
        "standard",
        // standard风格的依赖包
        "promise"
    ],
    // 启用额外的规则或者覆盖基础配置中的规则的默认选项
    rules: {
        "arrow-parens": 0, //箭头函数用小括号括起来
        "indent": ["error", 4, { "SwitchCase": 1 }], //缩进风格
        "eol-last": 0, // 文件以单一的换行符结束
        "semi": 0,//语句强制分号结尾
        "semi-spacing": [0, {"before": false, "after": true}],//分号前后空格
        "space-before-function-paren": 0, //函数定义时括号前面要不要有空格
        "no-useless-escape": 0,
        "no-alert": 2,
        "no-eval": 2,//禁止使用eval
        "no-implied-eval": 2,//禁止使用隐式eval
        'generator-star-spacing': 0,  //生成器函数*的前后空格
        'comma-dangle': ["error", 'only-multiline'],  //对象字面量项尾不能有逗号
        "no-new-func": 2,//禁止使用new Function
        "no-new-object": 2,//禁止使用new Object()
        "no-new-require": 2, //禁止使用new require
        "no-new": 2,//禁止在使用new构造一个实例后不赋值
        "no-undef": 2,//不能有未定义的变量
        "no-unexpected-multiline": 2,//避免多行表达式
        "no-unused-vars": [2, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数
        "no-use-before-define": 2,//未定义前不能使用
        "eqeqeq": 2,//必须使用全等
        "quotes": [2, "single"]//引号类型 `` "" ''
        // "quote-props":[2, "always"] //对象字面量中的属性名是否强制双引号
    },
    globals: {    // 声明在代码中自定义的全局变量
        // "angular": true// angular关键词
    },
    env: {            // 定义预定义的全局变量,比如browser: true，这样你在代码中可以放心使用宿主环境给你提供的全局变量。
        browser: true, // browser global variables.
        node: true, // Node.js global variables and Node.js scoping.
        worker: true, // web workers global variables.
        mocha: true, // adds all of the Mocha testing global variables.
        phantomjs: true, // PhantomJS global variables.
        serviceworker: true // Service Worker global variables.
    }
}