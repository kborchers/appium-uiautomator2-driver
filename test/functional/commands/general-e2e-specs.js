import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { APIDEMOS_CAPS } from '../desired';
import { initDriver } from '../helpers/session';


chai.should();
chai.use(chaiAsPromised);

describe('general', function () {
  describe('startActivity', function () {
    let driver;
    before(async () => {
      driver = await initDriver(APIDEMOS_CAPS);
    });
    after(async () => {
      await driver.quit();
    });

  describe('startActivity', function () {
    it('should launch a new package and activity', async () => {
      await driver.getCurrentPackage().should.eventually.equal('io.appium.android.apis');
      await driver.getCurrentActivity().should.eventually.equal('.ApiDemos');

      let startAppPackage = 'io.appium.android.apis';
      let startAppActivity = '.view.SplitTouchView';

      await driver.startActivity({appPackage: startAppPackage, appActivity: startAppActivity});

      let newAppPackage = await driver.getCurrentPackage();
      let newAppActivity = await driver.getCurrentActivity();
      newAppPackage.should.equal(startAppPackage);
      newAppActivity.should.equal(startAppActivity);
    });
    it('should be able to launch activity with custom intent parameter category', async () => {
      let startAppPackage = 'io.appium.android.apis';
      let startAppActivity = 'io.appium.android.apis.app.HelloWorld';
      let startIntentCategory = 'appium.android.intent.category.SAMPLE_CODE';

      await driver.startActivity({appPackage: startAppPackage, appActivity: startAppActivity, intentCategory: startIntentCategory});

      let appActivity = await driver.getCurrentActivity();
      appActivity.should.include('HelloWorld');
    });
    it('should be able to launch activity with dontStopAppOnReset = true', async () => {
      let startAppPackage = 'io.appium.android.apis';
      let startAppActivity = '.os.MorseCode';
      await driver.startActivity({appPackage: startAppPackage, appActivity: startAppActivity});

      let appPackage = await driver.getCurrentPackage().should.eventually.equal('io.appium.android.apis');
      let appActivity = await driver.getCurrentActivity().should.eventually.equal('.os.MorseCode');
      appPackage.should.equal(startAppPackage);
      appActivity.should.equal(startAppActivity);
    });
    it('should be able to launch activity with dontStopAppOnReset = false', async () => {
      let startAppPackage = 'io.appium.android.apis';
      let startAppActivity = '.os.MorseCode';
      await driver.startActivity({appPackage: startAppPackage, appActivity: startAppActivity});

      let appPackage = await driver.getCurrentPackage().should.eventually.equal('io.appium.android.apis');
      let appActivity = await driver.getCurrentActivity().should.eventually.equal('.os.MorseCode');
      appPackage.should.equal(startAppPackage);
      appActivity.should.equal(startAppActivity);
    });
  });
<<<<<<< HEAD
  describe('getStrings', function () {
    it('should return app strings', async () => {
      let strings = await driver.getStrings('en');
      strings.activity_sample_code.should.equal('API Demos');
    });
    it('should return app strings for the device language', async () => {
      let strings = await driver.getStrings();
      strings.activity_sample_code.should.equal('API Demos');
=======
  describe('getAppStrings', function () {
    let driver;
    before(async () => {
      driver = await initDriver(CONTACT_MANAGER_CAPS);
    });
    after(async () => {
      await driver.quit();
    });

    it('should return app strings', async () => {
      let strings = await driver.getAppStrings('en');
      strings.save.should.equal('Save');
    });
    it('should return app strings for the device language', async () => {
      let strings = await driver.getAppStrings();
      strings.save.should.equal('Save');
>>>>>>> Refactor e2e-specs to use admc/wd
    });
  });
});
