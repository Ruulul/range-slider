module.exports = RangeSlider

function RangeSlider({ min = 0, max = 100 } = { min: 0, max: 100 }, protocol) {
    const notify = protocol(listen)
    const handlers = {
        oninput(e) {
            const el = e.target
            if (notify) notify({type: 'update', data: { value: Number(el.value) }})
            const val = el.value / el.max * 100
            actions.changeWidthTo(val, bar.querySelector('.fill'))
        }
    }
    const utils = {
        el(x) {
            return document.createElement(x)
        },
        div(x, el = 'div') {
            const elm = utils.el(el)
            if (x) elm.classList.add(x)
            return elm
        }
    }
    const actions = {
        changeWidthTo(val, el) {
            el.style.width = `${val}%`
        }
    }

    const el = utils.div()
    const shadow = el.attachShadow({ mode: 'closed' })

    const input = utils.el('input')
    input.type = 'range'
    input.min = min
    input.max = max
    input.value = min
    input.oninput = handlers.oninput

    const bar = utils.div('bar')
    const ruler = utils.div('ruler')
    const fill = utils.div('fill')
    bar.append(ruler, fill)

    const style = utils.el('style')
    style.textContent = getTheme()

    shadow.append(style, input, bar)

    return el

    function listen (message) {
        const { type, data: {value, min, max} = {} } = message
        if (type === 'update') {
            if (value) input.value = value
            if (min) input.min = min
            if (max) input.max = max
            const val = (input.value - input.min) / input.max * 100
            actions.changeWidthTo(val, fill)
            input.focus()
        }
    }
}

function getTheme() {
    return `
        :host {
            width: 100%;
            height: 2em;
            position: relative;
        }
        * {
            box-sizing: border-box;
            --transparent: hsla(0, 0%, 0%, 0);
            --grey: hsl(0, 0%, 75%);
            --focus: blue;
        }
        input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 1em;
            -webkit-appearance: none;
            z-index: 2;
            background-color: var(--transparent);
        }
        .bar {
            position: absolute;
            top: 0;
            left: 0;
            height: 1em;
            width: 100%;
            border-radius: 1em;
            overflow: hidden;
            background-color: var(--transparent);
            display: flex;
            flex-flow: column;
            justify-content: center;
        }
        .ruler {
            position: absolute;
            height: 0.5em;
            width: 100%;
            background-image: repeating-linear-gradient(to right,
                var(--grey) 0,
                var(--grey) 1em,
                white 1em,
                white 1.2em
            );
        }
        .fill {
            position: absolute;
            height: 0.5em;
            width: 0;
            background-color: var(--grey);
            transition: background-color 0.2s;
        }
        input:focus + .bar .fill {
            background-color: var(--focus);
        }
   `
}