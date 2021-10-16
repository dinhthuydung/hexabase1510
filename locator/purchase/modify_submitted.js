class Locator {
    constructor() { }
    //status [購買見積依頼申請済]
    status_submitted = "(//div[@role='option'])[3]"
    // [削除する] button
    modify_button = "(//button[@name='action'])[3]"
    //[ 実行する ] button
    execute_button = "//main[@class='v-main main-contents form-edit-content']//div[@class='action-area__button']//button[1]"
    pupop_confirm = "div.basic-dialog.v-card"
    close_popup_button = "button[name='route']"

}
module.exports = { Locator }