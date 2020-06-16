const { Command } = require('commander')
const program = new Command()
const chalk = require('chalk')
const symbol = require('log-symbols')
const util = require('./util')
const inquiry =require('./inquiry')
const create =require('./create')


program
	.command('init <fileName>')
	.action((source, cmd) => {
		util.checkRepeat(cmd.args[0]).then(()=>
			inquiry.then(answer => create(answer, cmd.args[0]))
		).catch(()=>
			console.log(symbol.error, chalk.red('文件夹名已被占用，请更换名字重新创建'))
		)
	})

program
	.version(require('../package.json').version, '-v --version')

program.parse(process.argv)
