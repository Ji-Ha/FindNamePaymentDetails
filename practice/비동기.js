var fs = require('fs');

fs.readdir('.', function(err, filnames) {
    var i;
    for(i = 0; i < filnames.length; i++){
        console.log(filnames[i]);
    }
    console.log('ready');
});

console.log('can process next job...');