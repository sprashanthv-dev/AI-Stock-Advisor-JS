import { dates } from "./utils/dates.js"
import { APP_SECRETS } from "./secrets.js";

const stockTickers = [];
const tickerApiUrl = "https://api.polygon.io/v2/aggs/ticker";

const reportButton = document.querySelector('.generate-report-btn');
reportButton.addEventListener('click', fetchStockData);

const actionPanel = document.querySelector('.action-panel');
const loadingPanel = document.querySelector('.loading-panel');
const apiMessage = document.getElementById('api-message');

document.getElementById('ticker-input-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const tickerInput = document.getElementById('ticker-input');

    if (tickerInput.value.length > 2) {
        reportButton.disabled = false;
        stockTickers.push(tickerInput.value.toUpperCase());
        tickerInput.value = '';
        renderTickers();
    } else {
        const label = document.getElementsByTagName('label')[0];
        label.style.color = 'red'
        label.textContent = 'You must add at least one ticker (Eg. TSLA for Tesla, MSFT for Microsoft etc.)'
    }
})

function renderTickers() {
    const tickersDiv = document.querySelector('.ticker-choice-display')
    tickersDiv.innerHTML = '';

    stockTickers.forEach(ticker => {
        const tickerSpan = document.createElement('span');
        tickerSpan.textContent = ticker;
        tickerSpan.classList.add('ticker');
        tickersDiv.appendChild(tickerSpan);
    })
}

async function fetchStockData() {
    actionPanel.style.display = 'none';
    loadingPanel.style.display = 'flex';

    try {
        const stockData = await Promise.all(stockTickers.map(async (ticker) => {
            const url = `${tickerApiUrl}/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${APP_SECRETS.POLYGON_API_KEY}`;

            const response = await fetch(url);
            const data = await response.text();
            const status = response.status;

            if (status === 200) {
                apiMessage.innerText = 'Creating report...';
                return data;
            }  else {
                loadingPanel.innerText = 'There was an error fetching stock data.';
            }
        }))
        await fetchReport(stockData.join(''));
    } catch (err) {
        loadingPanel.innerText = 'There was an error fetching stock data.';
        console.log('Error: ' + err);
    }
}

/** Open AI API call goes here */
async function fetchReport(stockData) {

}

function renderReport(output) {
    loadingPanel.style.display = 'none';

    const outputPanel = document.querySelector('.output-panel');
    const report = document.createElement('p');

    report.textContent = output;
    outputPanel.style.display = 'flex';
    outputPanel.appendChild(report);
}