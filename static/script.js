
const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Line',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'X'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Y'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
        }

    }
});

// Initialize the sliders
const sliderA = document.getElementById('slider-a');
const sliderB = document.getElementById('slider-b');
var outputA = document.getElementById('demo-a')

noUiSlider.create(sliderA, {
    start: [0],
    range: {
        'min': [-50],
        'max': [50]
    }
});

noUiSlider.create(sliderB, {
    start: [0],
    range: {
        'min': [-50],
        'max': [50]
    }
});

// Update the graph when sliders are moved
function updateGraph() {
    outputA.innerHTML = sliderA.value;
    const a = parseFloat(sliderA.noUiSlider.get());
    const b = parseFloat(sliderB.noUiSlider.get());

    // Update labels and data for the line
    const labels = [];
    const data = [];
    for (let x = -10; x <= 10; x += 0.1) {
        labels.push(x.toFixed(1));
        data.push(a * x + b);
    }
    
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
}

sliderA.noUiSlider.on('update', updateGraph);
sliderB.noUiSlider.on('update', updateGraph);

// Initial graph
updateGraph();
