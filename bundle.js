(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const RangeSlider = require('..')

const slider = RangeSlider()

document.body.appendChild(slider)
},{"..":2}],2:[function(require,module,exports){
module.exports = RangeSlider

const e = document.createElement.bind(document)
function RangeSlider () {
    const el = e('div')
    const shadow = el.attachShadow({mode:'closed'})

    const input = e('input')
    input.type = 'range'

    const bar = utils.eX('bar')
    const ruler = utils.eX('ruler')
    const fill = utils.eX('fill')
    bar.append(ruler, fill)

    const style = e('style')
    style.textContent = getTheme()

    shadow.append(style, input, bar)

    return el
}

const handlers = {

}
const utils = {
    eX(x, el = 'div') {
        const elm = e(el)
        elm.classList.add(x)
        return elm
    }
}
const actions = {

}

function getTheme () {
    return `
        * {
            box-sizing: border-box;
            width: 100%;
            height: 2em;
            position: relative;
            --transparent: hsla(0, 0%, 0%, 0);
            --grey: hsl(0, 0%, 80%);
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
            background-color: var(--grey);
            display: flex;
            flex-flow: column;
            justify-content: center;
        }
        .ruler {
            position: absolute;
            height: 0.5em;
            width: 100%;
            background-size: 3em 100%;
            background-color: repeating-linear-gradient(to right,
                var(--grey) 0,
                var(--grey) 2em,
                white 2em,
                white
            );
        }
        .fill {
            position: absolute;
            height: 100%;
            width: 30%;
            background-color: var(--grey);
        }
   `
}
},{}]},{},[1]);
