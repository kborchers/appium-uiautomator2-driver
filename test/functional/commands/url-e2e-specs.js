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
    await startServer();
    driver = await wd.promiseChainRemote('localhost', 4884);
    caps.browserName = 'Chrome';
    await driver.init(caps);
  });

  it('should be able to start a data uri via setUrl', async function () {
    if (caps.browserName === 'Chrome') {
      try {
        // on some chrome systems, we always get the terms and conditions page
        let btn = await driver.elementById('id', 'com.android.chrome:id/terms_accept');
        await btn.click();

        btn = await driver.elementById('id', 'com.android.chrome:id/negative_button');
        await btn.click();
      } catch (ign) {}
    }

    await driver.get('http://saucelabs.com');

    await driver.waitForElementByTagName("title");
    let el = await driver.elementByTagName("title");
    await el.getAttribute("innerHTML").should.eventually.include('Sauce Labs');
  });
});
