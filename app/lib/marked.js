const marked = require('marked')
const highlight = require('highlight.js')

module.exports = { _marked, marked }
function _marked () {
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
      return highlight.highlightAuto(code, ['javascript', 'json', 'css', 'shell']).value
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
    langPrefix: true
  })
  let mark = document.getElementById('mark')
  mark.addEventListener('input', markdown)
}
function markdown (e) {
  let article = document.getElementById('article')
  let mark = document.getElementById('mark')
  let name = mark.getAttribute('name')
  if (name === 'readme') {
    alert('该文件不可编辑')
    mark.innerHTML = localStorage.getItem('readme')
    return
  }
  article.innerHTML = marked(mark.innerText)
  if (mark.innerText === '' || mark.innerHTML === '<br>') {
    mark.innerHTML = '<div><br></div>'
    return
  }
  let raw1 = mark.children
  let isCode = false
  if (raw1.length >= 1) {
    for (let i = 0; i < raw1.length; i++) {
      let resetP = false
      for (let p = 1; p < 7; p++) {
        let str = '^(#{' + p + '}\\s)'
        let h = raw1[i].innerText.match(str)
        if (h !== null && raw1[i].className !== 'h' + p) {
          raw1[i].className = 'h' + p
        } else if (h === null && raw1[i].className === 'h' + p) {
          raw1[i].classList.remove('h' + p)
        }
      }
      let code = raw1[i].innerText.match(/^(```)/)
      let link = raw1[i].innerText.match(/!?\[[^[\]]*\](\([^()]*\)|\[[^[\]]*\])/g)
      if (link !== null) {
        let inner = raw1[i].innerText
        for (let p = 0; p < link.length; p++) {
          inner = inner.replace(link[p], '<span class="span">' + link[p] + '</span>')
        }
        raw1[i].innerHTML = inner
        resetP = true
      } else {
        if (raw1[i].getElementsByTagName('span').length !== 0) {
          raw1[i].innerHTML = raw1[i].innerText
        }
      }
      if (code !== null) {
        isCode = !isCode
      }
      if (isCode) {
        raw1[i].className = 'code'
      } else if (typeof raw1[i + 1] !== 'undefined') {
        raw1[i + 1].classList.remove('code')
      }
      if (resetP) {
        setPosition.apply(raw1[i])
      }
    }
  }
  localStorage.setItem(name, mark.innerHTML)
}
// 移动光标
function setPosition () {
  let range = document.createRange()
  let l = this.childNodes.length
  let ll = this.childNodes[l - 1].childNodes.length
  range.setStart(ll === 0 ? this.childNodes[l - 1] : this.childNodes[l - 1].childNodes[0], ll === 0 ? this.childNodes[l - 1].length : this.childNodes[l - 1].childNodes[0].length)
  if (window.getSelection) {
    let sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
  }
  return null
}
