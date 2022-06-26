import { targetList } from "../constats";
import { DomFns } from "./base";
import {
  copyInitialValues,
  isNotDefined,
  isString,
  makeElement,
  updateElement,
} from "../utils";

export class DomFnsLabel extends DomFns implements iDomFnsLabel {
  element: HTMLElement;

  for?: string;

  constructor(initialValues?: LabelInitialValues) {
    super(initialValues);

    this.element = makeElement("label");
    this.for = initialValues?.for;

    updateElement(this);
  }

  removeFor = (): iDomFnsLabel => {
    if (isNotDefined(this.for)) {
      console.warn(
        "for property is already empty. The same object has been returned."
      );
      return this;
    }
    return new DomFnsLabel({ ...copyInitialValues(this), for: undefined });
  };

  withFor = (value: string): iDomFnsLabel => {
    if (isNotDefined(value)) {
      throw new Error();
    }

    if (!isString(value)) {
      throw new Error(
        `withFor received the following argument: ${value}. Please provide a string.`
      );
    }

    return new DomFnsLabel({ ...copyInitialValues(this), for: value });
  };
}
