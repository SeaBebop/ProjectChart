"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./page.module.css";
import { createChart, CrosshairMode, CandlestickData, WhitespaceData } from "lightweight-charts";
import { LineChart, Line, XAxis, ErrorBar, YAxis, PieChart, CartesianGrid, Bar, BarChart, Tooltip, Legend, Pie, ResponsiveContainer } from 'recharts';
import axios from "./api/axios"
import { AxiosResponse } from "axios";

//Urls

const BAR_URL = "http://localhost:8000/api/bar-chart-data/"
const LINE_URL = "http://localhost:8000/api/line-chart-data/"
const CANDLE_URL = "http://localhost:8000/api/candlestick-data/"
const PIE_URL = "http://localhost:8000/api/pie-chart-data/"


export default function Home() {
  // Variables

  const [bar, setBar] = useState<any[] | undefined>();
  //Prevents the initial data of [] from candle from triggering useEffect twice
  const [visible, setVisible] = useState<Boolean>(false);
  const [candle, setCandle] = useState<(CandlestickData | WhitespaceData)[]>([]);
  const [pie, setPie] = useState<any[] | undefined>();
  const [line, setLine] = useState<any[] | undefined>();

  //Fetch Functions
  //Bar
  const getBar = async () => {
    try {
      const response= await axios.get(BAR_URL)

      setBar(response.data);

    }
    catch (err) {
      if (err instanceof Error) {
        //If not in the 200 response range
        console.log(err)
      }
    }
  }
  //Line
  const getLine = async () => {
    try {

      const response = await axios.get(LINE_URL)
      setLine(response.data);
    }
    catch (err) {
      if (err instanceof Error) {
        console.log(err)
      }
    }
  }

  //Function that renders the candlesticks data
  useEffect(() => {
    // From the LightWeight Library itself
    if (visible == true) {
      const container = document.getElementById('container') as HTMLElement;
      const chartOptions = { layout: { textColor: 'black' }, width: container.offsetWidth, height: container.offsetHeight };
      const chart = createChart(container, chartOptions);
      const candlestickSeries = chart.addCandlestickSeries({ upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });

      //candle variable for some reason didn't work
      candlestickSeries.setData(candle);
      chart.timeScale().fitContent();

      // The library isn't naturally responsive so I found an answer from
      //https://stackoverflow.com/questions/57898720/how-to-create-responsive-tradingview-lightweight-chart

      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          if (entry.contentBoxSize) {
            // Update chart dimensions when container is resized
            chart.applyOptions({
              width: entry.contentRect.width,  // New width
              height: entry.contentRect.height // New height
            });
          }
        }
      });

      // Start observing the container element
      resizeObserver.observe(container);
    }
  }, [candle])

  const getCandle = async () => {
    try {
      const response = await axios.get(CANDLE_URL)

      setCandle(response.data);
    }
    catch (err) {
      if (err instanceof Error) {
        //If not in the 200 response range
        console.log(err)
      }
    }

  }

  const getPie = async () => {
    try {
      const response = await axios.get(PIE_URL)

      setPie(response.data);

    }
    catch (err) {
      if (err instanceof Error) {
        //If not in the 200 response range
        console.log(err)
      }
    }
  }
  //Trigger
  useEffect(() => {

    getBar();
    setVisible(true);
    getCandle();
    getLine();
    getPie();

  }, []);

  //Laying out the charts with divs
  return (
    //Layer 1: The whole page
    <div className="bg-[#0c1219] flex overflow-x-hidden justify-center desktop:h-[190vw] ">
      {/*Layer 2: 2 rows, the 3 charts at the top and the candlestick at the bottom at Desktop mode. Mobile is just 1 column.*/}
      <div className="flex flex-col">
        {/*Top Row*/}
        <div className="flex desktop:items-baseline  justify-around items-center flex-col desktop:flex-row">


          <div className='flex justify-center'>
            <div className='flex overflow-hidden h-[55vw] w-[55vw] overflow-x-hidden desktop:h-[20vw] desktop:w-[25vw] p-[1vw]'>
              {/*Line Chart*/}
              <ResponsiveContainer className={" text-black p-[1.5vw] overflow-x-hidden bg-opacity-10 bg-[#1e293b]"}>
                <LineChart data={line}>
                  <XAxis style={{ fill: 'white' }} dataKey="label" />
                  <YAxis style={{ fill: 'white' }} dataKey="data" />
                  <CartesianGrid stroke="gray" strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="data" stroke="#8884d8" />

                </LineChart>
              </ResponsiveContainer>

            </div>
          </div>
          <div className='flex justify-center'>
            <div className='flex overflow-hidden h-[55vw] w-[55vw] overflow-x-hidden desktop:h-[20vw] desktop:w-[25vw] p-[1vw]'>
              {/*Bar Chart*/}
              <ResponsiveContainer className={"bg-opacity-10 bg-[#1e293b]"}>

                <BarChart width={730} height={250} data={bar}>
                  <CartesianGrid strokeDasharray="3 3" stroke="gray" />
                  <XAxis style={{ fill: 'white' }} dataKey="label" />
                  <YAxis style={{ fill: 'white' }} dataKey="data" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="data" fill="#8884d8" />

                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='flex h-[55vw]  w-[55vw] desktop:h-[20vw] desktop:w-[25vw] p-[1vw]'>
              {/*Pie Chart*/}
              <ResponsiveContainer className={"bg-opacity-10 bg-[#1e293b]"}>
                <PieChart >
                  <Pie data={pie} dataKey="data" nameKey="label" outerRadius={50} label={({ label, data }) => `${label}:(${data})`} fill="#8884d8" />

                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        {/*Bottom Row*/}
        <div className='flex justify-center'>
          <div className='flex h-[55vw]  w-[55vw] desktop:h-[10vw]  p-[1vw]'>
            {/*Candlestick*/}
            <div id="container" className=" tablet:h-[50vw] tablet:w-[50vw] flex  desktop:w-[55vw] desktop:h-[25vw]  p-[1vw]"></div>

          </div>
        </div>
      </div>
    </div>

  );
}
