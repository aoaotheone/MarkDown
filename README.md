# MarkDown
这是一个`markdown`编辑器，可以实时预览编辑效果。文件缓存在本地浏览器，可以随时下载
## 使用方法
下载项目代码到本地，并进入项目目录

```
git clone https://github.com/aoaotheone/MarkDown.git
```
安装依赖环境

```
npm install
```
运行`webpack`打包前端代码

```
npm run build
```

运行项目，建议配合`pm2`使用

```
pm2 start ./server/server.js
```

浏览器打开 localhost:8001 即可使用

## 预览
点击[这里](http://aoaotheone.cn:8001)访问
