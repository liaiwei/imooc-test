import { createI18n } from 'vue-i18n'
import mZhLocale from './lang/zh'
import mEnLocale from './lang/en'
import store from '@/store'

// const messages = {
//   en: {
//     msg: {
//       ...mEnLocale
//     }
//   },
//   zh: {
//     msg: {
//       ...mZhLocale
//     }
//   }
// }

const messages = {
  en: {
    msg: {
      test: 'hello world'
    }
  },
  zh: {
    msg: {
      test: '你好世界'
    }
  }
}
const locale = 'en'
/**
 * 返回当前 lang
 */
// function getLanguage() {
//   return store && store.getters && store.getters.language
// }
// const i18n = createI18n({
//   // 使用 Composition API 模式，则需要将其设置为false
//   legacy: false,
//   // 全局注入 $t 函数
//   globalInjection: true,
//   locale: getLanguage(),
//   messages
// })

const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale,
  messages
})

export default i18n
