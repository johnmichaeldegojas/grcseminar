//Initialize Firestore
const db = firebase.firestore();

//Get Input Fields
const el_employeeId = document.querySelector('.employeeId');
const el_fullname = document.querySelector('.fullname');
const el_submit = document.querySelector('.btn');
const el_list = document.querySelector('.employeeList');
const el_success = document.querySelector('.success-message');
const el_delete = document.querySelector('.delete-message');

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
})


//load settings data realtime
db.collection('settings').doc('title')
  .onSnapshot(function(doc){
    if (doc.exists) {
      document.querySelector('.panel-preview h6').innerHTML = doc.data().name;
    } else {
        console.log("Document title Not found");
    }
});


//Read Realtime Data
db.collection("profile").orderBy('dateAdded','desc')
  .onSnapshot(function(querySnapshot) {
    el_list.innerHTML = '';
    querySnapshot.forEach(function(doc) {
      el_list.innerHTML += generateHTML(doc.data())
    });
    document.querySelectorAll('.panel-data').forEach(el=>{
      el.addEventListener('click',deleteData);
    })
});

//customize element
function generateHTML(data){
  return `<div class = "panel panel-data" data-id='${data.employeeId}'>
      <h6>${data.employeeId}</h6>
      <h3>${data.fullname}</h3>
      <span>${data.dateAdded.toDate().toLocaleDateString("en-US")}</span>
    </div>
  `;
}

//deleteData
function deleteData(event){
  db.collection("profile").doc(event.target.dataset.id)
  .delete()
  .then(function() {
    console.log('Successfully Deleted');

    el_delete.classList.add('open');
    setTimeout(()=>{
      el_delete.classList.remove('open');
    },2000);
  });
}