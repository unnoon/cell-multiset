/*!
 * @author       Rogier Geertzema
 * @copyright    2016 Rogier Geertzema
 * @license      {@link https://github.com/unnoon/cell-multiset/blob/master/LICENSE|MIT License}
 * @overview     Fast JS MultiSet implementation.
 */
export default (function(root, multiset) {
    /*module_type*/
    /*es6*/ return multiset(); /*<3*/
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
            "version"    : "0.0.0",
            "url"        : "https://github.com/unnoon/cell-multiset"
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
         * @param {[Iterable]=} elms_ - iterable object to initialize the set.
         *
         * @returns {MultiSet} this
         */
        init: function(elms_)
        {
            this.elements = new Map();

            if(elms_) {for(var elm of elms_) {this.add(elm)}}
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
        add: function(...elms)
        {
            var elm;

            for(let i = 0, max = elms.length; i < max; i++)
            {
                elm = elms[i];

                this.elements.set(elm, (this.elements.get(elm) || 0) + 1);
            }

            return this
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
        has: function(elm) {
        "@aliases: isMember";
        {
            return !!this.elements.get(elm)
        }}

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
        for(var prop in properties)
        {   if(!properties.hasOwnProperty(prop)) {continue}

            var dsc     = Object.getOwnPropertyDescriptor(properties, prop);
            var aliases = dsc.value && (dsc.value + '').match(/@aliases:(.*?);/);
            var names   = aliases? aliases[1].match(/[\w\$]+/g) : []; names.unshift(prop);

            names.forEach(name => Object.defineProperty(obj, name, dsc));
        }

        return obj
    }

    return MultiSet
});