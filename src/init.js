const chalk = require('chalk')
const symbol = require('log-symbols')
const util = require('./util')
const fileName = 'package.json'

const callback = () =>{
	console.log('安装完成')
}

const init = (answer, name) => {
	let obj = {
		name: name,
		author: answer['author']
	}
	util.updateJson(fileName, obj).then(() => {
		console.log(
			symbol.success,
			chalk.green('更新文件'+ fileName + '完成')
		)
		util.loadCmd(answer['yarn'] ?'yarn' : 'npm i', callback)
	}).catch(()=>{
		console.log(
			symbol.error,
			chalk.red('更新文件' + fileName + '文件出错')
		)
	})
}
module.exports = init
