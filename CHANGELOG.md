# Change Log

### 0.3.2

- [!] 提供 `getValue` 方法，可以通过 ref 调用，在外部获取 schema
- [!]  组件适配外层大小
- [!] 导入的 schema 可以不一定是 json 格式，也可以是 js object（就是 key 可以没有引号）
- [!] 修复不能识别的`ui:widget`时，会报错，现在渲染默认兜底组件

### 0.3.1

- [!] 文档修改、删除“保存”按钮

### 0.3.0

- [+] 添加 submit 入参，作为“保存”按钮的回调函数，入参是导出的 schema
- [!] 模板（templates）代替存档（saves）概念

### 0.2.2

- [!] fix dependencies bug

### 0.2.1

- [!] 更新文档配置
- [!] 安卓 moment 的 dependencies，而不隐式引入

### 0.2.0

- [+] 项目组件化，添加 saves 和 defaultValue 两个 props
- [+] 切换到 dumi，添加官方文档