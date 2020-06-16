const chalk = require('chalk')
const symbol = require('log-symbols')
const ora = require('ora')
const downloadGit = require('download-git-repo')
const util = require('./util')

//answer{name, git, yarn, plugin, compile, ts}
const create = (answer, name) => {
	const spinner = ora('拉取模板中...').start()
	downloadGit('https://github.com:sunyScript/cli-template#' + util.selected(answer), name, {clone: false},
		(err) => {
			if(err) {
				spinner.color = 'red'
				spinner.text = '拉取模板失败'
				spinner.fail()
			}else {
				spinner.color = 'green'
				spinner.text = '拉取模板成功'
				spinner.succeed()
			}
		}
	)
}

module.exports = create
