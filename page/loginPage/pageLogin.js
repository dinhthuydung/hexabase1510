const { Constant } = require('../../constant/constant')
const { Locator } = require('../../locator/login/locator')
const { BasePage } = require('../../page/basepage')
const constn = new Constant()
const locate = new Locator()
const base = new BasePage()


class LoginPage {
    constructor(page) {
        this.page = page
    }
    async navigate() {
        await page.goto(constn.URL)
    }  
    async clickLogin() {
        await page.click(locate.loginButton)
    }
    async check_display_message() {
        return base.check_display_element(locate.MS)
    }
    async check_display_message_email() {
        return base.check_display_element(locate.MS_email)
    }
    async check_display_message_password() {
        return base.check_display_element(locate.MS_password)
    }
    async get_text_error_alert_mess() {
        return base.getText_element(locate.MS)
    }
    async get_text_error_alert_email_mess() {
        await page.textContent(locate.MS_email)
    }
    async get_text_errr_alert_password_mess(){
        return page.textContent(locate.MS_password)
    }
    async input_email(){
        return await page.fill(locate.email, constn.inputEmail)
    }
    async input_password(){
        return await page.fill(locate.password,constn.inputPassword)
    }
    async click_icon(){
        return base.click_element(locate.icon_eyes)
    }
    async screenshot_password_hide(){
        const screenshot_path = await base.screenshot_element(locate.Form_login, constn.path_pic1)
        return screenshot_path
    }
    async screenshot_password_show(){
        const screenshot_path = await base.screenshot_element(locate.Form_login, constn.path_pic2)
        return screenshot_path
    }
    async compare_2_pic(path1, path2){
        let compare = await base.compare_two_image(path1, path2)
        return compare
    }
    async check_login_success() {
        return base.check_display_element(locate.logout_button)
    }
  
    async get_text_error_mess(){
        return base.getText_element(locate.MS)
    }
    async get_text_error_mess_email() {
        return base.getText_element(locate.MS_email)
    }
    async get_text_error_mess_password(){
        return base.getText_element(locate.MS_password)
    }

}
module.exports = { LoginPage }