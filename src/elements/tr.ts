import { makeElement, updateElement } from "../utils"
import { EasyDom } from "./base"

export class EasyDomTableRow extends EasyDom implements iEasyDomSharedElement {
  element: HTMLElement

  constructor(initialValues?: SharedElementInitialValues) {
    super(initialValues)
    this.element = makeElement('tr')

    updateElement(this)
  }
}
