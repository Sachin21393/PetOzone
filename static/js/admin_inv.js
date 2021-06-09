function sendUpdateRequest(){
    const key = document.getElementById("key").value;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    fetch(`/add_to_database_inv/${key}/${name}/${price}/${stock}`)
}