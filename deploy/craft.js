import deploy from 'deploy';
import config from './config.json';

const Client = deploy.remote;
const name = process.argv[2] || process.env.DEPLOY_TARGET || config.default;
const target = config.targets[name];
const remote = new Client(target.user, target.host, target.env);

// Upload CMS

remote.exec(
  `if [! -d ${target.destination}/craft/config/project ]; then mkdir ${target.destination}/craft/config/project; fi`,
);
remote.exec(
  `if [ -d ${target.destination}/craft/config/project ]; then sudo chown -R ec2-user:ec2-user ${target.destination}/craft/config/project; fi`,
);
remote.exec(
  `if [ -d ${target.destination}/craft/config/project ]; then sudo chmod -R 777 ${target.destination}/craft/config/project; fi`,
);

remote.copy('craft/craft', `${target.destination}/craft`);
remote.copy('craft/config', `${target.destination}/craft`, ['.DS_Store']);
remote.copy('craft/modules', `${target.destination}/craft`, '.DS_Store');
remote.copy('craft/vendor', `${target.destination}/craft`, '.DS_Store');
remote.copy('craft/templates', `${target.destination}/craft`, '.DS_Store');
remote.copy('craft/composer.json', `${target.destination}/craft`);
remote.copy('craft/composer.lock', `${target.destination}/craft`);
remote.copy('craft/web', `${target.destination}/craft`, [
  'cpresources',
  'uploads',
  'sites',
  '.DS_Store',
]);

// Configure env content

remote.exec(`sudo chown -R ec2-user:ec2-user ${target.destination}`);
remote.exec(`sudo chmod -R 755 ${target.destination}/craft`);

remote.exec(
  `if [ ! -d ${target.destination}/craft/web/cpresources ]; then sudo mkdir ${target.destination}/craft/web/cpresources; fi`,
);

remote.exec(`sudo chmod -R 777 ${target.destination}/craft/web/cpresources`);

remote.exec(
  `if [ ! -d ${target.destination}/shared/storage ]; then sudo mkdir ${target.destination}/shared/storage; fi`,
);

remote.exec(
  `if [ ! -d ${target.destination}/shared/storage/logs ]; then sudo mkdir ${target.destination}/shared/storage/logs; fi`,
);

remote.exec(
  `if [ ! -d ${target.destination}/shared/storage/runtime ]; then sudo mkdir ${target.destination}/shared/storage/runtime; fi`,
);

remote.exec(
  `if [ -h ${target.destination}/craft/storage ]; then sudo unlink ${target.destination}/craft/storage; fi`,
);

remote.exec(
  `sudo ln -s ${target.destination}/shared/storage ${target.destination}/craft/storage`,
);

// Manage New Assets

remote.exec(`sudo chmod -R 777 ${target.destination}/shared/storage`);

remote.exec(
  `if [ -h ${target.destination}/craft/web/uploads ]; then sudo unlink ${target.destination}/craft/web/uploads; fi`,
);

remote.exec(
  `sudo ln -s ${target.destination}/shared/uploads ${target.destination}/craft/web`,
);

remote.exec(`sudo chmod -R 777 ${target.destination}/shared/uploads`);

// Manage Old Assets

remote.exec(
  `if [ -h ${target.destination}/craft/web/sites ]; then sudo unlink ${target.destination}/craft/web/sites; fi`,
);

remote.exec(
  `sudo ln -s ${target.destination}/shared/sites ${target.destination}/craft/web`,
);

remote.exec(`sudo chmod -R 777 ${target.destination}/shared/sites`);

remote.exec(
  `if [ -h ${target.destination}/craft/config/project ]; then sudo chmod -R 777 ${target.destination}/craft/config/project; fi`,
);

remote.exec(`${target.destination}/craft/craft up --interactive 0`);
remote.exec(`${target.destination}/craft/craft clear-caches/all`);
