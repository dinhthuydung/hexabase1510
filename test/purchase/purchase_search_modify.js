const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/purchase/purchase_search')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')
const { purchase_regisPage } = require('../../page/purchasePage/purchase_regisPage')
const { chromium } = require('playwright')
const constn = new Constant()
const base = new BasePage()
const locator = new Locator()
const assert = require('assert')


describe('V2_CREO_APL: 購買要件検索/Purchasing requirements search : purchase/purchase_search_modify.js', async () => {
    const purchase_search = new purchase_search_modifyPage()
    const purchase_register = new purchase_regisPage()
    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 100
        })
        page = await browser.newPage({ ignoreHTTPSErrors: true })
        await purchase_search.login_pass()
        await page.setViewportSize({ width: 1920, height: 1080 })

    })
    //=============Check display purchase search screen===========================================
    it('TC20 : Check display purchase search screen', async () => {
        await purchase_search.click_purchase_search()
        let result = await purchase_search.display_purchase_search()
        if (result) {
            await console.log("Purchase search screen display correct: PASSED")
        }
    })
    //============Display list data after click search button======================================
    it('TC21: Data is listed when click search', async () => {
        await purchase_search.click_purchase_search()
        await purchase_search.click_search_button()
        let data_listed = await purchase_search.display_data_listed()
        assert.strictEqual(data_listed, true, "Data is not display : FAILED")
        if (data_listed) {
            await console.log("Data is listed : PASSED")
        }
    })
    //==========Check display correct modify screen=========================================
    it('TC22: Check display correct modify screen', async () => {
        await purchase_search.detail_screen()
        await purchase_search.click_modify_button()
        let enable = await purchase_search.enable_application_department()
        await assert.strictEqual(enable, true, "Modify screen display wrong : FAILED")
        if (enable == true) {
            await console.log("Modify screen display correct : PASSED")
        }

    })
    //===========Check mandatory fields in screen==============================================
    it('TC25: Check mandatory fields in screen', async () => {
        await purchase_register.click_purchase_register()
        await purchase_register.regis_date()
        await purchase_register.get_applicant_department()
        await purchase_register.get_applicant()
        await purchase_register.schedule_order_date()
        await purchase_register.get_item()
        await purchase_register.input_estimated_number()
        await purchase_register.input_unit()
        await purchase_register.click_execute_button()
        await purchase_register.register_success()
        await purchase_search.click_modify_button()
        let mess_required = await purchase_search.check_mess_required()
        await assert.strictEqual(mess_required, constn.mess_department_use, " Message required is wrong : FAILED")
        if (mess_required == constn.mess_department_use) {
            await console.log('Message display correct : PASSED')
        }

    })
    //============[見積依頼先担当] should be disable when [見積依頼先] is not selected===============
    it('TC26: Check [見積依頼先担当] disable when not input [見積依頼先]', async () => {
        await purchase_search.detail_screen()
        let enable_modify_button = await purchase_search.enable_modify_button()
        if (enable_modify_button) {
            await purchase_search.click_modify_button()
            let ele = await purchase_search.value_request_quotation()
            if (ele == "") {
                let is_Disable = await purchase_register.disable_charge_requesting()
                await assert.strictEqual(is_Disable, true, "[見積依頼先担当] is not disable: FAILED")
                if (is_Disable)
                    await console.log("[見積依頼先担当] is disable when not input [見積依頼先] : PASSED")
            }
            else {
                await console.log("Purchase request [見積依頼先] selected")
            }
        }
    })

    //============Display popup [見積依頼先選択] when click get=====================================
    it('TC27:  Check display popup [見積依頼先選択] ', async () => {
        await purchase_search.detail_screen()
        let enable_modify_button = await purchase_search.enable_modify_button()
        if (enable_modify_button) {
            await purchase_search.click_modify_button()
            await purchase_register.click_get_request_quotation()
            let result = await purchase_register.display_request_quotation_popup()
            if (result) {
                await console.log("Display popup [見積依頼先選択] : PASSED")
            }
        }
    })

    //============[見積依頼先担当] is enabled when input [見積依頼先]================================
    it('TC28: [見積依頼先担当] is enabled when input [見積依頼先]', async () => {
        await purchase_search.detail_screen()
        let enable_modify_button = await purchase_search.enable_modify_button()
        if (enable_modify_button) {
            await purchase_search.click_modify_button()
            let ele = await purchase_search.value_request_quotation()
            await purchase_register.click_get_request_quotation()
            await purchase_register.select_random_value_department_popup()
            let isEnable = await purchase_register.enable_charge_requesting()
            assert.strictEqual(isEnable, true, "[見積依頼先担当] is not enable when input [見積依頼先] : FAILED")
            if (isEnable) {
                await console.log("[見積依頼先担当] is enable when input [見積依頼先] : PASSED ")
            }
        }
    })
    //============[支払情報] should be disabled when not input [支払先]=============================
    it('TC29: Check [支払情報] will disable when not input [支払先]', async () => {
        await purchase_search.detail_screen()
        let enable_modify_button = await purchase_search.enable_modify_button()
        if (enable_modify_button) {
            await purchase_search.click_modify_button()
            let ele = await purchase_search.value_payment_destination()
            if (ele == "") {
                let is_Disable = await purchase_register.disable_charge_requesting()
                await assert.strictEqual(is_Disable, true, "[支払情報] is not disable: FAILED")
                if (is_Disable)
                    await console.log("[支払情報] is disable when not input [支払先] : PASSED")
            }
            else {
                await console.log("Purchase request [支払先] selected")
            }
        }
    })
    //============Check display popup [支払先選択] when click get button============================
    it('TC30: Check display pop up [支払先選択]', async () => {
        await purchase_search.detail_screen()
        let enable_modify_button = await purchase_search.enable_modify_button()
        if (enable_modify_button) {
            await purchase_search.click_modify_button()
            await purchase_register.click_get_payment_destination()
            let isDisplay = await purchase_register.display_payee_popup()
            if (isDisplay) {
                await console.log("Payee selection popup [支払先選択] is display: PASSED")
            }
        }
    })
    //=========== [支払情報] enable when input [支払先]==============================================
    it('TC31: Check [支払情報] enable when input [支払先] ', async () => {
        await purchase_search.detail_screen()
        let enable_modify_button = await purchase_search.enable_modify_button()
        if (enable_modify_button) {
            await purchase_search.click_modify_button()
            await purchase_register.click_get_payment_destination()
            await purchase_register.select_random_value_payee_popup()
            let isEnable = await purchase_register.enable_payement_information()
            assert.strictEqual(isEnable, true, "[支払情報] is not enable when input [支払先] : FAILED")
            if (isEnable) {
                await console.log("[支払情報] is enable when input [支払先] : PASSED ")
            }
        }
    })
    //============== Display popup [品目選択] when click get item====================================
    it('TC32: Check display popup [品目選択]', async () => {
        await purchase_search.detail_screen()
        let enable_modify_button = await purchase_search.enable_modify_button()
        if (enable_modify_button) {
            await purchase_search.click_modify_button()
            await purchase_register.click_get_item1()
            let isDisplay = await purchase_register.display_payee_popup()
            assert.strictEqual(isDisplay, true, "Item selection [品目選択] popup is not display : FAILED")
            if (isDisplay) {
                await console.log("Item selection [品目選択] popup is display : PASSED")
            }
        }
    })
    //============Close popup [品目選択]===============================================================
    it('TC33: Close popup [品目選択]', async () => {
        await purchase_search.detail_screen()
        let enable_modify_button = await purchase_search.enable_modify_button()
        if (enable_modify_button) {
            await purchase_search.click_modify_button()
            await purchase_register.click_get_item1()
            let enable_close_button = await purchase_search.enable_close_item_selection_button()
            if (enable_close_button) {
                await purchase_search.click_close_item_selection()
                let isDisplay = await purchase_register.item_selection()
                assert.strictEqual(isDisplay, false, "Error when click close pop up [品目選択]: FAILED")
                if (isDisplay == false) {
                    await console.log("Close popup [品目選択] correctly: PASSED")
                }
            }
        }
    })
    it('TC36: Update request_quotation', async () => {
        await purchase_search.detail_screen()
        let enable_modify_button = await purchase_search.enable_modify_button()
        if (enable_modify_button) {
            await purchase_search.click_modify_button()
            await purchase_register.click_get_request_quotation()
            await purchase_register.select_random_value_department_popup()
            let enable_excute_button = await purchase_search.enable_excute_modify_button()
            if (enable_excute_button) {
                await purchase_search.click_excute_modify_button()
                let isDisplay_confirm_popup = await purchase_search.display_confirm_popup()
                if (isDisplay_confirm_popup) {
                    await console.log(" Display popup confirm execute modify success : PASSED")
                }
            }
        }
    })
    it('TC37: Updated content modify', async () => {
        await purchase_search.detail_screen()
        let enable_modify_button = await purchase_search.enable_modify_button()
        if (enable_modify_button) {
            await purchase_search.click_modify_button()
            await purchase_register.click_get_request_quotation()
            await purchase_register.select_random_value_department_popup()
            let enable_excute_button = await purchase_search.enable_excute_modify_button()
            if (enable_excute_button) {
                await purchase_search.click_excute_modify_button()
                let enable_close_process_button = await purchase_search.enable_close_process()
                if (enable_close_process_button) {
                    await purchase_search.click_close_process()
                    await console.log("Update content success: PASSED")
                }
            }
        }
    })

    afterEach(async () => {
        //await page.close()
    })
})