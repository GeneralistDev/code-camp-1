import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as timerActions from '../actions/timerActions';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Card, CardHeader, CardText} from 'material-ui/Card';

class TimerPage extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			startTime: moment(),
			duration: moment.duration(0),
			visibleTimer: moment.utc(0),
			timerClean: true,
			intervalLength: 10,
			intervalID: null
		};

		this.onTimerClicked = this.onTimerClicked.bind(this);
		this.keydown = this.keydown.bind(this);
		this.keyup = this.keyup.bind(this);

		document.addEventListener("keyup", this.keyup, false);
		document.addEventListener("keydown", this.keydown, false);
		//document.addEventListener("keypress", this.keydown, false);

		setInterval(function(){
			this.forceUpdate();
		}.bind(this), 1000);
	}

	onTimerClicked() {
		const intervalLength = this.state.intervalLength;

		if (this.state.intervalID) {
			// stop the timer
			window.clearInterval(this.state.intervalID);
			this.setState({
				intervalID: null
			});
			this.props.actions.saveTime({
				duration: moment.utc(0).add(this.state.duration),
				endTime: this.state.startTime.add(this.state.duration),
				key: Date.now()
			});
		} else if (this.state.timerClean) {
			this.setState({
				timerClean: false,
				startTime: moment(),
				intervalID: setInterval(
					this.increaseDuration.bind(this, intervalLength),
					intervalLength
				)
			});
		} else {
			this.setState({
				duration: moment.duration(0),
				visibleTimer: moment.utc(0),
				timerClean: true
			});
		}
	}

	increaseDuration(ms) {
		// If the timer is still running
		if (this.state.intervalID) {
			this.setState({
				duration: this.state.duration.add(ms, 'ms'),
				visibleTimer: moment.utc(this.state.duration.asMilliseconds())
			});
		}
	}

	keydown(e) {
		if (e.which === 32 && e.target.localName !== "input") {
			e.preventDefault();
			return false;
		}
	}

	keyup(e) {
		if (e.which === 32 && e.target.localname !== "input") {
			this.onTimerClicked.bind(this)();
			e.preventDefault();
			return false;
		}
	}

	timeRow(timeEntry) {
		return (
			<TableRow key={timeEntry.key}>
				<TableRowColumn> 
					<div className="time">
						{moment(timeEntry.duration._d).format("mm:ss:SSS")}
					</div>
				</TableRowColumn>
				<TableRowColumn> 
					<div className="time">
						{moment(timeEntry.endTime).fromNow()}
					</div>
				</TableRowColumn>
			</TableRow>
		);
	}

	render() {
		return (
			<div className="row">
				<div className="col-xs-12 col-md-6 middle-sm center-xs">
					<div id="timer" onClick={this.onTimerClicked}>
						{this.state.visibleTimer.format("mm:ss:SSS")}
					</div>
					<p>
						<i>Press the spacebar or click the timer with your mouse to start/stop/reset the timer</i>
					</p>
				</div>
				<div className="col-xs-12 col-md-6 end-sm middle-sm center-xs">
					<div id="times">
						<Card style={{
							width: "500px",
							margin: "auto",
							height: "600px"
						}}>
							<CardHeader
								title="Your Times"
							/>
							<CardText>
								<Table
									selectable={false}
									height="450px"
								>
									<TableHeader
										adjustForCheckbox={false}
										displaySelectAll={false}
									>
										<TableRow>
											<TableHeaderColumn>Time</TableHeaderColumn>
											<TableHeaderColumn>When</TableHeaderColumn>
										</TableRow>
									</TableHeader>
									<TableBody
										delectOnClickaway={false}
										displayRowCheckbox={false}
									>
										{this.props.times.map(this.timeRow)}
									</TableBody>
								</Table>
							</CardText>
						</Card>
					</div>
				</div>
			</div>
		);
	}
}

TimerPage.propTypes = {
	times: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		times: state.times.reverse()
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(timerActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerPage);