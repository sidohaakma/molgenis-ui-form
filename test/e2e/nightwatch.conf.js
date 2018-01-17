require('babel-register')
var config = require('../../config')
var packageJson = require('../../package.json');

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_assertions_path: ['test/e2e/custom-assertions'],

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path,
      'webdriver.firefox.driver': require('geckodriver').path
    }
  },

  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      globals: {
        devServerURL: 'http://localhost:' + (process.env.PORT || config.dev.port)
      }
    },

    ci: {
      launch_url: "http://ondemand.saucelabs.com:80",
      selenium_port: 80,
      selenium_host: 'ondemand.saucelabs.com',
      silent: true,
      username: process.env.SAUCE_USERNAME,
      access_key: process.env.SAUCE_ACCESS_KEY,
      desiredCapabilities: {
        name: packageJson.name,
        build: 'build-${TRAVIS_JOB_NUMBER}',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
      },
      globals: {
        waitForConditionTimeout: 10000
      },

      chrome56: {
        desiredCapabilities: {
          browserName: 'chrome',
          platform: 'Windows 10',
          version: '56.0',
          javascriptEnabled: true,
          acceptSslCerts: true
        }
      },

      ie11: {
        integration: true,
        desiredCapabilities: {
          browserName: 'internet explorer',
          platform: 'Windows 10',
          version: '11.103',
          javascriptEnabled: true,
          acceptSslCerts: true
        }
      },

      firefox51: {
        integration: true,
        desiredCapabilities: {
          browserName: 'firefox',
          platform: 'Windows 10',
          version: '51.0',
          javascriptEnabled: true,
          acceptSslCerts: true
        }
      },

      safari10: {
        integration: true,
        desiredCapabilities: {
          browserName: 'safari',
          platform: 'OS X 10.11',
          version: '10.0',
          javascriptEnabled: true,
          acceptSslCerts: true
        }
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    safari: {
      desiredCapabilities: {
        browserName: 'safari',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
}
