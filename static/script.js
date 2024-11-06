document.addEventListener("DOMContentLoaded", function () {
    // Get slider elements
    const sliders = {
        a: document.getElementById('a'),
        b: document.getElementById('b'),
        c: document.getElementById('c'),
        d: document.getElementById('d')
    };

    // Funtion to render label values
    function renderLabel() {
        const a = sliders.a.value;
        const b = sliders.b.value;
        const c = sliders.c.value;
        const d = sliders.d.value;
        return `f(x) = ${a}*x^3 + ${b}*x^2 + ${c}*x + ${d}`;
    }

    // Get slider values
    var outputA = document.getElementById('a-label');
    var outputB = document.getElementById('b-label');
    var outputC = document.getElementById('c-label');
    var outputD = document.getElementById('d-label');
   
    // Initialize chart
    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],  // x-values
            datasets: [{
                label: renderLabel(),
                data: [],  // y-values
                pointRadius: 0,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                x: { type: 'linear', position: 'bottom' },
                y: { beginAtZero: false }
            },
            plugins: {
                legend: {
                    labels: {
                        generateLabels: (chart) => {
                            const label = renderLabel();
                            // Render the LaTeX label using KaTeX
                            return [{
                                text: label,
                                fontColor: 'rgba(75, 192, 192, 1)'
                            }];
                        }
                    }
                }

            }
        }
    });

    // Add event listener to each slider
    Object.values(sliders).forEach(slider => {
        slider.addEventListener('input', updatePlot);
    });

    function updatePlot() {
        // Get current slider values
        const a = sliders.a.value;
        const b = sliders.b.value;
        const c = sliders.c.value;
        const d = sliders.d.value;
        outputA.innerHTML = a;
        outputB.innerHTML = b;
        outputC.innerHTML = c;
        outputD.innerHTML = d;

        // Send AJAX request to server with parameters
        fetch('/update_plot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ a, b, c, d })
        })
            .then(response => response.json())
            .then(data => {
                // Update chart with new data
                chart.data.labels = data.x_values;
                chart.data.datasets[0].data = data.y_values.map((y, index) => ({ x: data.x_values[index], y }));
                chart.update();
            });
    }

    // Initial plot load
    updatePlot();
});
