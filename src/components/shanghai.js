import React, { useEffect, useState } from "react";
import './shanghai.css'
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
      const newShanghai = jsonResp.map((shanghaiDaily) => {
        const newSymptomatic = shanghaiDaily.symptomatic - shanghaiDaily.preasymptomatic;
        return { date: shanghaiDaily.date, symptomatic: newSymptomatic, asymptomatic: shanghaiDaily.asymptomatic, accumulative: shanghaiDaily.accumulative}
      })
      setShanghai(newShanghai);
    };

    getShanghai();
  }, []);
  
  async function setFullRange(){
    const jsonResp = await fetchData();
    const newShanghai = jsonResp.map((shanghaiDaily) => {
      const newSymptomatic = shanghaiDaily.symptomatic - shanghaiDaily.preasymptomatic;
      return { date: shanghaiDaily.date, symptomatic: newSymptomatic, asymptomatic: shanghaiDaily.asymptomatic, accumulative: shanghaiDaily.accumulative}
    })
    setShanghai(newShanghai);
  };

  async function set1month(){
    const jsonResp = await fetchData();
    const newShanghai = jsonResp.map((shanghaiDaily) => {
      const newSymptomatic = shanghaiDaily.symptomatic - shanghaiDaily.preasymptomatic;
      return { date: shanghaiDaily.date, symptomatic: newSymptomatic, asymptomatic: shanghaiDaily.asymptomatic, accumulative: shanghaiDaily.accumulative}
    })
    const last1monthData = newShanghai.slice(-30);
    setShanghai(last1monthData);
  };

  async function set2weeks(){
    const jsonResp = await fetchData();
    const newShanghai = jsonResp.map((shanghaiDaily) => {
      const newSymptomatic = shanghaiDaily.symptomatic - shanghaiDaily.preasymptomatic;
      return { date: shanghaiDaily.date, symptomatic: newSymptomatic, asymptomatic: shanghaiDaily.asymptomatic, accumulative: shanghaiDaily.accumulative}
    })
    const last2weeksData = newShanghai.slice(-14);
    setShanghai(last2weeksData);
  };
  
  async function set1week(){
    const jsonResp = await fetchData();
    const newShanghai = jsonResp.map((shanghaiDaily) => {
      const newSymptomatic = shanghaiDaily.symptomatic - shanghaiDaily.preasymptomatic;
      return { date: shanghaiDaily.date, symptomatic: newSymptomatic, asymptomatic: shanghaiDaily.asymptomatic, accumulative: shanghaiDaily.accumulative}
    })
    const last1weekData = newShanghai.slice(-7);
    setShanghai(last1weekData);
  };

  // const latestData = shanghai[shanghai.length - 1];
  // const latestDailyTotal = latestData.symptomatic + latestData.asymptomatic;
 
  return (
    <div>
      <h1>Shanghai COVID Statistics</h1>
      <table>
        <tbody>
          <tr>
          <td>
            <button className="timeRange-button" type="button" onClick={setFullRange}>
              Since March
            </button>
          </td>
          <td>
            <button className="timeRange-button" type="button" onClick={set1month}>
              Last Month
            </button>
          </td>
          <td>
            <button className="timeRange-button" type="button" onClick={set2weeks}>
              Last 2 Weeks
            </button>
          </td>
          <td>
            <button className="timeRange-button" type="button" onClick={set1week}>
            Last Week
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <h1>Daily Cases 日增😷 { shanghai.map((shanghaiDaily, index, shanghaiArray) => {
        if (shanghaiArray.length - 1 === index) {
          const dateObj = parseISO(shanghaiDaily.date);
          const dateStr = format(dateObj, "MMM d");
          const totalDailyNumber = shanghaiDaily.symptomatic + shanghaiDaily.asymptomatic;
          return dateStr + ': ' + totalDailyNumber;
        }else {
          return '';
        }
      })} </h1>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={shanghai} margin={{
          top: 10,
          right: 30,
          left: 10,
          bottom: 0,
        }}>
          <Area type="monotone" dataKey="asymptomatic" stackId="1" stroke="#ffc658" fill="#ffc658" />
          <Area type="monotone" dataKey={"symptomatic"} stackId="1" stroke="#8884d8" fill="#8884D8" />
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
      <h1>Accumulative Cases 累计确诊😩 { shanghai.map((shanghaiDaily, index, shanghaiArray) => {
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
      <p>⚠️⚠️确诊病例数不再包括前一天的转归病例</p>
      <p>
        For the sake of accuracy, I have deducted those pre-existed asymptomatic cases that has since been re-counted as symptomatic cases from the daily symptomatic numbers
      </p>
      <p className="dataSourceClaim">数据采集自上海卫健委官网 Case numbers are obtained from Shanghai Municipal Health Commission <a
        href="https://wsjkw.sh.gov.cn/yqtb/index.html" 
        target="_blank" 
        rel="noopener noreferrer">
         Official Website</a> 
      </p>
    </div>
  );
};

export default Shanghai;