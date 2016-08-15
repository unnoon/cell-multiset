/*!
 * @author       Rogier Geertzema
 * @copyright    2016 Rogier Geertzema
 * @license      {@link https://github.com/unnoon/cell-multiset/blob/master/LICENSE|MIT License}
 * @overview     Fast JS MultiSet implementation.
 */
/*? if(MODULE_TYPE === 'es6') {write('export default ')}*/(function(root, multiset) {
    /*module_type*//*? if(MODULE_TYPE !== 'es6') { *//* istanbul ignore next */ switch(true) {
    /*amd*/    case typeof(define) === 'function' && root.define === define && !!define.amd : define(multiset);                                                             break;
    /*node*/   case typeof(module) === 'object'   && root === module.exports                : module.exports = multiset();                                                  break;
    /*global*/ case !root.MultiSet                                                          : Object.defineProperty(root, 'MultiSet', {value: multiset(), enumerable: !0}); break; default : console.error("'MultiSet' is already defined on root object")}
    /*es6*/    /*? } else { write('\n    \/*es6*\/ return multiset(); ') } *//*<3*/
})(this, function multiset() { "use strict";

    extend(MultiSet.prototype, {
        /**
         * @name MultiSet#$info
         * @desc
         *       Info object to hold general module information.
         */
        $info: {
            "name"       : "cell-multiset",
            "description": "Fast JS MultiSet implementation.",
            "version"    : "/*?= VERSION */",
            "url"        : "https://github.com/unnoon/cell-multiset"
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
        $create: function(iterable_) {
        "@aliases: $spawn";
        {
            return Object.create(MultiSet.prototype).init(iterable_);
        }},
        /**
         * @method MultiSet#init
         * @desc
         *         Initializes the MultiSet. Useful in case one wants to use 'Object.create' instead of 'new'.
         *
         * @param {Iterable.<*>=} elms_ - iterable object to initialize the set.
         *
         * @returns {MultiSet} this
         */
        init: function(elms_)
        {
            this.elements = new Map();

            if(elms_) {for(const elm of elms_) {this.add(elm)}}

            return this
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
        add: function(...elms)
        {
            for(let i = 0|0, max = elms.length, elm; i < max; i++)
            {
                elm = elms[i];

                this.elements.set(elm, (this.elements.get(elm) || 0) + 1);
            }

            return this
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
        remove: function(...elms) {
        "@aliases: delete";
        {
            for(let i = 0|0, max = elms.length, elm; i < max; i++)
            {
                elm = elms[i];

                if (!this.elements.has(elm)) {continue}

                this.elements.set(elm, Math.max(0, this.elements.get(elm) - 1));
            }

            return this
        }},
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
        has: function(elm) {
        "@aliases: isMember";
        {
            return !!this.elements.get(elm)
        }},
        /**
         * @readonly
         * @name MultiSet#size
         * @type number
         * @desc
         *       Getter for the cardinality of the set.
         *       In case of a set it will return a warning.
         */
        get size() {
        "@aliases: cardinality"; // TODO aliases for getter and setters
        {
            let len = 0|0;

            this.elements.forEach(multiplicity => len += multiplicity); // TODO improve

            return len
        }},
        set size(val)
        {
            console.warn("Length property is readonly.")
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
    }}

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
    function extend(obj, properties)
    {
        for(const prop in properties)
        {   if(!properties.hasOwnProperty(prop)) {continue}

            const dsc     = Object.getOwnPropertyDescriptor(properties, prop);
            const aliases = dsc.value && (dsc.value + '').match(/@aliases:(.*?);/);
            const names   = aliases? aliases[1].match(/[\w\$]+/g) : []; names.unshift(prop);

            names.forEach(name => Object.defineProperty(obj, name, dsc));
        }

        return obj
    }

    return MultiSet
});