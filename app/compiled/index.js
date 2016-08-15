"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeaderBoard = function (_React$Component) {
  _inherits(LeaderBoard, _React$Component);

  function LeaderBoard() {
    _classCallCheck(this, LeaderBoard);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LeaderBoard).call(this));

    _this.state = {
      top30: [],
      allTime: [],
      selection: "top30"
    };
    return _this;
  }

  _createClass(LeaderBoard, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var TOP30LINK = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
      var ALLTIMELINK = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
      this._fetchLeaders(TOP30LINK, "top30");
      this._fetchLeaders(ALLTIMELINK, "allTime");
    }
  }, {
    key: "render",
    value: function render() {
      var group = void 0,
          top30Classes = "",
          allTimeClasses = "";
      if (this.state.selection === "top30") {
        group = "top30";
        top30Classes += "selection";
      } else {
        group = "allTime";
        allTimeClasses += "selection";
      }

      var LEADERS = this._getLeaders(group);
      return React.createElement(
        "div",
        { className: "table-responsive col-md-offset-2 col-md-8" },
        React.createElement(
          "table",
          { className: "table table-bordered" },
          React.createElement(
            "thead",
            { className: "header" },
            React.createElement(
              "tr",
              null,
              React.createElement(
                "th",
                null,
                "#"
              ),
              React.createElement(
                "th",
                null,
                "Camper Name"
              ),
              React.createElement(
                "th",
                { className: top30Classes, id: "top30" },
                React.createElement(
                  "a",
                  { href: "#", onClick: this._toggleTop30.bind(this) },
                  "Points in past 30 days"
                )
              ),
              React.createElement(
                "th",
                { className: allTimeClasses, id: "allTime" },
                React.createElement(
                  "a",
                  { href: "#", onClick: this._toggleAllTime.bind(this) },
                  "All time points"
                )
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            LEADERS
          )
        )
      );
    }
  }, {
    key: "_fetchLeaders",
    value: function _fetchLeaders(link, dest) {
      var _this2 = this;

      jQuery.ajax({
        method: "GET",
        url: link,
        success: function success(leaders) {
          _this2.setState(_defineProperty({}, dest, leaders));
        }
      });
    }
  }, {
    key: "_getLeaders",
    value: function _getLeaders(group) {
      return this.state[group].map(function (leader, index) {
        return React.createElement(Leader, {
          num: index + 1,
          name: leader.username,
          pic: leader.img,
          link: "https://www.freecodecamp.com/" + leader.username,
          pt30: leader.recent,
          ptall: leader.alltime,
          key: leader.num });
      });
    }
  }, {
    key: "_toggleAllTime",
    value: function _toggleAllTime(e) {
      e.preventDefault();
      this.setState({ selection: "allTime" });
    }
  }, {
    key: "_toggleTop30",
    value: function _toggleTop30(e) {
      e.preventDefault();
      this.setState({ selection: "top30" });
    }
  }]);

  return LeaderBoard;
}(React.Component);

var Leader = function (_React$Component2) {
  _inherits(Leader, _React$Component2);

  function Leader() {
    _classCallCheck(this, Leader);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Leader).apply(this, arguments));
  }

  _createClass(Leader, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          this.props.num
        ),
        React.createElement(
          "td",
          { className: "name" },
          React.createElement("img", { src: this.props.pic }),
          React.createElement(
            "a",
            { href: this.props.link },
            this.props.name
          )
        ),
        React.createElement(
          "td",
          null,
          this.props.pt30
        ),
        React.createElement(
          "td",
          null,
          this.props.ptall
        )
      );
    }
  }]);

  return Leader;
}(React.Component);

ReactDOM.render(React.createElement(LeaderBoard, null), document.getElementById("leaderboard"));