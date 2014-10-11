Documentation
=========

Omniscient has a [very simple API](#api) only consisting of *one* function; `component`.

This function creates a wrapped React.js component to which you should pass a cursor of an immutable data structure, instead of the usual props. This allows for components that does not need knowledge of your complete data structure, but only the parts needed for rendering each specific component.

Passing a cursor of the immutable data structure allows the components to change their own piece of the immutable structure from within each component, that in turn replaces the whole of the immutable structure, and causes a re render.

Using immutable data structures with React in this way actually allows for super fast re renders of the whole of your component tree, as references checks in `shouldComponentUpdate` will suffice for knowing if the components' data have changed. In this way, only component subtrees holding changed data will *actually* re render.

## Installing

Omniscient strongly encourages the use of [npm](https://www.npmjs.org/) and [browserify](http://browserify.org/). There is no distributed compiled file, as the project has a dependency to [React](http://facebook.github.io/react/) and we don't want to bundle React or rely on global variables. You can of course [bundle your own standalone module](#build-standalone).

### Install from NPM

```sh
$ npm install --save omniscient
```

### Usage

When you have installed the library you can simply require it

```js
var component = require('omniscient'),
    React = require('react');

var Hello = component(function () {
  return React.DOM.h1({}, 'Hello, Omniscient!');
});
```

*See [more examples](/examples).*

### Compile and Use

Build your file using [browserify](http://browserify.org/). In the terminal do (customize with your directories):

```sh
$ browserify scripts/*.js > static/bundle.js
```

Then include `static/bundle.js` in your HTML.
```html
<script src="static/bundle.js"></script>
```

---

## API

```js
var Component = component([mixins, ]renderFunction);

Component([key: String, ]cursor: Cursor | Array<Cursors> [, statics: Object]);

```
* `key` (*optional*) a key that is passed verbatim to the React component as `props.key` (e.g. for use in lists with repeating elements).
* `cursor` (*optional*) a cursor or an array of cursors to part(s) of an immutable data structure, needed for your rendering your component, changes to any of these will trigger re render.
* `statics` (*optional*) an object with static properties, does not cause a component to re render on change.

E.g. passing a key, a single cursor and statics

```js
var key = 'keyPassedToReactComponent';
Component(key, 
  immutableStructure.cursor(),
  { eventsFromChild: new EventEmitter() });
```

E.g. passing multiple cursors and statics

```js
Component(
  [immutableStructure.cursor(), immutableStructure.cursor(['somewhere', 'else'])], 
  { eventsFromChild: new EventEmitter() });
```


### Optional `mixins`

The optional argument `mixins` is a list (or a single) object literal with methods passed directly to the React component as `mixins` . See [omniscient-mixins](https://github.com/omniscientjs/omniscient-mixins) for a set of useful, pre-defined mixins.

```js
var Logging = {
  safeLog: function (text) {
    console && console.log(text);
  }
};
var Component = component(Logging, function () {
  this.safeLog('Hello World!');
});
```


### Wrapped `renderFunction`

This is the render function that is passed off to React. The function is called with the following parameters.

```js
function (cursor[, cursor2, ..][, statics]) { }
```

* `cursor` (*optional*) is the cursor to the part of the immutable data structure for the component
* `statics` (*optional*) is an object of the received static values, that does not trigger a re render when changed.

A component's passed `cursor` is also available on `this.props.cursor` for reach in mixins. If multiple `cursors` are passed, all of these are available on `this.props.cursors`. 

`statics` are also available as `this.props.statics`.

---

## Build Standalone

You can build omniscient as a standalone bundle by using `browserify`, but you would be required to supply the required dependencies yourself.

Clone the repository by doing

```
git clone https://github.com/omniscientjs/omniscient.git
```

Create a bundle using `browserify` and `derequire`.

```
$ cd omniscient
$ npm install -g derequire
$ browserify component.js --standalone Foo | derequire > omniscient.bundle.js
```