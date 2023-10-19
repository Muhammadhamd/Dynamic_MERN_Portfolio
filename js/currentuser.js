axios.get("/currentuser")
.then((res)=>{
    console.log(res)
    document.getElementById("displayUserName").innerHTML = res.data.name
    document.querySelector("#userIdLink").href = `/account/${res.data._id}`
})
.catch((e)=>{
    console.log(e)
})