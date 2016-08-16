/*!
 * @author       Rogier Geertzema
 * @copyright    2016 Rogier Geertzema
 * @license      {@link https://github.com/unnoon/cell-multiset/blob/master/LICENSE|MIT License}
 * @overview     Fast JS MultiSet implementation.
 */
!function(root, multiset) {
/* istanbul ignore next */ switch(true) {
/*amd*/    case typeof(define) === 'function' && root.define === define && !!define.amd : define(multiset);                                                             break;
/*node*/   case typeof(module) === 'object'   && root === module.exports                : module.exports = multiset();                                                  break;
/*global*/ case !root.MultiSet                                                          : Object.defineProperty(root, 'MultiSet', {value: multiset(), enumerable: !0}); break; default : console.error("'MultiSet' is already defined on root object")}
}(this, function multiset() { "use strict";
/*es6*//*<3*/
// int32 consts
const zero = 0|0;
const one  = 1|0;

const properties = {
    /**
     * @name MultiSet#$info
     * @type Object
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
     * @param {Iterable.<any>=} iterable - iterable object to initialize the set.
     *
     * @return {MultiSet} new MultiSet
     */
    $create: function(iterable=void 0) {
    "@aliases: $spawn";
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
        let len = zero;

        this.elements.forEach(multiplicity => len += multiplicity); // TODO improve speed

        return len
    }},
    set cardinality(val)
    {
        console.warn(".cardinality/.size property is readonly.")
    },
    /**
     * @method MultiSet#clear
     * @desc
     *         Clears the multiset. Alphabet will be retained though.
     *         Basically setting all multiplicities to zero.
     *
     * @returns {MultiSet} this
     */
    clear: function()
    {
        this.elements.forEach((multiplicity, elm, elms) => {elms.set(elm, zero)});

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
        for(let [elm, multiplicity] of this.elements)
        {
            if(cb.call(ctx, elm, multiplicity, this) === false) {return false}
        }

        return true
    }},
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
    each$: function(cb, ctx=null) {
    "@aliases: forEach$, eachAll, forEachAll";
    {
        let count = 0;
        for(let [elm, multiplicity] of this.elements)
        {   for(let i = 0; i < multiplicity; i++, count++)
            {
                if(cb.call(ctx, elm, count, this) === false) {return false}
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
     * @method MultiSet#get
     * @desc   **aliases:** multiplicityOf
     * #
     *         Map style getter to return the multiplicity of an element. undefined if the element is not in the set.
     *
     * @param {any} elm - element to retrieve the multiplicity for.
     *
     * @returns {int|undefined} the multiplicity of the element. undefined if not a member of the set.
     */
    get: function(elm) {
    "@aliases: multiplicityOf";
    {
        return this.elements.get(elm)
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
     * @method MultiSet#keys
     * @desc
     *         Returns a new Iterator object that contains the unique elements in the Set object in insertion order.
     *
     * @returns {Iterator.<any>}
     */
    keys: function() {
    {
        return this.elements.keys();
    }},
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

        for(let i = zero, elm; i < max; i++)
        {
            elm = elms[i];

            this.elements.set(elm, Math.max(zero, this.elements.get(elm) - one));
        }

        return this
    }},
    /**
     * @method MultiSet#toArray
     * @desc
     *         Returns a simple array containing all elements including repeating elements.
     *
     * @returns {Array}
     */
    toArray: function()
    {
        var arr = [];

        this.each$(val => arr.push(val));

        return arr
    },
    /**
     * @method MultiSet#toString
     * @desc   **aliases:** stringify
     * #
     *         Stringifies the MultiSet in simple array style.
     *
     * @returns {string}
     */
    toString: function() {
    "@aliases: stringify";
    {
        var out = '';

        out += '['; this.each$(elm => {out += (out !== '[' ? ', ' : '') + elm}); out += ']';

        return out
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
        return (function*(data) {yield* data.toArray()})(this)
    },
    /**
     * @method MultiSet#[@@iterator]
     * @desc
     *         Prototype Symbol.iterator to make MultiSet iterable.
     *         Returns a new Iterator object that contains the values for each element, including repetitions, in the MultiSet object in insertion order.
     *
     * @returns {Iterator.<any>}
     */
    ['@@iterator']: function()
    {
        return this.values()
    }
};

class MultiSet {
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
    constructor(iterable=void 0)
    {
        this.init(iterable);
    }
    /**
     * @method MultiSet.[@@species]
     * @desc
     *         The constructor function that is used to create derived objects.
     */
    static get [Symbol.species]() {
        return constructor;
    }
}

extend(MultiSet.prototype, properties);

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
    for(let prop in properties)
    {   if(!properties.hasOwnProperty(prop)) {continue}

        let dsc     = Object.getOwnPropertyDescriptor(properties, prop);
        let aliases = (dsc.value || dsc.get || dsc.set).toString().match(/@aliases:(.*?);/);
        let names   = aliases? aliases[1].match(/[\w\$]+/g) : []; names.unshift(prop);
        let symbol  = prop.match(/@@([\w\$]+)/); symbol = symbol ? symbol[1] : '';

        names.forEach(name => {if(symbol) {obj[Symbol[symbol]] = dsc.value} else {Reflect.defineProperty(obj, name, dsc)}});
    }

    return obj
}
return MultiSet.prototype; // prefer prototypal inheritance
});
