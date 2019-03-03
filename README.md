# MarkDown
这是一个markdown编辑器，可以实时预览编辑效果。文件缓存在本地浏览器，可以随时下载
## 使用方法
下载项目代码到本地，并进入项目目录

```
```
安装依赖环境

```
npm install
```
运行webpack打包前端代码

```
npm run build
```

运行项目，建议配合pm2使用

```
pm2 start ./server/server.js
```

浏览器打开 localhost:8080 即可使用
