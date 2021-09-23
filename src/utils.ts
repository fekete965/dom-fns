import { allowedElementList } from "./constats"

export const isNotDefined = <T>(val: T): boolean => val === undefined || val === null

export const isString = <T>(val: T): boolean => typeof val === 'string'

export const isStringTuple = (tuple: StringTuple): boolean => tuple.length === 2 && isString(tuple[0]) && isString(tuple[1])

export const removeInvalidValues = (data: StringTuple[]): StringTuple[] => data.filter(d => isStringTuple(d))

export const extractInitObject = (entity: iEasyDom): InitialValues => ({
  classNames: [...entity.classNames],
  dataAttributes: [...entity.dataAttributes],
  element: entity.element ? makeElement(entity.element.localName as AllowedElement) : null,
  id: entity.id,
  innerText: entity.innerText,
})

export const extractInitObjectAnchor = (entity: iEasyDomAnchor): AnchorInitialValues => ({
  classNames: [...entity.classNames],
  dataAttributes: [...entity.dataAttributes],
  element: entity.element ? makeElement(entity.element.localName as AllowedElement) : null,
  href: entity?.href,
  id: entity.id,
  innerText: entity.innerText,
  target: entity?.target,
})

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

export const updateElement = (props: UpdateElementProps): void => {
  const { classNames, dataAttributes, element, href, id, innerText, target } = props

  if (element) {
    if (id) element.id = id
    if (innerText) element.innerText = innerText
    classNames.forEach(c => element.classList.add(c))
    dataAttributes.forEach(([key, data]) => element.setAttribute(`data-${key}`, data))
  }
}

export const updateAnchorElement = (entity: UpdateElementProps): void => {
  const { element, href, target, } = entity

  updateElement(entity)
  if (element) {
    if (href) element.setAttribute('href', href)
    if (target) element.setAttribute('target', target)
  }
}