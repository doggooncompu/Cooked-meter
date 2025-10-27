async function loadmeter(){
    const url = "https://cooked-meter-phi.vercel.app/meter";
    var data = await fetch(url, {
        "method":"GET"
    });
    console.log(data);
    var meter = document.createElement("meter").value(data.json.cooked_level);
    var div = document.getElementById("cooked");
    div.append(meter);
}