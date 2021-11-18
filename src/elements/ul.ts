import { makeElement, updateElement } from "../utils"
import { EasyDom } from "./base"

export class EasyDomUnorderedList extends EasyDom implements iEasyDomSharedElement {
  element: HTMLElement

  constructor(initialValues?: SharedElementInitialValues) {
    super(initialValues)
    this.element = makeElement('ul')

    updateElement(this)
  }
}
