import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as timerActions from '../actions/timerActions';
import { bindActionCreators } from 'redux';
import moment from 'moment';

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
		document.addEventListener("keypress", this.keydown, false);

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
				endTime: this.state.startTime.add(this.state.duration)
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
		}
	}

	keyup(e) {
		if (e.which === 32 && e.target.localname !== "input") {
			this.onTimerClicked.bind(this)();
			e.preventDefault();
		}
	}

	timeRow(timeEntry, index) {
		return <div className="time" key={index}>{moment(timeEntry.duration._d).format("mm:ss:SSS")} - {moment(timeEntry.endTime).fromNow()}</div>;
	}

	render() {
		return (
			<div>
				<h1>Rubix Cube Timer</h1>
				<p>Use <i>spacebar</i> or click your mouse to start and stop the timer</p>
				<div id="timer" onClick={this.onTimerClicked}>
					{this.state.visibleTimer.format("mm:ss:SSS")}
				</div>
				<div id="times">
					<h2>Your times</h2>
					{this.props.times.map(this.timeRow)}
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