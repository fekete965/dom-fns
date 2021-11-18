import { makeElement, updateElement } from "../utils"
import { EasyDom } from "./base"

export class EasyDomHeading1 extends EasyDom implements iEasyDomSharedElement {
  element: HTMLElement

  constructor(initialValues?: SharedElementInitialValues) {
    super(initialValues)
    this.element = makeElement('h1')

    updateElement(this)
  }
}
