import GenerateFormMobile from './FormMaking/GenerateFormMobile.vue'

const components = [
  GenerateFormMobile,
]

components.forEach((component) => {
  component.install = function(Vue) {
    Vue.component(component.name, (resolve) => {
      resolve(component)
    })
  }
})
export default components

