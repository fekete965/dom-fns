import { DomFnsAnchor } from "./anchor";
import {
  copyInitialValues,
  getValidAttributes,
  getValidClasses,
  isNotDefined,
  isString,
  isStringTuple,
  mergeAttrArray,
  removeFromArray,
  removeInvalidValues,
  updateElement,
} from "../utils";
import { DomFnsForm } from "./form";

export class DomFns implements iDomFns {
  classNames: string[] = [];
  dataAttributes: StringTuple[] = [];
  element: HTMLElement | null = null;
  id?: string;
  innerText?: string;

  constructor(initialValues?: InitialValues) {
    this.classNames = getValidClasses(initialValues?.classNames);
    this.dataAttributes = getValidAttributes(initialValues?.dataAttributes);
    this.id = initialValues?.id || undefined;
    this.innerText = initialValues?.innerText || undefined;

    // Side-effect
    updateElement(this);
  }

  public a = (): DomFnsAnchor => new DomFnsAnchor(copyInitialValues(this));
  public article = (): DomFns => new DomFns(copyInitialValues(this));
  public aside = (): DomFns => new DomFns(copyInitialValues(this));
  public details = (): DomFns => new DomFns(copyInitialValues(this));
  public b = (): DomFns => new DomFns(copyInitialValues(this));
  public br = (): DomFns => new DomFns(copyInitialValues(this));
  public caption = (): DomFns => new DomFns(copyInitialValues(this));
  public div = (): DomFns => new DomFns(copyInitialValues(this));
  public footer = (): DomFns => new DomFns(copyInitialValues(this));
  public form = (): DomFnsForm => new DomFnsForm(copyInitialValues(this));
  public h1 = (): DomFns => new DomFns(copyInitialValues(this));
  public h2 = (): DomFns => new DomFns(copyInitialValues(this));
  public h3 = (): DomFns => new DomFns(copyInitialValues(this));
  public h4 = (): DomFns => new DomFns(copyInitialValues(this));
  public h5 = (): DomFns => new DomFns(copyInitialValues(this));
  public h6 = (): DomFns => new DomFns(copyInitialValues(this));
  public header = (): DomFns => new DomFns(copyInitialValues(this));
  public img = (): DomFns => new DomFns(copyInitialValues(this));
  public label = (): DomFns => new DomFns(copyInitialValues(this));
  public li = (): DomFns => new DomFns(copyInitialValues(this));
  public nav = (): DomFns => new DomFns(copyInitialValues(this));
  public main = (): DomFns => new DomFns(copyInitialValues(this));
  public ol = (): DomFns => new DomFns(copyInitialValues(this));
  public p = (): DomFns => new DomFns(copyInitialValues(this));
  public section = (): DomFns => new DomFns(copyInitialValues(this));
  public span = (): DomFns => new DomFns(copyInitialValues(this));
  public strong = (): DomFns => new DomFns(copyInitialValues(this));
  public table = (): DomFns => new DomFns(copyInitialValues(this));
  public tbody = (): DomFns => new DomFns(copyInitialValues(this));
  public td = (): DomFns => new DomFns(copyInitialValues(this));
  public tfoot = (): DomFns => new DomFns(copyInitialValues(this));
  public th = (): DomFns => new DomFns(copyInitialValues(this));
  public thead = (): DomFns => new DomFns(copyInitialValues(this));
  public tr = (): DomFns => new DomFns(copyInitialValues(this));
  public ul = (): DomFns => new DomFns(copyInitialValues(this));

  public withClass = (classNames: ClassNames): DomFns => {
    if (isNotDefined(classNames)) {
      throw new Error(
        "withClass is missing an argument. Please provide a single classname or a list of classnames."
      );
    }

    if (typeof classNames === "string") {
      return new DomFns({
        ...copyInitialValues(this),
        classNames: [...this.classNames, classNames],
      });
    }

    if (Array.isArray(classNames)) {
      const nextClassName = classNames.length ? classNames[0] : undefined;

      if (nextClassName !== undefined) {
        const classNamesRemainder = classNames.slice(1);

        return new DomFns({
          ...copyInitialValues(this),
          classNames: [...this.classNames, nextClassName],
        }).withClass(classNamesRemainder);
      }

      return new DomFns({ ...copyInitialValues(this) });
    }

    throw new Error(`Unsupported argument passed to withClass: ${classNames}`);
  };

  public removeClass = (classNames: ClassNames): DomFns => {
    if (this.classNames.length === 0) {
      console.warn(
        "class property is already empty. The same object has been returned."
      );
      return this;
    }

    if (isNotDefined(classNames)) {
      throw new Error(
        `Invalid classNames passed to removeClass: ${classNames}`
      );
    }

    if (Array.isArray(classNames)) {
      const removableClassName = classNames.length ? classNames[0] : undefined;

      if (removableClassName !== undefined) {
        const classNameRemainder = classNames.slice(1);
        const newClassNames = removeFromArray(
          this.classNames,
          removableClassName
        );

        return new DomFns({
          ...copyInitialValues(this),
          classNames: newClassNames,
        }).removeClass(classNameRemainder);
      }

      return new DomFns({ ...copyInitialValues(this) });
    }

    if (typeof classNames === "string") {
      return new DomFns({
        ...copyInitialValues(this),
        classNames: removeFromArray<string>(this.classNames, classNames),
      });
    }

    throw new Error(
      `Unsupported argument passed to removeClass: ${classNames}`
    );
  };

  public removeAllClasses = (): DomFns => {
    if (this.classNames.length === 0) {
      console.warn(
        "class property is already empty. The same object has been returned."
      );
      return this;
    }

    return new DomFns({ ...copyInitialValues(this), classNames: [] });
  };

  public withId = (id: string): DomFns => {
    if (isNotDefined(id)) {
      throw new Error(
        "withId is missing an argument. Please provide a single id."
      );
    }

    if (isString(id)) {
      throw new Error(
        `withId received the following argument: ${id}. Please provide a string.`
      );
    }

    return new DomFns({ ...copyInitialValues(this), id });
  };

  public removeId = (): DomFns => {
    if (isNotDefined(this.id)) {
      console.warn(
        "id property is already empty. The same object has been returned."
      );
      return this;
    }

    return new DomFns({ ...copyInitialValues(this), id: undefined });
  };

  public withDataAttribute = (data: DataAttributes): DomFns => {
    if (isNotDefined(data)) {
      throw new Error(
        `withDataAttribute is missing an argument. Please provide a tuple or a list of tuples.`
      );
    }

    if (!Array.isArray(data[0]) && isStringTuple(data as StringTuple)) {
      return new DomFns({
        ...copyInitialValues(this),
        dataAttributes: mergeAttrArray(
          this.dataAttributes,
          data as StringTuple
        ),
      });
    }

    if (Array.isArray(data[0])) {
      const cleanedData = removeInvalidValues(data as StringTuple[]);
      const nextData = cleanedData.length ? cleanedData[0] : undefined;

      if (nextData !== undefined) {
        const dataRemainder = data.slice(1) as StringTuple[];

        return new DomFns({
          ...copyInitialValues(this),
          dataAttributes: mergeAttrArray(this.dataAttributes, nextData),
        }).withDataAttribute(dataRemainder);
      }

      return new DomFns({ ...copyInitialValues(this) });
    }

    if (Array.isArray(data) && data.length === 0) {
      return new DomFns({ ...copyInitialValues(this) });
    }

    throw new Error(
      `Unsupported argument passed to withDataAttribute: ${data}`
    );
  };

  public removeDataAttribute = (key: string): DomFns => {
    if (isNotDefined(key)) {
      throw new Error(
        "removeDataAttribute is missing an argument. Please provide a single data attribute key."
      );
    }

    if (isString(key)) {
      throw new Error(
        `removeDataAttribute received the following argument: ${key}. Please provide a string.`
      );
    }

    const newDataAttributes = this.dataAttributes.filter(
      (attr) => attr[0] !== key
    );

    if (newDataAttributes.length === this.dataAttributes.length) {
      console.warn(
        "data attributes cannot be found. The same object has been returned."
      );
      return this;
    }

    return new DomFns({
      ...copyInitialValues(this),
      dataAttributes: newDataAttributes,
    });
  };

  public removeAllDataAttributes = (): DomFns => {
    if (this.dataAttributes.length === 0) {
      console.warn(
        "data attributes property is already empty. The same object has been returned."
      );
      return this;
    }

    return new DomFns({ ...copyInitialValues(this), dataAttributes: [] });
  };

  public withInnerText = (
    innerText: string,
    concat: boolean = false
  ): DomFns => {
    if (isNotDefined(innerText)) {
      throw new Error(
        `withInnerText is missing an argument. Please provide a string.`
      );
    }

    if (isString(innerText)) {
      throw new Error(
        `withInnerText received the following argument: ${innerText}. Please provide a string.`
      );
    }

    const _innerText = concat ? this.innerText + innerText : innerText;
    return new DomFns({ ...copyInitialValues(this), innerText: _innerText });
  };

  public removeInnerText = (): DomFns => {
    if (isNotDefined(this.innerText)) {
      console.warn(
        "innerText property is already empty. The same object has been returned."
      );
      return this;
    }

    return new DomFns({ ...copyInitialValues(this), innerText: undefined });
  };

  public copy = (initObj?: InitialValues): DomFns =>
    new DomFns({ ...copyInitialValues(this), ...(initObj ? initObj : null) });

  public appendTo = (query: string): DomFns => {
    if (isNotDefined(query)) {
      throw new Error(
        "appendTo is missing an argument. Please provide a string (query) as the argument."
      );
    }

    if (isString(query)) {
      throw new Error(
        `appendTo received the following argument: ${query}. Please provide a string.`
      );
    }

    if (!this.element) {
      throw new Error("There is no element that could be appended.");
    }

    const target = document.querySelector(query);

    if (!target) {
      throw new Error("Couldn't find target element.");
    }

    target.appendChild(this.element);
    return this;
  };

  public prependTo = (query: string): DomFns => {
    if (isNotDefined(query)) {
      throw new Error(
        "prependTo is missing an argument. Please provide a string (query) as the argument."
      );
    }

    if (isString(query)) {
      throw new Error(
        `prependTo received the following argument: ${query}. Please provide a string.`
      );
    }

    if (!this.element) {
      throw new Error("There is no element that could be prepended.");
    }

    const target = document.querySelector(query);

    if (!target) {
      throw new Error("Couldn't find target element.");
    }

    target.prepend(this.element);
    return this;
  };

  public make = (): DomFns => new DomFns({ ...copyInitialValues(this) });
}
