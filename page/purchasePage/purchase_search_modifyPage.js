const { Locator } = require('../../locator/purchase/purchase_search')
const { Constant } = require('../../constant/constant')
const { BasePage } = require('../basepage')
const { WorkSpace } = require('../loginPage/workspacePage')
const base = new BasePage()
const locator = new Locator()
const constn = new Constant()
const workspace = new WorkSpace()
const playwright = require('playwright')
const assert = require('assert')
class purchase_search_modifyPage extends WorkSpace {
    purchase_searchPage() { }
    async login_pass() {
        workspace.login_pass(constn.email_n1)
    }
    async click_purchase_search() {
        return base.click_element(locator.purchase_search,"[購買要件検索] in menu")
    }
    async display_purchase_search() {
        return base.check_display_element(locator.purchase_search_title)
    }
    async click_search_button() {
        return base.click_element(locator.search_button, "Search button [ 検索 ] ")
    }
    async display_data_listed() {
        return base.check_display_element(locator.detail_button_1)
    }
    async search_purchasing_requirements_are_being_prepared() {
        await base.click_element(locator.status_button, " Status filter [ステータス]")
        await base.click_element(locator.status_prepared,"status [購買要件作成中]")
        await base.click_element(locator.search_button,"Search button [ 検索 ]")
    }

    async detail_screen() {
        await this.click_purchase_search()
        await this.search_purchasing_requirements_are_being_prepared()
        await base.click_random_element(locator.detail_button)
    }
    async click_search(element){
        await base.click_element(locator.status_button, " Dropdown status [ステータス]")//click dropdown
        await base.click_element(element,"Status")// select status
        await base.click_element(locator.search_button,"Search button [ 検索 ]")// click search button
    }
    async filter_status(locator_status){
        await this.click_purchase_search()// click purchase search in menu
        await this.click_search(locator_status)
        await base.click_random_element(locator.detail_button)
    }
    async click_modify_button() {
        return base.click_element(locator.modify_button, " [ 修正する ]  button ")
    }
    async enable_modify_button() {
        return await base.is_enable(locator.modify_button)
    }
    //見積依頼先
    async value_request_quotation() {
        let value_request_quotation = await base.get_value(locator.value_request_quotation)
        return value_request_quotation
    }
    //支払先
    async value_payment_destination() {
        let value_request_quotation = await base.get_value(locator.value_payment_destination)
        return value_request_quotation
    }
    //実行する
    async enable_excute_modify_button() {
        return base.is_enable(locator.excute_modify_button)
    }
    async click_excute_modify_button() {
        return page.click(locator.excute_modify_button)
    }
    async display_confirm_popup() {
        return base.check_display_element(locator.confirm_execute_modify_popup)
    }
    async enable_close_item_selection_button() {
        return base.is_enable(locator.close_item_selection)
    }
    async click_close_item_selection() {
        return base.click_element(locator.close_item_selection)
    }
    // button  [閉じる] of 処理実行
    async enable_close_process(){
        return base.is_enable(locator.close_process)
    }
    async click_close_process(){
        return base.click_element(locator.close_process)
    }
    async disable_fields(){
        return base.is_disable(locator.disable_fields)
    }
    //enable Applicant department
    async enable_application_department(){
        return base.is_enable(locator.applicant_department)
    }
    //使用部門 message required
    async check_mess_required(){
        let display = await base.check_display_element(locator.mess_required, "Message required of [使用部門]")
        if(display==true){
            return base.getText_element(locator.mess_required)
        }
    }
}
module.exports = { purchase_search_modifyPage }