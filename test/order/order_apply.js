const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/order/order_search')
const { order_searchPage } = require('../../page/orderPage/order_searchPage')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')
const { order_registrationPage } = require('../../page/orderPage/order_registrationPage')
const { chromium } = require('playwright')
const constn = new Constant()
const base = new BasePage()
const locator = new Locator()
const assert = require('assert')


describe('V2_CREO_APL: 発注登録 / Order registration : order/order_registration.js', async () => {
    const order_search = new order_searchPage()

    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 100
        })
        page = await browser.newPage({ ignoreHTTPSErrors: true })
        await page.setViewportSize({ width: 1920, height: 1080 })
        await order_registration.login_pass()
    })
    //=============Check display Order search screen===========================
    it('TC120: Check display Order search screen', async () => {
        await order_searchPage.click_order_registration()
        let display = await order_registration.display_order_registration()
        if (display) {
            await console.log("Display correct order registration screen : PASSED")
        }
    })
    
    afterEach(async () => {
         await page.close()
    })
})