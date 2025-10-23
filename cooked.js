async function loadmeter(){
    const url = "doggooncompu.github.io/CS-club-intro/meter";
    var data = await fetch(url, {
        "method":"GET"
    });
    console.log(data);
}