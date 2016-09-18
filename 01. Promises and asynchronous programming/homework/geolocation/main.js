(function () {


    var container = document.getElementById("imgContainer");

    var promise = new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(function (position) {
            resolve(position);
        }, function (err) {
            reject(err);
        });
    });

    function parseCoordinates(position) {
        if (!position.coords) {
            throw 'Coordinates not found';
        } else {
            return { lat: position.coords.latitude, long: position.coords.longitude }
        }
    };

    function getImg(coordinates) {
        var img = document.createElement("img");
        img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + coordinates.lat + "," + coordinates.long
            + "&zoom=17&size=500x500&key=AIzaSyARvdHKfvAub5XZwqYmXL3i-h0G5Ucnk6g";
        container.appendChild(img);
    };

    promise
    .then(parseCoordinates, (reason)=> console.log(reason))
    .then(getImg, (reason)=> console.log(reason));
} ());