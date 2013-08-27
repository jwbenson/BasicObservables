/**
 * Observe an objects changes
 * 
 * @param {object} object
 * @returns {Observable}
 */
var Observable = function (object) {
    'use strict';     
    var self = this;
    
    object = object || {};
    
    this.observed = {};
    
    /**
     * add a property to the observed map
     * @param {object} property {name,value} object
     * @returns {undefined}
     */
    this.add = function (property) {
        self.observed[property.name] = new ObservableProperty(property);
    };
    
    /**
     * set a property value by name 
     * @param {string} propertyName
     * @param {*} value
     * @returns {undefined}
     */
    this.set = function (propertyName, value) {
        self.observed[propertyName].set(value);
    };
    
    /**
     * get an observed property by name
     * @param {string} propertyName
     * @returns {ObservableProperty}
     */
    this.get = function (propertyName) {
        return self.observed[propertyName];
    };
    
    /**
     * 
     * @param {string} type event type (change, before, after)
     * @param {string} propertyName
     * @param {type} fn event handler
     * @returns {undefined}
     */
    this.bind = function(type, propertyName, fn) {
        if (propertyName === "*") {
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

