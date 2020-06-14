import React, { useState, useRef } from "react";
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Styles from "../Styles";
import { 
  Button,
  TextField,
} from "@material-ui/core";
import { get } from "../apiRequest";

const requestDefaultValues = async () => await get("/chart");
const requestExtrems = async () => await get("/chart/extrems");

const Chart = () => {
  const classes = Styles();
  const highchartsInstance = useRef(null);

  const [ data, setData ] = useState([]);
  const [ min, setMin ] = useState(0);
  const [ max, setMax ] = useState(0);

  const handleBuild = async () => {
    const { data } = await requestDefaultValues();
    setData([
      {data},
    ]);
  };

  const handleShow = async () => {
    const {
      data,
      minValue,
      maxValue
    } = await requestExtrems();

    setMin(minValue);
    setMax(maxValue);
    setData([{ data }]);
  };

  const options = {
    yAxis: {
      floor: 0,
      ceiling: 100,
      title: {
          text: 'Values'
      }
    },
    xAxis: {
      labels: {
          format: '{value}'
      }
    },
    title: {
      text: 'Time Series'
    },
    series: data
  };

  return (
    <div>
      <div
        className={classes.block}
      >
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          constructorType="stockChart"
          ref={highchartsInstance}
        />
      </div>
    
    <div className={classes.showBlock}>
      <TextField
        className={classes.min}
        label="MIN"
        value={min}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        className={classes.max}
        label="MAX"
        value={max}
        InputProps={{
          readOnly: true,
        }}
      /><br/><br/>
      <center>
        <Button variant="contained" color="primary" onClick={handleBuild}>Build</Button><br/><br/>
        <Button variant="contained" color="primary" onClick={handleShow}>Show extrems</Button>
      </center>
    </div>
  </div>
  )
};

export default Chart;