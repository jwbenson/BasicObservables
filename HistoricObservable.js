/** 
 * Observable with history tracking
 * @param {object} object object to observe
 * @extends Observable
 * @returns {HistoryObserver}
 */
var HistoricObservable = function (object) {
    var _base = new Observable(object);
    this.history = {};
    
    for(var property in _base) {
        this[property] = _base[property];
    }
    
    //set initial history
    for(var propertyName in this.observed){
        this.history[propertyName] = [this.get(propertyName).value];
    }    
    
    /**
     * override set
     * 
     * @param {string} propertyName
     * @param {int} steps
     * @returns {undefined}
     */
    this.set = function (propertyName, value, skipHistory) {        
        if(this.observed[propertyName].set(value)) {
            if(!this.history[propertyName]) {
                this.history[propertyName] = [];
            }
            
            if(!skipHistory) {
                this.history[propertyName].push(value);                
            }
        }
    };    
    
    /**
     * revert / undo a set operation
     * 
     * @param {string} propertyName
     * @param {int} steps
     * @returns {undefined}
     */
    this.undo = function (propertyName, steps) {
        steps = steps || 1;
        
        if(steps > this.history[propertyName].length - 1) {
            steps = this.history[propertyName].length - 1;
        }
        
        for(var i = 0; i < steps; i++) {
            this.history[propertyName].pop();
        }
        
        var val = this.history[propertyName].length > 0 ? 
            this.history[propertyName][this.history[propertyName].length-1] :
            null;
    
        this.set(propertyName, val, true);
    };
};