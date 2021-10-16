class Locator {
    constructor() { }
    //status [購買見積依頼申請済]
    status_applied = "(//div[@role='option'])[3]"
    pullback_button = "button[name='action']"
    execute_button = "//main[@class='v-main main-contents form-edit-content']//div[@class='action-area__button']//button[1]"
    confirm_popup = "(//div[contains(@class,'basic-dialog v-card')])[2]"
    click_close = "button[name='reload']"
}
module.exports = { Locator }