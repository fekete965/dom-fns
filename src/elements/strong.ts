import { makeElement, updateElement } from "../utils";
import { DomFns } from "./base";

export class DomFnsStrong extends DomFns implements iDomFnsSharedElement {
  element: HTMLElement;

  constructor(initialValues?: SharedElementInitialValues) {
    super(initialValues);
    this.element = makeElement("strong");

    updateElement(this);
  }
}
