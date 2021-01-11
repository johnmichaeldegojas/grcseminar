//Initialize Firestore
const db = firebase.firestore();

//Get Input Fields
const el_list = document.querySelector('.employeeList');
const el_count = document.querySelector('.employeeCount');

//Read Data Once
// db.collection("profile").orderBy('dateAdded','desc').get()
//   .then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//       el_list.innerHTML += generateHTML(doc.data())
//     });
// });

//Read Realtime Data
db.collection("profile").orderBy('dateAdded','desc')
  .onSnapshot(function(querySnapshot) {
    el_list.innerHTML = '';
    el_count.innerHTML = querySnapshot.size;
    querySnapshot.forEach(function(doc) {
      el_list.innerHTML += generateHTML(doc.data())
    });
});

//customize element
function generateHTML(data){
  return `<div class = "panel panel-data">
      <h6>${data.employeeId}</h6>
      <h3>${data.fullname}</h3>
      <span>${data.dateAdded.toDate().toLocaleDateString("en-US")}</span>
    </div>
  `;
}
