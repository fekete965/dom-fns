import { makeElement, updateElement } from "../utils";
import { DomFns } from "./base";

export class DomFnsHeading3 extends DomFns implements iDomFnsSharedElement {
  element: HTMLElement;

  constructor(initialValues?: SharedElementInitialValues) {
    super(initialValues);
    this.element = makeElement("h3");

    updateElement(this);
  }
}
