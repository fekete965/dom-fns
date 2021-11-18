import { EasyDom } from "./base"
import { isNotDefined, isString, makeElement,  updateFormElement, extractFormInitialValues, isValidTarget, isValidMethod } from "../utils"

export class EasyDomForm extends EasyDom implements iEasyDomForm {
  action?: string
  element: HTMLElement
  formTarget?: Target
  method?: Method
  name?: string

  constructor(initialValues?: FormInitialValues) {
    super(initialValues)

    this.action = initialValues?.action
    this.element = makeElement('form')
    this.formTarget = initialValues?.formTarget
    this.method = initialValues?.method
    this.name = initialValues?.name

    updateFormElement(this)
  }
   
  removeAction = (): iEasyDom => {
    if (isNotDefined(this.action)) {
      console.warn('action property is already empty. The same object has been returned.')
      return this
    }
    return new EasyDomForm({ ...extractFormInitialValues(this), action: undefined })
  }
 
  removeMethod = (): iEasyDom => {
    if (isNotDefined(this.method)) {
      console.warn('method property is already empty. The same object has been returned.')
      return this
    }
    return new EasyDomForm({ ...extractFormInitialValues(this), method: undefined })
  }
 
  removeName = (): iEasyDom => {
    if (isNotDefined(this.name)) {
      console.warn('name property is already empty. The same object has been returned.')
      return this
    }
    return new EasyDomForm({ ...extractFormInitialValues(this), name: undefined })
  }
 
  removeTarget = (): iEasyDom => {
    if (isNotDefined(this.formTarget)) {
      console.warn('formTarget property is already empty. The same object has been returned.')
      return this
    }
    return new EasyDomForm({ ...extractFormInitialValues(this), formTarget: undefined })
  }

  withAction = (action: string): iEasyDom => {
    if (isNotDefined(action)) {
      throw new Error()
    }

    if (!isString(action)) {
      throw new Error(`withAction received the following argument: ${action}. Please provide a string.`)
    }

    return new EasyDomForm({ ...extractFormInitialValues(this), action })
  }

  withMethod = (method: Method): iEasyDom => {
    if (isNotDefined(method)) {
      throw new Error()
    }

    if (!isString(method)) {
      throw new Error(`withMethod received the following argument: ${method}. Please provide a string.`)
    }

    if (isValidMethod(method)) {
      throw new Error(`withMethod only accepts the following arguments: 'dialog', 'get', 'post'`)
    }

    return new EasyDomForm({ ...extractFormInitialValues(this), method })
  }

  withName = (name: string): iEasyDom => {
    if (isNotDefined(name)) {
      throw new Error()
    }

    if (!isString(name)) {
      throw new Error(`withName received the following argument: ${name}. Please provide a string.`)
    }

    return new EasyDomForm({ ...extractFormInitialValues(this), name })
  }

  withTarget = (formTarget: Target): iEasyDom => {
    if (isNotDefined(formTarget)) {
      throw new Error()
    }

    if (!isString(formTarget)) {
      throw new Error(`withTarget received the following argument: ${formTarget}. Please provide a string.`)
    }

    if (isValidTarget(formTarget)) {
      throw new Error(`withTarget only accepts the following arguments: '_self', '_blank', '_parent', '_top'`)
    }

    return new EasyDomForm({ ...extractFormInitialValues(this), formTarget })
  }

}
