# wp-kickstart

Automates the WordPress installation process using a customizable setup file.

## Installation

This package is meant to be installed globally, therefore install it with the appropriate flag:
`npm i -g wp-kickstart`

Upon installation, the most recent version of [WP-CLI](https://wp-cli.org) will automatically be downloaded and stored. The target directory varies depending on the operating system:

OS | Location
---- | ---
MacOS / Linux | /usr/local/bin
Windows | %AppData%/Roaming/wp-cli

If you are installing the package in Windows, make sure the following paths are added to the PATH environment variable:
`%AppData%\wp-cli`
`%AppData%\npm`

## Usage

To run a WordPress installation, create a new folder to serve as the root directory. Place a copy of the **wp-kickstart.json** configuration file inside it and adjust it to your needs (see the section below for more information). Finally run the following command in your terminal (passing the path to the directory):
`wp-kickstart dir/subdir/root`

**IMPORTANT: Delete or move the wp-kickstart.json file after installation as it holds sensitive information and is not protected from being accessed!**

### wp-kickstart.json

This file is holding all the information necessary to install WordPress and adjust it to your needs. Below is an example of this file containing most of the currently available options:
```
{
    "init": {
        "url": "http://localhost/wordpress",
        "title": "WordPress",
        "lang": "de_DE",
        "admin_user": "admin",
        "admin_pass": "youshallnotpass",
        "admin_email": "admin@domain.tld",
        "notify": false
    },
    "database": {
        "name": "wordpress",
        "host": "localhost",
        "user": "root",
        "pass": ""
    },
    "configs": {
        "FS_METHOD": "direct"
    },
    "components": {
        "themes": {
            "twentynineteen": true
        },
        "plugins": {
            "elementor": true
        }
    },
    "cleanup": {
        "themes": [
            "twentysixteen",
            "twentyseventeen"
        ],
        "plugins": [
            "hello",
            "akismet"
        ]
    }
}
```

#### init

Property | Description
---- | ---
url | Base URL of the WordPress installation
title | Title of the WordPress site
lang | [Language local](https://translate.wordpress.org) to be installed
admin_user | The administrator's username
admin_pass | The administrator's password
admin_email | The administrator's email address
notify | Wether the new administrator should receive an email notification

#### database

Property | Description
---- | ---
name | Database name
host | Hostname
user | Database user name
pass | Database user's password

#### configs

Contains custom configuration values to be added to the wp-config.php.
A list of all available constants can be found [here](https://wordpress.org/support/article/editing-wp-config-php/)

Note: Boolean values will automatically be written as such.

Example:
```
...
"configs": {
	"FS_METHOD": "direct",
	"WP_DEBUG": true
}
...
```
wil result in the following code:
```
define('FS_METHOD', 'direct');
define('WP_DEBUG', true);
```

#### components

##### themes

Contains an object representing all themes to be installed whereas the key holds its slug-name and the value indicates whether it should be activated immediately upon installation.

Note: It's also possible to have the key point to a valid theme zip-file.

Example:
```
"components": {
	"themes": {
		"twentynineteen": false,
		"./my-theme.zip": true
	}
}
```

##### plugins

Contains an object representing all plugins to be installed whereas the key holds its slug-name and the value indicates whether it should be activated immediately upon installation.

Note: It's also possible to have the key point to a valid theme zip-file.

Example:
```
"components": {
	"themes": {
		"elementor": true,
		"./my-plugin.zip": false
	}
}
```

#### cleanup

Property | Description
---- | ---
themes | Contains an array (slug-names) of themes to be deleted
plugins | Contains an array (slug-names) of plugins to be deleted
