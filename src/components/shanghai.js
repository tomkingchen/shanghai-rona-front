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
import { format, parseISO } from "date-fns"

const Shanghai = () => {
  const [shanghai, setShanghai] = useState([]);

  useEffect(() => {
    const getShanghai = async () => {
      const resp =  await fetch('https://shanghai-rona-api.tomking-chen.workers.dev/api/shanghai');
      const shanghaiResp = await resp.json();
      setShanghai(shanghaiResp);
    };

    getShanghai();
    }, []);

    return (
      <div>
        <h1>Shanghai Daily COVID Number</h1>
        {shanghai.map(shanghaiDailyNumber => (
          <div key={shanghaiDailyNumber.date}>
            <h3>{shanghaiDailyNumber.nonesymptomatic}</h3>
          </div>
        ))}
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={shanghai}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1" >
                <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area dataKey="symptomatic" stroke="#2451B7" />
            <XAxis dataKey="date" tickFormatter={str => {
              const date = parseISO(str);              
                return format(date, "MMM d");
            }} />
            <YAxis dataKey="symptomatic" axisLine={false} />
            <Tooltip />
            <CartesianGrid opacity={0.5} vertical={false}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
};

export default Shanghai;