'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * @author       Rogier Geertzema
 * @copyright    2016 Rogier Geertzema
 * @license      {@link https://github.com/unnoon/cell-multiset/blob/master/LICENSE|MIT License}
 * @overview     Fast JS MultiSet implementation.
 */
!function (root, multiset) {
    /* istanbul ignore next */switch (true) {
        /*amd*/case typeof define === 'function' && root.define === define && !!define.amd:
            define(multiset);break;
        /*node*/case (typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && root === module.exports:
            module.exports = multiset();break;
        /*global*/case !root.MultiSet:
            Reflect.defineProperty(root, 'MultiSet', { value: multiset(), enumerable: !0 });break;default:
            console.error("'MultiSet' is already defined on root object");}
}(undefined, function multiset() {
    "use strict";
    /*es6*/ /*<3*/
    // int32 consts

    var _info, _Symbol$species, _properties;

    var ZERO = 0 | 0;
    var ONE = 1 | 0;

    var $attrs = Symbol.for('cell-type.attrs');

    var properties = (_properties = {
        /**
         * @name MultiSet.info
         * @type Object
         * @desc
         *       Info object to hold general module information.
         */
        info: (_info = {}, _defineProperty(_info, $attrs, 'static !configurable !writable'), _defineProperty(_info, 'value', {
            "name": "cell-multiset",
            "description": "Fast JS MultiSet implementation.",
            "version": "0.0.3",
            "url": "https://github.com/unnoon/cell-multiset"
        }), _info),
        /**
         * @method MultiSet.create
         * @desc   **aliases:** spawn
         * #
         *         Easy create method for people who use prototypal inheritance.
         *
         * @param {Iterable.<any>=} iterable - iterable object to initialize the set.
         *
         * @return {MultiSet} new MultiSet
         */
        create: function create() {
            "<$attrs static alias=spawn>";

            var iterable = arguments.length <= 0 || arguments[0] === undefined ? void 0 : arguments[0];
            {
                return Object.create(MultiSet.prototype).init(iterable);
            }
        },

        /**
         * @method MultiSet#add
         * @desc
         *         Adds one or multiple elements to the multiset. Returns the MultiSet object.
         *
         * @param {...any} elms - one or multiple elements to add to the set.
         *
         * @returns {MultiSet} this
         */
        add: function add() {
            var max = arguments.length;

            for (var i = ZERO, elm; i < max; i++) {
                elm = arguments.length <= i + 0 ? undefined : arguments[i + 0];

                this.elements.set(elm, (this.elements.get(elm) || ZERO) + ONE);
            }

            return this;
        },

        /**
         * @name MultiSet#cardinality
         * @desc **aliases:** size
         * #
         *       Getter for the cardinality of the set.
         *       In case of a set it will return a warning.
         *
         * @readonly
         * @type number
         */
        get cardinality() {
            "<$attrs alias=size>";

            {
                var len = ZERO;

                this.elements.forEach(function (multiplicity) {
                    return len += multiplicity;
                });

                return len;
            }
        },
        set cardinality(val) {
            console.warn(".cardinality/.size property is readonly.");
        },
        /**
         * @method MultiSet#clear
         * @desc
         *         Clears the multiset.
         *
         * @returns {MultiSet} this
         */
        clear: function clear() {
            this.elements.clear();

            return this;
        },

        /**
         * @method MultiSet#clone
         * @desc
         *         Creates a clone of the multiset.
         *
         * @returns {MultiSet} clone
         */
        clone: function clone() {
            return MultiSet.create(this.values());
        },

        /**
         * @method MultiSet#contains
         * @desc
         *         Checks if a multiset contains another.
         *
         * @param {MultiSet} multiset
         *
         * @returns {boolean} Boolean indicating if the multiset is contained in the current one.
         */
        contains: function contains(multiset) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = multiset.elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var a = _step.value;
                    if (a[1] /*multiplicity*/ > this.multiplicity(a[0] /*elm*/)) {
                        return false;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return true;
        },

        /**
         * @method MultiSet#difference
         * @desc
         *         Calculates the difference between 2 multisets.
         *
         * @param {MultiSet} multiset
         *
         * @returns {MultiSet} this
         */
        difference: function difference(multiset) {
            var _this = this;

            var nmul = void 0;

            multiset.elements.forEach(function (multiplicity, elm) {
                nmul = _this.multiplicity(elm) - multiplicity;

                if (nmul <= 0) {
                    _this.elements.delete(elm);
                } else {
                    _this.elements.set(elm, nmul);
                }
            });

            return this;
        },

        /**
         * @method MultiSet#Difference
         * @desc
         *         Calculates the difference between 2 multisets into a new MultiSet.
         *
         * @param {MultiSet} multiset
         *
         * @returns {MultiSet} new MultiSet containing the difference
         */
        Difference: function Difference(multiset) {
            var _this2 = this;

            var output = MultiSet.create();
            var nmul = void 0;

            multiset.elements.forEach(function (multiplicity, elm) {
                nmul = _this2.multiplicity(elm) - multiplicity;

                if (nmul > 0) {
                    output.elements.set(elm, nmul);
                }
            });

            return output;
        },

        /**
         * @method MultiSet#each
         * @desc   **aliases:** forEach
         * #
         *         Iterates over the unique elements/keys of the set.
         *         Can be broken prematurely by returning false.
         *
         * @param {function(elm, multiplicity, this)} cb - callback function to be called on each unique element.
         * @param {Object=}                    ctx      - context for the callback function.
         *
         * @returns {boolean} boolean reflecting the result of the callback function
         */
        each: function each(cb) {
            "<$attrs alias=forEach>";

            var ctx = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
            {
                // for(let [elm, multiplicity] of this.elements) // destructuring is nice but slow...
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var a = _step2.value;

                        if (cb.call(ctx, a[0] /*elm*/, a[1] /*multiplicity*/, this) === false) {
                            return false;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                return true;
            }
        },

        /**
         * @method MultiSet#each$
         * @desc   **aliases:** forEach$, eachAll, forEachAll
         * #
         *         Iterates over the all elements of the set. Repeating elements if the multiplicity is higher then 1.
         *         Can be broken prematurely by returning false.
         *
         * @param {function(value, count, this)} cb   - callback function to be called on each element.
         * @param {Object=}                      ctx - context for the callback function.
         *
         * @returns {boolean} boolean reflecting the result of the callback function
         */
        each$: function each$(cb) {
            "<$attrs alias=forEach$|eachAll|forEachAll>";

            var ctx = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
            {
                var a = void 0,
                    i = void 0,
                    mul = void 0,
                    count = 0;

                // for(let [elm, multiplicity] of this.elements) // destructuring is nice but slow...
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.elements[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        a = _step3.value;
                        for (i = 0, mul = a[1] /*multiplicity*/; i < mul; i++, count++) {
                            if (cb.call(ctx, a[0] /*elm*/, count, this) === false) {
                                return false;
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                return true;
            }
        },

        /**
         * @method MultiSet#entries
         * @desc
         *         A new Iterator object that contains an array of [elm, multiplicity] for each element in the given Set, in insertion order.
         *
         * @returns {Iterator.<any>}
         */
        entries: function entries() {
            return this.elements.entries();
        },

        /**
         * @method MultiSet#equals
         * @desc
         *         Checks equality between 2 multisets.
         *
         * @param {MultiSet} multiset - Multiset to check equality with.
         *
         * @returns {boolean} Boolean indicating if the 2 multisets are equal.
         */
        equals: function equals(multiset) {
            var _this3 = this;

            if (this.size !== multiset.size) {
                return false;
            }

            return multiset.each(function (mul, elm) {
                return mul !== _this3.multiplicity(elm);
            });
        },

        /**
         * @method MultiSet#has
         * @desc   **aliases:** isMember
         * #
         *         Checks membership of an elm in the multiset.
         *
         * @param {any} elm - element to check the membership for.
         *
         * @returns {boolean} boolean indicating the membership of the element.
         */
        has: function has(elm) {
            "<$attrs alias=isMember>";

            {
                return !!this.elements.get(elm);
            }
        },

        /**
         * @method MultiSet#init
         * @desc
         *         Initializes the MultiSet. Useful in case one wants to use 'Object.create' instead of 'new'.
         *
         * @param {Iterable.<any>=} elms - iterable object to initialize the set.
         *
         * @returns {MultiSet} this
         */
        init: function init() {
            var elms = arguments.length <= 0 || arguments[0] === undefined ? void 0 : arguments[0];

            this.elements = new Map();

            if (elms) {
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = elms[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var elm = _step4.value;
                        this.add(elm);
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }
            }

            return this;
        },

        /**
         * @method MultiSet#intersection
         * @desc   **aliases:** and
         * #
         *         Calculates the intersection between 2 multisets.
         *
         * @param {MultiSet} multiset
         *
         * @returns {MultiSet} this
         */
        intersection: function intersection(multiset) {
            "<$attrs alias=and>";

            var _this4 = this;

            {
                var _ret = function () {
                    var nmul = void 0;

                    _this4.elements.forEach(function (multiplicity, elm) {
                        nmul = Math.min(multiplicity, multiset.multiplicity(elm));

                        if (!nmul) {
                            _this4.elements.delete(elm);
                        } else {
                            _this4.elements.set(elm, nmul);
                        }
                    });

                    return {
                        v: _this4
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }
        },

        /**
         * @method MultiSet#Intersection
         * @desc   **aliases:** And
         * #
         *         Calculates the intersection between 2 multisets into a new MultiSet.
         *
         * @param {MultiSet} multiset
         *
         * @returns {MultiSet} new MultiSet containing the intersection.
         */
        Intersection: function Intersection(multiset) {
            "<$attrs alias=And>";

            var _this5 = this;

            {
                var _ret2 = function () {
                    var output = MultiSet.create();
                    var nmul = void 0;

                    _this5.elements.forEach(function (multiplicity, elm) {
                        nmul = Math.min(multiplicity, multiset.multiplicity(elm));

                        if (nmul) {
                            output.elements.set(elm, nmul);
                        }
                    });

                    return {
                        v: output
                    };
                }();

                if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
            }
        },

        /**
         * @method MultiSet#isSubsetOf
         * @desc   **aliases:** isContainedIn
         * #
         *         Checks if a multiset is a subset of another
         *
         * @param {MultiSet} multiset
         *
         * @returns {boolean} Boolean indicating if the current subset is contained in another.
         */
        isSubsetOf: function isSubsetOf(multiset) {
            "<$attrs alias=isContainedIn>";

            {
                return multiset.contains(this);
            }
        },

        /**
         * @method MultiSet#keys
         * @desc   **aliases:** underlyingElements
         * #
         *         Returns a new Iterator object that contains the unique elements in the Set object in insertion order.
         *
         * @returns {Iterator.<any>}
         */
        keys: function keys() {
            "<$attrs alias=underlyingElements>";

            {
                return this.elements.keys();
            }
        },

        /**
         * @method MultiSet#multiplicity
         * @desc
         *         Returns the multiplicity for a given element or 0 if it is not a member.
         *
         * @param {any} elm - The element to get the multiplicity for.
         *
         * @returns {int}
         */
        multiplicity: function multiplicity(elm) {
            return this.elements.get(elm) || ZERO;
        },

        /**
         * @method MultiSet#remove
         * @desc   **aliases:** delete
         * #
         *         Delete one or more elements from the MultiSet. Returns the MultiSet object.
         *
         * @param {...any} elms - one or more elements to remove.
         *
         * @returns {MultiSet} this
         */
        remove: function remove() {
            "<$attrs alias=delete>";

            {
                var max = arguments.length;

                for (var i = ZERO, elm, multiplicity; i < max; i++) {
                    elm = arguments.length <= i + 0 ? undefined : arguments[i + 0];
                    multiplicity = this.elements.get(elm);

                    if (multiplicity === 1) {
                        this.elements.delete(elm);
                    } else {
                        this.elements.set(elm, Math.max(ZERO, --multiplicity));
                    }
                }

                return this;
            }
        },

        /**
         * @method MultiSet#symmetricDifference
         * @desc   **aliases:** exclusion
         * #
         *         Calculates the symmetricDifference between 2 multisets.
         *
         * @param {MultiSet} multiset
         *
         * @returns {MultiSet} this
         */
        symmetricDifference: function symmetricDifference(multiset) {
            "<$attrs alias=exclusion>";

            var _this6 = this;

            {
                var _ret3 = function () {
                    var diff = void 0;

                    multiset.elements.forEach(function (multiplicity, elm) {
                        diff = _this6.multiplicity(elm) - multiplicity;

                        if (!diff) {
                            _this6.elements.delete(elm);
                        } else {
                            _this6.elements.set(elm, Math.abs(diff));
                        }
                    });

                    return {
                        v: _this6
                    };
                }();

                if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
            }
        },

        /**
         * @method MultiSet#SymmetricDifference
         * @desc   **aliases:** Exclusion
         * #
         *         Calculates the SymmetricDifference between 2 multisets into a new MultiSet.
         *
         * @param {MultiSet} multiset
         *
         * @returns {MultiSet} new MultiSet containing the symmetric difference.
         */
        SymmetricDifference: function SymmetricDifference(multiset) {
            "<$attrs alias=Exclusion>";

            var _this7 = this;

            {
                var _ret4 = function () {
                    var output = _this7.clone();
                    var diff = void 0;

                    multiset.elements.forEach(function (multiplicity, elm) {
                        diff = output.multiplicity(elm) - multiplicity;

                        if (!diff) {
                            output.elements.delete(elm);
                        } else {
                            output.elements.set(elm, Math.abs(diff));
                        }
                    });

                    return {
                        v: output
                    };
                }();

                if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
            }
        },

        /**
         * @method MultiSet#toString
         * @desc   **aliases:** stringify
         * #
         *         Stringifies the MultiSet in simple array style.
         *
         * @param {int} mode - the mode for stringification:
         *                     default : {7 => 3, 67 => 1, 8 => 1}               (map style)
         *                      1      : [7, 7, 7, 67, 8]                        (array style)
         *                     -1      : ({7, 67, 8}, {(7, 3), (67, 1), (8, 1)}) (formal)
         *
         * @returns {string}
         */
        toString: function toString(mode) {
            "<$attrs alias=stringify>";

            var _this8 = this;

            {
                var _ret5 = function () {
                    var out = '';

                    switch (mode) {
                        case -1:
                            out += '({' + ('' + Array.from(_this8.keys())).replace(/,/g, ', ') + '}, {';
                            _this8.each(function (elm, mul) {
                                return out += (out[out.length - 1] !== '{' ? ', ' : '') + '(' + elm + ', ' + mul + ')';
                            });
                            out += '})';break;
                        case 1:
                            out += '[';_this8.each$(function (elm) {
                                return out += '' + (out !== '[' ? ', ' : '') + elm;
                            });out += ']';break;
                        default:
                            out += '{';_this8.each(function (elm, mul) {
                                return out += '' + (out !== '{' ? ', ' : '') + elm + ' => ' + mul;
                            });out += '}';break;
                    }

                    return {
                        v: out
                    };
                }();

                if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object") return _ret5.v;
            }
        },

        /**
         * @method MultiSet#union
         * @desc   **aliases:** or
         * #
         *         Calculates the union between 2 multisets.
         *
         * @param {MultiSet} multiset
         *
         * @returns {MultiSet} this
         */
        union: function union(multiset) {
            "<$attrs alias=or>";

            var _this9 = this;

            {
                multiset.elements.forEach(function (multiplicity, elm) {
                    return _this9.elements.set(elm, Math.max(multiplicity, _this9.multiplicity(elm)));
                });

                return this;
            }
        },

        /**
         * @method MultiSet#Union
         * @desc   **aliases:** Or
         * #
         *         Calculates the Union between 2 multisets into a new MultiSet.
         *
         * @param {MultiSet} multiset
         *
         * @returns {MultiSet} The union of the 2 multisets in a new MultiSet.
         */
        Union: function Union(multiset) {
            "<$attrs alias=Or>";

            var _this10 = this;

            {
                var _ret6 = function () {
                    var output = _this10.clone();

                    multiset.elements.forEach(function (multiplicity, elm) {
                        return output.elements.set(elm, Math.max(multiplicity, output.multiplicity(elm)));
                    });

                    return {
                        v: output
                    };
                }();

                if ((typeof _ret6 === 'undefined' ? 'undefined' : _typeof(_ret6)) === "object") return _ret6.v;
            }
        },

        /**
         * @method MultiSet#values
         * @desc
         *         Returns a new Iterator object that contains the values for each element, including repetitions, in the MultiSet object in insertion order.
         *
         * @returns {Iterator.<any>}
         */
        values: function values() {
            var data = [];

            this.each$(function (val) {
                return data.push(val);
            });

            return regeneratorRuntime.mark(function _callee(data) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                return _context.delegateYield(data, 't0', 1);

                            case 1:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            })(data);
        }
    }, _defineProperty(_properties, Symbol.iterator, function () {
        return this.elements.entries();
    }), _defineProperty(_properties, Symbol.species, (_Symbol$species = {}, _defineProperty(_Symbol$species, $attrs, 'static'), _defineProperty(_Symbol$species, 'value', MultiSet), _Symbol$species)), _defineProperty(_properties, Symbol.toStringTag, 'MultiSet'), _properties);
    /**
     * @constructor MultiSet
     * @desc
     *        Fast JS MultiSet implementation.
     *
     * @param {Iterable.<any>=} iterable - iterable object to initialize the set.
     *
     * @return {MultiSet} new MultiSet
     */
    function MultiSet() {
        var iterable = arguments.length <= 0 || arguments[0] === undefined ? void 0 : arguments[0];

        this.init(iterable);
    }

    extend(MultiSet.prototype, properties);

    /**
     * @func extend
     * @desc
     *       Very simple extend function including alias, static and basic attribute support.
     *
     * @param {Object} obj        - object to extend.
     * @param {Object} properties - object with the extend properties.
     *
     * @returns {Object} the object after extension.
     */
    function extend(obj, properties) {
        [].concat(_toConsumableArray(Object.getOwnPropertySymbols(properties)), _toConsumableArray(Object.keys(properties))).forEach(function (prop) {
            var dsc = processDescAttrs(Object.getOwnPropertyDescriptor(properties, prop));
            var names = dsc.alias || [];names.unshift(prop);

            names.forEach(function (name) {
                Object.defineProperty(obj, name, dsc);
                if (dsc.static && obj.hasOwnProperty('constructor')) {
                    Object.defineProperty(obj.constructor, name, dsc);
                }
            });
        });

        return obj;
    }
    /**
     * @func processDescAttrs
     * @desc
     *       processes any attributes passed to a function or on the $attrs symbol, in case of a property, and adds these to the descriptor.
    
     * @param {Object} dsc - Property descriptor to be processed.
     *
     * @returns {Object} The processed descriptor.
     */
    function processDescAttrs(dsc) {
        var tmp = ('' + (dsc.value || dsc.get || dsc.set)).match(/<\$attrs(.*?)>/);
        var tmp2 = ('' + (tmp ? tmp[1] : dsc.value && dsc.value[$attrs] || '')).replace(/[\s]*([=\|\s])[\s]*/g, '$1'); // prettify: remove redundant white spaces
        var attributes = tmp2.match(/[!\$\w]+(=[\$\w]+(\|[\$\w]+)*)?/g) || []; // filter attributes including values

        assignAttrsToDsc(attributes, dsc);

        // if value is a descriptor set the value to the descriptor value
        if (dsc.value && dsc.value[$attrs] !== undefined) {
            dsc.value = dsc.value.value;
        }

        return dsc;
    }
    /**
     * @func assignAttrsToDsc
     *
     * @param {Array<string>} attributes - Array containing the attributes.
     * @param {Object}        dsc        - The descriptor to be extended with the attributes.
     */
    function assignAttrsToDsc(attributes, dsc) {
        dsc.enumerable = false; // default set enumerable to false

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = attributes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var attr = _step5.value;
                var value = void 0;
                switch (true) {
                    case !attr.indexOf('!'):
                        value = false;attr = attr.slice(1);break;
                    case !!~attr.indexOf('='):
                        value = attr.match(/[\$\w]+/g);attr = value.shift();break;
                    default:
                        value = true;
                }

                dsc[attr] = value;
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }
    }
    return MultiSet.prototype; // prefer prototypal inheritance
});
