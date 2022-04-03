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
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={shanghai}>
            <Area type="monotone" dataKey="nonesymptomatic" stackId="1" stroke="#82CA9D" fill="#82CA9D" />
            <Area type="monotone" dataKey="symptomatic" stackId="1" stroke="#8884d8" fill="#8884D8" />
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