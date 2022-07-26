# Division of University Relations Directory

_The Division of University Relations Directory CMS, build and refactored for [craftCMS](https://craftcms.com/docs/4.x/)._

Staging: n/a

## Install/setup

1. Clone and enter the project.

```bash
cd [desired_local_directory]
git clone git@github.com:UMD-Digital/urdirectory.git
cd president
```

2. Install required webpack modules

```bash
yarn install
```

3. Install required craft components

```bash
cd ./craft && composer install && mkdir storage
```

3. Setup your local environment. _[See the Notes section](#Notes) for requirements/recommendations._
   - Locally, assets are stored in `uploads` directory.

```bash
# LAMP stack: mamp, nginx, nitro. wamp (for windows).
# MySQL/Assets: Ask the development team for a current database and assets.

./source/assets/uploads
# Where craft and webpack look for site assets (images, video, pdfs, etc).

```

4. Start webpack, compiling templates, styles, and scripts into the ./craft directory

```bash
# build templates and styles once, and stop.
yarn build:dev

# or

# build and watch for changes during active development.
yarn start
```

5. Start a CLI to create the .gitignore content needed for craft

```bash
./craft/craft setup
```

- **Database:** Ask the [Development Team](https://github.com/UMD-Digital) for a current database and assets _(images/files)_.
- See **Notes** for recommended additions to the generated `.env` file.

## Development

**Start webpack:** compiling templates, styles, and scripts into the ./craft directory

```bash
yarn start
```

**Cleanup:** Run rm -rf on everything in the ./craft/web, and ./craft/templates directories to remove old or orphaned files.

```bash
yarn cleanup
```

## Deployment

### Staging

Build and push a development version of the site to the [Digital team staging server](https://umd-staging.com).

```bash
yarn deploy:staging
# WARNING: This will completely overwrite the site on staging,
# ./config/project will be overwritten by all local changes and applied to the db there.
```

### Production

```bash
# N/A - The site is not ready for production
```

## Notes

### Project Requirements

PHP, Composer, craftCMS, and a local env that supports it.

- **Local Env:**
  - **PHP (update to at least 8.1):** [homebrew](https://formulae.brew.sh/formula/php) _(preferred)_, [Mac](https://www.php.net/manual/en/install.macosx.php), or [Windows](https://www.php.net/manual/en/install.windows.php)
  - **LAMP Server:** [Nitro](https://craftcms.com/docs/nitro/), [MAMP](https://www.mamp.info/), or [nginx](https://nginx.org/en/docs/) _(preferred)_.
  - **MySQL Server:** [Homebrew](https://formulae.brew.sh/formula/mysql) _(preferred)_, [MAMP](https://www.mamp.info/) _(comes with MySQL)_, [Mac](https://dev.mysql.com/doc/refman/8.0/en/macos-installation-pkg.html), or [Windows](https://dev.mysql.com/doc/refman/8.0/en/windows-installation.html)
- [Installing Composer](https://getcomposer.org/doc/00-intro.md)
- [CraftCMS Documentation](https://craftcms.com/docs/)
- Request a MySQL db and assets from the [Digital Experience](https://github.com/UMD-Digital) team.

Yarn, and webpack to compile templates, styles, and scripts.

- [yarn documentation](https://classic.yarnpkg.com/en/docs)
- [webpack documentation](https://webpack.js.org/concepts/)

### Additions needed to .ENV

_In addition to the variables set in `.env` during the setup process, the following is needed for this project for a correct reference to assets and urls._

```bash
BASE_ASSET_PATH=""
PRIMARY_SITE_URL=""
WEBROOT=""
```

- **BASE_ASSET_PATH:** _Full system path to the directory where assets are stored (ie: /Users/[username]/umd-temp-craft/source/assets/uploads)._
- **PRIMARY_SITE_URL:** _Domain set by local environment for accessing the site in browser._
- **WEBROOT:** _Full system path to the `/craft/web` directory of the project (ie: /Users/[username]/umd-temp-craft/craft/web)._
