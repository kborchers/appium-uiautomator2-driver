import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { APIDEMOS_CAPS } from '../desired';
import { initDriver } from '../helpers/session';


chai.should();
chai.use(chaiAsPromised);

describe('apidemo - touch', function () {
  describe('multi-actions', function () {
    let driver;
    before(async () => {
      driver = await initDriver(Object.assign({}, APIDEMOS_CAPS, {
        appPackage: 'io.appium.android.apis',
        appActivity: '.view.SplitTouchView',
      }));
    });
    after(async () => {
      await driver.quit();
    });

    it('should scroll two different lists', async () => {
      let [leftList, rightList] = await driver.elementsByClassName('android.widget.ListView');

      let leftGestures = [
        {action: 'press', options: {element: leftList}},
        {action: 'moveTo', options: {element: leftList, x: 10, y: 0}},
        {action: 'moveTo', options: {element: leftList, x: 10, y: -75}},
        {action: 'moveTo', options: {element: leftList, x: 10, y: -150}}
      ];
      let rightGestures = [
        {action: 'press', options: {element: rightList}},
        {action: 'moveTo', options: {element: rightList, x: 10, y: 0}},
        {action: 'moveTo', options: {element: rightList, x: 10, y: -75}},
        {action: 'moveTo', options: {element: rightList, x: 10, y: -150}}
      ];
      await driver.performMultiAction([leftGestures, rightGestures]);
    });
  });

  describe('swipe-action', function () {
    let driver;
    before(async () => {
      driver = await initDriver(Object.assign({}, APIDEMOS_CAPS, {
        appPackage: 'io.appium.android.apis',
        appActivity: '.view.List1',
      }));
    });
    after(async () => {
      await driver.quit();
    });

    async function assertElement (driver, present = true) {
      let els = await driver.elementsByXPath("//*[@text='Abertam']");
      els.should.be.an.instanceof(Array);
      els.should.have.length(present ? 1 : 0);
    }

    it('should swipe', async () => {
      await assertElement(driver, true);
      await driver.swipe(100, 650, 100, 330, 1);
      await assertElement(driver, false);
    });
  });
});
