import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({good, neutral, bad}) => {

    const total = good + neutral + bad;

    return <table>
        <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={total} />
            <StatisticLine text="average" value={(good - bad) / total} />
            <StatisticLine text="positive" value={(good * 100) / total + " %"} />
        </tbody>
    </table>
}

export default Statistics;