function getData() {
    if(true) {
        var data = 'some data';
        console.log(data);
    }
}
 // result: some data
function getData() {
    if(true) {
        let data = 'some data';
    }
    console.log(data);
}
getData();
// result: referenceError

function getData() {
    var data;
    if(true) {
        data = 'some data';
    }
    console.log(data);
}
getData();

// resule: undefind


