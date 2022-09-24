const PORT = process.env.PORT || 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const finalJson = [];

app.get('/', (req, res) => {
    res.json('Welcome to Trending Indian Stocks API');
});


// To get Trending Indian Stocks by Price
app.get('/india_trending_stocks_by_price', (req, response) => {

    axios.get('https://in.investing.com/equities/trending-stocks?country=india')
        .then((res) => {
            const html = res.data;
            const $ = cheerio.load(html);

            const getTagDataArr = (tagName) => {
                const tempArr = [];
                $(tagName).each((i, e) => {
                    if ($(e).text()) {
                        tempArr.push($(e).text());
                    }
                });
                return tempArr;
            };
            const getNameTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-name a');
            const getLastTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-last span');
            const getHighTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-high span');
            const getLowTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-low span');
            const getChgTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-chg span');
            const getChgPerTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-chg_pct span');
            const getVolTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-volume span');
            const getTimeTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-time time');



            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({ name: getNameTagArr[i], last: getLastTagArr[i], high: getHighTagArr[i], low: getLowTagArr[i], change: getChgTagArr[i], changePercentage: getChgPerTagArr[i], volume: getVolTagArr[i], time: getTimeTagArr[i] });
            }

            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

// To get Trending Indian Stocks by Performance
app.get('/india_trending_stocks_by_performance', (req, response) => {

    axios.get('https://in.investing.com/equities/trending-stocks/performance?country=india')
        .then((res) => {
            const html = res.data;
            const $ = cheerio.load(html);

            const getTagDataArr = (tagName) => {
                const tempArr = [];
                $(tagName).each((i, e) => {
                    if ($(e).text()) {
                        tempArr.push($(e).text());
                    }
                });
                return tempArr;
            };
            const getNameTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-name a');
            const getDailyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_day span');
            const getOneWeekTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_week span');
            const getOneMonthTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_month span');
            const getYearToDateTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_ytd span');
            const getOneYearTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_year span');
            const getThreeYearTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_3year span');

            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({ name: getNameTagArr[i], daily: getDailyTagArr[i], oneWeek: getOneWeekTagArr[i], oneMonth: getOneMonthTagArr[i], yearToDate: getYearToDateTagArr[i], oneYear: getOneYearTagArr[i], threeYear: getThreeYearTagArr[i] });
            }

            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

// To get Trending Indian Stocks by Technical
app.get('/india_trending_stocks_by_technical', (req, response) => {

    axios.get('https://in.investing.com/equities/trending-stocks/technical?country=india')
        .then((res) => {
            const html = res.data;
            const $ = cheerio.load(html);

            const getTagDataArr = (tagName) => {
                const tempArr = [];
                $(tagName).each((i, e) => {
                    if ($(e).text()) {
                        tempArr.push($(e).text());
                    }
                });
                return tempArr;
            };
            const getNameTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-name a');
            const getHourlyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_hour span');
            const getDailyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_day span');
            const getWeeklyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_week span');
            const getMonthlyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_month span');

            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({
                    name: getNameTagArr[i],
                    hourly: getHourlyTagArr[i],
                    daily: getDailyTagArr[i],
                    weekly: getWeeklyTagArr[i],
                    monthly: getMonthlyTagArr[i],
                });
            }

            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

// To get Trending Indian Stocks by Fundamental
app.get('/india_trending_stocks_by_fundamental', (req, response) => {

    axios.get('https://in.investing.com/equities/trending-stocks/fundamental?country=india')
        .then((res) => {
            const html = res.data;
            const $ = cheerio.load(html);

            const getTagDataArr = (tagName) => {
                const tempArr = [];
                $(tagName).each((i, e) => {
                    if ($(e).text()) {
                        tempArr.push($(e).text());
                    }
                });
                return tempArr;
            };
            const getNameTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-name a');
            const getMarketCapTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_market_cap span');
            const getRevenueTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_revenue span');
            const getRatioTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_ratio span');
            const getBetaTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_beta span');
            const getEpsTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_eps span');
            const getDividendTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_dividend span');
            const getNextEarningsDateTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_next_earnings span');

            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({
                    name: getNameTagArr[i],
                    marketCap: getMarketCapTagArr[i],
                    revenue: getRevenueTagArr[i],
                    ratio: getRatioTagArr[i],
                    beta: getBetaTagArr[i],
                    EPS: getEpsTagArr[i],
                    dividend: getDividendTagArr[i],
                    nextEarningsDate: getNextEarningsDateTagArr[i],
                });
            }

            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

app.listen(PORT, () => console.log(`server running o port ${PORT}`));