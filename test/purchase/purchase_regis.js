const { Constant } = require('../../constant/constant.js')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/purchase/purchase_register')
const { purchase_regisPage } = require('../../page/purchasePage/purchase_regisPage')
const { chromium } = require('playwright')
const constn = new Constant()
const base = new BasePage()
const locator = new Locator()

const assert = require('assert')


describe('V2_CREO_APL : 購買要件登録/Purchasing requirement registration : purchase/purchase_regis.js', async () => {
    const purchase_register = new purchase_regisPage()
    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 100
        })
        page = await browser.newPage({ ignoreHTTPSErrors: true })
        await purchase_register.login_pass()
        await page.setViewportSize({ width: 1920, height: 1080 })


    })
    //============= Check display purchase requirement registration screen=============================
    it('TC1:Purchase requirement registration', async () => {
        await purchase_register.click_purchase_register()
        let result = await purchase_register.check_display_screen_requirement_registration()
        if (result) {
            await console.log("Purchase register screen display correct: PASSED")
        }

    })
    //
    //============= Check mandatory fields registration screen=============================
    it('TC3_1: Check mandatory fields registration', async () => {
        await purchase_register.click_purchase_register()
        let applicant_department = await purchase_register.message_applicant_department()
        let applicant = await purchase_register.message_applicant()
        let scheduled_order_date = await purchase_register.message_scheduled_order_date()
        await assert.strictEqual(applicant_department, constn.mess_applicant_department, "Message check mandatory [申請者部門] display wrong : FAILED")
        await assert.strictEqual(applicant, constn.mess_applicant, "Message check mandatory [申請者] display wrong : FAILED")
        await assert.strictEqual(scheduled_order_date, constn.mess_scheduled_order_date, "Message check mandatory [発注予定日] display wrong : FAILED")
        if (applicant_department = constn.mess_applicant_department) {
            await console.log("Message check mandatory [申請者部門] is correct : PASSED")
        }
        if (applicant = constn.mess_applicant) {
            await console.log("Message check mandatory [申請者] is correct : PASSED")
        }
        if (applicant = constn.mess_scheduled_order_date) {
            await console.log("Message check mandatory [発注予定日] is correct : PASSED")
        }
    })
    //============= Check mandatory fields registration screen=============================
    it('TC3_2: Check mandatory fields registration', async () => {
        await purchase_register.click_purchase_register()
        await purchase_register.click_get_item1()
        await purchase_register.click_search_item_selection()
        await purchase_register.select_item()
        let estimated_quantity = await purchase_register.message_estimated_quantity()
        let unit = await purchase_register.message_unit()
        await assert.strictEqual(estimated_quantity, constn.mess_estimated_quantity, "Message check mandatory [見積数量] display wrong : FAILED")
        await assert.strictEqual(unit, constn.mes_unit, "Message check mandatory [単位] display wrong : FAILED")
        if (estimated_quantity = constn.mess_estimated_quantity) {
            await console.log("Message check mandatory [見積数量] is correct : PASSED")
        }
        if (unit = constn.mes_unit) {
            await console.log("Message check mandatory [単位] is correct : PASSED")
        }

    })


    //============[見積依頼先担当] should be disabled when not input [見積依頼先]========================
    it('TC4: Check [見積依頼先担当] disable when not input [見積依頼先] ', async () => {
        await purchase_register.click_purchase_register()
        let result = await purchase_register.disable_charge_requesting()
        await assert.strictEqual(result, true, "[見積依頼先担当] is not disable: FAILED")
        if (result)
            await console.log("[見積依頼先担当] is disable when not input [見積依頼先] : PASSED")

    })

    //=============Popup [見積依頼先選択] should be dipslayed when click get button=====================
    it('TC5: Check display popup [見積依頼先選択]', async () => {
        await purchase_register.click_purchase_register()
        await purchase_register.click_get_request_quotation()
        let result = await purchase_register.display_request_quotation_popup()
        if (result) {
            await console.log("Display popup [見積依頼先選択] correctly: PASSED")
        }
    })
    //============Popup [見積依頼先選択] shouble be closed when click [ 閉じる ] button==================
    it('TC6: Close popup [見積依頼先選択]', async () => {
        await purchase_register.click_purchase_register()
        await purchase_register.click_get_request_quotation()
        await purchase_register.click_close_request_quotation()
        let result = await purchase_register.close_request_quotation()
        assert.strictEqual(result, false, "Error when click close pop up [見積依頼先選択]: FAILED")
        if (result == false) {
            await console.log("Close popup [見積依頼先選択] correctly: PASSED")
        }
    })
    //===============[見積依頼先担当] is enabled when input [見積依頼先]=================================
    it('TC7: [見積依頼先担当] is enabled when input [見積依頼先]', async () => {
        await purchase_register.click_purchase_register()
        await purchase_register.click_get_request_quotation()
        await purchase_register.select_random_value_department_popup()
        let isEnable = await purchase_register.enable_charge_requesting()
        assert.strictEqual(isEnable, true, "[見積依頼先担当] is not enable when input [見積依頼先] : FAILED")
        if (isEnable) {
            await console.log("[見積依頼先担当] is enable when input [見積依頼先] : PASSED ")
        }
    })
    //=============[支払情報] should be disabled when not input [支払先]================================
    it('TC8: Check [支払情報] will disable when not input [支払先]', async () => {
        await purchase_register.click_purchase_register()
        let isDisable = await purchase_register.disable_payment_information()
        await assert.strictEqual(isDisable, true, "[支払情報] is not disable: FAILED")
        if (isDisable)
            await console.log("[支払情報] is disable when not input [支払先] : PASSED")

    })
    //============Check display popup [支払先選択] when click get button================================
    it('TC9: Check display pop up [支払先選択]', async () => {
        await purchase_register.click_purchase_register()
        await purchase_register.click_get_payment_destination()
        let isDisplay = await purchase_register.display_payee_popup()
        if (isDisplay) {
            await console.log("Payee selection popup [支払先選択] is display: PASSED")
        }
    })
    //==============Close popup [支払先選択]============================================================
    it('TC10: Close popup [支払先選択]', async () => {
        await purchase_register.click_purchase_register()
        await purchase_register.click_get_payment_destination()
        await purchase_register.click_close_payee_popup()
        let rs = await purchase_register.close_payee_popup()
        assert.strictEqual(rs, false, "Error when click close pop up [支払先選択]: FAILED")
        if (rs == false) {// not visable
            await console.log("Close popup [支払先選択] correctly: PASSED")
        }
    })
    //=============== [支払情報] should be enabled when input [支払先]==================================
    it('TC11: Check [支払情報] enabled when input [支払先] ', async () => {
        await purchase_register.click_purchase_register()
        await purchase_register.click_get_payment_destination()
        await purchase_register.select_random_value_payee_popup()
        let isEnable = await purchase_register.enable_payement_information()
        assert.strictEqual(isEnable, true, "[支払情報] is not enable when input [支払先] : FAILED")
        if (isEnable) {
            await console.log("[支払情報] is enable when input [支払先] : PASSED ")
        }
    })
    //================[規格]should be disabled when not select item=====================================
    it('TC12: Check disabled [規格] when not select item', async () => {
        await purchase_register.click_purchase_register()
        await purchase_register.click_close_item_selection
        let specification = await purchase_register.disable_specification()
        let estimated_quantity = await purchase_register.disable_estimated_quantity()
        let unit = await purchase_register.disable_unit()
        let estimated_unit_price = await purchase_register.disable_estimated_unit_price()
        let estimated_amount = await purchase_register.disable_estimated_amount()
        let sale_tax = await purchase_register.disable_sale_tax()
        let tax_classification = await purchase_register.disable_tax_classification()
        await assert.strictEqual(specification, true, "[規格] is not disable when not input [品目]: FAILED")
        await assert.strictEqual(estimated_quantity, true, "[見積数量] is not disable when not input [品目]: FAILED")
        await assert.strictEqual(unit, true, "[単位] is not disable when not input [品目]: FAILED")
        await assert.strictEqual(estimated_unit_price, true, "[見積単価] is not disable when not input [品目]: FAILED")
        await assert.strictEqual(estimated_amount, true, "[見積金額] is not disable when not input [品目]: FAILED")
        await assert.strictEqual(sale_tax, true, "[消費税] is not disable when not input [品目]: FAILED")
        await assert.strictEqual(tax_classification, true, "[課税区分] is not disable when not input [品目]: FAILED")
        if (specification) {
            await console.log("[規格] is disable when not input [品目] : PASSED")
        }
        if (estimated_quantity) {
            await console.log("[見積数量] is disable when not input [品目] : PASSED")
        }
        if (unit) {
            await console.log("[単位] is disable when not input [品目] : PASSED")
        }
        if (estimated_unit_price) {
            await console.log("[見積単価] is disable when not input [品目] : PASSED")
        }
        if (estimated_amount) {
            await console.log("[見積金額] is disable when not input [品目] : PASSED")
        }
        if (sale_tax) {
            await console.log("[消費税] is disable when not input [品目] : PASSED")
        }
        if (tax_classification) {
            await console.log("[課税区分] is disable when not input [品目] : PASSED")
        }
    })
    //===============Display popup [品目選択] when click get item=======================================
    it('TC13: Check display popup [品目選択]', async () => {
        await purchase_register.click_purchase_register()
        await purchase_register.click_get_item1()
        let isDisplay = await purchase_register.display_item_selection()
        assert.strictEqual(isDisplay, true, "Item selection [品目選択] popup is not display : FAILED")
        if (isDisplay) {
            await console.log("Item selection [品目選択] popup is display : PASSED")
        }
    })
    //===============Close popup [品目選択]=============================================================
    it('TC14: Close popup [品目選択]', async () => {
        await purchase_register.click_purchase_register()
        await purchase_register.click_get_item1()
        let enable_close_button = await purchase_register.enable_close_item_selection_button()
        if (enable_close_button) {
            await purchase_register.click_close_item_selection()
            let isDisplay = await purchase_register.item_selection()
            assert.strictEqual(isDisplay, false, "Error when click close pop up [品目選択]: FAILED")
            if (isDisplay == false) {
                await console.log("Close popup [品目選択] correctly: PASSED")
            }
        }
    })
    //=============Data is listed when click serch button===============================================
    it('TC15:Check display result base on search condition at [品目選択]', async () => {
        await purchase_register.click_purchase_register()
        await purchase_register.click_get_item1()
        await purchase_register.click_search_item_selection()
        let isListed = await purchase_register.is_listed_selection()
        assert.strictEqual(isListed, true, "Data is not listed in item selection popup : FAILED")
        if (isListed) {
            await console.log("Data is listed in item selection popup : PASSED")
        }
    })

    //==============Enabled related fields when input [品目]=============================================
    it('TC16: Check enable related field [品目]', async () => {
        await purchase_register.click_purchase_register()
        await purchase_register.click_get_item1()
        await purchase_register.click_search_item_selection()
        await purchase_register.select_item()
        let specification = await purchase_register.enable_specification()
        let estimated_quantity = await purchase_register.enable_estimated_quantity()
        let unit = await purchase_register.enable_unit()
        let estimated_unit_price = await purchase_register.enable_estimated_unit_price()
        let estimated_amount = await purchase_register.enable_estimated_amount()
        let sale_tax = await purchase_register.enable_sale_tax()
        let tax_classification = await purchase_register.enable_tax_classification()
        await assert.strictEqual(specification, true, "[規格] is not enable when input [品目]: FAILED")
        await assert.strictEqual(estimated_quantity, true, "[見積数量] is not enable when input [品目]: FAILED")
        await assert.strictEqual(unit, true, "[単位] is not enable when input [品目]: FAILED")
        await assert.strictEqual(estimated_unit_price, true, "[見積単価] is not enable when input [品目]: FAILED")
        await assert.strictEqual(estimated_amount, true, "[見積金額] is not enable when input [品目]: FAILED")
        await assert.strictEqual(sale_tax, true, "[消費税] is not enable when input [品目]: FAILED")
        await assert.strictEqual(tax_classification, true, "[課税区分] is not enable when input [品目]: FAILED")
        if (specification) {
            await console.log("[規格] is enable when input [品目] : PASSED")
        }
        if (estimated_quantity) {
            await console.log("[見積数量] is enable when input [品目] : PASSED")
        }
        if (unit) {
            await console.log("[単位] is enable when input [品目] : PASSED")
        }
        if (estimated_unit_price) {
            await console.log("[見積単価] is enable when input [品目] : PASSED")
        }
        if (estimated_amount) {
            await console.log("[見積金額] is enable when input [品目] : PASSED")
        }
        if (sale_tax) {
            await console.log("[消費税] is enable when input [品目] : PASSED")
        }
        if (tax_classification) {
            await console.log("[課税区分] is enable when input [品目] : PASSED")
        }
    })
    //===================================Check auto caculated fee=================
    it('TC17: Check automatically calculated', async () => {
        await purchase_register.click_purchase_register()
        await purchase_register.select_value_item()
        await purchase_register.input_order_quantity()
        let value_fee = await purchase_register.value_fee()//合計金額
        let value_order_quality = await purchase_register.value_order_quality()//発注数量
        let value_unit_price = await purchase_register.value_unit_price()//単価
        let total_fee = value_order_quality * value_unit_price
        await assert.strictEqual(total_fee, parseInt(value_fee) * 1000, "Value [合計金額] auto caculated incorrect :  FAILED")
        if (total_fee == parseInt(value_fee) * 1000) {
            console.log("Value [合計金額] auto caculated correct :  PASSED")
        }
    })

    //==============Purchase a registration success=====================================================
    it('TC19: Performed a purchase register', async () => {
        await purchase_register.click_purchase_register()
        await purchase_register.regis_date()
        await purchase_register.get_applicant_department()
        await purchase_register.get_applicant()
        await purchase_register.department_of_use()
        await purchase_register.desired_delivery()
        await purchase_register.quotation_request_date()
        await purchase_register.quotation_submission_deadline()
        await purchase_register.schedule_order_date()
        await purchase_register.submit_quote()
        await purchase_register.get_item()
        await purchase_register.input_estimated_number()
        await purchase_register.input_unit()
        await purchase_register.click_execute_button()
        let status = await purchase_register.register_success()
        let result = await assert.strictEqual(status, constn.purchase_requirement_being_created, "Status is incorrect, Register purchase failed : FAILED")
        if (status === constn.purchase_requirement_being_created) {
            await console.log("Status is in correct is [購買要件作成中], Register purchase success : PASSED ")
        }


    })
    afterEach(async () => {
          await page.close()
    })
})