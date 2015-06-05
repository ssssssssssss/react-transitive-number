var React = require('react');
var D = React.DOM;

var Transition = require('./transition');
var transition = React.createFactory(Transition);

var Symbol = React.createClass({
    getInitialState: function() {
        return {
            previous: null,
            decrementing: false
        };
    },
    componentWillReceiveProps: function(nextProps) {
        var decrementing = isDecrementing(this.props.symbol, nextProps.symbol);

        this.setState({
            previous: this.props.symbol,
            decrementing: (
                this.props.inverted ?
                    !decrementing :
                    decrementing
            )
        });
    },
    shouldComponentUpdate: function(nextProps) {
        return nextProps.symbol !== this.props.symbol;
    },
    render: function() {
        return D.span(
            {
                style: {
                    position: 'relative'
                }
            },
            this.renderCurrent(),
            this.renderPrevious()
        );
    },
    renderCurrent: function() {
        return transition({
            value: this.props.symbol,
            up: this.state.decrementing,
            key: this.props.symbol
        });
    },
    renderPrevious: function() {
        if (this.state.previous !== null) {
            return transition({
                value: this.state.previous,
                out: true,
                up: this.state.decrementing,
                key: this.state.previous
            });
        }

        return null;
    }
});

module.exports = Symbol;

function isDecrementing(a, b) {
    var numberA = Number(a);
    var numberB = Number(b);

    // Special case when going from 9 or 6 to 0 (and back).
    if (Math.abs(numberB - numberA) !== 1) {
        return numberA === 0;
    } else {
        return numberB < numberA;
    }
}
