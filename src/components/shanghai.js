import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format, parseISO } from "date-fns";


const Shanghai = () => {
  const [shanghai, setShanghai] = useState([]);
  
  async function fetchData(){
    const url = 'https://api.shanghaicovid.xyz/api/shanghai';
    const resp = await fetch(url);
    return await resp.json();
  }
  
  useEffect(() => {
    const getShanghai = async () => {
      const jsonResp = await fetchData();
      setShanghai(jsonResp);
    };

    getShanghai();
  }, []);
  
  async function set1month(){
    const jsonResp = await fetchData();
    const last1monthData = jsonResp.slice(-30);
    setShanghai(last1monthData);
  };

  async function set2weeks(){
    const jsonResp = await fetchData();
    const last2weeksData = jsonResp.slice(-14);
    setShanghai(last2weeksData);
  };
  
  async function set1week(){
    const jsonResp = await fetchData();
    const last1weekData = jsonResp.slice(-7);
    setShanghai(last1weekData);
  };

  // const latestData = shanghai[shanghai.length - 1];
  // const latestDailyTotal = latestData.symptomatic + latestData.asymptomatic;
 
  return (
    <div>
      <p>数据采集自上海卫健委官网 Case numbers are obtained from Shanghai Municipal Health Commission <a
        href="https://wsjkw.sh.gov.cn/yqtb/index.html" 
        target="_blank" 
        rel="noopener noreferrer">
         Official Website</a> 
      </p>
      <h1>Shanghai Daily Cases 日增😷 { shanghai.map((shanghaiDaily, index, shanghaiArray) => {
        if (shanghaiArray.length - 1 === index) {
          const totalDailyNumber = shanghaiDaily.symptomatic + shanghaiDaily.asymptomatic;
          return totalDailyNumber;
        }else {
          return '';
        }
      })} </h1>
      <button type="button" className="show last 2 weeks" onClick={set1month}>
        Last Month
      </button>
      <button type="button" className="show last 2 weeks" onClick={set2weeks}>
        Last 2 Weeks
      </button>
      <button type="button" className="show last week" onClick={set1week}>
        Last Week
      </button>
      <p></p>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={shanghai} margin={{
          top: 10,
          right: 30,
          left: 10,
          bottom: 0,
        }}>
          <Area type="monotone" dataKey="asymptomatic" stackId="1" stroke="#ffc658" fill="#ffc658" />
          <Area type="monotone" dataKey="symptomatic" stackId="1" stroke="#8884d8" fill="#8884D8" />
          <XAxis dataKey="date" tickFormatter={(str1) => {
            if ( str1 === 'auto' || str1 === 0) {
              return str1;
            }else{
              const dateObj = parseISO(str1);
              return format(dateObj, "MMM d");
            }
          }} />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" opacity={0.5}/>
        </AreaChart>
      </ResponsiveContainer>
      <h1>Shanghai Accumulated Cases 累计确诊😩 { shanghai.map((shanghaiDaily, index, shanghaiArray) => {
        if (shanghaiArray.length - 1 === index) {
          return shanghaiDaily.accumulative;
        }else {
          return '';
        }}
      )}</h1>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={shanghai} margin={{
          top: 10,
          right: 30,
          left: 10,
          bottom: 0,
        }}>
          <Area type="monotone" dataKey="accumulative" stackId="1" stroke="#82CA9D" fill="#82CA9D" />
          <XAxis dataKey="date" tickFormatter={(str2) => {
            if ( str2 === 'auto' || str2 === 0){
              return str2;
            }else{
              const dateObj = parseISO(str2);
              return format(dateObj, "MMM d");
            }
          }}/>
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" opacity={0.5}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Shanghai;