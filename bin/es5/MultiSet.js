'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

    extend(MultiSet.prototype, {
        /**
         * @name MultiSet#$info
         * @type Object
         * @desc
         *       Info object to hold general module information.
         */
        $info: {
            "name": "cell-multiset",
            "description": "Fast JS MultiSet implementation.",
            "version": "0.0.0",
            "url": "https://github.com/unnoon/cell-multiset"
        },
        /**
         * @method MultiSet#$create
         * @desc   **aliases:** $spawn
         * #
         *         Easy create method for people who use prototypal inheritance.
         *
         * @param {Iterable.<*>=} iterable_ - iterable object to initialize the set.
         *
         * @return {MultiSet} new MultiSet
         */
        $create: function $create(iterable_) {
            "@aliases: $spawn";

            {
                return Object.create(MultiSet.prototype).init(iterable_);
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
            for (var _len = arguments.length, elms = Array(_len), _key = 0; _key < _len; _key++) {
                elms[_key] = arguments[_key];
            }

            for (var i = 0 | 0, max = elms.length, elm; i < max; i++) {
                elm = elms[i];

                this.elements.set(elm, (this.elements.get(elm) || 0 | 0) + 1 | 0);
            }

            return this;
        },
        /**
         * @name MultiSet#cardinality
         * @desc   **aliases:** size
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
                var len = 0 | 0;

                this.elements.forEach(function (multiplicity) {
                    return len += multiplicity;
                }); // TODO improve speed

                return len;
            }
        },
        set cardinality(val) {
            console.warn("Cardinality/Size property is readonly.");
        },
        /**
         * @method MultiSet#clear
         * @desc
         *         Clears the multiset. Alphabet will be retained though.
         *         Basically setting all multiplicities to zero.
         *
         * @returns {MultiSet} this
         */
        clear: function clear() {
            this.elements.forEach(function (multiplicity, elm, elms) {
                elms.set(elm, 0 | 0);
            });

            return this;
        },
        /**
         * @method MultiSet#init
         * @desc
         *         Initializes the MultiSet. Useful in case one wants to use 'Object.create' instead of 'new'.
         *
         * @param {Iterable.<*>=} elms_ - iterable object to initialize the set.
         *
         * @returns {MultiSet} this
         */
        init: function init(elms_) {
            this.elements = new Map();

            if (elms_) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = elms_[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var elm = _step.value;
                        this.add(elm);
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
                for (var _len2 = arguments.length, elms = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    elms[_key2] = arguments[_key2];
                }

                for (var i = 0 | 0, max = elms.length, elm; i < max; i++) {
                    elm = elms[i];

                    this.elements.set(elm, Math.max(0 | 0, this.elements.get(elm) - 1 | 0));
                }

                return this;
            }
        }
    });

    /**
     * @class MultiSet
     * @desc
     *        Fast JS MultiSet implementation.
     *
     * @param {Iterable.<*>=} iterable_ - iterable object to initialize the set.
     *
     * @return {MultiSet} new MultiSet
     */
    function MultiSet(iterable_) {
        {
            this.init(iterable_);
        }
    }

    /**
     * @func extend
     * @desc
     *       Very simple extend function including alias support.
     *
     * @param {Object} obj        - object to extend.
     * @param {Object} properties - object with the extend properties.
     *
     * @returns {Object} the object after extension.
     */
    function extend(obj, properties) {
        var _loop = function _loop(prop) {
            if (!properties.hasOwnProperty(prop)) {
                return 'continue';
            }

            var dsc = Object.getOwnPropertyDescriptor(properties, prop);
            var aliases = (dsc.value || dsc.get || dsc.set).toString().match(/@aliases:(.*?);/);
            var names = aliases ? aliases[1].match(/[\w\$]+/g) : [];names.unshift(prop);

            names.forEach(function (name) {
                return Object.defineProperty(obj, name, dsc);
            });
        };

        for (var prop in properties) {
            var _ret = _loop(prop);

            if (_ret === 'continue') continue;
        }

        return obj;
    }
    return MultiSet.prototype; // prefer prototypal inheritance
});
