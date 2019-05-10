;(function (global) {
  var Timetables = function (option) {
    this.el = document.querySelector(option.el)
    this.Timetables = option.timetables || []
    this.weekDate = option.weekDate || []

    this.gridOnClick =
      typeof option.gridOnClick === 'function' ? option.gridOnClick : undefined
    var styles = option.styles || {}
    this.style = styles
    this.defaultPalette = [
      '#f05261',
      '#48a8e4',
      '#ffd061',
      '#52db9a',
      '#3f51b5',
      '#f3d147',
      '#4adbc3',
      '#673ab7',
      '#f3db49',
      '#76bfcd',
      '#b495e1',
      '#ff9800',
      '#8bc34a'
    ]
    this.palette =
      typeof styles.palette === 'boolean' && !styles.palett
        ? false
        : (styles.palette || []).concat(this.defaultPalette)
    this._init()
  }
  Timetables.prototype = {
    _init: function (option) {
      var option = option || {}
      var style = option.styles || {}
      var gridOnClick = option.gridOnClick || this.gridOnClick
      var Gheight = style.Gheight || this.style.Gheight
      var isScroll = option.isScroll || this.isScroll
      var dpr = window.devicePixelRatio
      var palette
      if (typeof style.palette === 'boolean' && !style.palette) {
        palette = false
      } else {
        palette = style.palette
          ? (style.palette || []).concat(this.defaultPalette)
          : this.palette
      }
      var Timetables = option.timetables || this.Timetables
      var weekDate = option.weekDate || this.weekDate
      if (this.el.childElementCount > 0) {
        this.el.innerHTML = ''
      }

      var courseWrapper = document.createElement('div')
      courseWrapper.id = 'courseWrapper'
      courseWrapper.style.position = 'relative'
      var courseListContent = document.createElement('div')
      
      courseListContent.className = 'Courses-content'

      courseListContent.style.height += Gheight * Timetables[0].week_day_schedule.length + 'px'
      var docuFrag = document.createDocumentFragment()

      var courseItems = document.createElement('ul')
      courseItems.style.position = 'relative'

      var head = document.createElement('div')
      head.style.overflow = 'hidden'
      head.style.display = 'flex'
      head.className = 'Courses-head'
      weekDate.forEach(function (item, index) {
        var weekItem = document.createElement('div')
        // 日期+星期
        var dayItem = document.createElement('p')
        var weekli = document.createElement('p')

        weekItem.className = 'Courses-head-' + (index + 1)
        weekItem.style.flex = 1
        // 重新设置内容
        dayItem.innerText = item.day
        dayItem.style.fontWeight = 'bold'
        weekli.innerText = item.week
        // 修改样式
        weekItem.style.fontSize = '12px'
        weekItem.appendChild(dayItem)
        weekItem.appendChild(weekli)
        head.appendChild(weekItem)
      })
      courseWrapper.appendChild(head)

      Timetables.forEach((item, i) => {
        let schedule = item.week_day_schedule
        let frag = document.createDocumentFragment()
        let width = 100 / 7
        let week = null

        switch (item.week_day) {
          case '一':
            week = 0
            break
          case '二':
            week = 1
            break
          case '三':
            week = 2
            break
          case '四':
            week = 3
            break
          case '五':
            week = 4
            break
          case '六':
            week = 5
            break
          case '日':
            week = 6
            break
          default:
            week = null
            break
        }
        for (var key in schedule) {
          var courseItem = document.createElement('li')
          courseItem.style.position = 'absolute'
          courseItem.style.marginLeft = width * week + '%'

          courseItem.style.marginTop = frag.childElementCount * Gheight + 'px'
          courseItem.style.width = 100 / 7 + '%'
          courseItem.style.height = Gheight + 'px'
          courseItem.style.boxSizing = 'border-box'
          courseItem.style.borderRadius = '3px'
          courseItem.style.padding = '3px'
          courseItem.style.borderBottom = '1px solid #fff'
          courseItem.style.fontSize = '12px'
          courseItem.setAttribute('id', schedule[key].id)
          courseItem.key = key // 添加一个名为key的属性，值为循环体key变量的值
          if (palette) {
            courseItem.style.backgroundColor = palette[i]
            courseItem.style.color = '#fff'
          }

          var courseType = document.createElement('p')
          courseType.innerText = schedule[key].course_no
          courseType.style.wordWrap = 'break-word'

          var courseInfo = document.createElement('p')
          courseInfo.innerText =
            schedule[key].teacher_name + schedule[key].training_time

          courseItem.onclick = function (e) {
            var allList = document
              .querySelectorAll('.Courses-content ul li')
              .forEach(function (v, i) {
                v.classList.remove('grid-active')
              })
            this.className = 'grid-active'
            var info = schedule[this.key]
            gridOnClick && gridOnClick(info)
          }

          courseItem.appendChild(courseType)
          courseItem.appendChild(courseInfo)
          frag.appendChild(courseItem)
        }
        courseItems.appendChild(frag)
      })

      courseListContent.appendChild(courseItems)
      courseWrapper.appendChild(courseListContent)
      this.el.appendChild(courseWrapper)
    },
    setOption: function (option) {
      ;(option || {}).setNewOption = true
      this._init(option)
    }
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Timetables
  }
  if (typeof define === 'function') {
    define(function () {
      return Timetables
    })
  }
  global.Timetables = Timetables
})(this)
