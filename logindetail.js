const retiveUserDetails = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "/userDetails", false);
    xhttp.send();

    const userDetails = JSON.parse(xhttp.responseText);
    for(let index of userDetails){
        userDetails.hits.hits[0]._source

    }

    const userdetail= userDetails.hits.hits[0]._source;

    for (let userDetail of userDetails) {
        const x = `
        <div class="col-4" >
        <div class="card">
            <div class="card-header" id="headingOne" style="background-color:pink;">
                <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        ${userDetail.email}
                    </button>
                  </h5>
                  </div>
    
                  <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion" style="background-color:orange;">
    
                <div class="card-body">Age: ${userDetail.Userage}</div>
                <div class="card-body">MobileNumber: ${userDetail.mobileNum}</div>
                <div class="card-body">Username: ${userDetail.Fullname}</div>
                <div class="card-body">password: ${userDetail.password}</div>
                </div>
    
                <hr style="background-color:#a53232;">
    
                <button type="button" class="btn btn-danger" onClick="deleteUserDetail('${userDetail.mobileNum}')">Delete</button>
                <button types="button" class="btn btn-primary" data-toggle="modal"
                    data-target="#editUserDetails" onClick="setEditModal(${userDetail.mobileNum})"
                    style="float: right;">
                    Edit
                </button>
                
            </div>
        </div>
        `

        document.getElementById('UserDetail').innerHTML = document.getElementById('UserDetail').innerHTML + x;
    }
}

retiveUserDetails();

const deleteUserDetail = (mobileNum) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `/UserDetail/${mobileNum}`, false);
    xhttp.send();

    if(xhttp.responseText=='deleted'){
       location.href='/retiveUserDetails';
    }
   
   
}

const setEditModal = (mobileNum) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `/getuserDetails/${mobileNum}`, false);
    xhttp.send();

    const userDetail = JSON.parse(xhttp.responseText);

    const {
        Fullname,
        Userage,
        email,
        password
    } = userDetail;
    document.getElementById('name').value =Fullname ;
    document.getElementById('age').value = Userage;
    document.getElementById('MobileNumber').value = mobileNum;
    document.getElementById('email').value = email;
    document.getElementById('password').value = password;
    document.getElementById('editForm').action = `/getuserDetails/${mobileNum}`;

};



