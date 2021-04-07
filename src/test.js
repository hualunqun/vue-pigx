// function shallowClone(obj) {
//     const newObj = {};
//     for(let prop in obj) {
//         if(obj.hasOwnProperty(prop)){
//             newObj[prop] = obj[prop];
//         }
//     }
//     return newObj;
// }
//
// function deepClone(obj, hash = new WeakMap()) {
//     if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
//     if (obj instanceof Date) return new Date(obj);
//     if (obj instanceof RegExp) return new RegExp(obj);
//     // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
//     if (typeof obj !== "object") return obj;
//     // 是对象的话就要进行深拷贝
//     if (hash.get(obj)) return hash.get(obj);
//     let cloneObj = new obj.constructor();
//     // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
//     hash.set(obj, cloneObj);
//     for (let key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             // 实现一个递归拷贝
//             cloneObj[key] = deepClone(obj[key], hash);
//         } else {
//             cloneObj[key] = obj[key]
//         }
//     }
//     return cloneObj;
// }
//
// let obj1 = {
//     name:'obj.name',
//     un:undefined,
//     nu:null,
//     sy:Symbol(123),
//     say:function(){
//         console.log(this.name);
//     },
//     reg:/\d{6}/g,
//     date:new Date(),
//     child:{
//         name:'child.name'
//     }
// }
//
// let obj2 = JSON.parse(JSON.stringify(obj1))
// let obj3 = deepClone(obj1)
// console.log(obj2)
// console.log(obj3)

//
// function go(args) {
//     let str = 'g'
//     if (args) {
//         return str + args
//     } else {
//         return str + 'ol'
//     }
// }



// function go(...arg1) {
//     let str = "go";
//     function addarg(...arg2) {
//         if (!arg2[0]) {
//             //当没有参数时候就累加默认的参数o 并返回当前函数保持对str的引用产生闭包
//             str += "o";
//             return addarg;
//         } else {
//             //如果是有参数就直接返回最后累加的字符串
//             return (str += arg2[0]);
//         }
//     };
//     return addarg(...arg1);
// }
// console.log(go()()()()("l")); //goooool
// console.log(go('l'))


// let regExp = /^\d{12}$/
// let str = '012345678912'
// console.log(regExp.test(str))

// for (var i = 0; i < 3; i++) {
//     setTimeout(function log() {
//         console.log(i); // => ?
//     }, 1000);
// }
//
// function multiply(...args) {
//     if (args.length ===2) {
//         return args[0]*args[1]
//     } else if (args.length ===1) {
//         let anotherMultiply = function (...args2) {
//             return args*args2
//         }
//         return anotherMultiply
//     }
//
// }
//
// let double  = multiply(2)
// console.log(double(5) )


// let arr = [3, 1, 2, 6, 2, 1, 1, 2, 4, 5]
// // let set = Array.from(new Set(arr))
// let set = new Set(arr)
// console.log(set)
function pow(x, n) {
    if (n == 1) {
        return x;
    } else {
        return x * pow(x, n - 1);
    }
}
console.log(pow(2,4))
console.log([1,2] + [2,1])

// function wait() {
//     return new Promise(resolve => {
//         setTimeout(resolve, 1000)
//     })
// }
// async function main() {
//     console.time()
//     const x = wait()
//     const y = wait()
//     const z = wait()
//     await x
//     await y
//     await z
//     console.timeEnd()
// }
// main()

var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push,
}
// obj.push(1)
//
//
//
// obj.push(2)


function getUrlParam(sUrl, sKey) {
    // http://www.nowcoder.com?key=1&key=2&key=3&test=4
    var param = sUrl.split('#')[0].split('?')[1];
    if (sKey){//指定参数名称
        var strs = param.split('&');
        var arrs = new Array();//如果存在多个同名参数，则返回数组
        for(var i = 0, len = strs.length; i < len; i++){
            var tmp = strs[i].split('=');
            if(tmp[0] == sKey){
                arrs.push(tmp[1]);
            }
        }
        if (arrs.length == 1){//返回该参数的值或者空字符串
            return arrs[0];
        } else if (arrs.length == 0){
            return "";
        } else {
            return arrs;
        }
    } else {//不指定参数名称，返回全部的参数对象 或者 {}
        if(param == undefined || param == ""){
            return {};
        } else {
            var strs = param.split('&');
            var arrObj = new Object();
            for(var i = 0, len = strs.length; i < len; i++){
                var tmp = strs[i].split('=');
                if (!(tmp[0] in arrObj)) {
                    arrObj[tmp[0]] = [];
                }
                arrObj[tmp[0]].push(tmp[1]);
            }
            return arrObj;
        }
    }
}

function getUrlParam(sUrl, sKey) {
    let sParam = sUrl.split("?")[1].split("#")[0];  //key=1&key=2&key=3&test=4
    let arr = sParam.split("&"); //["key=1","key=2","key=3","test=4"]
    let res = sKey? []: {};
    if( sKey ){//如果指定参数
        for( let i = 0; i < arr.length; i++ ){
            let temp = arr[i].split("=");
            if( temp[0] === sKey ){
                res.push( temp[1] ); //res只存储指定key值的结果
            }
        }

        if( res.length == 1 ){
            return res[0];
        }else if( res.length == 0 ){
            return "";
        }else{
            return res;
        }

    } else {//如果不指定参数
        if( sParam==undefined || sParam=="" ){
            return res;
        }
        for( let i = 0; i < arr.length; i++ ){
            let temp = arr[i].split("=");
            if( !(temp[0] in res) ){
                res[temp[0]] = []; //temp[0]为键，temp[1]的数组为值
            }
            res[temp[0]].push(temp[1]); //使用变量动态访问对象属性用obj[a]不能用obj.a
        }
        return res;
    }

}

// console.log(getUrlParam('http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe key'))

// var a = 1
// function out() {
//     var a= 2
//     // inner()
//     function inner() {
//         console.log(a, '1++++++++++++')
//     }
//     inner()
// }
// // function inner() {
// //     console.log(a, '1++++++++++++')
// // }
// out()
//
//
// function curtail(arr) {
//     let newArr = arr.slice(1,4)
//     return newArr
// }
// console.log(curtail([1, 2, 3 ,4, 5]))
function insert(arr, item, index) {
    let newArr = arr.slice(0)
    newArr.splice(index, 0, item)
    return newArr
}

function removeWithoutCopy(arr, item) {
    for(var i=0, len=arr.length; i<len; i++) {
        if (arr[i]===item) {
            arr.splice(i, 1)
            i--
        }
    }
    return arr
}


function useArguments() {
    let args = [].slice.call(arguments,0)
    return args.reduce((acc, curr)=> {
        return acc + curr
    })
}

function multiply(a, b) {
    // 以两个数的小数位数之和作为精度
    var strA = a.toString();
    var strB = b.toString();
    var lenA = (strA.indexOf('.') == -1 ) ? 0 : (strA.length - strA.indexOf('.') - 1);
    var lenB = (strB.indexOf('.') == -1 ) ? 0 : (strB.length - strB.indexOf('.') - 1);
    var LEN = lenA + lenB;
    return (a * b).toFixed(LEN);
}

function fizzBuzz(num) {
    if(typeof num !== 'number'){
        return false;
    }
    var str='';
    if(num%3 === 0){
        str+='fizz';
    }
    if(num%5 === 0){
        str+='buzz';
    }
    return str||num
}
function captureThreeNumbers(str) {
    let arr = str.match(/\d{3}/g);
    return arr?arr[0]:false
}


function cssStyle2DomStyle(sName) {
    if (!sName) {
        return false
    }
    let newName = sName.split('-'), str='';
    if (!newName[0]) {
        newName.shift()
    }
    if (Array.isArray(newName)) {
        newName.forEach((item, index)=> {
            if (index>0) {
                item = item.replace(item[0], item[0].toUpperCase())
            }
            str += item
        })
    }
    return str
}

function count(str) {
    if (!str) {
        return false
    }
    let strArr = str.split('')
    console.log(strArr)
    let obj = {}
    strArr.forEach(item => {
        if (item!==' ') {
            if (obj.hasOwnProperty(item)) {
                obj[item] += 1
            } else {
                obj[item] = 1
            }
        }
    })
    return obj
}


function count(start, end) {
    console.log(start++)
    let timer = setInterval(()=> {
        if (start<=end) {
            console.log(start++)
        } else {
            clearInterval(timer)
        }
    },100)
    return {cancel:  function () {clearInterval(timer)}}
}

function useArguments() {
    let args = Array.from(arguments)
    return args.reduce((acc, cur)=> { return acc + cur})

}

let map = new Map()
map.set('name','vue3js.cn')
map.set('age','18') // Map {"name" => "vuejs.cn", "age" => "18"}

const arr = [1, 2, 3];
Math.max(...arr); // 3
Math.min(...arr); // 1