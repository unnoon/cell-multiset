/*!
 * @author       Rogier Geertzema
 * @copyright    2016 Rogier Geertzema
 * @license      {@link https://github.com/unnoon/cell-multiset/blob/master/LICENSE|MIT License}
 * @overview     Fast JS MultiSet implementation.
 */
export {MultiSet as CMultiSet};
export default MultiSet.prototype

/*<3*/
// int32 consts
const ZERO = 0|0;
const ONE  = 1|0;

const $attrs = Symbol.for('cell-type.attrs');

const properties = {
    /**
     * @name MultiSet.info
     * @type Object
     * @desc
     *       Info object to hold general module information.
     */
    info: {[$attrs]: 'static !configurable !writable', value: {
        "name"       : "cell-multiset",
        "description": "Fast JS MultiSet implementation.",
        "version"    : "0.0.3",
        "url"        : "https://github.com/unnoon/cell-multiset"
    }},
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
    create(iterable=void 0) {
    "<$attrs static alias=spawn>";
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
    add(...elms)
    {
        const max = elms.length;

        for(let i = ZERO, elm; i < max; i++)
        {
            elm = elms[i];

            this.elements.set(elm, (this.elements.get(elm) || ZERO) + ONE);
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
    "<$attrs alias=size>";
    {
        let len = ZERO;

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
    clear()
    {
        this.elements.clear();

        return this
    },
    /**
     * @method MultiSet#clone
     * @desc
     *         Creates a clone of the multiset.
     *
     * @returns {MultiSet} clone
     */
    clone()
    {
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
    contains(multiset)
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
    difference(multiset)
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
     * @method MultiSet#Difference
     * @desc
     *         Calculates the difference between 2 multisets into a new MultiSet.
     *
     * @param {MultiSet} multiset
     *
     * @returns {MultiSet} new MultiSet containing the difference
     */
    Difference(multiset)
    {
        const output = MultiSet.create();
        let   nmul;

        multiset.elements.forEach((multiplicity, elm) => {
            nmul = this.multiplicity(elm) - multiplicity;

            if(nmul > 0) {output.elements.set(elm, nmul)}
        });

        return output
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
    each(cb, ctx=null) {
    "<$attrs alias=forEach>";
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
    each$(cb, ctx=null) {
    "<$attrs alias=forEach$|eachAll|forEachAll>";
    {
        let a, i, mul, count = 0;

        // for(let [elm, multiplicity] of this.elements) // destructuring is nice but slow...
        for(a of this.elements)
        {   for(i = 0, mul = a[1]/*multiplicity*/; i < mul; i++, count++)
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
    entries()
    {
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
    equals(multiset)
    {   if(this.size !== multiset.size) {return false}

        return multiset.each((mul, elm) => {
            return mul !== this.multiplicity(elm)
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
    has(elm) {
    "<$attrs alias=isMember>";
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
    init(elms=void 0)
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
    intersection(multiset) {
    "<$attrs alias=and>";
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
     * @method MultiSet#Intersection
     * @desc   **aliases:** And
     * #
     *         Calculates the intersection between 2 multisets into a new MultiSet.
     *
     * @param {MultiSet} multiset
     *
     * @returns {MultiSet} new MultiSet containing the intersection.
     */
    Intersection(multiset) {
    "<$attrs alias=And>";
    {
        const output = MultiSet.create();
        let   nmul;

        this.elements.forEach((multiplicity, elm) => {
            nmul = Math.min(multiplicity, multiset.multiplicity(elm));

            if(nmul) {output.elements.set(elm, nmul)}
        });

        return output
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
    isSubsetOf(multiset) {
    "<$attrs alias=isContainedIn>";
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
    keys() {
    "<$attrs alias=underlyingElements>";
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
    multiplicity(elm)
    {
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
    remove(...elms) {
    "<$attrs alias=delete>";
    {
        const max = elms.length;

        for(let i = ZERO, elm, multiplicity; i < max; i++)
        {
            elm          = elms[i];
            multiplicity = this.elements.get(elm);

            if(multiplicity === 1) {this.elements.delete(elm)}
            else                   {this.elements.set(elm, Math.max(ZERO, --multiplicity))}
        }

        return this
    }},
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
    symmetricDifference(multiset) {
    "<$attrs alias=exclusion>";
    {
        let diff;

        multiset.elements.forEach((multiplicity, elm) => {
            diff = this.multiplicity(elm) - multiplicity;

            if(!diff) {this.elements.delete(elm)}
            else      {this.elements.set(elm, Math.abs(diff))}
        });

        return this
    }},
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
    SymmetricDifference(multiset) {
    "<$attrs alias=Exclusion>";
    {
        const output = this.clone();
        let   diff;

        multiset.elements.forEach((multiplicity, elm) => {
            diff = output.multiplicity(elm) - multiplicity;

            if(!diff) {output.elements.delete(elm)}
            else      {output.elements.set(elm, Math.abs(diff))}
        });

        return output
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
    toString(mode) {
    "<$attrs alias=stringify>";
    {
        let out = '';

        switch(mode)
        {
            case -1 : out += `({${`${Array.from(this.keys())}`.replace(/,/g,`, `)}}, {`;
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
    union(multiset) {
    "<$attrs alias=or>";
    {
        multiset.elements.forEach((multiplicity, elm) => this.elements.set(elm, Math.max(multiplicity, this.multiplicity(elm))));

        return this
    }},
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
    Union(multiset) {
    "<$attrs alias=Or>";
    {
        const output = this.clone();

        multiset.elements.forEach((multiplicity, elm) => output.elements.set(elm, Math.max(multiplicity, output.multiplicity(elm))));

        return output
    }},
    /**
     * @method MultiSet#values
     * @desc
     *         Returns a new Iterator object that contains the values for each element, including repetitions, in the MultiSet object in insertion order.
     *
     * @returns {Iterator.<any>}
     */
    values()
    {
        const data = [];

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
    [Symbol.iterator]()
    {
        return this.elements.entries();
    },
    /**
     * @name MultiSet.[@@species]
     * @type function
     * @desc
     *       the species of the MultiSet. Which is just the MultiSet constructor.
     */
    [Symbol.species]: {[$attrs]: 'static', value: MultiSet},
    /**
     * @name MultiSet#[@@toStringTag]
     * @type string
     * @desc
     *       Custom name for Object.prototype.toString.call(multiset) === [object MultiSet]
     */
    [Symbol.toStringTag]: 'MultiSet'
};
/**
 * @constructor MultiSet
 * @desc
 *        Fast JS MultiSet implementation.
 *
 * @param {Iterable.<any>=} iterable - iterable object to initialize the set.
 *
 * @return {MultiSet} new MultiSet
 */
function MultiSet(iterable=void 0)
{
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
function extend(obj, properties)
{
    [...Object.getOwnPropertySymbols(properties), ...Object.keys(properties)].forEach(prop => {
        let dsc   = processDescAttrs(Object.getOwnPropertyDescriptor(properties, prop));
        let names = dsc.alias || []; names.unshift(prop);

        names.forEach(name => {
            Object.defineProperty(obj, name, dsc);
            if(dsc.static && obj.hasOwnProperty('constructor')) {Object.defineProperty(obj.constructor, name, dsc)}
        });
    });

    return obj
}
/**
 * @func processDescAttrs
 * @desc
 *       processes any attributes passed to a function or on the $attrs symbol, in case of a property, and adds these to the descriptor.

 * @param {Object} dsc - Property descriptor to be processed.
 *
 * @returns {Object} The processed descriptor.
 */
function processDescAttrs(dsc)
{
    let tmp        = `${dsc.value || dsc.get || dsc.set}`.match(/<\$attrs(.*?)>/);
    let tmp2       = `${tmp? tmp[1] : dsc.value && dsc.value[$attrs] || ''}`.replace(/[\s]*([=\|\s])[\s]*/g, '$1'); // prettify: remove redundant white spaces
    let attributes = tmp2.match(/[!\$\w]+(=[\$\w]+(\|[\$\w]+)*)?/g)  || []; // filter attributes including values

    assignAttrsToDsc(attributes, dsc);

    // if value is a descriptor set the value to the descriptor value
    if(dsc.value && dsc.value[$attrs] !== undefined) {dsc.value = dsc.value.value}

    return dsc
}
/**
 * @func assignAttrsToDsc
 *
 * @param {Array<string>} attributes - Array containing the attributes.
 * @param {Object}        dsc        - The descriptor to be extended with the attributes.
 */
function assignAttrsToDsc(attributes, dsc)
{
    dsc.enumerable = false; // default set enumerable to false

    for(let attr of attributes)
    {   let value;
        switch(true)
        {
            case(  !attr.indexOf('!')) : value = false;                  attr = attr.slice(1); break;
            case(!!~attr.indexOf('=')) : value = attr.match(/[\$\w]+/g); attr = value.shift(); break;
            default                    : value = true;
        }

        dsc[attr] = value;
    }
}
