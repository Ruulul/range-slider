## usage
```js
const RangeSlider = require('@v142857/range-slider')
const slider = RangeSlider(opts, protocol)

function protocol (notify, name) {
    //
    return listen
}
function listen (message) {
    const { type, data } = message
}
```