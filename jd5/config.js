const
    argv = require('minimist')(process.argv.slice(2)),
    log = require('./log'),
    os = require('os'),
    fs = require('fs'),
    path = require('path');
let config = {
    CONFIG_FILE: path.resolve(os.homedir(), '.config', 'jd5', 'config.yaml'),
    LANGS_FILE: path.resolve(os.homedir(), '.config', 'jd5', 'langs.yaml'),
    CACHE_DIR: path.resolve(os.homedir(), '.cache', 'jd5'),
    SYSTEM_MEMORY_LIMIT_MB: 1024,
    SYSTEM_TIME_LIMIT_MS: 16000,
    SYSTEM_PROCESS_LIMIT: 32,
    RETRY_DELAY_SEC: 15,
    SANDBOX_ROOT: path.resolve(os.tmpdir(), 'jd5'),
    SANDBOX_POOL_COUNT: 2,
    TEMP_DIR: path.resolve(os.tmpdir(), 'jd5', 'tmp'),
    CGROUP: 'jd5'
};
if (argv.config) config.CONFIG_FILE = path.resolve(argv.config);
if (argv.langs) config.LANGS_FILE = path.resolve(argv.langs);
if (argv.tmp) config.TMP_DIR = path.resolve(argv.tmp);
if (argv.root) config.SANDBOX_ROOT = path.resolve(argv.root);
if (!config.CONFIG_FILE) {
    log.error('Config file not found.');
    process.exit(1);
}
if (!config.LANGS_FILE) {
    config.LANGS_FILE = path.resolve(config.CONFIG_DIR[0], 'langs.yaml');
    log.error('Language file not found, using default.');
    if (!fs.existsSync(path.resolve(os.homedir(), '.config', 'jd5')))
        fs.mkdirSync(path.resolve(os.homedir(), '.config', 'jd5'), { recursive: true });
    fs.copyFileSync(path.resolve(__dirname, '..', 'examples', 'langs.yaml'), config.LANGS_FILE);
}

module.exports = config;