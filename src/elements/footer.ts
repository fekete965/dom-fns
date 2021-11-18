import { makeElement, updateElement } from "../utils"
import { EasyDom } from "./base"

export class EasyDomFooter extends EasyDom implements iEasyDomSharedElement {
  element: HTMLElement

  constructor(initialValues?: SharedElementInitialValues) {
    super(initialValues)
    this.element = makeElement('footer')

    updateElement(this)
  }
}
