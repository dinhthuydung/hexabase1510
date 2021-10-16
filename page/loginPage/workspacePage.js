const { Constant } = require('../../constant/constant')
const { Locator } = require('../../locator/login/locator')
const { BasePage } = require('../../page/basepage')
const locate = new Locator()
const constn = new Constant()
const base = new BasePage()

class WorkSpace {
    constructor(page) {
        this.page = page;
    }
    async navigate() {
        await page.goto(constn.URL)
    }
    async login() {
        await page.fill(locate.email, constn.inputEmail)
        await page.fill(locate.password, constn.inputPassword)
        await page.click(locate.loginButton)
    }
    async check_display_message(){
        return base.check_display_element(locate.err_message)
    }
    // async get_error_message(){
    //     return page.textContent(locate.err_message)
    // }
    async get_error_message(){
        return base.getText_element(locate.err_message)
    }
    async click_select_dropdown(){
        return await page.click(locate.click_selection)
    }
    async click_selecion(){
        return await page.click(locate.selection)
    }
    async click_workspace_button(){
        return await page.click(locate.button_workspace)
    }
    async check_display_icon_home(){
        return base.check_display_element(locate.display_icon_home)
    }
    async login_pass(inputMail){
        await page.goto(constn.URL)
        await page.fill(locate.email, inputMail)
        await page.fill(locate.password, constn.password)
        await page.click(locate.loginButton)
        // await page.click(locate.click_selection)
        // await page.click(locate.selection)
        // await page.click(locate.button_workspace)
    }
}
module.exports = { WorkSpace }