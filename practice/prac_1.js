function addsTo20(arr) {
    var seen = [];

    for (var i = 0; i < arr.length; i++) {
        var currentNumber = arr[i];
        var neededNumber = 20 - currentNumber;

        if (seen[neededNumber] === true) {
            return true
        }

        seen[neededNumber] = true;
        console.log(seen);
    }
    return false;
}

console.log(addsTo20([1, 2, 10, 9, 18, 23, 20]));