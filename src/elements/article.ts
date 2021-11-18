import { makeElement, updateElement } from "../utils"
import { EasyDom } from "./base"

export class EasyDomArticle extends EasyDom implements iEasyDomSharedElement {
  element: HTMLElement

  constructor(initialValues?: SharedElementInitialValues) {
    super(initialValues)
    this.element = makeElement('article')

    updateElement(this)
  }
}
