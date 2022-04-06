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

const Shanghai = () => {
  const [shanghai, setShanghai] = useState([]);

  useEffect(() => {
    const getShanghai = async () => {
      const resp =  await fetch('https://api.shanghaicovid.xyz/api/shanghai');
      const shanghaiResp = await resp.json();
      setShanghai(shanghaiResp);
    };

    getShanghai();
    }, []);

    return (
      <div>
        <h1>Shanghai Daily Cases 日增😷</h1>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={shanghai}>
            <Area type="monotone" dataKey="asymptomatic" stackId="1" stroke="#ffc658" fill="#ffc658" />
            <Area type="monotone" dataKey="symptomatic" stackId="1" stroke="#8884d8" fill="#8884D8" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid opacity={0.5} vertical={false}/>
          </AreaChart>
        </ResponsiveContainer>
        <h1>Shanghai Accumulated Cases 累计确诊😩</h1>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={shanghai}>
            <Area type="monotone" dataKey="accumulated" stackId="1" stroke="#82CA9D" fill="#82CA9D" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid opacity={0.5} vertical={false}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
};

export default Shanghai;