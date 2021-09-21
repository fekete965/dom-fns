"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  var allowedElementList = ['a', 'article', 'aside', 'details', 'b', 'br', 'caption', 'dialog', 'div', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'img', 'label', 'li', 'nav', 'main', 'ol', 'p', 'section', 'span', 'strong', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul']; // HELPERS

  var isNotDefined = function isNotDefined(val) {
    return val === undefined || val === null;
  };

  var isString = function isString(val) {
    return typeof val === 'string';
  };

  var isStringTuple = function isStringTuple(tuple) {
    return tuple.length === 2 && isString(tuple[0]) && isString(tuple[1]);
  };

  var removeInvalidValues = function removeInvalidValues(data) {
    return data.filter(function (d) {
      return isStringTuple(d);
    });
  };

  var extractInitObject = function extractInitObject(entity) {
    return {
      classNames: _toConsumableArray(entity.classNames),
      dataAttributes: _toConsumableArray(entity.dataAttributes),
      element: entity.element ? makeElement(entity.element.localName) : null,
      id: entity.id,
      innerText: entity.innerText
    };
  };

  var getValidClasses = function getValidClasses(classNames) {
    if (isNotDefined(classNames)) return [];
    if (Array.isArray(classNames)) return classNames;
    if (typeof classNames === 'string') return [classNames];
    throw new Error("".concat(classNames, " is not a valid class type."));
  };

  var getValidAttributes = function getValidAttributes(data) {
    if (isNotDefined(data) || Array.isArray(data) && data.length === 0) return [];
    if (!Array.isArray(data && data[0]) && isStringTuple(data)) return [data];

    if (data && Array.isArray(data[0])) {
      return removeInvalidValues(data);
    }

    throw new Error("".concat(data, " is not a valid data-attribute type"));
  };

  var makeElement = function makeElement(elStr) {
    if (!allowedElementList.includes(elStr)) {
      throw new Error("".concat(elStr, " is not recognisable HTML element."));
    }

    return document.createElement(elStr);
  };

  var removeFromArray = function removeFromArray(array, target) {
    return array.filter(function (a) {
      return a !== target;
    });
  };

  var mergeAttrArray = function mergeAttrArray(attrArray, newAttr) {
    var isExistingAttr = attrArray.findIndex(function (attr) {
      return attr[0] === newAttr[0];
    });
    var index = isExistingAttr === -1 ? attrArray.length : isExistingAttr;
    return Object.assign([], attrArray, _defineProperty({}, index, newAttr));
  };

  var updateElement = function updateElement(entity) {
    var classNames = entity.classNames,
        dataAttributes = entity.dataAttributes,
        element = entity.element,
        id = entity.id,
        innerText = entity.innerText;

    if (element) {
      if (id) element.id = id;
      if (innerText) element.innerText = innerText;
      classNames.forEach(function (c) {
        return element.classList.add(c);
      });
      dataAttributes.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            data = _ref2[1];

        return element.setAttribute("data-".concat(key), data);
      });
    }
  }; // ------------------------------------------- //


  var easyDom = function easyDom(_initObj) {
    var _this = this;

    _classCallCheck(this, easyDom);

    _defineProperty(this, "classNames", []);

    _defineProperty(this, "dataAttributes", []);

    _defineProperty(this, "element", null);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "innerText", void 0);

    _defineProperty(this, "a", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('a')
      }));
    });

    _defineProperty(this, "article", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('article')
      }));
    });

    _defineProperty(this, "aside", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('aside')
      }));
    });

    _defineProperty(this, "details", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('details')
      }));
    });

    _defineProperty(this, "b", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('b')
      }));
    });

    _defineProperty(this, "br", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('br')
      }));
    });

    _defineProperty(this, "caption", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('caption')
      }));
    });

    _defineProperty(this, "dialog", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('dialog')
      }));
    });

    _defineProperty(this, "div", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('div')
      }));
    });

    _defineProperty(this, "footer", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('footer')
      }));
    });

    _defineProperty(this, "form", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('form')
      }));
    });

    _defineProperty(this, "h1", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('h1')
      }));
    });

    _defineProperty(this, "h2", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('h2')
      }));
    });

    _defineProperty(this, "h3", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('h3')
      }));
    });

    _defineProperty(this, "h4", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('h4')
      }));
    });

    _defineProperty(this, "h5", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('h5')
      }));
    });

    _defineProperty(this, "h6", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('h6')
      }));
    });

    _defineProperty(this, "header", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('header')
      }));
    });

    _defineProperty(this, "img", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('img')
      }));
    });

    _defineProperty(this, "label", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('label')
      }));
    });

    _defineProperty(this, "li", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('li')
      }));
    });

    _defineProperty(this, "nav", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('nav')
      }));
    });

    _defineProperty(this, "main", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('main')
      }));
    });

    _defineProperty(this, "ol", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('ol')
      }));
    });

    _defineProperty(this, "p", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('p')
      }));
    });

    _defineProperty(this, "section", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('section')
      }));
    });

    _defineProperty(this, "span", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('span')
      }));
    });

    _defineProperty(this, "strong", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('strong')
      }));
    });

    _defineProperty(this, "table", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('table')
      }));
    });

    _defineProperty(this, "tbody", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('tbody')
      }));
    });

    _defineProperty(this, "td", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('td')
      }));
    });

    _defineProperty(this, "tfoot", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('tfoot')
      }));
    });

    _defineProperty(this, "th", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('th')
      }));
    });

    _defineProperty(this, "thead", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('thead')
      }));
    });

    _defineProperty(this, "tr", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('tr')
      }));
    });

    _defineProperty(this, "ul", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        element: makeElement('ul')
      }));
    });

    _defineProperty(this, "withClass", function (classNames) {
      if (isNotDefined(classNames)) {
        throw new Error("withClass is missing an argument. Please provide a single classname or a list of classnames.");
      }

      if (typeof classNames === 'string') {
        return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
          classNames: [].concat(_toConsumableArray(_this.classNames), [classNames])
        }));
      }

      if (Array.isArray(classNames)) {
        var nextClassName = classNames.length ? classNames[0] : undefined;

        if (nextClassName !== undefined) {
          var classNamesRemainder = classNames.slice(1);
          return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
            classNames: [].concat(_toConsumableArray(_this.classNames), [nextClassName])
          })).withClass(classNamesRemainder);
        }

        return new easyDom(_objectSpread({}, extractInitObject(_this)));
      }

      throw new Error("Unsupported argument passed to withClass: ".concat(classNames));
    });

    _defineProperty(this, "removeClass", function (classNames) {
      if (isNotDefined(classNames)) {
        throw new Error("Invalid classNames passed to removeClass: ".concat(classNames));
      }

      if (Array.isArray(classNames)) {
        var removableClassName = classNames.length ? classNames[0] : undefined;

        if (removableClassName !== undefined) {
          var classNameRemainder = classNames.slice(1);
          var newClassNames = removeFromArray(_this.classNames, removableClassName);
          return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
            classNames: newClassNames
          })).removeClass(classNameRemainder);
        }

        return new easyDom(_objectSpread({}, extractInitObject(_this)));
      }

      if (typeof classNames === 'string') {
        return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
          classNames: removeFromArray(_this.classNames, classNames)
        }));
      }

      throw new Error("Unsupported argument passed to removeClass: ".concat(classNames));
    });

    _defineProperty(this, "removeAllClasses", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        classNames: []
      }));
    });

    _defineProperty(this, "withId", function (id) {
      if (isNotDefined(id)) {
        throw new Error("withId is missing an argument. Please provide a single id.");
      }

      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        id: id
      }));
    });

    _defineProperty(this, "removeId", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        id: undefined
      }));
    });

    _defineProperty(this, "withDataAttribute", function (data) {
      if (isNotDefined(data)) {
        throw new Error("withDataAttribute is missing an argument ".concat(data, ". Please provide a tuple or a list of tuples."));
      }

      if (!Array.isArray(data[0]) && isStringTuple(data)) {
        return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
          dataAttributes: mergeAttrArray(_this.dataAttributes, data)
        }));
      }

      if (Array.isArray(data[0])) {
        var cleanedData = removeInvalidValues(data);
        var nextData = cleanedData.length ? cleanedData[0] : undefined;

        if (nextData !== undefined) {
          var dataRemainder = data.slice(1);
          return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
            dataAttributes: mergeAttrArray(_this.dataAttributes, nextData)
          })).withDataAttribute(dataRemainder);
        }

        return new easyDom(_objectSpread({}, extractInitObject(_this)));
      }

      if (Array.isArray(data) && data.length === 0) {
        return new easyDom(_objectSpread({}, extractInitObject(_this)));
      }

      throw new Error("Unsupported argument passed to withDataAttribute: ".concat(data));
    });

    _defineProperty(this, "removeDataAttribute", function (key) {
      if (isNotDefined(key)) {
        throw new Error("removeDataAttribute is missing an argument. Please provide a single data attribute key.");
      }

      var dataAttributes = _this.dataAttributes.filter(function (attr) {
        return attr[0] !== key;
      });

      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        dataAttributes: dataAttributes
      }));
    });

    _defineProperty(this, "removeAllDataAttributes", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        dataAttributes: []
      }));
    });

    _defineProperty(this, "withInnerText", function (innerText) {
      var concat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (isNotDefined(innerText)) {
        throw new Error("withInnerText is missing an argument ".concat(innerText, ". Please provide a string."));
      }

      var _innerText = concat ? _this.innerText + innerText : innerText;

      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        innerText: _innerText
      }));
    });

    _defineProperty(this, "removeInnerText", function () {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), {}, {
        innerText: undefined
      }));
    });

    _defineProperty(this, "copy", function (initObj) {
      return new easyDom(_objectSpread(_objectSpread({}, extractInitObject(_this)), initObj ? initObj : null));
    });

    _defineProperty(this, "appendTo", function (query) {
      if (isNotDefined(query)) {
        throw new Error("appendTo is missing an argument. Please provide a string (query) as the argument.");
      }

      if (!_this.element) {
        throw new Error("There is no element that could be appended.");
      }

      var target = document.querySelector(query);

      if (!target) {
        throw new Error("Couldn't find target element.");
      }

      target.appendChild(_this.element);
      return _this;
    });

    _defineProperty(this, "prependTo", function (query) {
      if (isNotDefined(query)) {
        throw new Error("prependTo is missing an argument. Please provide a string (query) as the argument.");
      }

      if (!_this.element) {
        throw new Error("There is no element that could be prepended.");
      }

      var target = document.querySelector(query);

      if (!target) {
        throw new Error("Couldn't find target element.");
      }

      target.prepend(_this.element);
      return _this;
    });

    _defineProperty(this, "make", function () {
      return new easyDom(_objectSpread({}, extractInitObject(_this)));
    });

    var _element = (_initObj === null || _initObj === void 0 ? void 0 : _initObj.element) || null;

    var _classes = getValidClasses(_initObj === null || _initObj === void 0 ? void 0 : _initObj.classNames);

    var _dataAttributes = getValidAttributes(_initObj === null || _initObj === void 0 ? void 0 : _initObj.dataAttributes);

    var _id = (_initObj === null || _initObj === void 0 ? void 0 : _initObj.id) || undefined;

    var _innerText2 = (_initObj === null || _initObj === void 0 ? void 0 : _initObj.innerText) || undefined;

    this.classNames = _classes;
    this.dataAttributes = _dataAttributes;
    this.element = _element;
    this.id = _id;
    this.innerText = _innerText2; // Side-effect

    updateElement(this);
  } // TODO: more support for "a"
  // TODO: createFrom() <-- try to find the element and create the object from it
  ;
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJhbGxvd2VkRWxlbWVudExpc3QiLCJpc05vdERlZmluZWQiLCJ2YWwiLCJ1bmRlZmluZWQiLCJpc1N0cmluZyIsImlzU3RyaW5nVHVwbGUiLCJ0dXBsZSIsImxlbmd0aCIsInJlbW92ZUludmFsaWRWYWx1ZXMiLCJkYXRhIiwiZmlsdGVyIiwiZCIsImV4dHJhY3RJbml0T2JqZWN0IiwiZW50aXR5IiwiY2xhc3NOYW1lcyIsImRhdGFBdHRyaWJ1dGVzIiwiZWxlbWVudCIsIm1ha2VFbGVtZW50IiwibG9jYWxOYW1lIiwiaWQiLCJpbm5lclRleHQiLCJnZXRWYWxpZENsYXNzZXMiLCJBcnJheSIsImlzQXJyYXkiLCJFcnJvciIsImdldFZhbGlkQXR0cmlidXRlcyIsImVsU3RyIiwiaW5jbHVkZXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJyZW1vdmVGcm9tQXJyYXkiLCJhcnJheSIsInRhcmdldCIsImEiLCJtZXJnZUF0dHJBcnJheSIsImF0dHJBcnJheSIsIm5ld0F0dHIiLCJpc0V4aXN0aW5nQXR0ciIsImZpbmRJbmRleCIsImF0dHIiLCJpbmRleCIsIk9iamVjdCIsImFzc2lnbiIsInVwZGF0ZUVsZW1lbnQiLCJmb3JFYWNoIiwiYyIsImNsYXNzTGlzdCIsImFkZCIsImtleSIsInNldEF0dHJpYnV0ZSIsImVhc3lEb20iLCJpbml0T2JqIiwibmV4dENsYXNzTmFtZSIsImNsYXNzTmFtZXNSZW1haW5kZXIiLCJzbGljZSIsIndpdGhDbGFzcyIsInJlbW92YWJsZUNsYXNzTmFtZSIsImNsYXNzTmFtZVJlbWFpbmRlciIsIm5ld0NsYXNzTmFtZXMiLCJyZW1vdmVDbGFzcyIsImNsZWFuZWREYXRhIiwibmV4dERhdGEiLCJkYXRhUmVtYWluZGVyIiwid2l0aERhdGFBdHRyaWJ1dGUiLCJjb25jYXQiLCJfaW5uZXJUZXh0IiwicXVlcnkiLCJxdWVyeVNlbGVjdG9yIiwiYXBwZW5kQ2hpbGQiLCJwcmVw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Q2hDLFFBQU0wRCxRQUFRLEdBQUcsQ0FBQW5CLFFBQU8sU0FBUCxJQUFBQSxRQUFPLFdBQVAsWUFBQUEsUUFBTyxDQUFFbkMsT0FBVCxLQUFvQixJQUFyQzs7QUFDQSxRQUFNdUQsUUFBUSxHQUFHbEQsZUFBZSxDQUFDOEIsUUFBRCxhQUFDQSxRQUFELHVCQUFDQSxRQUFPLENBQUVyQyxVQUFWLENBQWhDOztBQUNBLFFBQU0wRCxlQUFlLEdBQUcvQyxrQkFBa0IsQ0FBQzBCLFFBQUQsYUFBQ0EsUUFBRCx1QkFBQ0EsUUFBTyxDQUFFcEMsY0FBVixDQUExQzs7QUFDQSxRQUFNMEQsR0FBRyxHQUFHLENBQUF0QixRQUFPLFNBQVAsSUFBQUEsUUFBTyxXQUFQLFlBQUFBLFFBQU8sQ0FBRWhDLEVBQVQsS0FBZWhCLFNBQTNCOztBQUNBLFFBQU04RCxXQUFVLEdBQUcsQ0FBQWQsUUFBTyxTQUFQLElBQUFBLFFBQU8sV0FBUCxZQUFBQSxRQUFPLENBQUUvQixTQUFULEtBQXNCakIsU0FBekM7O0FBRUEsU0FBS1csVUFBTCxHQUFrQnlELFFBQWxCO0FBQ0EsU0FBS3hELGNBQUwsR0FBc0J5RCxlQUF0QjtBQUNBLFNBQUt4RCxPQUFMLEdBQWVzRCxRQUFmO0FBQ0EsU0FBS25ELEVBQUwsR0FBVXNELEdBQVY7QUFDQSxTQUFLckQsU0FBTCxHQUFpQjZDLFdBQWpCLENBWGdDLENBYWhDOztBQUNBdEIsSUFBQUEsYUFBYSxDQUFDLElBQUQsQ0FBYjtBQUNELEdBdEdPLENBd0dSO0FBb01BO0FBNVNRO0FBOFNYLENBOVNBLEdBQUQiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XHJcbiAgdHlwZSBBbGxvd2VkRWxlbWVudCA9ICAnYScgfCAnYXJ0aWNsZScgfCAnYXNpZGUnIHwgJ2RldGFpbHMnIHwgJ2InIHwgJ2JyJyB8ICdjYXB0aW9uJyB8ICdkaWFsb2cnIHwgJ2RpdicgfCAnZm9vdGVyJyB8ICdmb3JtJyB8ICdoMScgfCAnaDInIHwgJ2gzJyB8ICdoNCcgfCAnaDUnIHwgJ2g2JyB8ICdoZWFkZXInIHwgJ2ltZycgfCAnbGFiZWwnIHwgJ2xpJyB8ICduYXYnIHwgJ21haW4nIHwgJ29sJyB8ICdwJyB8ICdzZWN0aW9uJyB8ICdzcGFuJyB8ICdzdHJvbmcnIHwgJ3RhYmxlJyB8ICd0Ym9keScgfCAndGQnIHwgJ3Rmb290JyB8ICd0aCcgfCAndGhlYWQnIHwgJ3RyJyB8ICd1bCdcclxuICBjb25zdCBhbGxvd2VkRWxlbWVudExpc3Q6IEFsbG93ZWRFbGVtZW50W10gPSBbJ2EnLCAnYXJ0aWNsZScsICdhc2lkZScsICdkZXRhaWxzJywgJ2InLCAnYnInLCAnY2FwdGlvbicsICdkaWFsb2cnLCAnZGl2JywgJ2Zvb3RlcicsICdmb3JtJywgJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2JywgJ2hlYWRlcicsICdpbWcnLCAnbGFiZWwnLCAnbGknLCAnbmF2JywgJ21haW4nLCAnb2wnLCAncCcsICdzZWN0aW9uJywgJ3NwYW4nLCAnc3Ryb25nJywgJ3RhYmxlJywgJ3Rib2R5JywgJ3RkJywgJ3Rmb290JywgJ3RoJywgJ3RoZWFkJywgJ3RyJywgJ3VsJ11cclxuXHJcbiAgLy8gSEVMUEVSU1xyXG4gIGNvbnN0IGlzTm90RGVmaW5lZCA9IDxUPih2YWw6IFQpOiBib29sZWFuID0+IHZhbCA9PT0gdW5kZWZpbmVkIHx8IHZhbCA9PT0gbnVsbFxyXG5cclxuICBjb25zdCBpc1N0cmluZyA9IDxUPih2YWw6IFQpOiBib29sZWFuID0+IHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnXHJcblxyXG4gIGNvbnN0IGlzU3RyaW5nVHVwbGUgPSAodHVwbGU6IERhdGFBdHRyaWJ1dGUpOiBib29sZWFuID0+IHR1cGxlLmxlbmd0aCA9PT0gMiAmJiBpc1N0cmluZyh0dXBsZVswXSkgJiYgaXNTdHJpbmcodHVwbGVbMV0pXHJcblxyXG4gIGNvbnN0IHJlbW92ZUludmFsaWRWYWx1ZXMgPSAoZGF0YTogRGF0YUF0dHJpYnV0ZVtdKTogRGF0YUF0dHJpYnV0ZVtdID0+IGRhdGEuZmlsdGVyKGQgPT4gaXNTdHJpbmdUdXBsZShkKSlcclxuXHJcbiAgY29uc3QgZXh0cmFjdEluaXRPYmplY3QgPSAoZW50aXR5OiBlYXN5RG9tKTogSW5pdE9iamVjdCA9PiAoe1xyXG4gICAgY2xhc3NOYW1lczogWy4uLmVudGl0eS5jbGFzc05hbWVzXSxcclxuICAgIGRhdGFBdHRyaWJ1dGVzOiBbLi4uZW50aXR5LmRhdGFBdHRyaWJ1dGVzXSxcclxuICAgIGVsZW1lbnQ6IGVudGl0eS5lbGVtZW50ID8gbWFrZUVsZW1lbnQoZW50aXR5LmVsZW1lbnQubG9jYWxOYW1lIGFzIEFsbG93ZWRFbGVtZW50KSA6IG51bGwsXHJcbiAgICBpZDogZW50aXR5LmlkLFxyXG4gICAgaW5uZXJUZXh0OiBlbnRpdHkuaW5uZXJUZXh0LFxyXG4gIH0pXHJcblxyXG4gIGNvbnN0IGdldFZhbGlkQ2xhc3NlcyA9IChjbGFzc05hbWVzPzogQ2xhc3NOYW1lcyk6IHN0cmluZ1tdID0+IHtcclxuICAgIGlmIChpc05vdERlZmluZWQoY2xhc3NOYW1lcykpIHJldHVybiBbXVxyXG4gICAgaWYoQXJyYXkuaXNBcnJheShjbGFzc05hbWVzKSkgcmV0dXJuIGNsYXNzTmFtZXNcclxuICAgIGlmKHR5cGVvZiBjbGFzc05hbWVzID09PSAnc3RyaW5nJykgcmV0dXJuIFtjbGFzc05hbWVzXVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKGAke2NsYXNzTmFtZXN9IGlzIG5vdCBhIHZhbGlkIGNsYXNzIHR5cGUuYClcclxuICB9XHJcbiAgXHJcbiAgY29uc3QgZ2V0VmFsaWRBdHRyaWJ1dGVzID0gKGRhdGE/OiBEYXRhQXR0cmlidXRlcyk6IERhdGFBdHRyaWJ1dGVbXSA9PiB7XHJcbiAgICBpZiAoaXNOb3REZWZpbmVkKGRhdGEpIHx8IEFycmF5LmlzQXJyYXkoZGF0YSkgJiYgZGF0YS5sZW5ndGggPT09IDApIHJldHVybiBbXVxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEgJiYgZGF0YVswXSkgJiYgaXNTdHJpbmdUdXBsZShkYXRhIGFzIERhdGFBdHRyaWJ1dGUpKSByZXR1cm4gW2RhdGEgYXMgRGF0YUF0dHJpYnV0ZV1cclxuICAgIGlmIChkYXRhICYmIEFycmF5LmlzQXJyYXkoZGF0YVswXSkpIHtcclxuICAgICAgcmV0dXJuIHJlbW92ZUludmFsaWRWYWx1ZXMoZGF0YSBhcyBEYXRhQXR0cmlidXRlW10pXHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZGF0YX0gaXMgbm90IGEgdmFsaWQgZGF0YS1hdHRyaWJ1dGUgdHlwZWApXHJcbiAgfVxyXG5cclxuICBjb25zdCBtYWtlRWxlbWVudCA9IChlbFN0cjogQWxsb3dlZEVsZW1lbnQpOiBIVE1MRWxlbWVudCA9PiB7XHJcbiAgICBpZiAoIWFsbG93ZWRFbGVtZW50TGlzdC5pbmNsdWRlcyhlbFN0cikpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2VsU3RyfSBpcyBub3QgcmVjb2duaXNhYmxlIEhUTUwgZWxlbWVudC5gKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsU3RyKVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVtb3ZlRnJvbUFycmF5ID0gPFQ+KGFycmF5OiBUW10sIHRhcmdldDogVCk6IFRbXSA9PiBhcnJheS5maWx0ZXIoYSA9PiBhICE9PSB0YXJnZXQpXHJcblxyXG4gIGNvbnN0IG1lcmdlQXR0ckFycmF5ID0gKGF0dHJBcnJheTogRGF0YUF0dHJpYnV0ZVtdLCBuZXdBdHRyOiBEYXRhQXR0cmlidXRlKTogRGF0YUF0dHJpYnV0ZVtdID0+IHtcclxuICAgIGNvbnN0IGlzRXhpc3RpbmdBdHRyID0gYXR0ckFycmF5LmZpbmRJbmRleChhdHRyID0+IGF0dHJbMF0gPT09IG5ld0F0dHJbMF0pXHJcbiAgICBjb25zdCBpbmRleCA9IGlzRXhpc3RpbmdBdHRyID09PSAtMSA/IGF0dHJBcnJheS5sZW5ndGggOiBpc0V4aXN0aW5nQXR0clxyXG5cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFtdLCBhdHRyQXJyYXksIHsgW2luZGV4XTogbmV3QXR0ciB9KVxyXG4gIH1cclxuXHJcbiAgY29uc3QgdXBkYXRlRWxlbWVudCA9IChlbnRpdHk6IGVhc3lEb20pID0+IHtcclxuICAgIGNvbnN0IHsgY2xhc3NOYW1lcywgZGF0YUF0dHJpYnV0ZXMsIGVsZW1lbnQsIGlkLCBpbm5lclRleHQsIH0gPSBlbnRpdHlcclxuXHJcbiAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICBpZiAoaWQpIGVsZW1lbnQuaWQgPSBpZFxyXG4gICAgICBpZiAoaW5uZXJUZXh0KSBlbGVtZW50LmlubmVyVGV4dCA9IGlubmVyVGV4dFxyXG4gICAgICBjbGFzc05hbWVzLmZvckVhY2goYyA9PiBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYykpXHJcbiAgICAgIGRhdGFBdHRyaWJ1dGVzLmZvckVhY2goKFtrZXksIGRhdGFdKSA9PiBlbGVtZW50LnNldEF0dHJpYnV0ZShgZGF0YS0ke2tleX1gLCBkYXRhKSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcbiAgdHlwZSBDbGFzc05hbWVzID0gc3RyaW5nIHwgc3RyaW5nW11cclxuXHJcbiAgdHlwZSBEYXRhQXR0cmlidXRlID0gW3N0cmluZywgc3RyaW5nXVxyXG4gIHR5cGUgRGF0YUF0dHJpYnV0ZXMgPSBEYXRhQXR0cmlidXRlIHwgRGF0YUF0dHJpYnV0ZVtdXHJcblxyXG4gIGludGVyZmFjZSBJbml0T2JqZWN0IHtcclxuICAgIGNsYXNzTmFtZXM/OiBDbGFzc05hbWVzXHJcbiAgICBkYXRhQXR0cmlidXRlczogRGF0YUF0dHJpYnV0ZXNcclxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbFxyXG4gICAgaWQ/OiBzdHJpbmdcclxuICAgIGlubmVyVGV4dD86IHN0cmluZ1xyXG4gIH1cclxuXHJcbiAgY2xhc3MgZWFzeURvbSB7XHJcbiAgICBjbGFzc05hbWVzOiBzdHJpbmdbXSA9IFtdXHJcbiAgICBkYXRhQXR0cmlidXRlczogRGF0YUF0dHJpYnV0ZVtdID0gW11cclxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGxcclxuICAgIGlkPzogc3RyaW5nXHJcbiAgICBpbm5lclRleHQ/OiBzdHJpbmdcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0T2JqPzogSW5pdE9iamVjdCkge1xyXG4gICAgICBjb25zdCBfZWxlbWVudCA9IGluaXRPYmo/LmVsZW1lbnQgfHwgbnVsbFxyXG4gICAgICBjb25zdCBfY2xhc3NlcyA9IGdldFZhbGlkQ2xhc3Nlcyhpbml0T2JqPy5jbGFzc05hbWVzKVxyXG4gICAgICBjb25zdCBfZGF0YUF0dHJpYnV0ZXMgPSBnZXRWYWxpZEF0dHJpYnV0ZXMoaW5pdE9iaj8uZGF0YUF0dHJpYnV0ZXMpXHJcbiAgICAgIGNvbnN0IF9pZCA9IGluaXRPYmo/LmlkIHx8IHVuZGVmaW5lZFxyXG4gICAgICBjb25zdCBfaW5uZXJUZXh0ID0gaW5pdE9iaj8uaW5uZXJUZXh0IHx8IHVuZGVmaW5lZFxyXG5cclxuICAgICAgdGhpcy5jbGFzc05hbWVzID0gX2NsYXNzZXNcclxuICAgICAgdGhpcy5kYXRhQXR0cmlidXRlcyA9IF9kYXRhQXR0cmlidXRlc1xyXG4gICAgICB0aGlzLmVsZW1lbnQgPSBfZWxlbWVudFxyXG4gICAgICB0aGlzLmlkID0gX2lkXHJcbiAgICAgIHRoaXMuaW5uZXJUZXh0ID0gX2lubmVyVGV4dFxyXG5cclxuICAgICAgLy8gU2lkZS1lZmZlY3RcclxuICAgICAgdXBkYXRlRWxlbWVudCh0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE86IG1vcmUgc3VwcG9ydCBmb3IgXCJhXCJcclxuICAgIHB1YmxpYyBhID0gKCk6IGVhc3lEb20gPT4gbmV3IGVhc3lEb20oeyAuLi5leHRyYWN0SW5pdE9iamVjdCh0aGlzKSwgZWxlbWVudDogbWFrZUVsZW1lbnQoJ2EnKSB9KVxyXG4gICAgcHVibGljIGFydGljbGUgPSAoKTogZWFzeURvbSA9PiBuZXcgZWFzeURvbSh7IC4uLmV4dHJhY3RJbml0T2JqZWN0KHRoaXMpLCBlbGVtZW50OiBtYWtlRWxlbWVudCgnYXJ0aWNsZScpIH0pXHJcbiAgICBwdWJsaWMgYXNpZGUgPSAoKTogZWFzeURvbSA9PiBuZXcgZWFzeURvbSh7IC4uLmV4dHJhY3RJbml0T2JqZWN0KHRoaXMpLCBlbGVtZW50OiBtYWtlRWxlbWVudCgnYXNpZGUnKSB9KVxyXG4gICAgcHVibGljIGRldGFpbHMgPSAoKTogZWFzeURvbSA9PiBuZXcgZWFzeURvbSh7IC4uLmV4dHJhY3RJbml0T2JqZWN0KHRoaXMpLCBlbGVtZW50OiBtYWtlRWxlbWVudCgnZGV0YWlscycpIH0pXHJcbiAgICBwdWJsaWMgYiA9ICgpOiBlYXN5RG9tID0+IG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGVsZW1lbnQ6IG1ha2VFbGVtZW50KCdiJykgfSlcclxuICAgIHB1YmxpYyBiciA9ICgpOiBlYXN5RG9tID0+IG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGVsZW1lbnQ6IG1ha2VFbGVtZW50KCdicicpIH0pXHJcbiAgICBwdWJsaWMgY2FwdGlvbiA9ICgpOiBlYXN5RG9tID0+IG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGVsZW1lbnQ6IG1ha2VFbGVtZW50KCdjYXB0aW9uJykgfSlcclxuICAgIC8vIFRPRE86IG1vcmUgc3VwcG9ydCBmb3IgXCJkaWFsb2dcIlxyXG4gICAgcHVibGljIGRpYWxvZyA9ICgpOiBlYXN5RG9tID0+IG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGVsZW1lbnQ6IG1ha2VFbGVtZW50KCdkaWFsb2cnKSB9KVxyXG4gICAgcHVibGljIGRpdiA9ICgpOiBlYXN5RG9tID0+IG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGVsZW1lbnQ6IG1ha2VFbGVtZW50KCdkaXYnKSB9KVxyXG4gICAgcHVibGljIGZvb3RlciA9ICgpOiBlYXN5RG9tID0+IG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGVsZW1lbnQ6IG1ha2VFbGVtZW50KCdmb290ZXInKSB9KVxyXG4gICAgLy8gVE9ETzogbW9yZSBzdXBwb3J0IGZvciBcImZvcm1cIlxyXG4gICAgcHVibGljIGZvcm0gPSAoKTogZWFzeURvbSA9PiBuZXcgZWFzeURvbSh7IC4uLmV4dHJhY3RJbml0T2JqZWN0KHRoaXMpLCBlbGVtZW50OiBtYWtlRWxlbWVudCgnZm9ybScpIH0pXHJcbiAgICBwdWJsaWMgaDEgPSAoKTogZWFzeURvbSA9PiBuZXcgZWFzeURvbSh7IC4uLmV4dHJhY3RJbml0T2JqZWN0KHRoaXMpLCBlbGVtZW50OiBtYWtlRWxlbWVudCgnaDEnKSB9KVxyXG4gICAgcHVibGljIGgyID0gKCk6IGVhc3lEb20gPT4gbmV3IGVhc3lEb20oeyAuLi5leHRyYWN0SW5pdE9iamVjdCh0aGlzKSwgZWxlbWVudDogbWFrZUVsZW1lbnQoJ2gyJykgfSlcclxuICAgIHB1YmxpYyBoMyA9ICgpOiBlYXN5RG9tID0+IG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGVsZW1lbnQ6IG1ha2VFbGVtZW50KCdoMycpIH0pXHJcbiAgICBwdWJsaWMgaDQgPSAoKTogZWFzeURvbSA9PiBuZXcgZWFzeURvbSh7IC4uLmV4dHJhY3RJbml0T2JqZWN0KHRoaXMpLCBlbGVtZW50OiBtYWtlRWxlbWVudCgnaDQnKSB9KVxyXG4gICAgcHVibGljIGg1ID0gKCk6IGVhc3lEb20gPT4gbmV3IGVhc3lEb20oeyAuLi5leHRyYWN0SW5pdE9iamVjdCh0aGlzKSwgZWxlbWVudDogbWFrZUVsZW1lbnQoJ2g1JykgfSlcclxuICAgIHB1YmxpYyBoNiA9ICgpOiBlYXN5RG9tID0+IG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGVsZW1lbnQ6IG1ha2VFbGVtZW50KCdoNicpIH0pXHJcbiAgICBwdWJsaWMgaGVhZGVyID0gKCk6IGVhc3lEb20gPT4gbmV3IGVhc3lEb20oeyAuLi5leHRyYWN0SW5pdE9iamVjdCh0aGlzKSwgZWxlbWVudDogbWFrZUVsZW1lbnQoJ2hlYWRlcicpIH0pXHJcbiAgICAvLyBUT0RPOiBtb3JlIHN1cHBvcnQgZm9yIGFuIFwiaW1nXCJcclxuICAgIHB1YmxpYyBpbWcgPSAoKTogZWFzeURvbSA9PiBuZXcgZWFzeURvbSh7IC4uLmV4dHJhY3RJbml0T2JqZWN0KHRoaXMpLCBlbGVtZW50OiBtYWtlRWxlbWVudCgnaW1nJykgfSlcclxuICAgIC8vIFRPRE86IG1vcmUgc3VwcG9ydCBmb3IgYSBcImxhYmVsXCJcclxuICAgIHB1YmxpYyBsYWJlbCA9ICgpOiBlYXN5RG9tID0+IG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGVsZW1lbnQ6IG1ha2VFbGVtZW50KCdsYWJlbCcpIH0pXHJcbiAgICBwdWJsaWMgbGkgPSAoKTogZWFzeURvbSA9PiBuZXcgZWFzeURvbSh7IC4uLmV4dHJhY3RJbml0T2JqZWN0KHRoaXMpLCBlbGVtZW50OiBtYWtlRWxlbWVudCgnbGknKSB9KVxyXG4gICAgcHVibGljIG5hdiA9ICgpOiBlYXN5RG9tID0+IG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGVsZW1lbnQ6IG1ha2VFbGVtZW50KCduYXYnKSB9KVxyXG4gICAgcHVibGljIG1haW4gPSAoKTogZWFzeURvbSA9PiBuZXcgZWFzeURvbSh7IC4uLmV4dHJhY3RJbml0T2JqZWN0KHRoaXMpLCBlbGVtZW50OiBtYWtlRWxlbWVudCgnbWFpbicpIH0pXHJcbiAgICBwdWJsaWMgb2wgPSAoKTogZWFzeURvbSA9PiBuZXcgZWFzeURvbSh7IC4uLmV4dHJhY3RJbml0T2JqZWN0KHRoaXMpLCBlbGVtZW50OiBtYWtlRWxlbWVudCgnb2wnKSB9KVxyXG4gICAgcHVibGljIHAgPSAoKTogZWFzeURvbSA9PiBuZXcgZWFzeURvbSh7IC4uLmV4dHJhY3RJbml0T2JqZWN0KHRoaXMpLCBlbGVtZW50OiBtYWtlRWxlbWVudCgncCcpIH0pXHJcbiAgICBwdWJsaWMgc2VjdGlvbiA9ICgpOiBlYXN5RG9tID0+IG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGVsZW1lbnQ6IG1ha2VFbGVtZW50KCdzZWN0aW9uJykgfSlcclxuICAgIHB1YmxpYyBzcGFuID0gKCk6IGVhc3lEb20gPT4gbmV3IGVhc3lEb20oeyAuLi5leHRyYWN0SW5pdE9iamVjdCh0aGlzKSwgZWxlbWVudDogbWFrZUVsZW1lbnQoJ3NwYW4nKSB9KVxyXG4gICAgcHVibGljIHN0cm9uZyA9ICgpOiBlYXN5RG9tID0+IG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGVsZW1lbnQ6IG1ha2VFbGVtZW50KCdzdHJvbmcnKSB9KVxyXG4gICAgcHVibGljIHRhYmxlID0gKCk6IGVhc3lEb20gPT4gbmV3IGVhc3lEb20oeyAuLi5leHRyYWN0SW5pdE9iamVjdCh0aGlzKSwgZWxlbWVudDogbWFrZUVsZW1lbnQoJ3RhYmxlJykgfSlcclxuICAgIHB1YmxpYyB0Ym9keSA9ICgpOiBlYXN5RG9tID0+IG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGVsZW1lbnQ6IG1ha2VFbGVtZW50KCd0Ym9keScpIH0pXHJcbiAgICBwdWJsaWMgdGQgPSAoKTogZWFzeURvbSA9PiBuZXcgZWFzeURvbSh7IC4uLmV4dHJhY3RJbml0T2JqZWN0KHRoaXMpLCBlbGVtZW50OiBtYWtlRWxlbWVudCgndGQnKSB9KVxyXG4gICAgcHVibGljIHRmb290ID0gKCk6IGVhc3lEb20gPT4gbmV3IGVhc3lEb20oeyAuLi5leHRyYWN0SW5pdE9iamVjdCh0aGlzKSwgZWxlbWVudDogbWFrZUVsZW1lbnQoJ3Rmb290JykgfSlcclxuICAgIHB1YmxpYyB0aCA9ICgpOiBlYXN5RG9tID0+IG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGVsZW1lbnQ6IG1ha2VFbGVtZW50KCd0aCcpIH0pXHJcbiAgICBwdWJsaWMgdGhlYWQgPSAoKTogZWFzeURvbSA9PiBuZXcgZWFzeURvbSh7IC4uLmV4dHJhY3RJbml0T2JqZWN0KHRoaXMpLCBlbGVtZW50OiBtYWtlRWxlbWVudCgndGhlYWQnKSB9KVxyXG4gICAgcHVibGljIHRyID0gKCk6IGVhc3lEb20gPT4gbmV3IGVhc3lEb20oeyAuLi5leHRyYWN0SW5pdE9iamVjdCh0aGlzKSwgZWxlbWVudDogbWFrZUVsZW1lbnQoJ3RyJykgfSlcclxuICAgIHB1YmxpYyB1bCA9ICgpOiBlYXN5RG9tID0+IG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGVsZW1lbnQ6IG1ha2VFbGVtZW50KCd1bCcpIH0pXHJcblxyXG4gICAgcHVibGljIHdpdGhDbGFzcyA9IChjbGFzc05hbWVzOiBDbGFzc05hbWVzKTogZWFzeURvbSA9PiB7XHJcbiAgICAgIGlmIChpc05vdERlZmluZWQoY2xhc3NOYW1lcykpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ3aXRoQ2xhc3MgaXMgbWlzc2luZyBhbiBhcmd1bWVudC4gUGxlYXNlIHByb3ZpZGUgYSBzaW5nbGUgY2xhc3NuYW1lIG9yIGEgbGlzdCBvZiBjbGFzc25hbWVzLlwiKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodHlwZW9mIGNsYXNzTmFtZXMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGNsYXNzTmFtZXM6IFsuLi50aGlzLmNsYXNzTmFtZXMsIGNsYXNzTmFtZXNdIH0pICBcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2xhc3NOYW1lcykpIHtcclxuICAgICAgICBjb25zdCBuZXh0Q2xhc3NOYW1lID0gY2xhc3NOYW1lcy5sZW5ndGggPyBjbGFzc05hbWVzWzBdIDogdW5kZWZpbmVkXHJcblxyXG4gICAgICAgIGlmIChuZXh0Q2xhc3NOYW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgY29uc3QgY2xhc3NOYW1lc1JlbWFpbmRlciA9IGNsYXNzTmFtZXMuc2xpY2UoMSlcclxuXHJcbiAgICAgICAgICByZXR1cm4gbmV3IGVhc3lEb20oeyAuLi5leHRyYWN0SW5pdE9iamVjdCh0aGlzKSwgY2xhc3NOYW1lczogWy4uLnRoaXMuY2xhc3NOYW1lcywgbmV4dENsYXNzTmFtZV0gfSkud2l0aENsYXNzKGNsYXNzTmFtZXNSZW1haW5kZXIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IGVhc3lEb20oeyAuLi5leHRyYWN0SW5pdE9iamVjdCh0aGlzKSB9KVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGFyZ3VtZW50IHBhc3NlZCB0byB3aXRoQ2xhc3M6ICR7Y2xhc3NOYW1lc31gKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVDbGFzcyA9IChjbGFzc05hbWVzOiBDbGFzc05hbWVzKTogZWFzeURvbSA9PiB7XHJcbiAgICAgIGlmIChpc05vdERlZmluZWQoY2xhc3NOYW1lcykpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY2xhc3NOYW1lcyBwYXNzZWQgdG8gcmVtb3ZlQ2xhc3M6ICR7Y2xhc3NOYW1lc31gKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjbGFzc05hbWVzKSkge1xyXG4gICAgICAgIGNvbnN0IHJlbW92YWJsZUNsYXNzTmFtZSA9IGNsYXNzTmFtZXMubGVuZ3RoID8gY2xhc3NOYW1lc1swXSA6IHVuZGVmaW5lZFxyXG5cclxuICAgICAgICBpZiAocmVtb3ZhYmxlQ2xhc3NOYW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZVJlbWFpbmRlciA9IGNsYXNzTmFtZXMuc2xpY2UoMSlcclxuICAgICAgICAgIGNvbnN0IG5ld0NsYXNzTmFtZXMgPSByZW1vdmVGcm9tQXJyYXkodGhpcy5jbGFzc05hbWVzLCByZW1vdmFibGVDbGFzc05hbWUpXHJcblxyXG4gICAgICAgICAgcmV0dXJuIG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGNsYXNzTmFtZXM6IG5ld0NsYXNzTmFtZXMgfSkucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lUmVtYWluZGVyKSBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcykgfSlcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHR5cGVvZiBjbGFzc05hbWVzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHJldHVybiBuZXcgZWFzeURvbSh7IC4uLmV4dHJhY3RJbml0T2JqZWN0KHRoaXMpLCBjbGFzc05hbWVzOiByZW1vdmVGcm9tQXJyYXk8c3RyaW5nPih0aGlzLmNsYXNzTmFtZXMsIGNsYXNzTmFtZXMpIH0pXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgYXJndW1lbnQgcGFzc2VkIHRvIHJlbW92ZUNsYXNzOiAke2NsYXNzTmFtZXN9YClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQWxsQ2xhc3NlcyA9ICgpOiBlYXN5RG9tID0+IG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGNsYXNzTmFtZXM6IFtdIH0pXHJcblxyXG4gICAgcHVibGljIHdpdGhJZCA9IChpZDogc3RyaW5nKTogZWFzeURvbSA9PiB7XHJcbiAgICAgIGlmIChpc05vdERlZmluZWQoaWQpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwid2l0aElkIGlzIG1pc3NpbmcgYW4gYXJndW1lbnQuIFBsZWFzZSBwcm92aWRlIGEgc2luZ2xlIGlkLlwiKVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3IGVhc3lEb20oeyAuLi5leHRyYWN0SW5pdE9iamVjdCh0aGlzKSwgaWQgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlSWQgPSAoKTogZWFzeURvbSA9PiBuZXcgZWFzeURvbSh7IC4uLmV4dHJhY3RJbml0T2JqZWN0KHRoaXMpLCBpZDogdW5kZWZpbmVkIH0pXHJcblxyXG4gICAgcHVibGljIHdpdGhEYXRhQXR0cmlidXRlID0gKGRhdGE6IERhdGFBdHRyaWJ1dGVzKTogZWFzeURvbSA9PiB7XHJcbiAgICAgIGlmIChpc05vdERlZmluZWQoZGF0YSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHdpdGhEYXRhQXR0cmlidXRlIGlzIG1pc3NpbmcgYW4gYXJndW1lbnQgJHtkYXRhfS4gUGxlYXNlIHByb3ZpZGUgYSB0dXBsZSBvciBhIGxpc3Qgb2YgdHVwbGVzLmApXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShkYXRhWzBdKSAmJiBpc1N0cmluZ1R1cGxlKGRhdGEgYXMgRGF0YUF0dHJpYnV0ZSkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IGVhc3lEb20oeyAuLi5leHRyYWN0SW5pdE9iamVjdCh0aGlzKSwgZGF0YUF0dHJpYnV0ZXM6IG1lcmdlQXR0ckFycmF5KHRoaXMuZGF0YUF0dHJpYnV0ZXMsIGRhdGEgYXMgRGF0YUF0dHJpYnV0ZSkgfSkgIFxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhWzBdKSkge1xyXG4gICAgICAgIGNvbnN0IGNsZWFuZWREYXRhID0gcmVtb3ZlSW52YWxpZFZhbHVlcyhkYXRhIGFzIERhdGFBdHRyaWJ1dGVbXSlcclxuICAgICAgICBjb25zdCBuZXh0RGF0YSA9IGNsZWFuZWREYXRhLmxlbmd0aCA/IGNsZWFuZWREYXRhWzBdIDogdW5kZWZpbmVkXHJcblxyXG4gICAgICAgIGlmIChuZXh0RGF0YSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhUmVtYWluZGVyID0gZGF0YS5zbGljZSgxKSBhcyBEYXRhQXR0cmlidXRlW11cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgcmV0dXJuIG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGRhdGFBdHRyaWJ1dGVzOiBtZXJnZUF0dHJBcnJheSh0aGlzLmRhdGFBdHRyaWJ1dGVzLCBuZXh0RGF0YSkgfSkud2l0aERhdGFBdHRyaWJ1dGUoZGF0YVJlbWFpbmRlcilcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcykgfSlcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgJiYgZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gbmV3IGVhc3lEb20oeyAuLi5leHRyYWN0SW5pdE9iamVjdCh0aGlzKSB9KVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGFyZ3VtZW50IHBhc3NlZCB0byB3aXRoRGF0YUF0dHJpYnV0ZTogJHtkYXRhfWApXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZURhdGFBdHRyaWJ1dGUgPSAoa2V5OiBzdHJpbmcpOiBlYXN5RG9tID0+IHtcclxuICAgICAgaWYgKGlzTm90RGVmaW5lZChrZXkpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicmVtb3ZlRGF0YUF0dHJpYnV0ZSBpcyBtaXNzaW5nIGFuIGFyZ3VtZW50LiBQbGVhc2UgcHJvdmlkZSBhIHNpbmdsZSBkYXRhIGF0dHJpYnV0ZSBrZXkuXCIpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGRhdGFBdHRyaWJ1dGVzID0gdGhpcy5kYXRhQXR0cmlidXRlcy5maWx0ZXIoYXR0ciA9PiBhdHRyWzBdICE9PSBrZXkpXHJcbiAgICAgIHJldHVybiBuZXcgZWFzeURvbSh7IC4uLmV4dHJhY3RJbml0T2JqZWN0KHRoaXMpLCBkYXRhQXR0cmlidXRlcyB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVBbGxEYXRhQXR0cmlidXRlcyA9ICgpOiBlYXN5RG9tID0+IG5ldyBlYXN5RG9tKHsgLi4uIGV4dHJhY3RJbml0T2JqZWN0KHRoaXMpLCBkYXRhQXR0cmlidXRlczogW10gfSlcclxuXHJcbiAgICBwdWJsaWMgd2l0aElubmVyVGV4dCA9IChpbm5lclRleHQ6IHN0cmluZywgY29uY2F0OiBib29sZWFuID0gZmFsc2UpOiBlYXN5RG9tID0+IHtcclxuICAgICAgaWYgKGlzTm90RGVmaW5lZChpbm5lclRleHQpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB3aXRoSW5uZXJUZXh0IGlzIG1pc3NpbmcgYW4gYXJndW1lbnQgJHtpbm5lclRleHR9LiBQbGVhc2UgcHJvdmlkZSBhIHN0cmluZy5gKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBfaW5uZXJUZXh0ID0gY29uY2F0ID8gdGhpcy5pbm5lclRleHQgKyBpbm5lclRleHQgOiBpbm5lclRleHRcclxuICAgICAgcmV0dXJuIG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcyksIGlubmVyVGV4dDogX2lubmVyVGV4dCB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVJbm5lclRleHQgPSAoKTogZWFzeURvbSA9PiBuZXcgZWFzeURvbSh7IC4uLmV4dHJhY3RJbml0T2JqZWN0KHRoaXMpLCBpbm5lclRleHQ6IHVuZGVmaW5lZCB9KVxyXG5cclxuICAgIHB1YmxpYyBjb3B5ID0gKGluaXRPYmo/OiBJbml0T2JqZWN0KTogZWFzeURvbSA9PiBuZXcgZWFzeURvbSh7IC4uLmV4dHJhY3RJbml0T2JqZWN0KHRoaXMpLCAuLi4oaW5pdE9iaiA/IGluaXRPYmogOiBudWxsKSB9KVxyXG5cclxuICAgIHB1YmxpYyBhcHBlbmRUbyA9IChxdWVyeTogc3RyaW5nKTogZWFzeURvbSA9PiB7XHJcbiAgICAgIGlmIChpc05vdERlZmluZWQocXVlcnkpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXBwZW5kVG8gaXMgbWlzc2luZyBhbiBhcmd1bWVudC4gUGxlYXNlIHByb3ZpZGUgYSBzdHJpbmcgKHF1ZXJ5KSBhcyB0aGUgYXJndW1lbnQuXCIpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghdGhpcy5lbGVtZW50KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlcmUgaXMgbm8gZWxlbWVudCB0aGF0IGNvdWxkIGJlIGFwcGVuZGVkLlwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihxdWVyeSlcclxuXHJcbiAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCB0YXJnZXQgZWxlbWVudC5cIilcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudClcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJlcGVuZFRvID0gKHF1ZXJ5OiBzdHJpbmcpOiBlYXN5RG9tID0+IHtcclxuICAgICAgaWYgKGlzTm90RGVmaW5lZChxdWVyeSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJwcmVwZW5kVG8gaXMgbWlzc2luZyBhbiBhcmd1bWVudC4gUGxlYXNlIHByb3ZpZGUgYSBzdHJpbmcgKHF1ZXJ5KSBhcyB0aGUgYXJndW1lbnQuXCIpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghdGhpcy5lbGVtZW50KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlcmUgaXMgbm8gZWxlbWVudCB0aGF0IGNvdWxkIGJlIHByZXBlbmRlZC5cIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpXHJcblxyXG4gICAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgdGFyZ2V0IGVsZW1lbnQuXCIpXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIHRhcmdldC5wcmVwZW5kKHRoaXMuZWxlbWVudClcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWFrZSA9ICgpOiBlYXN5RG9tID0+IG5ldyBlYXN5RG9tKHsgLi4uZXh0cmFjdEluaXRPYmplY3QodGhpcykgfSlcclxuXHJcbiAgICAvLyBUT0RPOiBjcmVhdGVGcm9tKCkgPC0tIHRyeSB0byBmaW5kIHRoZSBlbGVtZW50IGFuZCBjcmVhdGUgdGhlIG9iamVjdCBmcm9tIGl0XHJcbiAgfVxyXG59KCkpXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=