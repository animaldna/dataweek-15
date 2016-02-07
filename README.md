# dataweek-15

Trial and error ZingChart recreation of [this Economist chart](http://infographics.economist.com/2015/tech_stocks/index.html) (originally made in d3.js) for the ZingChart booth demo at Dataweek 2015.

###Attempt #1 - birthRates 
The first attempt using US census and fertility rate data. Parsed with NodeJS. There wasn't enough variance from state to state or year to year to get the same effect as seen in the original chart.

###Attempt #2 - gdp
Annual GDP data (global and by country) also parsed with NodeJS. The final version uses some interesting tactics to offset inherent performance issues.
