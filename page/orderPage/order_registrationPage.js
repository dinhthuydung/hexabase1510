const { Locator } = require('../../locator/order/order_registration.js')
const { Constant } = require('../../constant/constant')
const { BasePage } = require('../basepage')
const { WorkSpace } = require('../loginPage/workspacePage')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')
const base = new BasePage()
const locator = new Locator()
const constn = new Constant()
const workspace = new WorkSpace()
const purchase_modify = new purchase_search_modifyPage()
const playwright = require('playwright')
const assert = require('assert')

class order_registrationPage extends WorkSpace {
    order_registrationPage() { }
    async login_pass() {
        workspace.login_pass(constn.email_p1)
    }
    async click_order_registration() {
        await base.click_element(locator.order_menu)
        return await base.click_element(locator.order_registration, "[発注登録] order registration in menu")
    }
    async display_order_registration() {
        return base.check_display_element(locator.order_registration_screen)
    }
    //仕入先担当
    async check_disable_supplier_charge() {
        return base.is_disable(locator.supplier_charge)
    }
    //get [仕入先]
    async click_get_supplier() {
        let display = await base.check_display_element(locator.get_supplier, "Button [取得] of [仕入先]")
        if (display) {
            return base.click_element(locator.get_supplier, "Button [取得] of [仕入先]")
        }
    }
    //Pop up [仕入先選択]
    async display_supplier_selection() {
        return base.check_display_element(locator.supplier_selection, " Popup [仕入先選択] ")
    }
    //close popup [仕入先選択]
    async close_supplier_selection() {
        let display = base.check_display_element(locator.close_supplier_selection, "Close button of [仕入先選択]")
        if (display) {
            return base.click_element(locator.close_supplier_selection, "Close button of [仕入先選択]")
        }
    }
    async visible_supplier_selection() {
        return await page.isVisible(locator.supplier_selection)
    }
    // Select random value in popup [仕入先選択]
    async select_supplier_selection() {
        let select_random_value = await page.$$(locator.value_supplier_selection)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }
    //仕入先担当
    async enable_supplier_charge() {
        return base.is_enable(locator.supplier_charge)
    }
    //支払情報
    async check_display_payment_information() {
        return base.is_disable(locator.payment_information)
    }
    //Popup [支払先選択]
    async click_get_payment() {
        let display = await base.check_display_element(locator.get_payment, "[取得] button of [支払先]")
        if (display) {
            return base.click_element(locator.get_payment, "[取得] button of [支払先]")
        }
    }
    //Popup [支払先選択]
    async display_payee_selection() {
        return base.check_display_element(locator.payee_selection, "Popup [支払先選択]")
    }
    //close popup [支払先選択]
    async close_payee_selection() {
        let display = base.check_display_element(locator.close_payee_selection, "Close button of [支払先選択]")
        if (display) {
            return base.click_element(locator.close_payee_selection, "Close button of [支払先選択]")
        }
    }
    async visible_payee_selection() {
        return await page.isVisible(locator.payee_selection)
    }

    // Select random value in popup [支払先選択]
    async select_payee_selection() {
        let select_random_value = await page.$$(locator.value_payee_selection)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }
    //仕入先担当
    async enable_payment_information() {
        return base.is_enable(locator.payment_information)
    }


    //規格
    async disable_specification() {
        return base.is_disable(locator.specification)
    }
    //発注数量
    async disable_order_quality() {
        return base.is_disable(locator.order_quality)
    }
    //単位
    async disable_unit() {
        return base.is_disable(locator.unit)
    }
    //単価
    async disable_unit_price() {
        return base.is_disable(locator.unit_price)
    }
    //金額
    async disable_amount() {
        return base.is_disable(locator.amount)
    }
    //消費税
    async disable_sale_tax() {
        return base.is_disable(locator.sale_tax)
    }
    //課税区分
    async disable_tax_classification() {
        return base.is_disable(locator.tax_classification)
    }

    //get button of [品目]
    async click_get_item() {
        let display = await base.check_display_element(locator.get_item1, "Get button of [品目]")
        if (display) {
            return base.click_element(locator.get_item1, "Get button of [品目]")
        }
    }
    //Popup[品目選択]
    async display_item_selection() {
        return base.check_display_element(locator.item_selection, "Popup [品目選択]")
    }
    //Close button of [品目選択]
    async close_item_selection() {
        return base.click_element(locator.close_item_popup)
    }
    async visible_item_selection() {
        return await page.isVisible(locator.item_selection)
    }
    //select value of [品目]
    async select_value_item() {
        await this.click_get_item()
        await base.click_element(locator.search_item_selection, "[ 検索 ] button of [品目選択] popup")
        let select_random_value = await page.$$(locator.is_listed_selection)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }


    //規格
    async enable_specification() {
        return base.is_enable(locator.specification)
    }
    //発注数量
    async enable_order_quality() {
        return base.is_enable(locator.order_quality)
    }
    //単位
    async enable_unit() {
        return base.is_enable(locator.unit)
    }
    //単価
    async enable_unit_price() {
        return base.is_enable(locator.unit_price)
    }
    //金額
    async enable_amount() {
        return base.is_enable(locator.amount)
    }
    //消費税
    async enable_sale_tax() {
        return base.is_enable(locator.sale_tax)
    }
    //課税区分
    async enable_tax_classification() {
        return base.is_enable(locator.tax_classification)
    }
    //発注申請日
    async order_application() {
        await base.click_element(locator.order_application, " [発注申請日]  ")
        await base.click_element(locator.select_order_application, " [発注申請日] date ")
    }
    //申請者部門
    async get_applicant_department() {
        await base.click_element(locator.get_appicant_department, "get applicant department button of [申請者部門]")
        let select_random_value = await page.$$(locator.value_applicant_department)
        //await console.log(select_random_value.length)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }
    //申請者
    async get_applicant() {
        await base.click_element(locator.get_applicant, "get applicant button of [申請者]")
        let select_random_value = await page.$$(locator.value_applicant)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }
    //使用部門
    async get_user_department() {
        await base.click_element(locator.get_user_department, "get button of [使用部門]")
        let select_random_value = await page.$$(locator.value_user_department)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }
    //使用設備
    async use_equipment() {
        await base.click_element(locator.get_use_equipment, "get button of [使用設備]")
        let select_random_value = await page.$$(locator.value_user_equipment)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }
    //納入希望日
    async desired_delivery() {
        await base.click_element(locator.desired_delivery, " [納入希望日]  ")
        await base.click_element(locator.select_desired_delivery, " [納入希望日] date ")
    }
    //仕入先
    async supplier() {
        await base.click_element(locator.get_supplier, "get button of [仕入先]")
        let select_random_value = await page.$$(locator.value_supplier)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }
    //仕入先担当
    async supplier_charge() {
        await base.click_element(locator.supplier_charge, "[仕入先担当] fields")
        let select_random_value = await page.$$(locator.value_supplier_charge)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }
    //支払情報
    async payment_information() {
        await base.click_element(locator.payment_information, "[支払情報] fields")
        let select_random_value = await page.$$(locator.value_payment_information)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }
    //発注予定日
    async scheduled_order_date() {
        await base.click_element(locator.scheduled_order_date, " [支払情報]  ")
        await base.click_element(locator.value_scheduled_order_date, " [支払情報] date ")
    }
    //発注数量
    async input_order_quantity() {
        let value = Math.floor(Math.random() * 10);
        await page.type(locator.order_quality, value.toString())
    }
    //単位
    async input_unit() {
        await base.click_element(locator.unit, "get unit")
        let select_random_value = await page.$$(locator.value_unit)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }
    // 登録する 
    async click_order_register() {
        return base.click_element(locator.order_register, "[登録する] button ")
    }
    // 発注詳細画面へ 
    async click_goto_edit() {
        return base.click_element(locator.goto_edit, "[ 発注詳細画面へ ] button ")
    }
    //Check status 
    async register_success() {
        let stt = await base.getText_element(locator.status)
        return stt
    }
    //value of [単価]
    async value_fee() {
        return base.get_value(locator.fee)
    }
    //value [発注数量]
    async value_order_quality() {
        return base.get_value(locator.order_quality)
    }
    //value [単価]
    async value_unit_price() {
        return base.get_value(locator.unit_price)
    }
    //value [消費税額]
    async value_consumption_tax() {
        return base.get_value(locator.consumption_tax)
    }
    //value [消費税]
    async value_sale_tax() {
        return base.get_value(locator.sale_tax)
    }

}
module.exports = { order_registrationPage }