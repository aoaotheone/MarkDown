// import 'github-markdown-css'
import './style/github.css'
import './style/index.css'
const { _marked, markdown } = require('./lib/marked')
const menu = require('./lib/menu')

_marked()
let readme = '<div class="h1"># MarkDown实时预览编辑器</div><div class="">**本编辑器界面布局，颜色搭配参考了MacDown这个免费软件**</div><div class="h2">## 使用方法</div><div class="">点击右上角菜单按钮，新建`markdown`文件，即可在左边黑色区域进行文本编辑。在编辑文本过程中，右边白色界面将会实时现实预览效果。</div><div class="h2">## 文件保存</div><div class="">作者为了降低服务器运行成本，在本编辑器上编辑的文件均保存在用户本地浏览器上，无法多客户端同步使用。在平时使用过程中，如果要清理浏览器缓存，请先下载文件到本地。</div><div class="h2">## 文件下载</div><div class="">在本编辑器编辑的`markdown`文本，进入文本编辑状态后，可以使用右上角的下载按钮进行下载。下载文件为`.md`文件</div>'
if (localStorage.getItem('list')) {
  document.getElementById('mark').innerHTML = localStorage.getItem('readme')
  markdown()
} else {
  localStorage.setItem('list', JSON.stringify(['readme']))
  localStorage.setItem('readme', readme)
  document.getElementById('mark').innerHTML = readme
  markdown()
}
menu()
