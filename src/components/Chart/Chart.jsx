import React, { useState } from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import timeSeries from '../../tmp/data';
import Styles from "../Styles";

const setPrev = (first, last) => {
  const timeSeriesValues = [];

  for(let i = first; i <= last; i++) {
    timeSeriesValues.push(timeSeries[i]);
  }

  return timeSeriesValues;
}

const Chart = () => {

  const [ data, setData ] = useState(timeSeries);
  const [ first, setFirst ] = useState(0);
  const [ last, setLast ] = useState(100)

  const hanldePrevValues = () => {
    setData(setPrev(first, last));
    setFirst(first-100);
    setLast(last-100);
  };

  const hanldeNextValues = () => {
    setData(setPrev(first, last));
    setFirst(first+100);
    setLast(last+100);
    return;
  };

  const handleSetAllData = () => setData(timeSeries);

  const handleStartAnimation = async () => {
    while (last !== timeSeries.length) {
      console.log(last);
      await setTimeout(hanldeNextValues(), 1000);
    }
  };

  const options = {
    title: {
      text: 'Time Series'
    },
    series: [{
      data: data
    }]};
  return (
    <div>
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
    <button onClick={hanldePrevValues}>clickPrev</button>
    <button onClick={hanldeNextValues}>clickNext</button>
    <button onClick={handleSetAllData}>Show All Chart</button>
    <button onClick={handleStartAnimation}>Start Animation</button>
  </div>
  )
};

export default Chart;