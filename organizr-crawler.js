const path = require('path');
const cli  = require('command-line-args')
const fs   = require('fs-extra');

const optionDefinitions = [

	{
		name: 'size',
		alias: 's',
		type: Boolean
	},

	{
		name: 'src',
		type: String,
		defaultOption: true
	},

];

const options = cli(optionDefinitions);

if(!options.src) return console.log('Defina um caminho, exemplo: node index.js c:/');

let Index = {

	tree(dir, obj){

		if(typeof obj === 'undefined'){

			obj = {

				count: {
					files: 0,
					folders: 0,
					errors: 0,
				},

				errors: {},

				files: {},
				folders: {}

			}

		}

		return fs.readdir(dir).then(entries => {

			if(!obj.folders[dir]){

				obj.folders[dir] = {
					entries:   entries.length,
					totalSize: 0,
					files:     0,
					folders:   0,
				}

			}

			let entriesPromise = [];

			entries.forEach(entry => {

				let entryPath = path.join(dir, entry);

				entriesPromise.push(fs.stat(entryPath).then(stat => {

					if(stat.isFile()){

						obj.folders[dir].totalSize += stat.size;
						obj.folders[dir].files++;

						obj.count.files++;

						obj.files[entryPath] = {
							size: stat.size
						}

					} else{

						obj.count.folders++;
						obj.folders[dir].folders++;

						return Index.tree(entryPath, obj);

					}

				}).catch(e => {

					obj.errors[entryPath] = e;
					obj.count.errors++;

				}));

			});

			return Promise.all(entriesPromise).then(() => {

				Index.sameLineLog(`${obj.count.files} arquivos, ${obj.count.folders} pastas`);

				return obj;

			});

		});

	},

	sameLineLog(msg){

		process.stdout.write(`\r${msg}`);

	}

}

Index.tree(options.src).then(obj => {

	console.log("\n");

	if(options.size){

		var folders = Object.keys(obj.folders).sort((a, b) => {

			return obj.folders[b].totalSize - obj.folders[a].totalSize;

		});

		folders.forEach((folder, k) => {

			if(k > 100) return;

			console.log(k, '.', folder, obj.folders[folder].totalSize);

		});

	} else{
		
		console.log('Especifique um argumento de linha de comando');

	}
	// console.log(obj.count);

});

// let  firstPath = ''

// fs.readdir('C:/NVIDIA').then(folders => {

// 	console.log(folders);

// });