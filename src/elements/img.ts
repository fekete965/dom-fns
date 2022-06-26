import {
  copyInitialValues,
  getWidthOrHeight,
  isNotDefined,
  isNumber,
  isString,
  makeElement,
  updateElement,
} from "../utils";
import { DomFns } from "./base";

export class DomFnsImg extends DomFns implements iDomFnsImg {
  element: HTMLElement;

  alt?: string;
  height?: number;
  src?: string;
  width?: number;

  constructor(initialValues?: ImgInitialValues) {
    super(initialValues);

    this.alt = initialValues?.alt;
    this.element = makeElement("span");
    this.height = initialValues?.height;
    this.src = initialValues?.src;
    this.width = initialValues?.width;

    // Side-effect
    updateElement(this);
  }

  removeAlt = (): iDomFnsImg => {
    if (isNotDefined(this.alt)) {
      console.warn(
        "alt property is already empty. The same object has been returned."
      );
      return this;
    }

    return new DomFnsImg({ ...copyInitialValues(this), alt: undefined });
  };

  removeDimension = (): iDomFnsImg => {
    if (isNotDefined(this.height) && isNotDefined(this.width)) {
      console.warn(
        "height and width properties are already empty. The same object has been returned."
      );
      return this;
    }

    return new DomFnsImg({
      ...copyInitialValues(this),
      height: undefined,
      width: undefined,
    });
  };

  removeHeight = (): iDomFnsImg => {
    if (isNotDefined(this.height)) {
      console.warn(
        "height property is already empty. The same object has been returned."
      );
      return this;
    }

    return new DomFnsImg({ ...copyInitialValues(this), height: undefined });
  };

  removeSrc = (): iDomFnsImg => {
    if (isNotDefined(this.src)) {
      console.warn(
        "src property is already empty. The same object has been returned."
      );
      return this;
    }

    return new DomFnsImg({ ...copyInitialValues(this), src: undefined });
  };

  removeWidth = (): iDomFnsImg => {
    if (isNotDefined(this.width)) {
      console.warn(
        "width property is already empty. The same object has been returned."
      );
      return this;
    }

    return new DomFnsImg({ ...copyInitialValues(this), width: undefined });
  };

  withAlt = (alt: string): iDomFnsImg => {
    if (isNotDefined(alt)) {
      throw new Error(
        `withAlt is missing an argument. Please provide a string.`
      );
    }

    if (!isString(alt)) {
      throw new Error(
        `withAlt received the following argument: ${alt}. Please provide a string.`
      );
    }

    return new DomFnsImg({ ...copyInitialValues(this), alt });
  };

  withDimension = (dimension: Dimension): iDomFnsImg => {
    if (isNotDefined(dimension)) {
      throw new Error(
        `withDimension is missing an argument. Please provide an object with heigh and width properties.`
      );
    }

    return new DomFnsImg({
      ...copyInitialValues(this),
      height: dimension?.height,
      width: dimension?.width,
    });
  };

  withHeight = (height: number | string): iDomFnsImg => {
    if (isNotDefined(height)) {
      throw new Error(
        `withHeight is missing an argument. Please provide a string or number.`
      );
    }

    if (isString(height) || isNumber(height)) {
      return new DomFnsImg({
        ...copyInitialValues(this),
        height: getWidthOrHeight(height),
      });
    }

    throw new Error(
      `withWidth received the following argument: ${height}. Please provide a string.`
    );
  };

  withSrc = (src: string): iDomFnsImg => {
    if (isNotDefined(src)) {
      throw new Error(
        `withSrc is missing an argument. Please provide a string.`
      );
    }

    if (!isString(src)) {
      throw new Error(
        `withSrc received the following argument: ${src}. Please provide a string.`
      );
    }

    return new DomFnsImg({ ...copyInitialValues(this), src });
  };

  withWidth = (width: number | string): iDomFnsImg => {
    if (isNotDefined(width)) {
      throw new Error(
        `withWidth is missing an argument. Please provide a string or number.`
      );
    }

    if (isString(width) || isNumber(width)) {
      return new DomFnsImg({
        ...copyInitialValues(this),
        width: getWidthOrHeight(width),
      });
    }

    throw new Error(
      `withWidth received the following argument: ${width}. Please provide a string.`
    );
  };
}
