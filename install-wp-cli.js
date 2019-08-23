const { exec, execSync } = require('child_process')

const fs         = require('fs')
const logSymbols = require('log-symbols')

console.log(logSymbols.info, 'Installing wp-cli.phar...')

let path, file

switch(process.platform)
{
   case 'win32':
      path = process.env.APPDATA + '\\wp-cli'
      file = 'wp.bat'
      break;
   default:
      path = '/usr/local/bin'
      file = 'wp'
}

if(fs.existsSync(`${path}/${file}`))
{
   console.log(logSymbols.success, 'WP-CLI already installed')
}
else
{
   exec('curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar', () =>
   {
      switch(process.platform)
      {
         case 'win32':

            execSync(`if not exist ${path} mkdir "${path}"`)
            execSync(`move wp-cli.phar ${path}`)
            execSync(`type nul > ${path}\\wp.bat`)
            execSync(`echo @ECHO OFF >> ${path}\\wp.bat`)
            execSync(`echo. >> ${path}\\wp.bat`)
            execSync(`echo php ${path}\\wp-cli.phar %* >> ${path}\\wp.bat`)
            execSync(`setx path "%path%;${path}"`)
            break;
         default:
            execSync('chmod +x wp-cli.phar')
            execSync(`mv wp-cli.phar ${path}/${file}`)
      }

       console.log(logSymbols.success, 'Installation complete')
   })
}
