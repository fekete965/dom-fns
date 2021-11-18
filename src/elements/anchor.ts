import { extractAnchorInitialValues as extractAnchorInitialValues,  isNotDefined, isString, makeElement, updateAnchorElement, isValidTarget } from "../utils"
import { EasyDom } from "./base"

export class EasyDomAnchor extends EasyDom implements iEasyDomAnchor {
  anchorTarget?: Target
  element: HTMLElement
  href?: string

  constructor(initialValues?: AnchorInitialValues) {
    super(initialValues)

    this.href = initialValues?.href
    this.anchorTarget = initialValues?.anchorTarget
    this.element = makeElement('a')

    updateAnchorElement(this)
  }

  removeHref = (): iEasyDomAnchor => {
    if (isNotDefined(this.href)) {
      console.warn('href property is already empty. The same object has been returned.')
      return this
    }
    
    return new EasyDomAnchor({ ...extractAnchorInitialValues(this), href: undefined })
  }

  removeTarget = (): iEasyDomAnchor => {
    if (isNotDefined(this.anchorTarget)) {
      console.warn('anchorTarget property is already empty. The same object has been returned.')
      return this
    }

    return new EasyDomAnchor({ ...extractAnchorInitialValues(this), anchorTarget: undefined })
  }

  withHref = (href: string): iEasyDomAnchor => {
    if (isNotDefined(href)) {
      throw new Error(`withHref is missing an argument. Please provide a string.`)
    }

    if (!isString(href)) {
      throw new Error(`withHref received the following argument: ${href}. Please provide a string.`)
    }

    return new EasyDomAnchor({ ...extractAnchorInitialValues(this), href })
  }

  withTarget = (anchorTarget: Target): iEasyDomAnchor => {
    if (isNotDefined(anchorTarget)) {
      throw new Error(`withTarget is missing an argument. Please provide a string.`)
    }

    if (!isString(anchorTarget)) {
      throw new Error(`withTarget received the following argument: ${anchorTarget}. Please provide a string.`)
    }

    if (isValidTarget(anchorTarget)) {
      throw new Error(`withTarget only accepts the following arguments: '_self', '_blank', '_parent', '_top'`)
    }

    return new EasyDomAnchor({ ...extractAnchorInitialValues(this), anchorTarget })
  }
}
