'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
            Object.defineProperty(root, 'MultiSet', { value: multiset(), enumerable: !0 });break;default:
            console.error("'MultiSet' is already defined on root object");}
}(undefined, function multiset() {
    "use strict";
    /*es6*/ /*<3*/
    // int32 consts

    var _properties;

    var zero = 0 | 0;
    var one = 1 | 0;

    var properties = (_properties = {
        /**
         * @name MultiSet.info
         * @type Object
         * @desc
         *       Info object to hold general module information.
         */
        "static info": {
            "name": "cell-multiset",
            "description": "Fast JS MultiSet implementation.",
            "version": "0.0.0",
            "url": "https://github.com/unnoon/cell-multiset"
        },
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
        "static create": function staticCreate() {
            "@aliases: spawn";

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

            for (var i = zero, elm; i < max; i++) {
                elm = arguments.length <= i + 0 ? undefined : arguments[i + 0];

                this.elements.set(elm, (this.elements.get(elm) || zero) + one);
            }

            return this;
        },
        /**
         * @method MultiSet#alphabet
         * @desc   **aliases:** underlyingElements
         * #
         *         Returns the alphabet (underlying elements) of the multiset in array form.
         *
         * @returns {Array}
         */
        alphabet: function alphabet() {
            "@aliases: underlyingElements";

            var _this = this;

            {
                var _ret = function () {
                    var underlyingElements = [];

                    _this.forEach(function (letter) {
                        return underlyingElements.push(letter);
                    });

                    return {
                        v: underlyingElements
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }
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
            "@aliases: size";

            {
                var len = zero;

                this.elements.forEach(function (multiplicity) {
                    return len += multiplicity;
                }); // TODO improve speed

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
            "@aliases: forEach";

            var ctx = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
            {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _step$value = _slicedToArray(_step.value, 2);

                        var elm = _step$value[0];
                        var multiplicity = _step$value[1];

                        if (cb.call(ctx, elm, multiplicity, this) === false) {
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
            }
        },
        /**
         * @method MultiSet#each
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
            "@aliases: forEach$, eachAll, forEachAll";

            var ctx = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
            {
                var count = 0;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _step2$value = _slicedToArray(_step2.value, 2);

                        var elm = _step2$value[0];
                        var multiplicity = _step2$value[1];
                        for (var i = 0; i < multiplicity; i++, count++) {
                            if (cb.call(ctx, elm, count, this) === false) {
                                return false;
                            }
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
         * @method MultiSet#get
         * @desc   **aliases:** multiplicityOf
         * #
         *         Map style getter to return the multiplicity of an element. undefined if the element is not in the set.
         *
         * @param {any} elm - element to retrieve the multiplicity for.
         *
         * @returns {int|undefined} the multiplicity of the element. undefined if not a member of the set.
         */
        get: function get(elm) {
            "@aliases: multiplicityOf";

            {
                return this.elements.get(elm);
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
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = elms[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var elm = _step3.value;
                        this.add(elm);
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
            }

            return this;
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
            "@aliases: isMember";

            {
                return !!this.elements.get(elm);
            }
        },
        /**
         * @method MultiSet#keys
         * @desc
         *         Returns a new Iterator object that contains the unique elements in the Set object in insertion order.
         *
         * @returns {Iterator.<any>}
         */
        keys: function keys() {
            {
                return this.elements.keys();
            }
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
            "@aliases: delete";

            {
                var max = arguments.length;

                for (var i = zero, elm, multiplicity; i < max; i++) {
                    elm = arguments.length <= i + 0 ? undefined : arguments[i + 0];
                    multiplicity = this.elements.get(elm);

                    if (multiplicity === 1) {
                        this.elements.delete(elm);
                    } else {
                        this.elements.set(elm, Math.max(zero, --multiplicity));
                    }
                }

                return this;
            }
        },
        /**
         * @method MultiSet#toString
         * @desc   **aliases:** stringify
         * #
         *         Stringifies the MultiSet in simple array style.
         *
         * @returns {string}
         */
        toString: function toString(mode) {
            "@aliases: stringify";

            {
                var out = '';

                switch (mode) {
                    case -1:
                        out += '({' + (this.alphabet() + '').replace(/,/g, ', ') + '}, {';
                        this.each(function (elm, mul) {
                            return out += (out[out.length - 1] !== '{' ? ', ' : '') + '(' + elm + ', ' + mul + ')';
                        });
                        out += '})';break;
                    case 1:
                        out += '[';this.each$(function (elm) {
                            return out += '' + (out !== '[' ? ', ' : '') + elm;
                        });out += ']';break;
                    default:
                        out += '{';this.each(function (elm, mul) {
                            return out += '' + (out !== '{' ? ', ' : '') + elm + ' => ' + mul;
                        });out += '}';break;
                }

                return out;
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
    }, _defineProperty(_properties, "@@iterator", function iterator() {
        return this.elements.entries();
    }), _defineProperty(_properties, "@@toStringTag", 'MultiSet'), _defineProperty(_properties, "static @@species", MultiSet), _properties);
    /**
     * @constructor MultiSet
     * @desc
     *        Fast JS MultiSet implementation.
     *        'class' stuff...
     *
     * @param {Iterable.<any>=} iterable - iterable object to initialize the set.
     *
     * @return {MultiSet} new MultiSet
     */
    function MultiSet() {
        var iterable = arguments.length <= 0 || arguments[0] === undefined ? void 0 : arguments[0];

        this.init(iterable);
    }

    extend(MultiSet, properties);

    /**
     * @func extend
     * @desc
     *       Very simple extend function including alias, static support.
     *
     * @param {Object} obj        - object to extend.
     * @param {Object} properties - object with the extend properties.
     *
     * @returns {Object} the object after extension.
     */
    function extend(obj, properties) {
        var _loop = function _loop(_prop) {
            if (!properties.hasOwnProperty(_prop)) {
                return 'continue';
            }

            var dsc = Object.getOwnPropertyDescriptor(properties, _prop);
            var attrs = _prop.match(/[\w\$\@]+/g);_prop = attrs[attrs.length - 1];attrs.pop();
            var aliases = (dsc.value || dsc.get || dsc.set).toString().match(/@aliases:(.*?);/);
            var names = aliases ? aliases[1].match(/[\w\$]+/g) : [];names.unshift(_prop);
            var symbol = _prop.match(/@@(.+)/);symbol = symbol ? symbol[1] : '';
            var addProp = function addProp(obj, name) {
                if (symbol) {
                    obj[Symbol[symbol]] = dsc.value;
                } else {
                    Reflect.defineProperty(obj, name, dsc);
                }
            };

            names.forEach(function (name) {
                if (~attrs.indexOf('static')) {
                    addProp(obj, name);
                }
                addProp(obj.prototype, name);
            });
            prop = _prop;
        };

        for (var prop in properties) {
            var _ret2 = _loop(prop);

            if (_ret2 === 'continue') continue;
        }

        return obj;
    }
    return MultiSet.prototype; // prefer prototypal inheritance
});
