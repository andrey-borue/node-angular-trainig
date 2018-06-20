angular.module('myApp.view1')
.filter('onlyTypesFilter', () => {
    return (input) => {
        let types = new Set(['']);
        input.map((el) => {
            types.add(...el.type);
        });

        return Array.from(types);
    }
});
