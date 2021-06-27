function sendUpdateRequest(){
    const key = document.getElementById("key").value;
    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;
    fetch(`add_to_database_doctor/${key}/${name}/${number}`)
}  

function htmlEncode(value) {
 return $('<div/>').text(value)
 .html();
 }

 $(function () {

 // Specify an onclick function
 // for the generate button
 $('#generate').click(function () {

 // Generate the link that would be
 // used to generate the QR Code
 // with the given data
 let finalURL =
'https://chart.googleapis.com/chart?cht=qr&chl=' +
 htmlEncode($('#content').val()) +
 '&chs=160x160&chld=L|0'

 // Replace the src of the image with
 // the QR code image
 $('.qr-code').attr('src', finalURL);
 });
 });
