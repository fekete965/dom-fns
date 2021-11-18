import { makeElement, updateElement } from "../utils"
import { EasyDom } from "./base"

export class EasyDomHeading7 extends EasyDom implements iEasyDomSharedElement {
  element: HTMLElement

  constructor(initialValues?: SharedElementInitialValues) {
    super(initialValues)
    this.element = makeElement('h6')

    updateElement(this)
  }
}
