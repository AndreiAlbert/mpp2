import { useMemo } from 'react';
import { usePets } from '../../contexts/PetContext';
import { CustomChart } from './ChartComponent';
import { ChartData, ChartOptions } from 'chart.js';

export function PetsChart() {
    const { pets } = usePets();

    const chartData: ChartData<'bar'> = useMemo(() => {
        const ageGroups = pets.reduce((acc, pet) => {
            const ageGroup = `${pet.age} years`;
            acc[ageGroup] = (acc[ageGroup] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return {
            labels: Object.keys(ageGroups),
            datasets: [{
                label: 'Number of Pets by Age',
                data: Object.values(ageGroups),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }],
        };
    }, [pets]);

    const chartOptions: ChartOptions<'bar'> = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Pet Age Distribution</h2>
            <CustomChart data={chartData} options={chartOptions} />
        </div>
    );
}
