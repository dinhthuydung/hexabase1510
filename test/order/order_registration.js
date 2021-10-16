const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/order/order_registration')
const { order_registrationPage } = require('../../page/orderPage/order_registrationPage')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')
const { chromium } = require('playwright')
const constn = new Constant()
const base = new BasePage()
const locator = new Locator()
const assert = require('assert')


describe('V2_CREO_APL: 発注登録 / Order registration : order/order_registration.js', async () => {
    const order_registration = new order_registrationPage()

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
        await order_registration.click_order_registration()
        let display = await order_registration.display_order_registration()
        if (display) {
            await console.log("Display correct order registration screen : PASSED")
        }
    })
    //============Check 仕入先担当 should be disable when not input [仕入先]======
    it.skip('TC123: Check 仕入先担当 should be disable when not input [仕入先]', async () => {
        await order_registration.click_order_registration()
        let disable = await order_registration.check_disable_supplier_charge()
        await assert.strictEqual(disable, true, "[仕入先担当] should be disable when not input [仕入先] : FAILED")
        if (disable) {
            await console.log("[仕入先担当] disable when not input [仕入先] : PASSED")
        }
    })
    //============Check display pop up [仕入先選択] ======
    it('TC124: Check pop up [仕入先選択] ', async () => {
        await order_registration.click_order_registration()
        await order_registration.click_get_supplier()
        let display = await order_registration.display_supplier_selection()
        await assert.strictEqual(display, true, "Not display popup [仕入先選択] : FAILED ")
        if (display) {
            await console.log("Display correct popup [仕入先選択] : PASSED")
        }


    })
    //============Check click close [ 閉じる ] button=========================================
    it('TC125: Check click close[ 閉じる ] button', async () => {
        await order_registration.click_order_registration()
        await order_registration.click_get_supplier()
        await order_registration.close_supplier_selection()
        let display = await order_registration.visible_supplier_selection()
        await assert.strictEqual(display, false, "Not display popup [仕入先選択] : FAILED ")
        if (display == false) {
            await console.log("Close correct popup [仕入先選択] : PASSED")
        }
    })



    //=============== [仕入先担当] should be enabled when input [仕入先]==================================
    it('TC126: Check [仕入先担当] enabled when input [仕入先] ', async () => {
        await order_registration.click_order_registration()
        await order_registration.click_get_supplier()
        await order_registration.select_supplier_selection()
        let isEnable = await order_registration.enable_supplier_charge()
        assert.strictEqual(isEnable, true, "[仕入先担当] is not enable when input [仕入先] : FAILED")
        if (isEnable) {
            await console.log("[仕入先担当] is enable when input [仕入先] : PASSED ")
        }
    })

    //============Check 支払情報 should be disable when not input [支払先]======
    it.skip('TC127: Check 支払情報 should be disable when not input [支払先]', async () => {
        await order_registration.click_order_registration()
        let disable = await order_registration.check_display_payment_information()
        await assert.strictEqual(disable, true, "[支払情報] should be disable when not input [支払先] : FAILED")
        if (disable) {
            await console.log("[支払情報] disable when not input [支払先] : PASSED")
        }
    })
    //============Check display pop up [支払先選択] ======
    it('TC128: Check pop up [支払先選択] ', async () => {
        await order_registration.click_order_registration()
        await order_registration.click_get_payment()
        let display = await order_registration.display_payee_selection()
        await assert.strictEqual(display, true, "Not display popup [支払先選択] : FAILED ")
        if (display) {
            await console.log("Display correct popup [支払先選択] : PASSED")
        }
    })
    //============Check click close [ 閉じる ] button of pop up [支払先選択] =========================================
    it('TC129: Check click close[ 閉じる ] button', async () => {
        await order_registration.click_order_registration()
        await order_registration.click_get_payment()
        await order_registration.close_payee_selection()
        let display = await order_registration.visible_payee_selection()
        await assert.strictEqual(display, false, "Popup [支払先選択] still display after click close button : FAILED ")
        if (display == false) {
            await console.log("Close correct popup [支払先選択] : PASSED")
        }
    })


    //=============== [支払情報] should be enabled when input [支払先]==================================
    it('TC130: Check [支払情報] enabled when input [支払先] ', async () => {
        await order_registration.click_order_registration()
        await order_registration.click_get_payment()
        await order_registration.select_payee_selection()
        let isEnable = await order_registration.enable_payment_information()
        assert.strictEqual(isEnable, true, "[支払情報] is not enable when input [支払先] : FAILED")
        if (isEnable) {
            await console.log("[支払情報] is enable when input [支払先] : PASSED ")
        }
    })
    //================Related fields be disabled when not select item=====================================
    it('TC131: Check disabled [規格] when not select item', async () => {
        await order_registration.click_order_registration()
        let specification = await order_registration.disable_specification()
        let order_quality = await order_registration.disable_order_quality()
        let unit = await order_registration.disable_unit()
        let unit_price = await order_registration.disable_unit_price()
        let amount = await order_registration.disable_amount()
        let sale_tax = await order_registration.disable_sale_tax()
        let tax_classification = await order_registration.disable_tax_classification()
        await assert.strictEqual(specification, true, "[規格] is not disable when not input [品目]: FAILED")
        await assert.strictEqual(order_quality, true, "[発注数量] is not disable when not input [品目]: FAILED")
        await assert.strictEqual(unit, true, "[単位] is not disable when not input [品目]: FAILED")
        await assert.strictEqual(unit_price, true, "[単価] is not disable when not input [品目]: FAILED")
        await assert.strictEqual(amount, true, "[金額] is not disable when not input [品目]: FAILED")
        await assert.strictEqual(sale_tax, true, "[消費税] is not disable when not input [品目]: FAILED")
        await assert.strictEqual(tax_classification, true, "[課税区分] is not disable when not input [品目]: FAILED")
        if (specification) {
            await console.log("[規格] is disable when not input [品目] : PASSED")
        }
        if (order_quality) {
            await console.log("[発注数量] is disable when not input [品目] : PASSED")
        }
        if (unit) {
            await console.log("[単位] is disable when not input [品目] : PASSED")
        }
        if (unit_price) {
            await console.log("[単価] is disable when not input [品目] : PASSED")
        }
        if (amount) {
            await console.log("[金額] is disable when not input [品目] : PASSED")
        }
        if (sale_tax) {
            await console.log("[消費税] is disable when not input [品目] : PASSED")
        }
        if (tax_classification) {
            await console.log("[課税区分] is disable when not input [品目] : PASSED")
        }
    })
    //===============Display popup [品目選択] when click get item=======================================
    it('TC132: Check display popup [品目選択]', async () => {
        await order_registration.click_order_registration()
        await order_registration.click_get_item()
        let isDisplay = await order_registration.display_item_selection()
        assert.strictEqual(isDisplay, true, "Item selection [品目選択] popup is not display : FAILED")
        if (isDisplay) {
            await console.log("Item selection [品目選択] popup is display : PASSED")
        }
    })
    //============Check click close [ 閉じる ] button of pop up [品目選択] =========================================
    it('TC133: Check click close[ 閉じる ] button', async () => {
        await order_registration.click_order_registration()
        await order_registration.click_get_item()
        await order_registration.close_item_selection()
        let display = await order_registration.visible_item_selection()
        await assert.strictEqual(display, false, "Popup [品目選択] still display after click close button : FAILED ")
        if (display == false) {
            await console.log("Close correct popup [品目選択] : PASSED")
        }
    })
    //================Related fields be enable when select item=====================================
    it('TC135_1: Check disabled [規格] when not select item', async () => {
        await order_registration.click_order_registration()
        await order_registration.select_value_item()
        let specification = await order_registration.enable_specification()
        let order_quality = await order_registration.enable_order_quality()
        let unit = await order_registration.enable_unit()
        let unit_price = await order_registration.enable_unit_price()
        let amount = await order_registration.enable_amount()
        let sale_tax = await order_registration.enable_sale_tax()
        let tax_classification = await order_registration.enable_tax_classification()
        await assert.strictEqual(specification, true, "[規格] is not enable when not input [品目]: FAILED")
        await assert.strictEqual(order_quality, true, "[発注数量] is not enable when not input [品目]: FAILED")
        await assert.strictEqual(unit, true, "[単位] is not enable when not input [品目]: FAILED")
        await assert.strictEqual(unit_price, true, "[単価] is not enable when not input [品目]: FAILED")
        await assert.strictEqual(amount, true, "[金額] is not enable when not input [品目]: FAILED")
        await assert.strictEqual(sale_tax, true, "[消費税] is not enable when not input [品目]: FAILED")
        await assert.strictEqual(tax_classification, true, "[課税区分] is not enable when not input [品目]: FAILED")
        if (specification) {
            await console.log("[規格] is enable when  input [品目] : PASSED")
        }
        if (order_quality) {
            await console.log("[発注数量] is enable when  input [品目] : PASSED")
        }
        if (unit) {
            await console.log("[単位] is enable when  input [品目] : PASSED")
        }
        if (unit_price) {
            await console.log("[単価] is enable when  input [品目] : PASSED")
        }
        if (amount) {
            await console.log("[金額] is enable when  input [品目] : PASSED")
        }
        if (sale_tax) {
            await console.log("[消費税] is enable when  input [品目] : PASSED")
        }
        if (tax_classification) {
            await console.log("[課税区分] is enable when  input [品目] : PASSED")
        }
    })
    //============Check automatically calculated [合計金額]=======================================
    it('TC136: Check automatically calculated', async () => {
        await order_registration.click_order_registration()
        await order_registration.select_value_item()
        await order_registration.input_order_quantity()
        let value_fee = await order_registration.value_fee()//合計金額
        let value_order_quality = await order_registration.value_order_quality()//発注数量
        let value_unit_price = await order_registration.value_unit_price()//単価
        let total_fee = value_order_quality * value_unit_price
        await assert.strictEqual(total_fee, parseInt(value_fee) * 1000, "Value [合計金額] auto caculated incorrect :  FAILED")
        if (total_fee == parseInt(value_fee) * 1000) {
            console.log("Value [合計金額] auto caculated correct :  PASSED")
        }
    })

    //==============Order a registration success=====================================================
    it.only('TC138+139: Performed a order register', async () => {
        await order_registration.click_order_registration()
        await order_registration.order_application()//発注申請日
        await order_registration.get_applicant_department()//申請者部門
        await order_registration.get_applicant()//申請者
        await order_registration.get_user_department()//使用部門
        await order_registration.use_equipment() //使用設備
        await order_registration.desired_delivery()//納入希望日
        await order_registration.supplier()//仕入先
        await order_registration.supplier_charge()//仕入先担当
        await order_registration.payment_information()
        await order_registration.scheduled_order_date()//支払情報
        await order_registration.select_value_item()// [品目]
        await order_registration.input_order_quantity() //発注数量
        await order_registration.input_unit()  //単位
        await order_registration.click_order_register()
        await order_registration.click_goto_edit()
        let status = await order_registration.register_success()
        await assert.strictEqual(status, constn.creating_an_order_application, "Status is not [発注申請作成中], Register order failed : FAILED")
        if (status === constn.creating_an_order_application) {
            await console.log("Status is in correct is [発注申請作成中], Register purchase success : PASSED ")
        }

    })



    afterEach(async () => {
        await page.close()
    })
})