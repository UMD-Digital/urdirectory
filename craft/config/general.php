<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

use craft\helpers\App;

$isDev = App::env('CRAFT_ENVIRONMENT') === 'dev';
$isProd = App::env('CRAFT_ENVIRONMENT') === 'production';

return [
  'defaultWeekStartDay' => 1,
  'omitScriptNameInUrls' => true,
  'enableCsrfProtection' => true,
  'cpTrigger' => App::env('CP_TRIGGER') ?: 'admin',
  'securityKey' => App::env('SECURITY_KEY'),
  'pageTrigger' => '?page=',
  'previewTokenDuration' => 259200,
  'devMode' => $isDev,
  'allowUpdates' => $isDev,
  'allowAdminChanges' => $isDev,
  'disallowRobots' => !$isProd,
  'aliases' => [
    '@baseAssetPath' => getenv('BASE_ASSET_PATH'),
    '@siteUrl' => getenv('PRIMARY_SITE_URL'),
    '@webroot' => getenv('WEBROOT'),
  ],
];
