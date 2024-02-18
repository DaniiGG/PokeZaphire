import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function StatsChart({ pokemonData }) {
    const chartRef = useRef();

    useEffect(() => {
        if (pokemonData) {
            const labels = pokemonData.stats.map(stat => stat.stat.name);
            const data = pokemonData.stats.map(stat => stat.base_stat);

            const ctx = chartRef.current.getContext('2d');

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Base Stats',
                        data: data,
                        backgroundColor: 'rgb(158,109,219, 0.2)',
                        borderColor: '#601FDC',
                        borderWidth: 2,
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            min: 0,
                            max: 150,
                            stepSize: 25
                        }
                    },
                    layout: {
                        padding: {
                            top: 10,
                            right: 10,
                            bottom: 10,
                            left: 10
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }, [pokemonData]);

    return <canvas ref={chartRef} style={{ maxWidth: '500px', maxHeight: '500px' }} />;
}

export default StatsChart;
