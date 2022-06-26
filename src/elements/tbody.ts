import { makeElement, updateElement } from "../utils";
import { DomFns } from "./base";

export class DomFnsTableBody extends DomFns implements iDomFnsSharedElement {
  element: HTMLElement;

  constructor(initialValues?: SharedElementInitialValues) {
    super(initialValues);
    this.element = makeElement("tbody");

    updateElement(this);
  }
}
