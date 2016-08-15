define([
    'MultiSet'
], function(MultiSet) {

    describe("MultiSet", function() {

        describe("basic usage", function() {

            it("should demonstrate the basic functions of cell-multiset", function() {

                var ms = MultiSet.$spawn([7, 67, 23]);

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

        describe("$create/$spawn", function() {

            it("should create a new multiset", function() {

                var ms = MultiSet.$create([7, 67, 23]);

                expect(ms.has(7)).to.be.true;
                expect(ms.has(67)).to.be.true;
                expect(ms.has(23)).to.be.true;
            });

            it("should be able to construct an empty multi-set using its alias $spawn", function() {

                var ms = MultiSet.$create();

                expect(ms.size).to.eql(0);
            });
        });

        describe("add", function() {

            it("should be possible to add multiple elements", function() {

                var ms = MultiSet.$create().add(7, 67, 23);

                expect(ms.has(7)).to.be.true;
                expect(ms.has(67)).to.be.true;
                expect(ms.has(23)).to.be.true;
            });
        });

        describe("cardinality/size", function() {

            it("should return the cardinality of the set", function() {

                var ms = MultiSet.$create();

                expect(ms.size).to.eql(0);
                expect(ms.cardinality).to.eql(0);

                ms.add(7, 7, 67, 23);

                expect(ms.size).to.eql(4);
            });

            it("should return a warning in case of a set", function() {

                var ms = MultiSet.$create();

                ms.size = 6;

                expect(console.warn.calledWith("Cardinality/Size property is readonly.")).to.be.true;
            });
        });

        describe("clear", function() {

            it("should clear the set. Alphabet will be retained though", function() {

                var ms = MultiSet.$create([7, 7, 67, 23]);

                ms.clear();

                expect(ms.size).to.eql(0);
                expect(ms.elements.size).to.eql(3);
            });
        });

        describe("remove/delete", function() {

            it("should be possible to remove multiple elements", function() {

                var ms = MultiSet.$create().add(7, 67, 23).remove(8, 23).delete(7);

                expect(ms.has(7)).to.be.false;
                expect(ms.has(67)).to.be.true;
                expect(ms.has(23)).to.be.false;
            });
        });
    });
});
