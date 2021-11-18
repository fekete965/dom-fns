import { copyInitialValues, getWidthOrHeight, isNotDefined, isNumber, isString, makeElement, updateElement } from "../utils"
import { EasyDom } from "./base"

export class EasyDomImg extends EasyDom implements iEasyDomImg {
  element: HTMLElement
  
  alt?: string
  height?: number
  src?: string
  width?: number

  constructor(initialValues?: ImgInitialValues) {
    super(initialValues)

    this.alt = initialValues?.alt
    this.element = makeElement('span')
    this.height = initialValues?.height
    this.src = initialValues?.src
    this.width = initialValues?.width

    // Side-effect
    updateElement(this)
  }

  removeAlt = (): iEasyDomImg => {
    if (isNotDefined(this.alt)) {
      console.warn('alt property is already empty. The same object has been returned.')
      return this
    }

    return new EasyDomImg({ ...copyInitialValues(this), alt: undefined })
  }

  removeDimension = (): iEasyDomImg => {
    if (isNotDefined(this.height) && isNotDefined(this.width)) {
      console.warn('height and width properties are already empty. The same object has been returned.')
      return this
    }

    return new EasyDomImg({ ...copyInitialValues(this), height: undefined, width: undefined })
  }

  removeHeight = (): iEasyDomImg => {
    if (isNotDefined(this.height)) {
      console.warn('height property is already empty. The same object has been returned.')
      return this
    }

    return new EasyDomImg({ ...copyInitialValues(this), height: undefined })
  }

  removeSrc = (): iEasyDomImg => {
    if (isNotDefined(this.src)) {
      console.warn('src property is already empty. The same object has been returned.')
      return this
    }

    return new EasyDomImg({ ...copyInitialValues(this), src: undefined })
  }

  removeWidth = (): iEasyDomImg => {
    if (isNotDefined(this.width)) {
      console.warn('width property is already empty. The same object has been returned.')
      return this
    }

    return new EasyDomImg({ ...copyInitialValues(this), width: undefined })
  }

  withAlt = (alt: string): iEasyDomImg => {
    if (isNotDefined(alt)) {
      throw new Error(`withAlt is missing an argument. Please provide a string.`)
    }

    if (!isString(alt)) {
      throw new Error(`withAlt received the following argument: ${alt}. Please provide a string.`)
    }

    return new EasyDomImg({ ...copyInitialValues(this), alt })
  }

  withDimension = (dimension: Dimension): iEasyDomImg => {
    if (isNotDefined(dimension)) {
      throw new Error(`withDimension is missing an argument. Please provide an object with heigh and width properties.`)
    }

    return new EasyDomImg({ ...copyInitialValues(this), height: dimension?.height, width:  dimension?.width })
  }

  withHeight = (height: number | string): iEasyDomImg => {
    if (isNotDefined(height)) {
      throw new Error(`withHeight is missing an argument. Please provide a string or number.`)
    }

    if (isString(height) || isNumber(height)) {
      return new EasyDomImg({ ...copyInitialValues(this), height: getWidthOrHeight(height) })
    }

    throw new Error(`withWidth received the following argument: ${height}. Please provide a string.`)
  }

  withSrc = (src: string): iEasyDomImg => {
    if (isNotDefined(src)) {
      throw new Error(`withSrc is missing an argument. Please provide a string.`)
    }

    if (!isString(src)) {
      throw new Error(`withSrc received the following argument: ${src}. Please provide a string.`)
    }

    return new EasyDomImg({ ...copyInitialValues(this), src })
  }

  withWidth = (width: number | string): iEasyDomImg => {
    if (isNotDefined(width)) {
      throw new Error(`withWidth is missing an argument. Please provide a string or number.`)
    }

    if (isString(width) || isNumber(width)) {
      return new EasyDomImg({ ...copyInitialValues(this), width: getWidthOrHeight(width) })
    }
    
    throw new Error(`withWidth received the following argument: ${width}. Please provide a string.`)
  }
}
