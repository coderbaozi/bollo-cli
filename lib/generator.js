import path from 'path'
import ora from 'ora'
import chalk from 'chalk'
import inquirer from 'inquirer'
import util from "util"
import downloadGitRepo  from "download-git-repo"

// add loading animation
async function wrapLoading(fn, message, ...args) {
  // ora tips message
  const spinner = ora(message);
  // animation start
  spinner.start();

  try {
    // execute  download function
    const result = await fn(...args);
    // loading success
    spinner.succeed();
    return result; 

  } catch (error) {
    // loading filed
    spinner.fail('Error:Create Project failed!')
  } 

}

class Generator {

  constructor(name, targetDir) {
    // catalog name
    this.name = name
    this.targetDir = targetDir

    // download-git-repo --> promise remodel
    this.downloadGitRepo = util.promisify(downloadGitRepo)

  }

  // download remote repo
  async download(){
    // remote repo
    const requestUrl = `coderbaozi/bollo-lite`
    // dowload
    await wrapLoading(
      this.downloadGitRepo, // remote download method
      'Template is downloading', // 加载提示信息
      requestUrl, // 参数1: 下载地址
      path.resolve(process.cwd(), this.targetDir)) // 参数2: 创建位置
  }


  // core logic
  async create() {
  
      // download Template to specified dir
      await this.download()
      
      // use template Tips
      console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
      console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
      console.log('  pnpm run dev\r\n')
  }

}

export default Generator
