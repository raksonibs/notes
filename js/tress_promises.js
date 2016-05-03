listFiles('/tmp/dir')
.then(files => {
  console.log(files.join('\n'));
});

readdirAsync(dirpath) : Promise<Array<string>>
statAsync(filepath) : Promise<Stats>

import denodeify from 'denodeify';

import {readdir,stat} from 'fs';
const readdirAsync = denodeify(readdir);
const statAsync = denodeify(stat);

function listFiles(filepath) {
    return statAsync(filepath) // (A)
    .then(stats => {
        if (stats.isDirectory()) { // (B)
            return readdirAsync(filepath) // (C)
            // Ensure result is deterministic:
            .then(childNames => childNames.sort())
            .then(sortedNames =>
                Promise.all( // (D)
                    sortedNames.map(childName => // (E)
                        listFiles(resolve(filepath, childName)) ) ) )
            .then(subtrees => {
                // Concatenate the elements of `subtrees`
                // into a single Array (explained later)
                return flatten(subtrees); // (F)
            });
        } else {
            return [ filepath ];
        }
    });    
}

var flatten = arr => arr.reduce((p, c) => p.concat(Array.isArray(c) ? flatten(c) : c), [])