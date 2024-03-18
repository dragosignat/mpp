import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import React from 'react';

const BarChartComponent = (data: []) => {
    return (
        <ResponsiveContainer width='100%' height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey='name'
                    stroke='#888888'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke='#888888'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Bar
                    dataKey='total'
                    fill='currentColor'
                    radius={[4, 4, 0, 0]}
                    className='fill-primary'
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;

/*

{data.length === 0 ? (
                <h3>Loading...</h3>
            ) : (
                <BarChart data={data}>
                    <XAxis
                        dataKey='name'
                        stroke='#888888'
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke='#888888'
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Bar
                        dataKey='total'
                        fill='currentColor'
                        radius={[4, 4, 0, 0]}
                        className='fill-primary'
                    />
                </BarChart>
            )}
*/
