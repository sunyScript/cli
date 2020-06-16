const chalk = require('chalk')
const symbol = require('log-symbols')
const ora = require('ora')
const downloadGit = require('download-git-repo')
const util = require('./util')
const init = require('./init')

//answer{name, git, yarn, plugin, compile, ts}
const create = (answer, name) => {
	console.log(chalk.blue('==================='))
	let spinner = ora('拉取模板中...').start()
	downloadGit('https://github.com:sunyScript/cli-template#' + util.selected(answer), name, {clone: false},
		(err) => {
			if(err) {
				spinner.color = 'red'
				spinner.fail(chalk.red('拉取模板失败'))
			}else {
				spinner.color = 'green'
				spinner.succeed(chalk.green('拉取模板成功'))
				init(answer, name)
			}
		}
	)
}

module.exports = create
