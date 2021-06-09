function sendUpdateRequest(){
    const key = document.getElementById("key").value;
    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;
    fetch(`add_to_database_doctor/${key}/${name}/${number}`)
}  