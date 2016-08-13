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

        describe("static $create/$spawn", function() {

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
    });
});
