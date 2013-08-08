var Observable = function (object) {
    'use strict';
    var self = this;
    object = object || {};
    
    this.observed = {};
    this.add = function (property) {
        self.observed[property.name] = new ObservableProperty(property);
    };
    
    this.set = function (propertyName, value) {
        self.observed[propertyName].set(value);
    };
    
    this.get = function (propertyName) {
        return self.observed[propertyName];
    };
    
    this.bind = function(type, propertyName, fn) {
        if (propertyName == "*") {
             for (var name in object) {
                self.observed[name].bind(type, fn);
            }   
        }
        else {
            self.observed[propertyName].bind(type, fn);
        }
    };
    
    for (var propertyName in object) {
        self.add({ name: propertyName, value: object[propertyName] });
    }
};