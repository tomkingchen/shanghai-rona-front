# Shanghai Daily Covid Number Chart 

A simple React web app to display Shanghai daily covid numbers using area chart.

## Technologies 🛠️
The backend API data is hosted using Cloudflare Worker. Which can be retrieved from https://api.shanghaicovid.xyz/api/shanghai

The frontend is a simple React app which uses `recharts` to present the daily numbers in area charts.

## Understand the chart 🧑🏼‍⚕️
China COVID number is consist of two criteria: `symptomatic` and `asymptomatic`. My chart simply stack those two numbers together to represent the overall daily number.