const { purchase_search_modifyPage } = require('../page/purchasePage/purchase_search_modifyPage')
const { Locator } = require('../datatest/locator')
const { BasePage } = require('../page/basepage')
const assert = require('assert')
const purchase_modify = new purchase_search_modifyPage()
const locator = new Locator()
const base = new BasePage()
class statusPage {
    statusPage() { }
    async search_status_購買要件作成中() {
        return purchase_modify.filter_status(locator.status_2)
    }
    async click_apply() {
        let enable = await base.is_enable(locator.apply_button)
        await assert.strictEqual(enable, true, "Apply button is not enable to click ")
        if (enable == true) {
            await base.click_element(locator.apply_button)
            let enable_execute = await base.is_enable(locator.execute_button)
            await assert.strictEqual(enable_execute, true, "Execute button is not enable to click ")
            if (enable_execute == true) {
                await base.click_element(locator.execute_button)
                await base.click_element(locator.close_button)
            }
        }
    }
}
module.exports = { statusPage }