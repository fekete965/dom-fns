(function() {
  type AllowedElement =  'a' | 'article' | 'aside' | 'details' | 'b' | 'br' | 'caption' | 'dialog' | 'div' | 'footer' | 'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'header' | 'img' | 'label' | 'li' | 'nav' | 'main' | 'ol' | 'p' | 'section' | 'span' | 'strong' | 'table' | 'tbody' | 'td' | 'tfoot' | 'th' | 'thead' | 'tr' | 'ul'
  const allowedElementList: AllowedElement[] = ['a', 'article', 'aside', 'details', 'b', 'br', 'caption', 'dialog', 'div', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'img', 'label', 'li', 'nav', 'main', 'ol', 'p', 'section', 'span', 'strong', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul']

  }

    }





    }

  }

  class easyDom {
    classNames: string[] = []
    dataAttributes: DataAttribute[] = []
    element: HTMLElement | null = null
    id?: string
    innerText?: string

    constructor(initObj?: InitObject) {
      const _element = initObj?.element || null
      const _classes = getValidClasses(initObj?.classNames)
      const _dataAttributes = getValidAttributes(initObj?.dataAttributes)
      const _id = initObj?.id || undefined
      const _innerText = initObj?.innerText || undefined

      this.classNames = _classes
      this.dataAttributes = _dataAttributes
      this.element = _element
      this.id = _id
      this.innerText = _innerText

      // Side-effect
      updateElement(this)
    }

    // TODO: more support for "a"
    public a = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('a') })
    public article = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('article') })
    public aside = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('aside') })
    public details = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('details') })
    public b = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('b') })
    public br = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('br') })
    public caption = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('caption') })
    // TODO: more support for "dialog"
    public dialog = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('dialog') })
    public div = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('div') })
    public footer = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('footer') })
    // TODO: more support for "form"
    public form = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('form') })
    public h1 = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('h1') })
    public h2 = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('h2') })
    public h3 = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('h3') })
    public h4 = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('h4') })
    public h5 = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('h5') })
    public h6 = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('h6') })
    public header = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('header') })
    // TODO: more support for an "img"
    public img = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('img') })
    // TODO: more support for a "label"
    public label = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('label') })
    public li = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('li') })
    public nav = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('nav') })
    public main = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('main') })
    public ol = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('ol') })
    public p = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('p') })
    public section = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('section') })
    public span = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('span') })
    public strong = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('strong') })
    public table = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('table') })
    public tbody = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('tbody') })
    public td = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('td') })
    public tfoot = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('tfoot') })
    public th = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('th') })
    public thead = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('thead') })
    public tr = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('tr') })
    public ul = (): easyDom => new easyDom({ ...extractInitObject(this), element: makeElement('ul') })

    public withClass = (classNames: ClassNames): easyDom => {
      if (isNotDefined(classNames)) {
        throw new Error("withClass is missing an argument. Please provide a single classname or a list of classnames.")
      }

      if (typeof classNames === 'string') {
        return new easyDom({ ...extractInitObject(this), classNames: [...this.classNames, classNames] })  
      }

      if (Array.isArray(classNames)) {
        const nextClassName = classNames.length ? classNames[0] : undefined

        if (nextClassName !== undefined) {
         const classNamesRemainder = classNames.slice(1)

          return new easyDom({ ...extractInitObject(this), classNames: [...this.classNames, nextClassName] }).withClass(classNamesRemainder)
        }

        return new easyDom({ ...extractInitObject(this) })
      }

      throw new Error(`Unsupported argument passed to withClass: ${classNames}`)
    }

    public removeClass = (classNames: ClassNames): easyDom => {
      if (isNotDefined(classNames)) {
        throw new Error(`Invalid classNames passed to removeClass: ${classNames}`)
      }

      if (Array.isArray(classNames)) {
        const removableClassName = classNames.length ? classNames[0] : undefined

        if (removableClassName !== undefined) {
          const classNameRemainder = classNames.slice(1)
          const newClassNames = removeFromArray(this.classNames, removableClassName)

          return new easyDom({ ...extractInitObject(this), classNames: newClassNames }).removeClass(classNameRemainder) 
        }
        
        return new easyDom({ ...extractInitObject(this) })
      }

      if (typeof classNames === 'string') {
        return new easyDom({ ...extractInitObject(this), classNames: removeFromArray<string>(this.classNames, classNames) })
      }

      throw new Error(`Unsupported argument passed to removeClass: ${classNames}`)
    }

    public removeAllClasses = (): easyDom => new easyDom({ ...extractInitObject(this), classNames: [] })

    public withId = (id: string): easyDom => {
      if (isNotDefined(id)) {
        throw new Error("withId is missing an argument. Please provide a single id.")
      }

      return new easyDom({ ...extractInitObject(this), id })
    }

    public removeId = (): easyDom => new easyDom({ ...extractInitObject(this), id: undefined })

    public withDataAttribute = (data: DataAttributes): easyDom => {
      if (isNotDefined(data)) {
        throw new Error(`withDataAttribute is missing an argument ${data}. Please provide a tuple or a list of tuples.`)
      }

      if (!Array.isArray(data[0]) && isStringTuple(data as DataAttribute)) {
        return new easyDom({ ...extractInitObject(this), dataAttributes: mergeAttrArray(this.dataAttributes, data as DataAttribute) })  
      }

      if (Array.isArray(data[0])) {
        const cleanedData = removeInvalidValues(data as DataAttribute[])
        const nextData = cleanedData.length ? cleanedData[0] : undefined

        if (nextData !== undefined) {
          const dataRemainder = data.slice(1) as DataAttribute[]
          
          return new easyDom({ ...extractInitObject(this), dataAttributes: mergeAttrArray(this.dataAttributes, nextData) }).withDataAttribute(dataRemainder)
        }
        
        return new easyDom({ ...extractInitObject(this) })
      }

      if (Array.isArray(data) && data.length === 0) {
        return new easyDom({ ...extractInitObject(this) })
      }

      throw new Error(`Unsupported argument passed to withDataAttribute: ${data}`)
    }

    public removeDataAttribute = (key: string): easyDom => {
      if (isNotDefined(key)) {
        throw new Error("removeDataAttribute is missing an argument. Please provide a single data attribute key.")
      }

      const dataAttributes = this.dataAttributes.filter(attr => attr[0] !== key)
      return new easyDom({ ...extractInitObject(this), dataAttributes })
    }

    public removeAllDataAttributes = (): easyDom => new easyDom({ ... extractInitObject(this), dataAttributes: [] })

    public withInnerText = (innerText: string, concat: boolean = false): easyDom => {
      if (isNotDefined(innerText)) {
        throw new Error(`withInnerText is missing an argument ${innerText}. Please provide a string.`)
      }

      const _innerText = concat ? this.innerText + innerText : innerText
      return new easyDom({ ...extractInitObject(this), innerText: _innerText })
    }

    public removeInnerText = (): easyDom => new easyDom({ ...extractInitObject(this), innerText: undefined })

    public copy = (initObj?: InitObject): easyDom => new easyDom({ ...extractInitObject(this), ...(initObj ? initObj : null) })

    public appendTo = (query: string): easyDom => {
      if (isNotDefined(query)) {
        throw new Error("appendTo is missing an argument. Please provide a string (query) as the argument.")
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

    public prependTo = (query: string): easyDom => {
      if (isNotDefined(query)) {
        throw new Error("prependTo is missing an argument. Please provide a string (query) as the argument.")
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

    public make = (): easyDom => new easyDom({ ...extractInitObject(this) })

    // TODO: createFrom() <-- try to find the element and create the object from it
  }
}())

















































