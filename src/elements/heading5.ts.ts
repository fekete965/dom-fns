import { makeElement, updateElement } from "../utils"
import { EasyDom } from "./base"

export class EasyDomHeading5 extends EasyDom implements iEasyDomSharedElement {
  element: HTMLElement

  constructor(initialValues?: SharedElementInitialValues) {
    super(initialValues)
    this.element = makeElement('h5')

    updateElement(this)
  }
}