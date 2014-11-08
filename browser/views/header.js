var React = require('react');
var component = require('omniscient');
var fs = require('fs');
var Link = React.createFactory(require('react-router').Link);

var mainProjectUrl = require('../urls').mainProjectUrl;

var logo = fs.readFileSync(__dirname + '/../../assets/logo.svg', 'utf-8');

var Navigation = component(function () {
  return React.DOM.ul({},
    React.DOM.li({}, Link({ to: "/"  }, "Home")),
    React.DOM.li({}, Link({ to: "/examples/" }, "Examples")),
    React.DOM.li({}, Link({ to: "/documentation/" }, "Documentation")),
    React.DOM.li({ className: 'link-github' },
      React.DOM.a({ href: mainProjectUrl },
        React.DOM.img({ src: '/assets/github.png' }),
        'Fork on Github'))
  );
});

module.exports = component(function (cursor) {
  return React.DOM.div({ className: 'header-container' },
    React.DOM.header(null,
      React.DOM.h1({ className: 'cf' },

        Link({ to: '/', dangerouslySetInnerHTML: {
            __html: logo.toString()
          }
        })
      ),

      React.DOM.nav({ className: 'navigation' },
        Navigation(null)
      )
    )
  );
});
