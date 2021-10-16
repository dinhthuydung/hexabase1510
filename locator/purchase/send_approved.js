class Locator {
    constructor() { }
    //status [購買発注依頼承認済]
    status_approved = "(//div[@role='option'])[8]"
    // [購買発注依頼承認する] button
    send_button = "//button//span[text()=' 発注依頼発信する ']"
    //[ 実行する ] button
    execute_button = "//main[@class='v-main main-contents form-edit-content']//div[@class='action-area__button']//button[1]"
    popup_confirm = "div.basic-dialog.v-card"
    //[ 購買要件検索画面へ ] button
    goto_search_screen = "//button//span[text()=' 購買要件検索画面へ ']"
    //[ 発注詳細画面へ ] button
    goto_detail_screen = "//button//span[text()=' 発注詳細画面へ ']"

    status = "p.content__text.basc-info-panel__status-name.status-tag--purchase"
    search_screen = "//h2[text()='購買要件検索']"
    
}
module.exports = { Locator }