[![Build Status](https://travis-ci.com/textkernel/bem.svg?branch=dev)](https://travis-ci.com/textkernel/bem) [![Coverage Status](https://coveralls.io/repos/github/textkernel/bem/badge.svg?branch=dev)](https://coveralls.io/github/textkernel/bem?branch=dev)

BEM
===

![css modules + bem + reat = love](https://raw.githubusercontent.com/textkernel/bem/dev/docs/logo.svg?sanitize=true)

Magically generates class names for React component.

Example of usage
----------------

First, create bem function customized for your project

**initBem.js**

```js
import make from 'bem';

export default make({
    elemPrefix: '__',
    modPrefix: '--',
    valuePrefix: '_',
});
```

**Button.js**

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bem from './initBem';
import classnamesMap from './Button.scss';


const { block, elem } = bem(
    'Button', // Block name
    classnamesMap // Class names dict generated by CSS modules loader
);

const almostRandomValue = (props) => {
    if (props.active) return 'foo';
    if (Math.random() > 0.5) return 'bar';
    return 'buz';
}

const Button = (props) => (
    {/* 1. Add { ...block(props) } construction to declare node as a block
           Note! If needed, {...props} should be spreaded before { ...block(props) } in order
           to avoid className overwriting. */}
    <button {...props} { ...block(props) }>
        {/* 2. Add { ...elem('label', props) } construction to declare node as a label element. */}
        <span { ...elem('label', props) }>
            {props.children}
        </span>
        {/* 3. Custom modifiers combined with props. */}
        <span {...elem('icon', { ...props, almostRandomValue: almostRandomValue(props) }) }>
            {props.children}
        </span>
    </button>
);


Button.propTypes = {
    active: PropTypes.bool,
};

Button.defaultProps = {
    active: false,
};

export default Button;
```

**Button.scss**

```css

/* Component's root node class name */
.Button {

    display: inline-block;

    /*
    Block: "Button", modifier: "active" (based on props.active), value: true.
    Is applied to the component's root node when props.active = true is set.
    */
    &--active {
        color: red;
    }

    /*
    Block: "Button", modifier: "type" (based on props.type), any truthy value.
    Is applied to the component's root node when `props.type = "normal"` is set.
    */
    &--type {
        border: 1px;
    }

    /*
    Block: "Button", modifier: "type" (based on props.type), value: "normal".
    Is applied to the component's root node when `props.type = "normal"` is set.
    */
    &--type_normal {
        background-color: grey;
    }

    /*
    Block "Button", modifier "type" (based on props.type), value "extraordinary".
    Is applied to the component's root node when `props.type = "extraordinary"` is set.
    */
    &--type_extraordinary {
        background-color: red;
    }

    /*
    Block "Button", modifier "clicked" (based on state.clicked), value true.
    Is applied to the component's root node when `state.clicked = true` is set.
    */
    &--clicked {
        border-style: dashed;
    }

    /*
    Block "Button", element "label"
    Is applied to the component's label node.
    */
    &__label {
        color: blue;
    }

    /*
    Block "Button", element "label", modifier: "active" (based on props.active), value: true.
    Is applied to the component's label node when props.active = true is set.
    */
    &__label--active {
        color: yellow;
    }


/*
    Block "Button", element "label", modifier "extraordinary" (based on props.type), value "extraordinary".
    Is applied to the component's label node when `props.type = "extraordinary"` is set.
    */
    &__label--type_extraordinary {
        color: orange;
    }
}
```

Examples of outcome
-------------------

Having the example above we can get the following results.
`bem` decorator adds only classnames that are declared in a stylesheet and
respectively exists in classnames map.

### No props:
```html
<Button />
 ↓ ↓ ↓
<button class="Button">
    <span class="Button__label" />
</button>
```

### Prop `active` is set:

```html
<Button active={true} />

    ↓ ↓ ↓

<button class="Button Button--active">
    <span class="Button__label Button__label--active" />
</button>
```

### Prop `active` and `type` are set:

**Note** that property of a boolean type `active={true}` produces `Button__label--active` (*without* mod value), when property of a string type `type='extraordinary'` gives us two classnameas: `Button__label--type` (*without* mod value) and `Button__label--type_extraordinary` (*with* mod value).

```html
<Button active={true} type='extraordinary' />

    ↓ ↓ ↓

<button class="Button Button--active Button--type Button--type_extraordinary">
    <span class="Button__label Button__label--active Button__label--type Button__label--type_extraordinary" />
</button>
```

### Prop `active` equals false

No classnames will be produced if boolean property has `false` value.
```html
<Button active={false} />

    ↓ ↓ ↓

<button class="Button">
    <span class="Button__label" />
</button>
```

### Clicked state
```html
<Button /> <!-- this.setState({ clicked: true }) -->

    ↓ ↓ ↓

<button class="Button Button--clicked">
    <span class="Button__label Button__label--clicked" />
</button>
```
