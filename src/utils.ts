import { allowedElementList, methodList, targetList } from "./constats"

export const isNotDefined = <T>(val: T): boolean => val === undefined || val === null

export const isString = <T>(val: T): boolean => typeof val === 'string'

export const isNumber = <T>(val: T): boolean => typeof val === 'number' && isNaN(val) === false

export const isStringTuple = (tuple: StringTuple): boolean => tuple.length === 2 && isString(tuple[0]) && isString(tuple[1])

export const isValidTarget = (anchorTarget: Target): boolean => targetList.findIndex(t => t === anchorTarget) === -1

export const isValidMethod = (method: Method): boolean => methodList.findIndex(m => m === method) === -1

export const removeInvalidValues = (data: StringTuple[]): StringTuple[] => data.filter(d => isStringTuple(d))

export const copyInitialValues = (entity: InitialValues): InitialValues => ({
  ...Object.assign({}, entity, {
    classNames: [...entity.classNames],
    dataAttributes: [...entity.dataAttributes.map(tuple => tuple.slice())],
  })
})

export const getWidthOrHeight = (arg: string | number): number => {
  if (typeof arg === 'string') return parseInt(arg, 10)
  if (typeof arg === 'number') return arg
  throw new Error(`${arg} is not a supported with/height type.`);
}

export const getValidClasses = (classNames?: ClassNames): string[] => {
  if (isNotDefined(classNames)) return []
  if(Array.isArray(classNames)) return classNames
  if(typeof classNames === 'string') return [classNames]
  throw new Error(`${classNames} is not a valid class type.`)
}

export const getValidAttributes = (data?: DataAttributes): StringTuple[] => {
  if (isNotDefined(data) || Array.isArray(data) && data.length === 0) return []
  if (!Array.isArray(data && data[0]) && isStringTuple(data as StringTuple)) return [data as StringTuple]
  if (data && Array.isArray(data[0])) {
    return removeInvalidValues(data as StringTuple[])
  }
  throw new Error(`${data} is not a valid data-attribute type`)
}

export const makeElement = (elStr: AllowedElement): HTMLElement => {
  if (!allowedElementList.includes(elStr)) {
    throw new Error(`${elStr} is not recognisable HTML element.`)
  }

  return document.createElement(elStr)
}

export const removeFromArray = <T>(array: T[], target: T): T[] => array.filter(a => a !== target)

export const mergeAttrArray = (attrArray: StringTuple[], newAttr: StringTuple): StringTuple[] => {
  const isExistingAttr = attrArray.findIndex(attr => attr[0] === newAttr[0])
  const index = isExistingAttr === -1 ? attrArray.length : isExistingAttr

  return Object.assign([], attrArray, { [index]: newAttr })
}

export const updateElement = (props: InitialValues, element?: HTMLElement): void => {
  const {
    classNames,
    dataAttributes,
    action,
    method,
    name,
    alt,
    for: _for,
    height,
    href,
    id,
    innerText,
    formTarget,
    anchorTarget,
    src,
    width,
  } = props

  if (element) {
    id && element.setAttribute("id", id)
    innerText && element.setAttribute("innerText", innerText)
    element.classList.add(...classNames.join(','))
    dataAttributes.forEach(([key, data]) => element.setAttribute(`data-${key}`, data))

    if (element.nodeName.toLowerCase() === 'a') {
      href && element.setAttribute('href', href)
      anchorTarget && element.setAttribute('target', anchorTarget)
    }

    if (element.nodeName.toLowerCase() === 'img') {
      alt && element.setAttribute('alt', alt)
      height && element.setAttribute('height', height.toString())
      src && element.setAttribute('src', src)
      width && element.setAttribute('width', width.toString())
    }

    if (element.nodeName.toLowerCase() === 'label') {
      _for && element.setAttribute('for', _for)
    }

    if (element.nodeName.toLowerCase() === 'form') {
      action && element.setAttribute('action', action)
      method && element.setAttribute('method', method)
      name && element.setAttribute('name', name)
      formTarget && element.setAttribute('target', formTarget)
    }
  }
}
