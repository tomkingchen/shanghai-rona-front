import React, { useEffect, useState } from "react";

const Shanghai = () => {
  const [shanghai, setShanghai] = useState([]);

  useEffect(() => {
    const getShanghai = async () => {
      const resp =  await fetch('https://shanghai-rona-api.tomking-chen.workers.dev/api/shanghai');
      console.log(JSON.stringify(resp))
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
            <h3>{shanghaiDailyNumber.symptomatic}</h3>
          </div>
        ))}
      </div>
    );
};

export default Shanghai;