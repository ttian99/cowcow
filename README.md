# creator-es6-start

## 一、环境准备
- 安装cocos creator引擎, 版本号V1.6.1。([cocos creator下载地址](http://www.cocos.com/creator))
- 安装nodejs环境, 版本号v6.10.2+。([nodejs下载地址](https://nodejs.org/))
- 安装nodejs第三方依赖包： 安装完nodejs后,在命令行运行
 ```bash
 cd <项目根目录>
 npm install
 ```
- 安装Visual Studio Code(vscode),版本号v1.14。([vscode下载地址](https://code.visualstudio.com/))

## 二、代码规范
项目全局使用ESLint插件来检测代码规范。
- 使用[editorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)统一编辑器格式
- 使用[eslint](http://eslint.cn/)检测代码规范，vscode需要安装ESLint插件
- 统一使用[Airbnb规范](https://github.com/airbnb/javascript)
- es7的装饰器特性需要使用[babel-eslint](https://github.com/babel/babel-eslint)


## 三、项目结构
### 项目主体目录结构（每个creator项目必备结构）
```
barracat项目根目录
|-- assets 里面是creator资源文件夹，包含游戏中所有本地资源、脚本和第三方库文件。
|-- build 发布文件夹，发布的各个平台项目都在该文件夹下面。
|-- library 将assets中的资源导入后生成的，在这里文件的结构和资源的格式将被处理成最终游戏发布时需要的形式。
|-- local 包含该项目的本地设置，包括编辑器面板布局，窗口大小，位置等信息。
|-- settings 里保存项目相关的设置，如 构建发布 菜单里的包名、场景和平台选择等。这些设置需要和项目一起进行版本控制。
|-- temp 临时缓存文件夹
|-- packages 插件存储文件夹
|-- creator.d.ts 用于creator的代码提示文件
|-- jsconfig.json 用于creator的代码提示文件
|-- project.json 规定当前使用的引擎类型和插件存储位置
|-- build-templates 构建的模板文件，包括jsb-binary、jsb-default、web-mobile文件夹，构建完成后会拷贝到build文件夹的对应平台下面
```

## 四、assets文件夹结构
```
assets
|-- prefab 预制资源
|-- resources 需要动态加载的资源，必须放置于该目录下（）
|-- res-static 不需要动态加载的资源，置于resources文件夹外，可减少项目的json数量
|-- scene 场景文件
|-- script 脚本文件
      |-- config 常用配置文件和静态文件信息
      |-- data 数据文件
      |-- gameScene 游戏场景脚本
      |-- hallScene 大厅场景脚本
      |-- net 网络模块相关脚本
      |-- platform 不同平台适配文件
      |-- startScene 初始场景脚本
      |-- utils 工具类脚本
```