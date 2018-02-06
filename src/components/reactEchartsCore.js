import React, { Component } from 'react';
import PropTypes from 'prop-types';
import elementResizeEvent from 'element-resize-event';

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export default class EchartsReactCore extends Component {
  constructor(props) {
    super(props);
    this.echartsInstance = this.props.echarts; // the echarts object.
    this.echartsElement = null; // echarts div element
  }

  // first add
  componentDidMount() {
    this.rerender();
  }

  // update
  componentDidUpdate(prevProps) {
    const echartObj = this.renderEchartDom();
    this.bindEvents(echartObj, this.props.onEvents || {});

    // 1. 切换 theme 的时候，需要 dispose 之后再新建
    // 2. 修改 opts 的时候，需要 dispose 之后再新建
    if (this.props.theme !== prevProps.theme || !isEqual(prevProps.opts, this.props.opts)) {
      this.dispose();

      this.rerender(); // 重建
      return;
    }

    if (!isEqual(prevProps.style, this.props.style) || !isEqual(prevProps.className, this.props.className)) {
      try {
        echartObj.resize();
      } catch (_) {}
    }
  }

  // remove
  componentWillUnmount() {
    this.dispose();
  }

  // return the echart object
  getEchartsInstance = () => this.echartsInstance.getInstanceByDom(this.echartsElement) ||
    this.echartsInstance.init(this.echartsElement, this.props.theme, this.props.opts);

  // dispose echarts and element-resize-event
  dispose = () => {
    if (this.echartsElement) {
      // if elementResizeEvent.unbind exist, just do it.
      try {
        elementResizeEvent.unbind(this.echartsElement);
      } catch (_) {}
      this.echartsInstance.dispose(this.echartsElement);
    }
  };

  rerender = () => {
    const { onEvents, onChartReady } = this.props;

    const echartObj = this.renderEchartDom();
    this.bindEvents(echartObj, onEvents || {});
    // on chart ready
    if (typeof onChartReady === 'function') this.props.onChartReady(echartObj);
    // on resize
    if (this.echartsElement) {
      elementResizeEvent(this.echartsElement, () => {
        echartObj.resize();
      });
    }
  };

  // bind the events
  bindEvents = (instance, events) => {
    const _loopEvent = (eventName) => {
      // ignore the event config which not satisfy
      if (typeof eventName === 'string' && typeof events[eventName] === 'function') {
        // binding event
        instance.off(eventName);
        instance.on(eventName, (param) => {
          events[eventName](param, instance);
        });
      }
    };

    for (const eventName in events) {
      if (Object.prototype.hasOwnProperty.call(events, eventName)) {
        _loopEvent(eventName);
      }
    }
  };

  // render the dom
  renderEchartDom = () => {
    // init the echart object
    const echartObj = this.getEchartsInstance();
    // set the echart option
    echartObj.setOption(this.props.option, this.props.notMerge || false, this.props.lazyUpdate || false);
    // set loading mask
    if (this.props.showLoading) echartObj.showLoading(this.props.loadingOption || null);
    else echartObj.hideLoading();

    return echartObj;
  };

  render() {
    const { style = {}, className } = this.props;
    const newStyle = {
      height: '100%',
      ...style,
    };
    // for render
    return (
      <div
        ref={(e) => { this.echartsElement = e; }}
        style={newStyle}
        className={`echarts-for-react ${className}`}
      />
    );
  }
}

EchartsReactCore.propTypes = {
  option: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  echarts: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  notMerge: PropTypes.bool,
  lazyUpdate: PropTypes.bool,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string,
  theme: PropTypes.string,
  onChartReady: PropTypes.func,
  showLoading: PropTypes.bool,
  loadingOption: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onEvents: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  opts: PropTypes.shape({
    devicePixelRatio: PropTypes.number,
    renderer: PropTypes.oneOf(['canvas', 'svg']),
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf([null, undefined, 'auto'])
    ]),
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf([null, undefined, 'auto'])
    ]),
  })
};

EchartsReactCore.defaultProps = {
  echarts: {},
  notMerge: false,
  lazyUpdate: false,
  style: {},
  className: '',
  theme: null,
  onChartReady: () => {},
  showLoading: false,
  loadingOption: null,
  onEvents: {},
  opts: {},
};