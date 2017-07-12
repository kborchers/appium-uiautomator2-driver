import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { BROWSER_CAPS } from '../desired';
import { startServer } from '../../..';
import wd from 'wd';


chai.should();
chai.use(chaiAsPromised);

let driver;
let caps = Object.assign({}, BROWSER_CAPS);

describe('setUrl @skip-ci', function () {
  before(async function () {
<<<<<<< HEAD
    await startServer();
    driver = await wd.promiseChainRemote('localhost', 4884);
    caps.browserName = 'Chrome';
    await driver.init(caps);
=======
    let adb = new ADB();
    if (!await adb.isAppInstalled('com.android.browser')) {
      if (!await adb.isAppInstalled('com.android.chrome')) {
        throw new Error('Neither default browser nor chrome available');
      }
      // `browser` is not available, so use `Chrome`
      caps.browserName = 'Chrome';
      urlId = 'com.android.chrome:id/url_bar';
    }

    driver = await initDriver(caps);
    await driver.implicitWait(5000);
  });
  after(async () => {
    if (driver) {
      await driver.quit();
    }
>>>>>>> Refactor e2e-specs to use admc/wd
  });

  it('should be able to start a data uri via setUrl', async function () {
    if (caps.browserName === 'Chrome') {
      try {
        // on some chrome systems, we always get the terms and conditions page
<<<<<<< HEAD
        let btn = await driver.elementById('id', 'com.android.chrome:id/terms_accept');
        await btn.click();

        btn = await driver.elementById('id', 'com.android.chrome:id/negative_button');
=======
        let btn = await driver.elementById('com.android.chrome:id/terms_accept');
        await btn.click();

        btn = await driver.elementById('com.android.chrome:id/negative_button');
>>>>>>> Refactor e2e-specs to use admc/wd
        await btn.click();
      } catch (ign) {}
    }

    await driver.get('http://saucelabs.com');

<<<<<<< HEAD
    await driver.waitForElementByTagName("title");
    let el = await driver.elementByTagName("title");
    await el.getAttribute("innerHTML").should.eventually.include('Sauce Labs');
=======
    await driver.waitForElementById(urlId);
    let el = await driver.elementById(urlId);
    await el.text().should.eventually.include('saucelabs.com');
>>>>>>> Refactor e2e-specs to use admc/wd
  });
});
