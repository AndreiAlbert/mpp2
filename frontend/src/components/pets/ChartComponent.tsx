import React, { useRef, useEffect } from 'react';
import {
    Chart as ChartJS,
    ChartData,
    ChartOptions,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface CustomChartProps {
    data: ChartData<'bar'>; // Specify the chart type if you're only going to use bar charts for stronger typing
    options?: ChartOptions<'bar'>;
}

export const CustomChart: React.FC<CustomChartProps> = ({ data, options }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);


    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                const chartInstance = new ChartJS(ctx, {
                    type: 'bar',
                    data: data,
                    options: options,
                });

                return () => {
                    console.log('Destroying chart instance');
                    chartInstance.destroy();
                };
            }
        }
    }, [data, options]);

    return <canvas ref={canvasRef} />;
};
