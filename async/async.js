// synchronous code
console.log(1);
console.log(2);
console.log(3);

// ansynchronous code
setTimeout( () =>  console.log(1),0);
console.log(2);
console.log(3);

// callback
function myFunction(param) {
    console.log(typeof param )
}

function myCallBack() {

}

myFunction(myCallBack)

//Promise
const currentPromise = new Promise((resolve, reject) => {
 let condition = true;
 if(condition) {
    // request API
   resolve('Success');
 } 
 else {
   reject('Error');
 }  
});

currentPromise
.then((data) => {
    console.log(data);
})
.catch((err) => {
    console.log(err);
})

// async await

const doSomthing = async() => {
  const data = await getData();
  console.log(data)
}
