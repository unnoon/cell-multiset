/*!
 * @author       Rogier Geertzema
 * @copyright    2016 Rogier Geertzema
 * @license      {@link https://github.com/unnoon/cell-multiset/blob/master/LICENSE|MIT License}
 * @overview     Fast JS MultiSet implementation.
 */
/*? if(MODULE_TYPE !== 'es6') {*/
!function(root, multiset) {
/* istanbul ignore next */ switch(true) {
/*amd*/    case typeof(define) === 'function' && root.define === define && !!define.amd : define(multiset);                                                             break;
/*node*/   case typeof(module) === 'object'   && root === module.exports                : module.exports = multiset();                                                  break;
/*global*/ case !root.MultiSet                                                          : Object.defineProperty(root, 'MultiSet', {value: multiset(), enumerable: !0}); break; default : console.error("'MultiSet' is already defined on root object")}
}(this, function multiset() { "use strict";
/*es6*//*? } else { write('export {MultiSet as CMultiSet};\nexport default MultiSet.prototype\n\n') } *//*<3*/
// int32 consts
const zero = 0|0;
const one  = 1|0;

const properties = {
    /**
     * @name MultiSet.info
     * @type Object
     * @desc
     *       Info object to hold general module information.
     */
    "static info": {
        "name"       : "cell-multiset",
        "description": "Fast JS MultiSet implementation.",
        "version"    : "/*?= VERSION */",
        "url"        : "https://github.com/unnoon/cell-multiset"
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
    "static create": function(iterable=void 0) {
    "@aliases: spawn";
    {
        return Object.create(MultiSet.prototype).init(iterable);
    }},
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
        const max = elms.length;

        for(let i = zero, elm; i < max; i++)
        {
            elm = elms[i];

            this.elements.set(elm, (this.elements.get(elm) || zero) + one);
        }

        return this
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
        let len = zero;

        this.elements.forEach(multiplicity => len += multiplicity);

        return len
    }},
    set cardinality(val)
    {
        console.warn(".cardinality/.size property is readonly.")
    },
    /**
     * @method MultiSet#clear
     * @desc
     *         Clears the multiset.
     *
     * @returns {MultiSet} this
     */
    clear: function()
    {
        this.elements.clear();

        return this
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
    contains: function(multiset)
    {
        for(let a of multiset.elements) {if(a[1]/*multiplicity*/ > this.multiplicity(a[0]/*elm*/)) {return false}}

        return true
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
    difference: function(multiset)
    {
        let nmul;

        multiset.elements.forEach((multiplicity, elm) => {
            nmul = this.multiplicity(elm) - multiplicity;

            if(nmul <= 0) {this.elements.delete(elm)}
            else          {this.elements.set(elm, nmul)}
        });

        return this
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
    each: function(cb, ctx=null) {
    "@aliases: forEach";
    {
        // for(let [elm, multiplicity] of this.elements) // destructuring is nice but slow...
        for(let a of this.elements)
        {
            if(cb.call(ctx, a[0]/*elm*/, a[1]/*multiplicity*/, this) === false) {return false}
        }

        return true
    }},
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
    each$: function(cb, ctx=null) {
    "@aliases: forEach$, eachAll, forEachAll";
    {
        let count = 0;
        // for(let [elm, multiplicity] of this.elements) // destructuring is nice but slow...
        for(let a of this.elements)
        {   for(let i = 0, mul = a[1]/*multiplicity*/; i < mul; i++, count++)
            {
                if(cb.call(ctx, a[0]/*elm*/, count, this) === false) {return false}
            }
        }

        return true
    }},
    /**
     * @method MultiSet#entries
     * @desc
     *         A new Iterator object that contains an array of [elm, multiplicity] for each element in the given Set, in insertion order.
     *
     * @returns {Iterator.<any>}
     */
    entries: function()
    {
        return this.elements.entries();
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
    }},
    /**
     * @method MultiSet#init
     * @desc
     *         Initializes the MultiSet. Useful in case one wants to use 'Object.create' instead of 'new'.
     *
     * @param {Iterable.<any>=} elms - iterable object to initialize the set.
     *
     * @returns {MultiSet} this
     */
    init: function(elms=void 0)
    {
        this.elements = new Map();

        if(elms) {for(let elm of elms) {this.add(elm)}}

        return this
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
    intersection: function(multiset) {
    "@aliases: and";
    {
        let nmul;

        this.elements.forEach((multiplicity, elm) => {
            nmul = Math.min(multiplicity, multiset.multiplicity(elm));

            if(!nmul) {this.elements.delete(elm)}
            else      {this.elements.set(elm, nmul)}
        });

        return this
    }},
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
    isSubsetOf: function(multiset) {
    "@aliases: isContainedIn";
    {
        return multiset.contains(this)
    }},
    /**
     * @method MultiSet#keys
     * @desc   **aliases:** underlyingElements
     * #
     *         Returns a new Iterator object that contains the unique elements in the Set object in insertion order.
     *
     * @returns {Iterator.<any>}
     */
    keys: function() {
    "@aliases: underlyingElements";
    {
        return this.elements.keys();
    }},
    /**
     * @method MultiSet#multiplicity
     * @desc
     *         Returns the multiplicity for a given element or 0 if it is not a member.
     *
     * @param {any} elm - The element to get the multiplicity for.
     *
     * @returns {int}
     */
    multiplicity: function(elm)
    {
        return this.elements.get(elm) || zero;
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
        const max = elms.length;

        for(let i = zero, elm, multiplicity; i < max; i++)
        {
            elm          = elms[i];
            multiplicity = this.elements.get(elm);

            if(multiplicity === 1) {this.elements.delete(elm)}
            else                   {this.elements.set(elm, Math.max(zero, --multiplicity))}
        }

        return this
    }},
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
    toString: function(mode) {
    "@aliases: stringify";
    {
        var out = '';

        switch(mode)
        {
            case -1 : out += `({${(Array.from(this.keys())+'').replace(/,/g,`, `)}}, {`;
                      this.each((elm, mul) => out += `${out[out.length-1] !== `{` ? `, ` : ``}(${elm}, ${mul})`);
                      out += `})`; break;
            case  1 : out += `[`; this.each$(elm =>       out += `${out !== `[` ? `, ` : ``}${elm}`);           out += `]`; break;
            default : out += `{`; this.each((elm, mul) => out += `${out !== `{` ? `, ` : ``}${elm} => ${mul}`); out += `}`; break;
        }

        return out
    }},
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
    union: function(multiset) {
    "@aliases: or";
    {
        multiset.elements.forEach((multiplicity, elm) => this.elements.set(elm, Math.max(multiplicity, this.multiplicity(elm))));

        return this
    }},
    /**
     * @method MultiSet#values
     * @desc
     *         Returns a new Iterator object that contains the values for each element, including repetitions, in the MultiSet object in insertion order.
     *
     * @returns {Iterator.<any>}
     */
    values: function()
    {
        let data = [];

        this.each$(val => data.push(val));

        return (function*(data) {yield* data})(data)
    },
    /**
     * @method MultiSet#[@@iterator]
     * @desc
     *         Prototype Symbol.iterator to make MultiSet iterable.
     *         Returns a new Iterator object that contains the [value, multiplicity] for each element, in the MultiSet object in insertion order.
     *
     * @returns {Iterator.<any>}
     */
    ["@@iterator"]: function()
    {
        return this.elements.entries();
    },
    /**
     * @name MultiSet#[@@toStringTag]
     * @type string
     * @desc
     *       Custom name for Object.prototype.toString.call(multiset) === [object MultiSet]
     */
    ["@@toStringTag"]: 'MultiSet',
    /**
     * @name MultiSet.[@@species]
     * @type function
     * @desc
     *       the species of the MultiSet. Which is just the MultiSet constructor.
     */
    ["static @@species"]: MultiSet
};
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
function MultiSet(iterable=void 0)
{
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
function extend(obj, properties)
{
    for(let prop in properties)
    {   if(!properties.hasOwnProperty(prop)) {continue}

        let dsc      = Object.getOwnPropertyDescriptor(properties, prop);
        let attrs    = prop.match(/[\w\$\@]+/g); prop = attrs[attrs.length-1]; attrs.pop();
        let aliases  = (dsc.value || dsc.get || dsc.set).toString().match(/@aliases:(.*?);/);
        let names    = aliases? aliases[1].match(/[\w\$]+/g) : []; names.unshift(prop);
        let symbol   = prop.match(/@@(.+)/); symbol = symbol ? symbol[1] : '';
        let addProp  = function(obj, name) {if(symbol) {obj[Symbol[symbol]] = dsc.value} else {Reflect.defineProperty(obj, name, dsc)}};

        names.forEach(name => {
            if(~attrs.indexOf('static')) {addProp(obj, name)}
            addProp(obj.prototype, name);
        });
    }

    return obj
}
/*? if(MODULE_TYPE !== 'es6') {*/
return MultiSet.prototype; // prefer prototypal inheritance
});
/*? } */