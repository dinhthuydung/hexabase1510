const { Constant } = require('../../constant/constant')
const { ListedPage } = require('../../page/loginPage/listedDataPage')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/login/locator')
const base = new BasePage()
const { chromium } = require('playwright')
const { assert } = require('chai')
const constn = new Constant()

describe('CREO_APL_Flow: test/login/dataListed.js', async () => {

    const listedData = new ListedPage()
    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 100
        })
        page = await browser.newPage({ ignoreHTTPSErrors: true })
        await page.setViewportSize({ width: 1920, height: 1080 })
        await listedData.navigate()

    })
    //=================Check data is listed================================
    it('Check listed data in  ポータル', async function () {
        await listedData.login_success()
        let display_require_order = await listedData.check_display_require_order()
        let display_order = await listedData.check_display_order()
        let display_delivery = await listedData.check_display_delivery()
        let display_payment = await listedData.check_display_payment()
        let require_order = await assert.strictEqual(display_require_order, true, "========Not display list data in ポータル/購買要件========")
        if (display_require_order) {
            await console.log("========List data is display in ポータル/購買要件======")
        }
        let order = await assert.strictEqual(display_order, true, "========Not display list data in ポータル/発注========")
        if (display_order) {
            await console.log("========List data is display in ポータル/発注========")
        }
        let delivery = await assert.strictEqual(display_delivery, true, "========Not display list data in ポータル/納品・検収========")
        if (display_delivery) {
            await console.log("========List data is display in ポータル/納品・検収========")
        }
        let payment = await assert.strictEqual(display_payment, true, "========Not display list data in ポータル/支払========")
        if (display_payment) {
            await console.log("========List data is display in ポータル/支払========")
        }

    })

    it('Check listed data in お知らせ  ', async () => {
        await listedData.login_success()
        let display_require_order = await listedData.check_display_base_list()
        let result = assert.strictEqual(display_require_order, true, "========Not display list data======== ")
        if (result) {
            await display_require_order.log("========List data is display in お知らせ ========")
        }
    })
    it('Check correct number in 発注/require_order', async () => {
        const locate = new Locator()
        await listedData.login_success()
        await page.waitForSelector(locate.record)
        const order = await page.$$(locate.record)
        order.forEach(async (index) => {
            index = await index.textContent(locate.record)
            await console.log(index)
            await console.log("=========")
            // await index.click(locate.record)
            // await listedData.click_order('.status-panel__link')
            //let content = await page.textContent('.content__text pager-info')
            //assert.include(text, content)
            //let resutl = content.substring(2, 5)
            // assert.strictEqual(text,content)
            //await console.log(content)

        })

    })
    afterEach(async () => {
        await page.close()
    })
})

