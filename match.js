var fs = require('fs');
var jsonfile = require('jsonfile')

module.exports.add = function(allUsers, newUser) {
    allUsers.push(newUser);
    jsonfile.writeFile('users.json', allUsers, function(err) {
        if (err) throw err;
    });
}

module.exports.match = function(allUsers, newUserData) {
    allUsers = JSON.parse(allUsers);

    matchingUser = {};
    var difference = 100;
    var tmpDiff = 0;

    for (var i = 0; i < allUsers.length; i++) {
        // console.log(allUsers[i].answers);
        tmpDiff = 0;
        for (var j = 0; j < allUsers[i].answers.length; j++) {
            tmpDiff += Math.abs(allUsers[i].answers[j] - newUserData.answers[j]);
        }
        // console.log("tmpDiff", tmpDiff);
        if (tmpDiff < difference) {
            difference = tmpDiff;
            matchingUser = allUsers[i];
        }
    }
    // console.log(newUserData);
    // console.log(matchingUser);
    module.exports.add(allUsers, newUserData);
    return matchingUser;
}

// fs.readFile('users.json', 'utf-8', function(err, users) {
//     module.exports.match(users, { name: 'asdvds', photoUrl: 'sdvd', answers: [3, 2, 0, 0, 0, 1, 0, 0, 2, 2] });
// });

// fs.readFile('users.json', 'utf-8', function(err, data) {
//     console.log(JSON.parse(data));
// });