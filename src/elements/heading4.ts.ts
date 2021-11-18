import { makeElement, updateElement } from "../utils"
import { EasyDom } from "./base"

export class EasyDomHeading4 extends EasyDom implements iEasyDomSharedElement {
  element: HTMLElement

  constructor(initialValues?: SharedElementInitialValues) {
    super(initialValues)
    this.element = makeElement('h4')

    updateElement(this)
  }
}
