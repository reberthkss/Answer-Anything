import React, {useEffect, useRef} from "react";
import Chart from 'chart.js';

interface ChartProps {
    data: any,
    props?: any,
    backgroundColors: string[],
    labels: string[],
    title: string,
    type: "bar"
}

export function ChartWrapper({type, title, labels, backgroundColors, data, props}: ChartProps) {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            new Chart(chartRef.current, {
                type,
                data: {
                    labels: labels,
                    datasets: [{
                        label: '# of Votes',
                        data: data,
                        backgroundColor: backgroundColors,
                        borderColor: "rgba(0, 0, 0, 1)",
                        borderWidth: 1
                    }]
                },
                options: {
                    title: {
                        text: title,
                        display: true
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    }, [])
    return (
        <canvas ref={chartRef}/>
    )
}
