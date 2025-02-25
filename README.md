There is one required and one optional arg for this script.

Arg 1: START_YEAR - the first year of data to be retrieved. Earliest possible value is 2002.

Arg 2: END_YEAR - if empty, this will be set to the START_YEAR

`node index.js 2024` will retrieve the scores for just 2024

`node index.js 2002 2024` will retrieve the scores from 2002 to 2024 (this is not currently implemented)