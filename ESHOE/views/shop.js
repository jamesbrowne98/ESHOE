// Make an HTTP GET request to your server's API endpoint to retrieve the data
fetch('http://localhost:8080/routes/api')
.then(response => response.json()) // Parse the response as JSON
.then(data => {
    // Loop through the array of shoes and insert them into the HTML
    for (let i = 0; i < data.length; i++) {
        let shoe = data[i];
        let shoeDiv = document.createElement("div");
        shoeDiv.innerHTML = `
            <h3>${shoe.name}</h3>
            <p>Size: ${shoe.size}</p>
            <p>Price: ${shoe.price}</p>
        `;
        document.getElementById("shop-container").appendChild(shoeDiv);
    }
})
.catch(error => console.error(error));

$.get("/", function(data) {
console.log(data); // log the data to the console
// data is the JSON response from the server
// You can loop through the data and display it on the webpage as follows:
var shoesHTML = "";
for (var i = 0; i < data.length; i++) {
  shoesHTML += "<div class='shoe'>"
  shoesHTML += "<h2>" + data[i].name + "</h2>"
  shoesHTML += "<img src='" + data[i].image + "'>"
  shoesHTML += "<p>Size: " + data[i].size + "</p>"
  shoesHTML += "<p>Price: $" + data[i].price + "</p>"
  shoesHTML += "</div>"
}
$("#shoes-container").html(shoesHTML);
});