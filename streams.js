const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
let args = process.argv.slice(2);
const directory = path.join(__dirname, args[0]);

fs.exists(directory, (err) => {
    if(err) {
        console.log(err)
    }
    fs.mkdir(`${directory}-zip` , (err) => {
        if (err) {
            console.log(err)
        }
        fs.readdir(directory, (err, files) => {
            if(err) {
                console.log(err)
            }
            let promises = [];
            if(files && files.length) {
                files.forEach(file => {
                    let filename = path.resolve(directory, file);
                    let fileZip = path.resolve(`${directory}-zip`, file);
                    console.log(fileZip, 'fileZip')
                    const stream = fs.createReadStream(filename, {
                        highWaterMark: 50,
                        encoding: 'UTF-8'
                    });
                    const output = fs.createWriteStream(fileZip);
                    stream.pipe(zlib.createGzip()).pipe(output);
                })
            }
        })
    });
})



//
// const stream = fs.createReadStream('./dist', 'utf-8',  {
//     highWaterMark: 9
// });
// const output = fs.createWriteStream('./zip');
//
// let out = '';
// stream.pipe(zlib.createGzip()).pipe(output);
//
// //end, close, finish
//
// // stream.on('data', d => {
// //     console.log(d);
// //     out += d
// // })
//
// // stream.on('close', () => {
// //     console.log('close event')
// // })
//
// stream.on('end', () => {  //end read or write
//     console.log('stream end event');
//     console.log(out)
// })
//
// // output.on('end', () => {  //end read or write
// //     console.log('output end event')
// // })
// //
// // stream.on('finish', () => {  //end read or write
// //     console.log('stream finish event')
// // })
// //
// //
// // output.on('finish', () => {  //end read or write
// //     console.log('output finish event')
// // })
//
// stream.on('error', error => {
//     console.log(error)
// })


