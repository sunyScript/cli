var fs = require('fs')

util = {
	checkRepeat: (name) => {
		return new Promise((resolve, reject) => {
			fs.existsSync(name) ? reject() : resolve()
		})
	},
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
	}
}

module.exports = util
