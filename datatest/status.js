const { Constant } = require('../constant/constant')
const { BasePage } = require('../page/basepage')
const { Locator } = require('../locator/login/locator')
const { statusPage } = require('../datatest/statusPage')
const { chromium } = require('playwright')
const constn = new Constant()
const base = new BasePage()
const locate = new Locator()
const assert = require('assert')
const data_driven = require('data-driven')


describe('Create records', async () => {
    const status = new statusPage()
    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 100
        });
        page = await browser.newPage({ ignoreHTTPSErrors: true })
        await page.goto(constn.URL)
        await page.fill(locate.email, constn.email_n1)
        await page.fill(locate.password, constn.password)
        await page.click(locate.loginButton)
        for (let i = 1; i < 10; i++) {
            await status.search_status_購買要件作成中()
            await status.click_apply()
        }
    });
    //=============Check display Approve quote request screen==========================================
    it.only('Create records have status is :購買見積依頼申請済', async () => {
       
    })
    afterEach(async () => {
        //await page.close()
    })
})