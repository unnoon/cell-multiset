define([
    'MultiSet'
], function(MultiSet) {

    describe("MultiSet", function() {

        describe("basic usage", function() {

            it("should demonstrate the basic functions of cell-multiset", function() {

                var ms = new MultiSet([7, 67, 23]);

                expect(ms.has(7)).to.be.true;
                expect(ms.has(67)).to.be.true;
                expect(ms.has(23)).to.be.true;
            });
        });

        describe("constructor", function() {

            it("should be able to construct an empty multi-set using new", function() {

                var ms = new MultiSet([7, 7, 67, 23]);

                expect(ms.has(7)).to.be.true;
                expect(ms.has(67)).to.be.true;
                expect(ms.has(23)).to.be.true;

                expect(ms.size).to.eql(4);
            });

            it("should be able to construct a multi-set based on an iterable object", function() {

                var ms = new MultiSet();

                expect(ms.size).to.eql(0);
            });
        });

        describe("$create/$spawn", function() {

            it("should create a new multiset", function() {

                var ms = MultiSet.prototype.$create([7, 67, 23]);

                expect(ms.has(7)).to.be.true;
                expect(ms.has(67)).to.be.true;
                expect(ms.has(23)).to.be.true;
            });

            it("should create a new multiset using the alias $spawn", function() {

                var ms = MultiSet.prototype.$spawn([7, 67, 23]);

                expect(ms.has(7)).to.be.true;
                expect(ms.has(67)).to.be.true;
                expect(ms.has(23)).to.be.true;
            });
        });

        describe("add", function() {

            it("should be possible to add multiple elements", function() {

                var ms = MultiSet.prototype.$create().add(7, 67, 23);

                expect(ms.has(7)).to.be.true;
                expect(ms.has(67)).to.be.true;
                expect(ms.has(23)).to.be.true;
            });
        });

        describe("remove", function() {

            it("should be possible to remove multiple elements", function() {

                var ms = MultiSet.prototype.$create().add(7, 67, 23).remove(7, 8, 23);

                expect(ms.has(7)).to.be.false;
                expect(ms.has(67)).to.be.true;
                expect(ms.has(23)).to.be.false;
            });
        });
    });
});
