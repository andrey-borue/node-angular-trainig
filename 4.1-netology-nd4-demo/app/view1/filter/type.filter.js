angular.module('myApp.view1')
.filter('typeFilter', () => {
    return (input, type) => {
        return input.filter((el) => {
            if (!type || el.type.indexOf(type) >= 0) {
              return el;
            }
        });
    }
});
