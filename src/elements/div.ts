import { makeElement, updateElement } from "../utils";
import { DomFns } from "./base";

export class DomFnsDiv extends DomFns implements iDomFnsSharedElement {
  element: HTMLElement;

  constructor(initialValues?: SharedElementInitialValues) {
    super(initialValues);
    this.element = makeElement("div");

    updateElement(this);
  }
}
