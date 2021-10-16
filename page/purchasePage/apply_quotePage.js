const { Locator } = require('../../locator/purchase/apply_quote.js')
const { Constant } = require('../../constant/constant')
const { BasePage } = require('../basepage')
const { WorkSpace } = require('../loginPage/workspacePage')
const {purchase_search_modifyPage} = require('../../page/purchasePage/purchase_search_modifyPage')
const base = new BasePage()
const locator = new Locator()
const constn = new Constant()
const workspace = new WorkSpace()
const purchase_modify = new purchase_search_modifyPage()
const playwright = require('playwright')
const assert = require('assert')

class apply_quotePage extends WorkSpace {
    apply_quotePage() {}
    async login_pass() {
        workspace.login_pass(constn.email_n1)
    }
    async detail_screen(){
        return purchase_modify.filter_status(locator.status_registed)
    }
    async click_apply(){    
        let enable = await this.display_apply_button()
        if (enable){
            return base.click_element(locator.apply_button,"[ 購買発注依頼申請をする] button")
        }       
    } 
    async enable_apply_button(){
        return base.is_enable(locator.apply_button)
    }
    async display_apply_button(){
        return base.check_display_element(locator.apply_button,"[ 購買発注依頼申請をする] button")
    }
    async enable_execute_button(){
        return base.is_enable(locator.execute_button)
    }
    
    async click_execute_button(){
        let isEnable = await this.enable_execute_button()
        await assert.strictEqual(isEnable, true, "Execute button is not enable: FAILED")
        if(isEnable==true){
           return base.click_element(locator.execute_button,"execute button")
        }     
    }
    async display_confirm_popup(){
        return base.check_display_element(locator.popup_confirm, "confirm popup ")
    }
    async click_close_button(){
        return base.click_element(locator.close_popup_button," close popup button")
    }
    async check_status(){
        let status = await base.getText_element(locator.status)
        return status
    }
}
module.exports = { apply_quotePage }