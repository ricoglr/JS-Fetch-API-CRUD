// CRUD işlemimizin READ kısmı
let table = document.getElementById("userTable");

function getUserList(){
    fetch("https://reqres.in/api/users")    //verileri alacağımız API yi girdik
    .then(response=>response.json())        //aldığımız cevabı json formatına çevirdik.
    .then(data=>{
        //console.log(data);
        for (const user of data.data) { //aldığımız verideki datayı seçiyoruz(filtreliyoruz)
            //console.log(user);
            table.innerHTML+= `<tr> 
            <td><input type="text" class="from-control" id="first_name_${user.id}" value="${user.first_name}"></td>
            <td><input type="text" class="from-control" id="last_name_${user.id}" value="${user.last_name}"></td>
            <td><input type="text" class="from-control" id="email_${user.id}" value="${user.email}"></td>
            <td>
                <a class="btn btn-warning" onclick="updateUser(${user.id})">Edit</a>
                <a class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</a>
            </td>
        </tr>`
        }   //innerHTML ile çektiğimiz verileri table a yazdırıyoruz
    })
}
getUserList();  //fonkiyonu çağırdık.


function refreshData(){
    getUserList();
}


// CRUD işlemimizin CREATE kısmı
function creatUser(){
    let data = {        //data adında bir değişken oluşturduk ve bu dataları nereden alacağını gösteriyoruz. (Verileri aldık)
        first_name:document.getElementById("first_name").value || "Değer Yok",
        last_name:document.getElementById("last_name").value || "Değer Yok",
        email:document.getElementById("email").value || "Değer Yok",
    };
    fetch("https://reqres.in/api/users",{//post kullanırken süslü parantez içerisinde tanımlama yapmamız gerekiyor.
        method: "POST",
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(data)   //bize gelen datayi stringe çevirerek çevirmeliyiz.
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data);

        table.innerHTML+=
        `<tr> 
             <td><input type="text" class="from-control" id="" value="${data.first_name}"></td>
             <td><input type="text" class="from-control" id="" value="${data.last_name}"></td>
             <td><input type="text" class="from-control" id="" value="${data.email}"></td>
             <td>
                <a  class="btn btn-warning" onclick="updateUser(${data.id})">Edit</a>
                <a class="btn btn-danger" onclick="deleteUser(${data.id})">Delete</a>
            </td>
        </tr>`
    })
    .catch((error)=>{
        console.log("Hata: " + error);
    })
}


// CRUD işlemimizin UPDATE kısmı
function updateUser(id){
    console.log("Updated User id: " + id);  
    let data ={
        first_name:document.getElementById("first_name_"+id).value || "Geçersiz değer",
        last_name:document.getElementById("last_name_"+id).value || "Geçersiz değer",
        email_name:document.getElementById("email_name_"+id).value || "Geçersiz değer",
    };
    fetch("https://reqres.in/api/users",{
        method: "PUT",  //put komudu ile güncelleme isteğinde bulunuyoruz
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(response => response.json)
    .then(veri =>{console.log("Updated User",veri)})
    .catch((error)=>console.log(error))
}

function deleteUser(id){
    fetch("https://reqres.in/api/users"+id,{
        method: "DELETE",
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response=>console.log(response))
    .then(data=>{
        console.log("Deleted User",data);
    })
    .catch((error)=>console.log(error));
}