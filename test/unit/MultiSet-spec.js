define([
    'MultiSet'
], function(MultiSet) {

    describe("MultiSet", function() {

        describe("basic usage", function() {

            it("should demonstrate the basic functions of cell-multiset", function() {

                var ms = MultiSet.spawn([7, 67, 23]);

                expect(ms.has(7)).to.be.true;
                expect(ms.has(67)).to.be.true;
                expect(ms.has(23)).to.be.true;
            });
        });

        describe("constructor", function() {

            it("should be able to construct a multi-set based on an iterable object", function() {

                var ms = new MultiSet.constructor([7, 7, 67, 23]);

                expect(ms.has(7)).to.be.true;
                expect(ms.has(67)).to.be.true;
                expect(ms.has(23)).to.be.true;

                expect(ms.size).to.eql(4);
            });

            it("should be able to construct an empty multi-set using new", function() {

                var ms = new MultiSet.constructor();

                expect(ms.size).to.eql(0);
            });
        });

        describe("$create/spawn", function() {

            it("should create a new multiset", function() {

                var ms = MultiSet.create([7, 67, 23]);

                expect(ms.has(7)).to.be.true;
                expect(ms.has(67)).to.be.true;
                expect(ms.has(23)).to.be.true;
            });

            it("should be able to construct an empty multi-set using its alias spawn", function() {

                var ms = MultiSet.create();

                expect(ms.size).to.eql(0);
            });
        });

        describe("add", function() {

            it("should be possible to add multiple elements", function() {

                var ms = MultiSet.create().add(7, 67, 23);

                expect(ms.has(7)).to.be.true;
                expect(ms.has(67)).to.be.true;
                expect(ms.has(23)).to.be.true;
            });
        });

        describe("cardinality/size", function() {

            it("should return the cardinality of the set", function() {

                var ms = MultiSet.create();

                expect(ms.size).to.eql(0);
                expect(ms.cardinality).to.eql(0);

                ms.add(7, 7, 67, 23);

                expect(ms.size).to.eql(4);
            });

            it("should return a warning in case of a set", function() {

                var ms = MultiSet.create();

                ms.size = 6;

                expect(console.warn.calledWith(".cardinality/.size property is readonly.")).to.be.true;
            });
        });

        describe("clear", function() {

            it("should clear the set.", function() {

                var ms = MultiSet.create([7, 7, 67, 23]);

                ms.clear();

                expect(ms.size).to.eql(0);
                expect(ms.elements.size).to.eql(0);
            });
        });

        describe("each/forEach", function() {

            it("should iterate over the alphabet of the set", function() {

                var ms = MultiSet.create([7, 7, 67, 23]);

                var sum = 0;

                ms.each((val, multiplicity) => {sum += multiplicity});

                expect(sum).to.eql(4);
            });

            it("should be able to call the alias forEach", function() {

                var ms = MultiSet.create([7, 7, 67, 23]);

                var sum = 0;

                ms.forEach((val, multiplicity) => {sum += multiplicity});

                expect(sum).to.eql(4);
            });

            it("should be able to change the context of the callback function or break prematurely", function() {

                var ms = MultiSet.create([7, 7, 67, 23]);
                var ctx = {max: 8};
                var sum = 0;

                // Don't use shorthand functions in this case, or the context is immutably this.
                ms.each(function(val, multiplicity) {if(val > this.max) {return false} sum += multiplicity}, ctx);

                expect(sum).to.eql(2);
            });
        });

        describe("each$/forEach$/eachAll/forEachAll", function() {

            it("should iterate over all elements including repetitions", function() {

                var ms = MultiSet.create([7, 7, 67, 23]);

                var sum                 = 0;
                var multiplicityOfSeven = 0;

                ms.each$(elm => {sum++; if(elm === 7) {multiplicityOfSeven++}});

                expect(sum).to.eql(4);
                expect(multiplicityOfSeven).to.eql(2);
            });

            it("should be possible to use its aliases forEach$/eachAll/forEachAll", function() {

                var ms = MultiSet.create([7, 7, 67, 23]);

                var sum                 = 0;
                var multiplicityOfSeven = 0;

                ms.forEach$(  elm => {sum++; if(elm === 7) {multiplicityOfSeven++}});
                ms.eachAll(   elm => {sum++; if(elm === 7) {multiplicityOfSeven++}});
                ms.forEachAll(elm => {sum++; if(elm === 7) {multiplicityOfSeven++}});

                expect(sum).to.eql(12);
                expect(multiplicityOfSeven).to.eql(6);
            });

            it("should be able to change the context of the callback function or break prematurely", function() {

                var ms = MultiSet.create([56, 7, 7, 7, 7, 67, 23]);

                var ctx = {max: 4};
                var sum = 0;
                var multiplicityOfSeven = 0;

                // Don't use shorthand functions in this case, or the context is immutably this.
                ms.each$(function(elm, count) {
                    sum++;
                    if(elm === 7) {multiplicityOfSeven++}
                    return count < (this.max-1)
                }, ctx);

                expect(sum).to.eql(4);
                expect(multiplicityOfSeven).to.eql(3);
            });
        });

        describe("entries", function() {

            it("should output an iterable object containing value & multiplicity", function() {

                var ms = MultiSet.create([7, 7, 67, 23]);

                var setIter = ms.entries();

                expect(setIter.next().value).to.eql([ 7, 2]);
                expect(setIter.next().value).to.eql([67, 1]);
                expect(setIter.next().value).to.eql([23, 1]);
            });
        });

        describe("get/multiplicityOf", function() {

            it("should return the multiplicity of an element", function() {

                var ms = MultiSet.create([7, 7, 67, 23]);

                expect(ms.get(7)).to.eql(2);
                expect(ms.multiplicityOf(67)).to.eql(1);
                expect(ms.get('ndef')).to.eql(undefined);
            });
        });

        describe("keys", function() {

            it("should return all unique elements", function() {

                var ms = MultiSet.create([7, 7, 67, 23]);

                var setIter = ms.keys();

                expect(setIter.next().value).to.eql(7);
                expect(setIter.next().value).to.eql(67);
                expect(setIter.next().value).to.eql(23);
            });
        });

        describe("remove/delete", function() {

            it("should be possible to remove multiple elements", function() {

                var ms = MultiSet.create().add(7, 67, 23).remove(8, 23).delete(7);

                expect(ms.has(7)).to.be.false;
                expect(ms.has(67)).to.be.true;
                expect(ms.has(23)).to.be.false;
            });
        });

        describe("toString/stringify", function() {

            it("should output all elements, including repetitions, as a string if mode is 1", function() {

                var ms = MultiSet.create().add(7, 7, 7, 67, 23, 8).remove(23);

                expect(ms.toString(1)).to.eql('[7, 7, 7, 67, 8]');
            });
        });

        describe("values", function() {

            it("should return all, including repeating, elements", function() {

                var ms = MultiSet.create([7, 7, 67, 23]);

                var setIter = ms.values();

                expect(setIter.next().value).to.eql(7);
                expect(setIter.next().value).to.eql(7);
                expect(setIter.next().value).to.eql(67);
            });
        });

        describe("[@@iterator]", function() {

            it("should return all, including repeating, elements", function() {

                var ms = MultiSet.create([7, 7, 67, 23]);

                var keySum          = 0;
                var multiplicitySum = 0;

                for(let [value, multiplicity] of ms)
                {
                    keySum          += value;
                    multiplicitySum += multiplicity;
                }

                expect(keySum).to.eql(97);
                expect(multiplicitySum).to.eql(4);
            });
        });
    });
});
