import { EasyDomAnchor } from "./anchor"
import { extractInitialValues as extractInitialValues, getValidAttributes, getValidClasses, isNotDefined, isString, isStringTuple, makeElement, mergeAttrArray, removeFromArray, removeInvalidValues, updateElement } from "../utils"
import { EasyDomForm } from "./form"

export class EasyDom implements iEasyDom {
  classNames: string[] = []
  dataAttributes: StringTuple[] = []
  element: HTMLElement | null = null
  id?: string
  innerText?: string

  constructor(initialValues?: InitialValues) {
    this.classNames = getValidClasses(initialValues?.classNames)
    this.dataAttributes = getValidAttributes(initialValues?.dataAttributes)
    this.id = initialValues?.id || undefined
    this.innerText = initialValues?.innerText || undefined

    
    // Side-effect
    updateElement(this)
  }

  public a = (): EasyDomAnchor => new EasyDomAnchor(this)
  public article = (): EasyDom => new EasyDom(this)
  public aside = (): EasyDom => new EasyDom(this)
  public details = (): EasyDom => new EasyDom(this)
  public b = (): EasyDom => new EasyDom(this)
  public br = (): EasyDom => new EasyDom(this)
  public caption = (): EasyDom => new EasyDom(this)
  public div = (): EasyDom => new EasyDom(this)
  public footer = (): EasyDom => new EasyDom(this)
  public form = (): EasyDomForm => new EasyDomForm(this)
  public h1 = (): EasyDom => new EasyDom(this)
  public h2 = (): EasyDom => new EasyDom(this)
  public h3 = (): EasyDom => new EasyDom(this)
  public h4 = (): EasyDom => new EasyDom(this)
  public h5 = (): EasyDom => new EasyDom(this)
  public h6 = (): EasyDom => new EasyDom(this)
  public header = (): EasyDom => new EasyDom(this)
  public img = (): EasyDom => new EasyDom(this)
  public label = (): EasyDom => new EasyDom(this)
  public li = (): EasyDom => new EasyDom(this)
  public nav = (): EasyDom => new EasyDom(this)
  public main = (): EasyDom => new EasyDom(this)
  public ol = (): EasyDom => new EasyDom(this)
  public p = (): EasyDom => new EasyDom(this)
  public section = (): EasyDom => new EasyDom(this)
  public span = (): EasyDom => new EasyDom(this)
  public strong = (): EasyDom => new EasyDom(this)
  public table = (): EasyDom => new EasyDom(this)
  public tbody = (): EasyDom => new EasyDom(this)
  public td = (): EasyDom => new EasyDom(this)
  public tfoot = (): EasyDom => new EasyDom(this)
  public th = (): EasyDom => new EasyDom(this)
  public thead = (): EasyDom => new EasyDom(this)
  public tr = (): EasyDom => new EasyDom(this)
  public ul = (): EasyDom => new EasyDom(this)

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
