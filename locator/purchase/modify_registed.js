class Locator {
    constructor() { }
    //status [見積依頼中]
    status_quotation_registered = "(//div[@role='option'])[5]"
    // [修正する] button
    modify_button = "(//button[@name='action'])[3]"
    //[ 実行する ] button
    execute_button = "//main[@class='v-main main-contents form-edit-content']//div[@class='action-area__button']//button[1]"
    pupop_confirm = "div.basic-dialog.v-card"
    close_popup_button = "button[name='route']"

}
module.exports = { Locator }