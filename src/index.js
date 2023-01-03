module.exports = RangeSlider

const e = document.createElement.bind(document)
function RangeSlider () {
    const el = e('div')
    const shadow = el.attachShadow({mode:'closed'})

    const input = e('input')
    input.type = 'range'

    const style = e('style')
    style.textContent = getTheme()

    shadow.append(style, input)

    return el
}

function getTheme () {
    return `
        input {
            width: 100%;
        }
    `
}