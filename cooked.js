function loadmeter(){
    const url = "https://cooked-meter-phi.vercel.app/meter";
    fetch(url)
  .then(response => response.json()) // Parses the response body as JSON
  .then(data => {
    var div = document.getElementById("cooked");

    var label = document.createElement("p");
    label.textContent = "subject:" + data.subject + " percentage: ", data.cooked_level;

    var meter = document.createElement("meter");
    meter.value = data.cooked_level;

    console.log(data.cooked_level);

    div.append(meter);
    div.append(label);
  })
  .catch(error => {
    console.error('Error fetching or parsing data:', error);
  });
    
}