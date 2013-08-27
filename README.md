BasicObservables
================

History tracking and change observation for javascript objects

work in progress

*Basic usage*
    var data = { "pet": "cat"};
    var observable = new Observable(data);

    observable.bind('change', 'pet', function (property) {
        console.log(property);
    });

    observable.set('pet', 'dog');

*History usage*
    var data = { "pet": "cat"};
    var observable = new HistoricObservable(data);
    
    observable.bind('change', 'pet', function (property) {
        console.log(property);
    });

    observable.set('pet', 'dog');

    observable.undo('pet');
