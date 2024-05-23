/*
 * @Description: rem响应式方案hooks
 */
import { shallowReadonly, ref } from 'vue'

const flexiableRatio = ref(1)
const SCREEN_WIDTH = 1920 // 设定的浏览器的基准宽度

/**
 * 启用自适应
 * @param window
 * @param document
 */
export const useFlexible = (window: any, document: any) => {
  const docEl = document.documentElement // 返回文档的root元素
  const dpr = window.devicePixelRatio || 1 // 获取设备的dpr，即当前设置下物理像素与虚拟像素的比值

  /**
   * 设置默认字体大小，默认的字体大小继承自body
   */
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + 'px'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize()

  /**
   * 更新分辨率尺寸
   */
  function updateScreenSize() {
    const rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
    flexiableRatio.value = docEl.clientWidth / SCREEN_WIDTH
  }

  updateScreenSize()

  // 调整页面大小时重置rem单位
  window.addEventListener('resize', updateScreenSize)
  window.addEventListener('pageshow', function (e: { persisted: any }) {
    if (e.persisted) {
      updateScreenSize()
    }
  })

  return {
    flexiableRatio: shallowReadonly(flexiableRatio),
  }
}
