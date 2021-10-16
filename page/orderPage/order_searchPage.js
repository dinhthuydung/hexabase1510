const { Locator } = require('../../locator/order/order_search.js')
const { Constant } = require('../../constant/constant')
const { BasePage } = require('../basepage')
const { WorkSpace } = require('../loginPage/workspacePage')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')
const { order_registrationPage } =  require('../../page/orderPage/order_registrationPage')
const base = new BasePage()
const locator = new Locator()
const constn = new Constant()
const workspace = new WorkSpace()
const purchase_modify = new purchase_search_modifyPage()
const order_registration = new order_registrationPage()
const playwright = require('playwright')
const assert = require('assert')

class order_searchPage extends WorkSpace {
    order_searchPage() { }
    async login_pass() {
        workspace.login_pass(constn.email_p1)
    }

    async login_pass_with_p2_email(){
        workspace.login_pass(constn.email_p2)
    }

    async login_pass_with_p3_email(){
        workspace.login_pass(constn.email_p3)
    }

    async click_order_search() {
        base.click_element(locator.order_menu)
        return base.click_element(locator.order_search, "[発注検索] order registration in menu")
    }
    async display_order_search_title(){
        return base.getText_element(locator.order_search_title)
    }

    async click_search(element){
        await base.click_element(locator.status_button, " Dropdown status [ステータス]")//click dropdown
        await base.click_element(element,"Status")// select status
        await base.click_element(locator.search_button,"Search button [ 検索 ]")// click search button
    }

    async filter_status(locator_status){
        await this.click_order_search() // click order search in menu
        await this.click_search(locator_status)
        await base.click_random_element(locator.detail_button)
    }

    async display_order_detail_title(){
        return base.getText_element(locator.order_detail_title)
    }
    async enable_modify_button(){
        return base.is_enable(locator.modify_button)
    }
    async click_modify_button(){
        return base.click_element(locator.modify_button,"[修正する] button")
    }
    async get_supplier (){
        await base.click_element(locator.supplier_get_button, " [仕入先] button")
        let select_random_value = await page.$$(locator.value_supplier_selection)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
        return select_random_value[random_field].textContent()
         
    }
    async getText_supplier1 (){
        return base.get_value(locator.text_supplier1)
    }
    async getText_supplier2 (){
        return base.get_value(locator.text_supplier2)
    }
    async value_supplier(){
        let value1 = await this.getText_supplier1()
        let value2 = await this.getText_supplier2()
        let text = value1+value2
        return text
    }
    async value_supplier_charge(){
        return base.get_value(locator.supplier_charge) 
    }
    async value_payment_destination(){
        return base.get_value(locator.payment_destination) 
    }
    async modify_supplier(){
        return await this.get_supplier() 
    }

    async click_run_button(){
        await base.click_element(locator.run_button)
    }

    async check_disable_run_button(){
        return base.check_display_element(locator.disable_run_button)
    }
    

}
module.exports = { order_searchPage }