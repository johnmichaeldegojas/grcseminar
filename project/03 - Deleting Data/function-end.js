//Initialize Firestore
const db = firebase.firestore();

//Get Input Fields
const el_employeeId = document.querySelector('.employeeId');
const el_delete = document.querySelector('.btn');
const el_success = document.querySelector('.success-container');

//Add OnClick to Delete Button
el_delete.addEventListener('click', function(){
    db.collection("profile").doc(el_employeeId.innerHTML)
      .delete()
      .then(function() {
        el_employeeId.innerHTML = 'Change this to Employee ID';
        console.log('Successfully Deleted');

        el_success.classList.add('open');
        setTimeout(()=>{
          el_success.classList.remove('open');
        },2000);
      });
});