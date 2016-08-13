'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/*!
 * @author       Rogier Geertzema
 * @copyright    2016 Rogier Geertzema
 * @license      {@link https://github.com/unnoon/cell-multiset/blob/master/LICENSE|MIT License}
 * @overview     Fast JS MultiSet implementation.
 */
(function (root, multiset) {
    /*module_type*/ /* istanbul ignore next */switch (true) {
        /*amd*/case typeof define === 'function' && root.define === define && !!define.amd:
            define(multiset);break;
        /*node*/case (typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && root === module.exports:
            module.exports = multiset();break;
        /*global*/case !root.MultiSet:
            Object.defineProperty(root, 'MultiSet', { value: multiset(), enumerable: !0 });break;default:
            console.error("'MultiSet' is already defined on root object");}
    /*es6*/ /*<3*/
})(undefined, function multiset() {
    "use strict";

    extend(MultiSet.prototype, {
        /**
         * @name MultiSet#$info
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
         * @param {[Iterable]=} iterable_ - iterable object to initialize the set.
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
         * @method MultiSet#init
         * @desc
         *         Initializes the MultiSet. Useful in case one wants to use 'Object.create' instead of 'new'.
         *
         * @param {[Iterable]=} elms_ - iterable object to initialize the set.
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
        },
        /**
         * @method MultiSet#add
         * @desc
         *         Adds one or multiple elements to the multiset.
         *
         * @param {...any} elms - one or multiple elements to add to the set.
         *
         * @returns {MultiSet} this
         */
        add: function add() {
            var elm;

            for (var _len = arguments.length, elms = Array(_len), _key = 0; _key < _len; _key++) {
                elms[_key] = arguments[_key];
            }

            for (var i = 0, max = elms.length; i < max; i++) {
                elm = elms[i];

                this.elements.set(elm, (this.elements.get(elm) || 0) + 1);
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
        }

    });

    /**
     * @class MultiSet
     * @desc
     *        Fast JS MultiSet implementation.
     *
     * @param {[Iterable]=} iterable_ - iterable object to initialize the set.
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
        for (var prop in properties) {
            if (!properties.hasOwnProperty(prop)) {
                continue;
            }

            var dsc = Object.getOwnPropertyDescriptor(properties, prop);
            var aliases = dsc.value && (dsc.value + '').match(/@aliases:(.*?);/);
            var names = aliases ? aliases[1].match(/[\w\$]+/g) : [];names.unshift(prop);

            names.forEach(function (name) {
                return Object.defineProperty(obj, name, dsc);
            });
        }

        return obj;
    }

    return MultiSet;
});
