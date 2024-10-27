
const salesData = {
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    datasets: [{
        label: 'Sales in 2023',
        data: [120, 150, 180, 170, 220, 300, 250, 280, 320, 310, 290, 340], 
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};


const config = {
    type: 'bar',
    data: salesData,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};


const ctx = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctx, config);
