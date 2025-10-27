async function loadmeter(){
    const url = "https://cooked-meter-phi.vercel.app/meter";
    var data = await fetch(url, {
        "method":"GET"
    });
    console.log(data);
    console.log(data.text.toString);
}