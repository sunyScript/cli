const inquirer = require('inquirer')

const promptList = [
	{
		type: 'input',
		message: '创建者:',
		name: 'author'
	},
	{
		type: 'confirm',
		message: '使用yarn?',
		name: 'yarn'
	},
	{
		type: 'confirm',
		message: '初始化git?',
		name: 'git'
	},
	{
		type: "confirm",
		message: "项目是否发布为插件?",
		name: "plugin"
	},
	{
		type: 'confirm',
		message: '发布插件是否需要编译?',
		name: 'compile',
		when: answers => answers.plugin
	},
	{
		type: "confirm",
		message: "是否使用typeScript?",
		name: "ts",
		when: answers => !answers.plugin
	}
]

const option = inquirer.prompt(promptList)

module.exports = option
