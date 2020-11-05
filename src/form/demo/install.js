import Vue from 'vue'
import LibraryUi from './index'

LibraryUi.forEach((component) => {
  Vue.use(component)
})
