const fs = require('fs')
const {exec} = require('child_process')
const ora = require('ora')

util = {

	//检查文件夹是否存在
	checkRepeat: (name) => {
		return new Promise((resolve, reject) => {
			fs.existsSync(name) ? reject() : resolve()
		})
	},

	//返回所选模板
	selected: (answer) => {
		let i, branch = [
			'master',
			'vue-ts',
			'vue-plugin',
			'vue-plugin-ts',
			'vue-plugin-compile'
		]
		if(answer['plugin']) {
			i = answer['compile'] ? 4 : answer['ts'] ? 3 : 2
		}else {
			i = answer['ts'] ? 1 : 0
		}
		return branch[i]
	},

	//更新package
	updateJson: (fileName, obj) => {
		return new Promise((resolve, reject) => {
			if(fs.existsSync(fileName)) {
				let data = JSON.parse(fs.readFileSync(fileName).toString())
				Object.keys(obj).forEach(key => data[key] = obj[key])
				fs.writeFileSync(fileName, JSON.stringify(data, null, '\t'), 'utf-8')
				resolve()
			}else {
				reject()
			}
		})
	},

	//执行命令
	loadCmd: (cmd, callback) => {
		let loading = ora(`${cmd}: 命令执行中...`).start()
		exec(cmd, (err, stdout, stderr) => {
			if (err) {
				loading.fail(`${cmd}: 执行失败`)
			}else{
				loading.succeed(`${cmd}: 命令执行完成`)
				callback && callback()
			}
		})
	}
}

module.exports = util
