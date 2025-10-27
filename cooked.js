async function loadmeter(){
    const url = "https://cooked-meter-phi.vercel.app/meter";
    var data = await fetch(url, {
        "method":"GET"
    });
    console.log(data);
    var div = document.getElementById("cooked");
    var meter = document.createElement("meter").setAttribute("value", data.json.cooked_level);
    div.append(meter);
    
}