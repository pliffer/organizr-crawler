let Util = {

    // @todo Revisar essa função
    humanizeBytes(bytes){

        let sizeShow  = (bytes / 1024 / 1024).toFixed(2);
        let showSufix = 'mb';

        if(sizeShow > 1000){

            showSufix = 'gb';
            sizeShow = (sizeShow / 1024).toFixed(2);

        } else if(sizeShow < 1){
            showSufix = 'kb';
            sizeShow = (bytes / 1024).toFixed(2);
        }

        if(showSufix == 'kb' && sizeShow < 1){

            showSufix = 'b';
            sizeShow = bytes;

        }

        return sizeShow + '' + showSufix;

    },

    treeObj(obj){

        var finalObj = false;

        if(Object.keys(obj).length){

            finalObj = {};

            Object.keys(obj).sort().forEach(objKey => {

                finalObj[objKey] = obj[objKey];

                console.log(obj[objKey])

                if(Object.keys(obj[objKey]).length && typeof obj[objKey] == 'object'){

                    let recursiveTree = Util.treeObj(obj[objKey]);

                    Object.keys(recursiveTree).sort().forEach(recursiveItem => {

                        delete finalObj[objKey];

                        finalObj[objKey + '/' + recursiveItem] = recursiveTree[recursiveItem];

                    });

                }

            });

        }

        return finalObj;

    },

    diferencies(a, b){

        let diferencies = {};

        let bPlain = Util.treeObj(b);
        let aPlain = Util.treeObj(a);

        Object.keys(bPlain).sort().forEach(function(bPlainKey){

            // Verifica se existe em A
            if(aPlain[bPlainKey]){

                if(aPlain[bPlainKey] !== bPlain[bPlainKey]){

                    console.log(`${aPlain[bPlainKey]} !== ${bPlain[bPlainKey]}`);

                    diferencies[bPlainKey] = bPlain[bPlainKey];

                } else{

                }

            } else{

                console.log('Não encontrado em a', bPlainKey, bPlain[bPlainKey]);

                diferencies[bPlainKey] = bPlain[bPlainKey];

            }



            // Verifica se está diferente do que tem em a
            // Verifica itens que a não possui

        });

        return diferencies;

        // Object.keys(a).forEach(function(aKey){

        //     var aObj = a[aKey];
        //     var bObj = b[aKey];

        //     if(JSON.stringify(aObj) != JSON.stringify(bObj)){

        //         console.log(JSON.stringify(aObj).substr(0, 100), '--XXX--', JSON.stringify(bObj).substr(0, 100));

        //     }

        // });

        // console.log(a, b);

    }

}

module.exports = Util;