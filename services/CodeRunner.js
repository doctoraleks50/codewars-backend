const Promise = require('bluebird');
// const exec = Promise.promisify(require('child_process').exec);
const exec = require('child_process').spawnSync;
const fs = Promise.promisifyAll(require('fs'));

class CodeRunner {
    constructor(database) {
        this.database = database
    }

    async exec(data) {
        const task = await this.database.Task.findByPk(data.task_id);
        let allData = data.code + `;\n` + task.basic_tests;
        if (data.testType === 'full') {
            allData += `;\n` + task.full_tests;
        }

        const result = fs.existsSync(`/user_code/${data.user_id}`)
        if (!result) {
            await fs.mkdirAsync(`/user_code/${data.user_id}`)
        }
        await fs.writeFileAsync(`/user_code/${data.user_id}/${data.task_id}.js`, allData)
        return exec(`docker`, [
            `run`,
            `--rm`,
            `-v`,
            `/user_code:/app/code`,
            `node:10`,
            `node`,
            `/app/code/${data.user_id}/${data.task_id}.js`
        ])
    }
}

module.exports = CodeRunner;