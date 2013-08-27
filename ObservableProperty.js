var ObservableProperty = function (options) {
    'use strict';
    
    if (typeof options === 'undefined') {
        throw new Error("ObservableProperty options is undefined");
    }
    if (typeof options.name === 'undefined') {
        throw new Error("ObservableProperty options.name is undefined");
    }
    
    this.name = options.name;
    this.value = options.value || null;
    this.originalValue = options.value || null;
    this.previousValue = options.value || null;
    this.beforeChange = options.beforeChange || [];
    this.afterChange = options.change || [];
    this.dirty = false;
    
    /**
    * set the value of this property
    * @method
    * @return boolean true if value was updated
    **/
    this.set = function (newValue) {
        if (!this.compare(newValue, this.value)) {
            this._handleBeforeChange();
            this.previousValue = this.value;
            this.value = newValue;
            this.dirty = true;
            this._handleAfterChange();
            return true;
        }
        return false;
    };
    
    /**
    * get the value of this property
    * @method
    * @return {*}
    **/
    this.get = function() {
        return this.value;
    };
    
    /**
    * execute afterChange handlers
    * @private
    **/
    this._handleAfterChange = function () {
        for (var i = 0, l = this.afterChange.length; i < l; i++) {
            this.afterChange[i](this);
        }
    }
    
    /**
    * execute beforeChange handlers
    * @private
    **/
    this._handleBeforeChange = function () {
        for (var i = 0, l = this.beforeChange.length; i < l; i++) {
            this.beforeChange[i](this);
        }
    }
    
    /**
    * bind a change handler
    * @type {string} type of handler
    * @fn {fn} handler
    **/
    this.bind = function (type, fn) {
        switch (type) {
            case "before": 
                this.beforeChange.push(fn);
                break;
            case "after":
            case "change":
                this.afterChange.push(fn);
                break;
            default:
                throw new Error("Unknown binding");
                break;
        }
    }
    
    /**
    * @see http://stackoverflow.com/questions/1068834/object-comparison-in-javascript
    * @author http://stackoverflow.com/users/228259/jean-vincent
    * @param {*} object to compare to
    * @return {boolean} true if the newValue matches this.value
    **/
    this.compare = function (newValue) {
        var x = this.value;
        var y = newValue;
        
        if ( x === y ) return true;
        // if both x and y are null or undefined and exactly the same
        
        if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
        // if they are not strictly equal, they both need to be Objects
        
        if ( x.constructor !== y.constructor ) return false;
        // they must have the exact same prototype chain, the closest we can do is
        // test there constructor.
        
        for ( var p in x ) {
        if ( ! x.hasOwnProperty( p ) ) continue;
          // other properties were tested using x.constructor === y.constructor
        
        if ( ! y.hasOwnProperty( p ) ) return false;
          // allows to compare x[ p ] and y[ p ] when set to undefined
        
        if ( x[ p ] === y[ p ] ) continue;
          // if they have the same strict value or identity then they are equal
        
        if ( typeof( x[ p ] ) !== "object" ) return false;
          // Numbers, Strings, Functions, Booleans must be strictly equal
        
        if ( ! Object.equals( x[ p ],  y[ p ] ) ) return false;
          // Objects and Arrays must be tested recursively
        }
        
        for ( p in y ) {
            if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
            // allows x[ p ] to be set to undefined
        }
        return true;
    }

};