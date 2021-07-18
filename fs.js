const path = require('path');
const fs = require('fs');
const readline = require('readline');
const unzipper = require('unzipper');

//convert csv to json
// convert();
function convert() {
    const csvPath = path.join(__dirname, 'addresses.csv');
    const jsonPath = path.join(__dirname, 'addresses.json');
    const keys = ["first_name", "last_name", "street", "town", "country", "zip"];
    let jsonData = [];

    const rl = readline.createInterface({
        input: fs.createReadStream(csvPath)
    });
    rl.on('line', (line) => {
        let jsonItem = {};
        line.split(',').forEach((value, index) => {
            jsonItem[keys[index]] = value;
        });
        jsonData.push(jsonItem);
    }).on('close', () => {
        fs.writeFileSync(jsonPath, JSON.stringify(jsonData), (err) => console.log(err));
    }).on('error', function(err) {
        console.log(err);
    });
}



//unzip file and get directory structure
// unzipDirectory('node_modules.zip', 'unzip_node_modules')
function getDirectoryStrucure(dir, callback) {
    let results = [];

    fs.readdir(dir, (err, files) => {
        if (err) {
            return err;
        }
        if (!files.length)
            return callback({name: path.basename(dir), children: results});

        files.forEach((file) => {
            file = path.resolve(dir, file);
            fs.stat(file, (err, stat) => {

                if(err) {
                    return err;
                }
                if (stat.isDirectory()) {
                    getDirectoryStrucure(file, (err, res) => {
                        results.push({
                            name: path.basename(file),
                            children: res
                        });

                        files.length -= 1;
                        if (!files.length) {
                            return callback(null, results);
                        }
                    });
                } else {
                    results.push({
                        name: path.basename(file)
                    });
                    files.length -= 1;
                    if (!files.length)
                        return callback(null, results);
                }
            });
        });
    });
};
function unzipDirectory (dir, name) {
    let readStream = fs.createReadStream(dir);
    readStream.on('open', function () {
        readStream.pipe(unzipper.Extract({ path: name }));
    }).on('close', function () {
        getDirectoryStrucure(name, (err, res) => {
            if(err) {
                console.log(err);
            }
            console.log(JSON.stringify(res));
        })
    });

    readStream.on('error', function(err) {
        console.log(err);
    });
}
//
// // try {
// //     data = fs.readFileSync('./new.txt').toString();
// //     // if(fs.existsSync(data)) {
// //     //     console.log('File is exists')
// //     // }
// //     // if(path.resolve())
// //     // console.log( 'Sync data:', data)
// // } catch (e) {
// //     console.log('Error:', e)
// // }
//
// // if(fs.exists()
// // console.log(path.join(__dirname, 'data', 'nkh.txt'))
//
// fs.readFile('./new.txt', (err, data) => {
//     if(err) console.error(err)
//     data = data.toString();
//     console.log(path.resolve(data))
//     if(data === path.resolve(data)) {
//         console.log('Is absolute')
//     }
// });
// // //
// // // try {
// // //     const data = fs.readFileSync('./news.txt');
// // //     console.log( 'Sync data:', data)
// // // } catch (e) {
// // //     console.log('Error:', e)
// // // }
// //
// //
// // try {
// //     fs.writeFileSync('./nkh.txt', 'Naira Khachatryan');
// //     // console.log( 'Sync data:', data)
// // } catch (e) {
// //     console.log('Error:', e)
// // }


