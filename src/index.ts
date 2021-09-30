import { targetList } from "./constats"
import { extractInitObject as extractInitialValues, extractInitObjectAnchor as extractAnchorInitialValues, extractInitObjectImg, getValidAttributes, getValidClasses, getWidthOrHeight, isNotDefined, isString, isStringTuple, makeElement, mergeAttrArray, removeFromArray, removeInvalidValues, updateAnchorElement, updateElement, updateImgElement } from "./utils"

class EasyDom implements iEasyDom {
  classNames: string[] = []
  dataAttributes: StringTuple[] = []
  element: HTMLElement | null = null
  id?: string
  innerText?: string

  constructor(initialValues?: InitialValues) {
    this.classNames = getValidClasses(initialValues?.classNames)
    this.dataAttributes = getValidAttributes(initialValues?.dataAttributes)
    this.element = initialValues?.element || null
    this.id = initialValues?.id || undefined
    this.innerText = initialValues?.innerText || undefined

    // Side-effect
    updateElement(this)
  }

  public a = (): EasyDomAnchor => new EasyDomAnchor({ ...extractInitialValues(this), element: makeElement('a') })
  public article = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('article') })
  public aside = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('aside') })
  public details = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('details') })
  public b = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('b') })
  public br = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('br') })
  public caption = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('caption') })
  public div = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('div') })
  public footer = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('footer') })
  // TODO: more support for "form"
  public form = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('form') })
  public h1 = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('h1') })
  public h2 = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('h2') })
  public h3 = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('h3') })
  public h4 = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('h4') })
  public h5 = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('h5') })
  public h6 = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('h6') })
  public header = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('header') })
  public img = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('img') })
  // TODO: more support for a "label"
  public label = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('label') })
  public li = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('li') })
  public nav = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('nav') })
  public main = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('main') })
  public ol = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('ol') })
  public p = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('p') })
  public section = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('section') })
  public span = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('span') })
  public strong = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('strong') })
  public table = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('table') })
  public tbody = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('tbody') })
  public td = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('td') })
  public tfoot = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('tfoot') })
  public th = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('th') })
  public thead = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('thead') })
  public tr = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('tr') })
  public ul = (): EasyDom => new EasyDom({ ...extractInitialValues(this), element: makeElement('ul') })

  public withClass = (classNames: ClassNames): EasyDom => {
    if (isNotDefined(classNames)) {
      throw new Error("withClass is missing an argument. Please provide a single classname or a list of classnames.")
    }

    if (typeof classNames === 'string') {
      return new EasyDom({ ...extractInitialValues(this), classNames: [...this.classNames, classNames] })  
    }

    if (Array.isArray(classNames)) {
      const nextClassName = classNames.length ? classNames[0] : undefined

      if (nextClassName !== undefined) {
        const classNamesRemainder = classNames.slice(1)

        return new EasyDom({ ...extractInitialValues(this), classNames: [...this.classNames, nextClassName] }).withClass(classNamesRemainder)
      }

      return new EasyDom({ ...extractInitialValues(this) })
    }

    throw new Error(`Unsupported argument passed to withClass: ${classNames}`)
  }

  public removeClass = (classNames: ClassNames): EasyDom => {
    if (this.classNames.length === 0) {
      console.warn('class property is already empty. The same object has been returned.')
      return this
    }

    if (isNotDefined(classNames)) {
      throw new Error(`Invalid classNames passed to removeClass: ${classNames}`)
    }

    if (Array.isArray(classNames)) {
      const removableClassName = classNames.length ? classNames[0] : undefined

      if (removableClassName !== undefined) {
        const classNameRemainder = classNames.slice(1)
        const newClassNames = removeFromArray(this.classNames, removableClassName)

        return new EasyDom({ ...extractInitialValues(this), classNames: newClassNames }).removeClass(classNameRemainder) 
      }
      
      return new EasyDom({ ...extractInitialValues(this) })
    }

    if (typeof classNames === 'string') {
      return new EasyDom({ ...extractInitialValues(this), classNames: removeFromArray<string>(this.classNames, classNames) })
    }

    throw new Error(`Unsupported argument passed to removeClass: ${classNames}`)
  }

  public removeAllClasses = (): EasyDom => {
    if (this.classNames.length === 0) {
      console.warn('class property is already empty. The same object has been returned.')
      return this
    }

    return new EasyDom({ ...extractInitialValues(this), classNames: [] })
  }

  public withId = (id: string): EasyDom => {
    if (isNotDefined(id)) {
      throw new Error("withId is missing an argument. Please provide a single id.")
    }

    if (isString(id)) {
      throw new Error(`withId received the following argument: ${id}. Please provide a string.`)
    }

    return new EasyDom({ ...extractInitialValues(this), id })
  }

  public removeId = (): EasyDom => {
    if (isNotDefined(this.id)) {
      console.warn('id property is already empty. The same object has been returned.')
      return this
    }

    return new EasyDom({ ...extractInitialValues(this), id: undefined })
  }

  public withDataAttribute = (data: DataAttributes): EasyDom => {
    if (isNotDefined(data)) {
      throw new Error(`withDataAttribute is missing an argument. Please provide a tuple or a list of tuples.`)
    }

    if (!Array.isArray(data[0]) && isStringTuple(data as StringTuple)) {
      return new EasyDom({ ...extractInitialValues(this), dataAttributes: mergeAttrArray(this.dataAttributes, data as StringTuple) })  
    }

    if (Array.isArray(data[0])) {
      const cleanedData = removeInvalidValues(data as StringTuple[])
      const nextData = cleanedData.length ? cleanedData[0] : undefined

      if (nextData !== undefined) {
        const dataRemainder = data.slice(1) as StringTuple[]
        
        return new EasyDom({ ...extractInitialValues(this), dataAttributes: mergeAttrArray(this.dataAttributes, nextData) }).withDataAttribute(dataRemainder)
      }
      
      return new EasyDom({ ...extractInitialValues(this) })
    }

    if (Array.isArray(data) && data.length === 0) {
      return new EasyDom({ ...extractInitialValues(this) })
    }

    throw new Error(`Unsupported argument passed to withDataAttribute: ${data}`)
  }

  public removeDataAttribute = (key: string): EasyDom => {
    if (isNotDefined(key)) {
      throw new Error("removeDataAttribute is missing an argument. Please provide a single data attribute key.")
    }

    if (isString(key)) {
      throw new Error(`removeDataAttribute received the following argument: ${key}. Please provide a string.`)
    }

    const newDataAttributes = this.dataAttributes.filter(attr => attr[0] !== key)

    if (newDataAttributes.length === this.dataAttributes.length) {
      console.warn('data attributes cannot be found. The same object has been returned.')
      return this
    }

    return new EasyDom({ ...extractInitialValues(this), dataAttributes: newDataAttributes })
  }

  public removeAllDataAttributes = (): EasyDom => {
    if (this.dataAttributes.length === 0) {
      console.warn('data attributes property is already empty. The same object has been returned.')
      return this
    }

    return new EasyDom({ ... extractInitialValues(this), dataAttributes: [] })
  }

  public withInnerText = (innerText: string, concat: boolean = false): EasyDom => {
    if (isNotDefined(innerText)) {
      throw new Error(`withInnerText is missing an argument. Please provide a string.`)
    }

    if (isString(innerText)) {
      throw new Error(`withInnerText received the following argument: ${innerText}. Please provide a string.`)
    }

    const _innerText = concat ? this.innerText + innerText : innerText
    return new EasyDom({ ...extractInitialValues(this), innerText: _innerText })
  }

  public removeInnerText = (): EasyDom => {
    if (isNotDefined(this.innerText)) {
      console.warn('innerText property is already empty. The same object has been returned.')
      return this
    }

    return new EasyDom({ ...extractInitialValues(this), innerText: undefined })
  }

  public copy = (initObj?: InitialValues): EasyDom => new EasyDom({ ...extractInitialValues(this), ...(initObj ? initObj : null) })

  public appendTo = (query: string): EasyDom => {
    if (isNotDefined(query)) {
      throw new Error("appendTo is missing an argument. Please provide a string (query) as the argument.")
    }

    if (isString(query)) {
      throw new Error(`appendTo received the following argument: ${query}. Please provide a string.`)
    }

    if (!this.element) {
      throw new Error("There is no element that could be appended.");
    }

    const target = document.querySelector(query)

    if (!target) {
      throw new Error("Couldn't find target element.")
    }
    
    target.appendChild(this.element)
    return this
  }

  public prependTo = (query: string): EasyDom => {
    if (isNotDefined(query)) {
      throw new Error("prependTo is missing an argument. Please provide a string (query) as the argument.")
    }

    if (isString(query)) {
      throw new Error(`prependTo received the following argument: ${query}. Please provide a string.`)
    }

    if (!this.element) {
      throw new Error("There is no element that could be prepended.");
    }

    const target = document.querySelector(query)

    if (!target) {
      throw new Error("Couldn't find target element.")
    }
    
    target.prepend(this.element)
    return this
  }

  public make = (): EasyDom => new EasyDom({ ...extractInitialValues(this) })
}

class EasyDomAnchor extends EasyDom implements iEasyDomAnchor {
  href?: string
  target?: AnchorTarget

  constructor(initialValues?: AnchorInitialValues) {
    super(initialValues)

    this.href = initialValues?.href
    this.target = initialValues?.target
    this.element = initialValues?.element || makeElement('a')

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
    if (isNotDefined(this.target)) {
      console.warn('target property is already empty. The same object has been returned.')
      return this
    }

    return new EasyDomAnchor({ ...extractAnchorInitialValues(this), target: undefined })
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

  withTarget = (target: AnchorTarget): iEasyDomAnchor => {
    if (isNotDefined(target)) {
      throw new Error(`withTarget is missing an argument. Please provide a string.`)
    }

    if (targetList.findIndex(t => t === target) === -1) {
      throw new Error(`withTarget only accepts the following arguments: '_self', '_blank', '_parent', '_top'`)
    }

    return new EasyDomAnchor({ ...extractAnchorInitialValues(this), target })
  }
}

class EasyDomImg extends EasyDom implements iEasyDomImg {
  alt?: string
  height?: number
  src?: string
  width?: number

  constructor(initialValues?: ImgInitialValues) {
    super(initialValues)

    this.alt = initialValues?.alt
    this.element = initialValues?.element || makeElement('span')
    this.height = initialValues?.height
    this.src = initialValues?.src
    this.width = initialValues?.width

    // Side-effect
    updateImgElement(this)
  }

  removeAlt = (): iEasyDomImg => {
    if (isNotDefined(this.alt)) {
      console.warn('alt property is already empty. The same object has been returned.')
      return this
    }

    return new EasyDomImg({ ...extractInitObjectImg(this), alt: undefined })
  }

  removeDimension = (): iEasyDomImg => {
    if (isNotDefined(this.height) && isNotDefined(this.width)) {
      console.warn('height and width properties are already empty. The same object has been returned.')
      return this
    }

    return new EasyDomImg({ ...extractInitObjectImg(this), height: undefined, width: undefined })
  }

  removeHeight = (): iEasyDomImg => {
    if (isNotDefined(this.height)) {
      console.warn('height property is already empty. The same object has been returned.')
      return this
    }

    return new EasyDomImg({ ...extractInitObjectImg(this), height: undefined })
  }

  removeSrc = (): iEasyDomImg => {
    if (isNotDefined(this.src)) {
      console.warn('src property is already empty. The same object has been returned.')
      return this
    }

    return new EasyDomImg({ ...extractInitObjectImg(this), src: undefined })
  }

  removeWidth = (): iEasyDomImg => {
    if (isNotDefined(this.width)) {
      console.warn('width property is already empty. The same object has been returned.')
      return this
    }

    return new EasyDomImg({ ...extractInitObjectImg(this), width: undefined })
  }

  withAlt = (alt: string): iEasyDomImg => {
    if (isNotDefined(alt)) {
      throw new Error(`withAlt is missing an argument. Please provide a string.`)
    }

    if (!isString(alt)) {
      throw new Error(`withAlt received the following argument: ${alt}. Please provide a string.`)
    }

    return new EasyDomImg({ ...extractInitObjectImg(this), alt })
  }

  withDimension = (dimension: Dimension): iEasyDomImg => {
    if (isNotDefined(dimension)) {
      throw new Error(`withDimension is missing an argument. Please provide an object with heigh and width properties.`)
    }

    return new EasyDomImg({ ...extractInitObjectImg(this), height: dimension?.height, width:  dimension?.width })
  }

  withHeight = (height: number | string): iEasyDomImg => {
    if (isNotDefined(height)) {
      throw new Error(`withHeight is missing an argument. Please provide a string or number.`)
    }

    return new EasyDomImg({ ...extractInitObjectImg(this), height: getWidthOrHeight(height) })
  }

  withSrc = (src: string): iEasyDomImg => {
    if (isNotDefined(src)) {
      throw new Error(`withSrc is missing an argument. Please provide a string.`)
    }

    if (!isString(src)) {
      throw new Error(`withSrc received the following argument: ${src}. Please provide a string.`)
    }

    return new EasyDomImg({ ...extractInitObjectImg(this), src })
  }

  withWidth = (width: number | string): iEasyDomImg => {
    if (isNotDefined(width)) {
      throw new Error(`withWidth is missing an argument. Please provide a string or number.`)
    }

    return new EasyDomImg({ ...extractInitObjectImg(this), width: getWidthOrHeight(width) })
  }
}
