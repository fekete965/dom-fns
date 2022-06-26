import { makeElement, updateElement } from "../utils";
import { DomFns } from "./base";

export class DomFnsTable extends DomFns implements iDomFnsSharedElement {
  element: HTMLElement;

  constructor(initialValues?: SharedElementInitialValues) {
    super(initialValues);
    this.element = makeElement("table");

    updateElement(this);
  }
}
