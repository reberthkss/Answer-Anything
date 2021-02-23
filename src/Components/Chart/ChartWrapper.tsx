import React, {useEffect, useRef} from "react";
import Chart from 'chart.js';
import "./ChartWrapper.css";
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
    let chart: Chart | null = null;
    useEffect(() => {
        if (chartRef.current) {
            if (chart != null) {
                chart.data = data;
                chart.update();
            } else {
                chart = new Chart(chartRef.current, {
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
        }
    }, [data])
    return (
        <canvas ref={chartRef} className={"canvas-container"}/>
    )
}
