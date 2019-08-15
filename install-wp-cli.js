const { exec, execSync } = require('child_process')

console.log('Installing wp-cli.phar...')

exec('curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar', () =>
{
    execSync('chmod +x wp-cli.phar')
    execSync('mv wp-cli.phar /usr/local/bin/wp')

    console.log('Installation complete')
})
