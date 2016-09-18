(function () {
    let container = document.getElementById('container');
    var promise = new Promise(function (resolve, reject) {

        let timeout = 2000;
        setTimeout(function () {
            let href = "http://9gag.com/";
            resolve(href)
        }, timeout)

    });

    function changeHref(href) {
        window.location.href = href;
    }

    promise.then(changeHref);
} ());