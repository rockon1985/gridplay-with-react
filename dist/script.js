class Cell extends React.Component {
  fillColor() {
    var { fillColor, number } = this.props;
    fillColor(number - 1);
  }

  render() {
    return React.createElement("div", { className: "cell panel panel-primary", style: this.props.style, id: "cell1", onClick: this.fillColor.bind(this) },
    this.props.number);

  }}


function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cells: this.getInitialCells(),
      colors: ['red', 'blue', 'green'] };

    this.fillColor = this.fillColor.bind(this);
  }

  getInitialCells() {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return arr.map(item => {
      return { number: item, style: {} };
    });
  }

  resetCells() {
    this.setState({ cells: this.getInitialCells() });
  }

  fillColor(index) {
    if (this.state.activeColor) {
      var newStyle = {
        'background-color': this.state.activeColor };

      this.state.cells[index].style = newStyle;
      this.setState(this.state);
    }
  }

  setActiveColor(event) {
    this.setState({ activeColor: event.currentTarget.dataset.color });
  }

  showColorPallete() {
    return this.state.colors.map((item, key) => {
      return React.createElement("label", { className: "radio-inline", key: key },
      React.createElement("input", { type: "radio", "data-color": item, name: "optradio", onClick: this.setActiveColor.bind(this) }), item);

    });
  }

  shuffleCells() {
    shuffle(this.state.cells);
    this.setState(this.state);
  }

  render() {
    return React.createElement("div", { className: "wrapper panel panel-default" },

    React.createElement("div", { className: "page-header" },
    React.createElement("h1", null, "GridPlay ", React.createElement("small", null, "with React.js"))),

    this.showColorPallete(),
    React.createElement("div", { className: "grid clearfix" },
    this.state.cells.map((cell, key) =>
    React.createElement(Cell, { number: cell.number, key: key, fillColor: this.fillColor, style: cell.style }))),


    React.createElement("div", { className: "btn-group", role: "group", "aria-label": "..." },
    React.createElement("button", { type: "button", className: "btn btn-success shuffle-btn", onClick: this.shuffleCells.bind(this) }, "Shuffle Cells"),
    React.createElement("button", { type: "button", className: "btn btn-default", onClick: this.resetCells.bind(this) }, "Reset Cells")));


  }}


React.render(React.createElement(Grid, null), document.getElementById('app'));