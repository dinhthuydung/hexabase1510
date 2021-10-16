class Locator {

    constructor() {}
    //Login Locator screen
    email = "//input[@type='text']"
    password = "//input[@type='password']"
    loginButton = "button.btn-signin.v-btn"
    MS = "//*[@id='inspire']//section"
    MS_password = ":nth-child(2) > .v-input > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message"
    MS_email = ":nth-child(1) > .v-input > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message"
    Form_login = ".v-card__text"

    //icon hide/show password
    icon_eyes = "//button[@aria-label='append icon']"

    //Workspace screen 
    click_selection = "[class='v-select__selections']"
    selection ="text='サンプル実装用'"
    button_workspace = "//span[text()='選択']"
    err_message = "//*[@id='inspire']//section"
    display_icon_home ="[class='gnav']"

    //Data listed screen
    require_order = "div[class='status-panel__wrap status-panel--purchase col']"
    order = "div[class='status-panel__wrap status-panel--order col']"
    delivery = "div[class='status-panel__wrap status-panel--delivery col']"
    payment = "div[class='status-panel__wrap status-panel--payment col']"
    base_list = "ul[class='base-list']"
    get_list_order = ".status-panel--order > .status-panel > .status-panel__body  >.status-panel__item"
    get_list_delivery = ".status-panel--delivery > .status-panel > .status-panel__body > .status-panel__item"
    get_list_payment = ".status-panel--payment > .status-panel > .status-panel__body > .status-panel__item"
    content__text_pager_info = ".content__text pager-info"
    record = ".status-panel__link"
    logout_button = "(//button[contains(@class,'v-icon notranslate')])[1]"
    //ポータル screen


    div1 = ".status-panel--order > .status-panel > .status-panel__body > :nth-child(1)"
    text = ".status-panel--order > .status-panel > .status-panel__body > :nth-child(1) > .status-panel__link"
    txt = ".lastChild > .content__text"
    
}

module.exports = { Locator };