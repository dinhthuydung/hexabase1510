const { Constant } = require('../../constant/constant')
const { Locator } = require('../../locator/login/locator')
const { BasePage } = require('../../page/basepage')
const { LoginPage } = require('../../page/loginPage/pageLogin')
const constn = new Constant()
const locate = new Locator()
const base = new BasePage()

class ListedPage {
    constructor(page) {
        this.page = page
    }  
    async navigate() {
        await page.goto(constn.URL)

    }
    async login_success() {
        await page.fill(locate.email,constn.inputEmail)
        await page.fill(locate.password,constn.inputPassword)
        await page.click(locate.loginButton)
        //select workspace screen
        // await page.click(locate.click_selection)
        // await page.click(locate.selection)
        // await page.click(locate.button_workspace)
    }
    async check_display_require_order(){
        return base.check_display_element(locate.require_order)
    }
    async check_display_order(){
        return base.check_display_element(locate.order)
    }
    async check_display_delivery(){
        return base.check_display_element(locate.delivery)
    }
    async check_display_payment(){
        return base.check_display_element(locate.payment)
    }
    async check_display_base_list(){
        return base.check_display_element(locate.base_list)
    }
    async check_display_record(){
        return base.check_display_element(locate.record)
    }
    async get_element(){
        let result = await page.$$(locate.record)
        return result
    }
    async click_order(){
       // await page.click(element)
        return base.click_element(locate.div1)
    }
    async get_textContent(){
        const text = await page.textContent(locate.text)
        return text
    }
    async get_Text(){
        const txt = await page.textContent(locate.txt)
        await console.log(txt)
        return txt
    }
}

module.exports = { ListedPage }