import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Define the type for the chart data
interface ChartData {
    month: string;
    desktop: number;
    mobile: number;
}

const ClientChart = ({ chartData }: { chartData: ChartData[] }) => {
    return (
            <BarChart width={700} height={400} data={chartData}>
                <XAxis dataKey="month" />
                <Tooltip 
                    contentStyle={{ backgroundColor: "black", border: "1px solid #ccc", borderRadius: "8px" }} 
                    itemStyle={{ color: "#fff" }}
                    cursor={{ fill: 'transparent' }}
                />
                <Bar dataKey="desktop" fill="#10439F" radius={7} className="custom-bar" />
                <Bar dataKey="mobile" fill="#C73659" radius={7} className="custom-bar" />
            </BarChart>
    );
};

export default ClientChart; 