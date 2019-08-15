// Built in imports
const { execSync } = require('child_process')

// Dependency modules
const fs        = require('fs')
const parseJson = require('parse-json')

// Local modules
const cmdr = require('./cmdr.js')

// Fetch arguments
const args = process.argv.splice(2)

// Set the current working directory
process.chdir(args[0])

// Read the config file
fs.readFile('wp-kickstart.json', (error, buffer) =>
{
    // Parse json content
    const config = parseJson(buffer)

    // Run installation process
    run(config)
})

function run(config)
{
    // WordPress download
    execSync(cmdr.build('wp core download', {
        "locale": config.init.lang
    }))

    // Dabatase config
    execSync(cmdr.build('wp core config', {
        "dbname": config.database.name,
        "dbuser": config.database.user,
        "dbpass": config.database.pass
    }))

    // Database creation
    execSync(cmdr.build('wp db create'))

    // Core installation
    execSync(cmdr.build('wp core install', {
        "url":            config.init.url,
        "title":          config.init.title,
        "admin_user":     config.init.admin_user,
        "admin_password": config.init.admin_pass,
        "admin_email":    config.init.admin_email,
        "skip-email":    !config.init.notify
    }))

    // Configuration
    for(let [key, value] of Object.entries(config.configs))
    {
        let raw = typeof value !== 'string' ?  { "raw": true } : {}

        execSync(cmdr.build(`wp config set ${key} ${value}`, raw))
    }

    // Themes installation
    for(let [key, value] of Object.entries(config.components.themes))
    {
        let activate = value ? { "activate": true } : {}

        execSync(cmdr.build(`wp theme install ${key}`, activate))
    }

    // Plugins installation
    for(let [key, value] of Object.entries(config.components.plugins))
    {
        let activate = value ? { "activate": true } : {}

        execSync(cmdr.build(`wp plugin install ${key}`, activate))
    }

    // Theme cleanup
    for(let theme of config.cleanup.themes)
    {
        execSync(cmdr.build(`wp theme delete ${theme}`))
    }

    // Plugin cleanup
    for(let plugin of config.cleanup.plugins)
    {
        execSync(cmdr.build(`wp plugin delete ${plugin}`))
    }
}
