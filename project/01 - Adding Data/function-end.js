//Initialize Firestore
const db = firebase.firestore();

//Get Input Fields
const el_employeeId = document.querySelector('.employeeId');
const el_fullname = document.querySelector('.fullname');
const el_submit = document.querySelector('.btn');
const el_success = document.querySelector('.success-container');

//Add OnClick to Submit Button
el_submit.addEventListener('click', function(){
  const data = {
    employeeId: el_employeeId.innerHTML,
    fullname: el_fullname.innerHTML,
    dateAdded: new Date()
  };

  //add to database using Set
  db.collection('profile').doc(data.employeeId)
    .set(data)
    .then(function(){
      el_employeeId.innerHTML = '#000000';
      el_fullname.innerHTML = 'Your Name Here';
      console.log('Successfully Added');

      el_success.classList.add('open');
      setTimeout(()=>{
        el_success.classList.remove('open');
      },2000);
    });

  //using Add 
  // db.collection('profile').add(data)
  //   .then(function(docRef){
  //     el_employeeId.value = '';
  //     el_fullname.value = '';
  //     el_position.value = '';
  //     console.log('Successfully Added with ID ' + docRef.id);
  //   });

})

//load settings data once
// db.collection('settings').doc('title').get()
//   .then(function(doc){
//     if (doc.exists) {
//       document.querySelector('.panel-preview h6').innerHTML = doc.data().name;
//     } else {
//         console.log("Document title Not found");
//     }
// }).catch(function(error) {
//   console.log("Error getting document:", error);
// });


//load settings data realtime
db.collection('settings').doc('title')
  .onSnapshot(function(doc){
    if (doc.exists) {
      document.querySelector('.panel-preview h6').innerHTML = doc.data().name;
    } else {
        console.log("Document title Not found");
    }
});