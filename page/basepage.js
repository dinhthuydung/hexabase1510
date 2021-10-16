
const { imgDiff } = require("img-diff-js")
const assert = require("assert")
const { exception } = require("console")
class BasePage {
    constructor(page) {
        this.page = page;
    }
    async back2Homepage() {
        await page.url();
    }
    async validateEmail(emailAdress) {
        let regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailAdress.match(regexEmail)) {
            return true //email format
        } else {
            return false //email not format
        }
    }
    async check_display_element(selector, element) {
        try {    
            await page.waitForSelector(selector, { timeout: 8000 })
            // const hrefElement = await page.$(selector);
            // return hrefElement.isVisible()
            const hrefElement = await page.isVisible(selector)
            return hrefElement

        } catch (error) {
            `enter code here`
            console.log(`Oops! The '${element}'  didn't display!!!!!!!!: FAILED`)
            // throw (error)
            return false

        }
    }

    async check_display_element_with_1s(selector, element) {
        try {    
            await page.waitForSelector(selector, { timeout: 500 })
            const hrefElement = await page.isVisible(selector)
            return hrefElement

        } catch (error) {
            return false
        }
    }

    async click_element(selector, element) {
        try {
            await page.waitForSelector(selector, { timeout: 20000 })
            const hrefElement = await page.click(selector)
            return hrefElement

        } catch (error) {
            `enter code here`
            console.log(`Oops! Can not click '${selector}' !!!!!!!!: FAILED`)
            throw (error)

        }
    }

    async fill_input(selector, input) {
        try {
            await page.waitForSelector(selector, { timeout: 20000 })
            const hrefElement = await page.fill(selector, input)
            return hrefElement

        } catch (error) {
            `enter code here`
            console.log("Oops! Can not input element!!!!!!!!: FAILED")
            throw (error)

        }
    }
    async getText_element(element) {
        await this.check_display_element(element)
        try {
            let text = await page.textContent(element)
            return text
        } catch (a) {
            throw exception
        }
    }
    async screenshot_element(locator, Path) {
        const elementHandle = await page.$(locator)
        await elementHandle.screenshot({ path: Path })
        return Path
    }

    async compare_two_image(image1_path, image2_path) {
        const diff = await imgDiff({
            actualFilename: image1_path,
            expectedFilename: image2_path,
            diffFilename: "./report/diff.png",
        })
        const bool = diff.imagesAreSame
        return bool
    }
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    async is_disable(selector) {
        await page.waitForSelector(selector, { timeout: 10000 })
        let result = await page.isDisabled(selector)
        return result
    }
    async is_enable(selector) {
        await page.waitForSelector(selector, { timeout: 10000 })
        let result = await page.isEnabled(selector)
        return result
    }
    async click_random_element(element) {
        await page.waitForSelector(element, { timeout: 10000 })
        let select_random_value = await page.$$(element)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }
    async get_value(element) {
        await page.waitForSelector(element, { timeout: 20000 })
        //let text = await page.textContent(element)
        //let text = await page.text(element)
        let text = await page.$eval(element, el => el.value)
        return text
    }

    async get_attribute(locator, attribute){
        const elementHandle = await page.$(locator)
        let value = await elementHandle.getAttribute(attribute)
        return value
    }

    async get_values(element){
        await page.waitForSelector(element, { timeout: 10000 })
        //let text = await page.textContent(element)
        //let text = await page.text(element)
        let els = await page.$eval(element, async el =>{
            let array = []
            for (let i=0; i< el.length; i++){
                await console.log(el[i].value)
                await array.push(el[i].value)
            }
        })
        return els
    }
}
module.exports = { BasePage }