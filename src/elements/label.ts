import { targetList } from "../constats"
import { EasyDom } from "./base"
import { extractLabelInitialValues, isNotDefined, isString, makeElement, updateLabelElement } from "../utils"

export class EasyDomLabel extends EasyDom implements iEasyDomLabel {
  element: HTMLElement
  for?: string

  constructor(initialValues?: LabelInitialValues) {
    super(initialValues)

    this.element = makeElement('label')
    this.for = initialValues?.for

    updateLabelElement(this)
  }
  
  removeFor = (): iEasyDomLabel => {
    if (isNotDefined(this.for)) {
      console.warn('for property is already empty. The same object has been returned.')
      return this
    }
    return new EasyDomLabel({ ...extractLabelInitialValues(this), for: undefined })
  }

  withFor = (value: string): iEasyDomLabel => {
    if (isNotDefined(value)) {
      throw new Error()
    }

    if (!isString(value)) {
      throw new Error(`withFor received the following argument: ${value}. Please provide a string.`)
    }

    return new EasyDomLabel({ ...extractLabelInitialValues(this), for: value })
  }
}
