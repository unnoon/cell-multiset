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
    });
});
