const chalk = require('chalk')
const symbol = require('log-symbols')
const async = require("async")
const util = require('./util')
const fileName = 'package.json'

const initPluginGit = (answer, name) => {
	let stepFunc = [
		(callback) => {
			util.loadCmd(
				`cd ${name} && ${answer['yarn'] ? 'yarn' :  'npm i'}`,
				()=> callback(null)
			)
		},
		(callback) => {
			if(answer['git']) {
				console.log(chalk.blue('==================='))
				console.log('初始化git中...')
				callback(null)
			}
		},
		(callback) => {
			util.loadCmd(`cd ${name} && git init`, ()=>callback(null))
		},
		(callback) => {
			util.loadCmd(`cd ${name} && git add .`, ()=> callback(null))
		},
		(callback) => {
			util.loadCmd(`cd ${name} && git commit -m "初始化"`, ()=> callback(null))
		},
		(callback) => {
			console.log(symbol.success, chalk.green('初始化git完成'))
		}
	]
	async.series(stepFunc)
}


const init = (answer, name) => {
	let obj = {
		name: name,
		author: answer['author']
	}
	util.updateJson(name + '/' + fileName, obj).then(() => {
		console.log(
			symbol.success,
			chalk.green('更新'+ fileName + '完成')
		)
		initPluginGit(answer, name)
	}).catch(()=>{
		console.log(
			symbol.error,
			chalk.red('更新' + fileName + '文件出错')
		)
	})
}
module.exports = init
