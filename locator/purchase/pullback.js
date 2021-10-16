class Locator {
    constructor() { }
    //status [購買見積依頼申請済]
    status_quotation_registered = "(//div[@role='option'])[7]"
    pullback_button = "//span[text()=' 引き戻す ']//..//..//button"
    execute_button = "//main[@class='v-main main-contents form-edit-content']//div[@class='action-area__button']//button[1]"
    confirm_popup = "//div[contains(@class,'basic-dialog v-card')]"
    click_close = "button[name='reload']"
    status = "p.content__text.basc-info-panel__status-name.status-tag--purchase"
}
module.exports = { Locator }