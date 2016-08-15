class LeaderBoard extends React.Component {

  constructor() {
    super();

    this.state = {
      top30: [],
      allTime: [],
      selection: "top30"
    };
  }

  componentWillMount() {
    const TOP30LINK = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
    const ALLTIMELINK = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
    this._fetchLeaders(TOP30LINK, "top30");
    this._fetchLeaders(ALLTIMELINK, "allTime");
  }

  render() {
    let group, top30Classes = "", allTimeClasses = "";
    if (this.state.selection === "top30") {
      group = "top30";
      top30Classes += "selection";
    } else {
      group = "allTime";
      allTimeClasses += "selection";
    }

    const LEADERS = this._getLeaders(group);
    return (
      <div className="table-responsive col-md-offset-2 col-md-8">
      <table className="table table-bordered">
        <thead className="header">
          <tr>
            <th>#</th>
            <th>Camper Name</th>
            <th className={top30Classes} id="top30"><a href="#" onClick={this._toggleTop30.bind(this)}>Points in past 30 days</a></th>
            <th className={allTimeClasses} id="allTime"><a href="#" onClick={this._toggleAllTime.bind(this)}>All time points</a></th>
          </tr>
        </thead>
        <tbody>
        {LEADERS}
      </tbody>
      </table>
    </div>
    );
  }

  _fetchLeaders(link, dest) {
    jQuery.ajax({
      method: "GET",
      url: link,
      success: (leaders) => {
        this.setState({ [dest]:leaders })
      }
    });
  }

  _getLeaders(group) {
    return this.state[group].map((leader, index) => {
      return (<Leader
                num={index + 1}
                name={leader.username}
                pic={leader.img}
                link={"https://www.freecodecamp.com/" + leader.username}
                pt30={leader.recent}
                ptall={leader.alltime}
                key={leader.num} />);
    });
  }

  _toggleAllTime(e) {
    e.preventDefault();
    this.setState({ selection:"allTime" });
  }

  _toggleTop30(e) {
    e.preventDefault();
    this.setState({ selection:"top30" });
  }
}

class Leader extends React.Component {
  render() {
    return (
        <tr>
          <td>{this.props.num}</td>
          <td className="name">
            <img src={this.props.pic}></img>
            <a href={this.props.link}>{this.props.name}</a>
          </td>
          <td>{this.props.pt30}</td>
          <td>{this.props.ptall}</td>
        </tr>
    );
  }
}

ReactDOM.render(
  <LeaderBoard />, document.getElementById("leaderboard")
);
