
module.exports = function () {
  let menu = document.getElementById('menu')
  let download = document.getElementById('download')
  let list = document.getElementById('list')
  menu.addEventListener('click', function (e) {
    if (list.hidden) {
      addList.apply(list)
    } else {
      clearList.apply(list)
    }
  })
  menu.addEventListener('mouseover', function (e) {
    menu.classList.add('menuA')
  })
  menu.addEventListener('mouseout', function (e) {
    menu.classList.remove('menuA')
  })
  download.addEventListener('click', function (e) {
    // console.log(e)
    downloadFile(document.getElementById('mark').getAttribute('name'), document.getElementById('mark').innerText)
  })
  download.addEventListener('mouseover', function (e) {
    download.classList.add('downloadA')
  })
  download.addEventListener('mouseout', function (e) {
    download.classList.remove('downloadA')
  })
}

function addList () {
  let mark = document.getElementById('mark')
  let marks = JSON.parse(localStorage.getItem('list')) || []
  let h = ''
  for (let i in marks) {
    h += '<div class="item" data-name="' + marks[i] + '">' + marks[i] + '<div class="delete"></div></div>'
  }
  h += '<div class="add"></div>'
  this.innerHTML = h
  let _delete = document.getElementsByClassName('delete')
  let _item = document.getElementsByClassName('item')
  let _add = document.getElementsByClassName('add')[0]
  for (let i in marks) {
    _delete[i].addEventListener('click', function (e) {
      e.stopPropagation()
      if (marks[i] === 'readme') {
        alert('该文件不可删除')
        return
      }
      document.getElementsByClassName('item')[i].hidden = true
      localStorage.removeItem(marks[i])
      marks = marks.slice(0, i).concat(marks.slice(i + 1, marks.length))
      localStorage.setItem('list', JSON.stringify(marks))
      _item[0].click()
    })
    _delete[i].addEventListener('mouseover', function (e) {
      _delete[i].classList.add('deleteA')
    })
    _delete[i].addEventListener('mouseout', function (e) {
      _delete[i].classList.remove('deleteA')
    })
    if (marks[i] === mark.getAttribute('name')) {
      _item[i].classList.add('itemA')
      document.getElementById('list').setAttribute('list', i)
    }
    _item[i].addEventListener('click', function (e) {
      mark.setAttribute('name', e.target.dataset.name)
      mark.innerHTML = localStorage.getItem(e.target.dataset.name)
      _item[document.getElementById('list').getAttribute('list')].classList.remove('itemA')
      _item[i].classList.add('itemA')
      document.getElementById('list').setAttribute('list', i)
    })
  }
  _add.addEventListener('click', function (e) {
    document.getElementById('menu').click()
    let name = prompt('请输入文件名')
    if (name !== null && name !== '') {
      if (name === 'list') {
        alert('list已被系统占用，请输入其他名字')
        return
      }
      if (localStorage.getItem('list').indexOf(name) > -1) {
        alert('文件已存在')
        return
      }
      marks.push(name)
      localStorage.setItem('list', JSON.stringify(marks))
      localStorage.setItem(name, '<div></div>')
      mark.setAttribute('name', name)
      mark.innerHTML = ''
    } else {
      alert('输入不能为空')
    }
  })
  _add.addEventListener('mouseover', function (e) {
    _add.classList.add('addA')
  })
  _add.addEventListener('mouseout', function (e) {
    _add.classList.remove('addA')
  })
  this.hidden = false
}
function clearList () {
  this.innerHTML = ''
  this.hidden = true
}
function downloadFile (filename, str) {
  if ('msSaveOrOpenBlob' in navigator) {
    window.navigator.msSaveOrOpenBlob(new Blob([str]), filename + '.md')
  } else {
    let url = window.URL.createObjectURL(new Blob([str], { type: 'text/*' }))
    let link = document.createElement('a')

    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', filename + '.md')
    document.body.appendChild(link)
    link.click()
  }
}
