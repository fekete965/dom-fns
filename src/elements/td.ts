import { makeElement, updateElement } from "../utils"
import { EasyDom } from "./base"

export class EasyDomTableData extends EasyDom implements iEasyDomSharedElement {
  element: HTMLElement

  constructor(initialValues?: SharedElementInitialValues) {
    super(initialValues)
    this.element = makeElement('td')

    updateElement(this)
  }
}
