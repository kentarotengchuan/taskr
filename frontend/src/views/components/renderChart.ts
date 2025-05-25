import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(...registerables, annotationPlugin);

export function renderChart(data: { title: string, due: string }[]): void {
    const ctx = document.getElementById('deadline-chart') as HTMLCanvasElement;
    if (!ctx) return;

    const timestamps = data.map(item => new Date(item.due).getTime());
    const minDate = Math.min(...timestamps);
    const maxDate = Math.max(...timestamps);
    const margin = 2 * 24 * 60 * 60 * 1000;

    const now = new Date().getTime();
    console.log(now);

    const sorted = data
        .map((item) => ({
            title: item.title,
            due: new Date(item.due).getTime(),
        }))
        .sort((a, b) => a.due - b.due);
    
    const backgroundColors = sorted.map(item => {
        return item.due < now ? 'red' : 'green';
          });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sorted.map(item => item.title), // タスク名が縦に並ぶ
            datasets: [{
                label: '締め切り',
                data: sorted.map(item => item.due), // ← 数値
                backgroundColor: backgroundColors,
                barThickness: 12,
                barPercentage: 0.5,
                categoryPercentage: 0.6
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    type: 'linear',
                    min: minDate - margin,
                    max: maxDate + margin,
                    ticks: {
                        callback: function (tickValue) {
                            const date = new Date(Number(tickValue));
                            return `${date.getMonth() + 1}/${date.getDate()}`;
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const rawValue = context.raw as number; // ← due の UNIXミリ秒
                            const date = new Date(rawValue);
                            const formatted = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                            return `締切: ${formatted}`;
                        }
                    }
                },
                annotation: {
                    annotations: {
                        nowLine: {
                            type: 'line',
                            xMin: now,
                            xMax: now,
                            borderColor: 'red',
                            borderWidth: 1,
                            label: {
                                content: '現在時刻',
                                position: 'start'
                            }
                        }
                    }
                }
              }
        }
    });
}