import { makeElement, updateElement } from "../utils"
import { EasyDom } from "./base"

export class EasyDomSpan extends EasyDom implements iEasyDomSharedElement {
  element: HTMLElement

  constructor(initialValues?: SharedElementInitialValues) {
    super(initialValues)
    this.element = makeElement('span')

    updateElement(this)
  }
}
