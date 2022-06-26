import {
  copyInitialValues,
  isNotDefined,
  isString,
  makeElement,
  updateElement,
  isValidTarget,
} from "../utils";
import { DomFns } from "./base";

export class DomFnsAnchor extends DomFns implements iDomFnsAnchor {
  element: HTMLElement;

  anchorTarget?: Target;
  href?: string;

  constructor(initialValues?: AnchorInitialValues) {
    super(initialValues);

    this.href = initialValues?.href;
    this.anchorTarget = initialValues?.anchorTarget;
    this.element = makeElement("a");

    updateElement(this);
  }

  removeHref = (): iDomFnsAnchor => {
    if (isNotDefined(this.href)) {
      console.warn(
        "href property is already empty. The same object has been returned."
      );
      return this;
    }

    return new DomFnsAnchor({ ...copyInitialValues(this), href: undefined });
  };

  removeTarget = (): iDomFnsAnchor => {
    if (isNotDefined(this.anchorTarget)) {
      console.warn(
        "anchorTarget property is already empty. The same object has been returned."
      );
      return this;
    }

    return new DomFnsAnchor({
      ...copyInitialValues(this),
      anchorTarget: undefined,
    });
  };

  withHref = (href: string): iDomFnsAnchor => {
    if (isNotDefined(href)) {
      throw new Error(
        `withHref is missing an argument. Please provide a string.`
      );
    }

    if (!isString(href)) {
      throw new Error(
        `withHref received the following argument: ${href}. Please provide a string.`
      );
    }

    return new DomFnsAnchor({ ...copyInitialValues(this), href });
  };

  withTarget = (anchorTarget: Target): iDomFnsAnchor => {
    if (isNotDefined(anchorTarget)) {
      throw new Error(
        `withTarget is missing an argument. Please provide a string.`
      );
    }

    if (!isString(anchorTarget)) {
      throw new Error(
        `withTarget received the following argument: ${anchorTarget}. Please provide a string.`
      );
    }

    if (isValidTarget(anchorTarget)) {
      throw new Error(
        `withTarget only accepts the following arguments: '_self', '_blank', '_parent', '_top'`
      );
    }

    return new DomFnsAnchor({ ...copyInitialValues(this), anchorTarget });
  };
}
