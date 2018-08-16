
## Solis Projectum => Data Wrangling


```python
import pandas as pd
import numpy as np
import solis
```


```python
# Data file locations
source_dir = "data/source"
clean_dir = "data/clean"
```

### Raw data file(s)
***
#### Sunspots


```python
# source: https://api.nasa.gov/DONKI/FLR
#
csv_file_sunspots = {"monthly":"sunspot_monthly.csv","yearly":"sunspot_yearly.csv"}
```

#### Temperature


```python
# source: ftp://ftp.ncdc.noaa.gov/pub/data/cirs/climdiv/
#
txt_file_temp = {"avg":"temp_average.txt","max":"temp_maximum.txt","min":"temp_minimum.txt"}
csv_file_temp = {"avg":"temp_average.csv","max":"temp_maximum.csv","min":"temp_minimum.csv"}
```

#### Cooling & Heating Days


```python
# source: ftp://ftp.ncdc.noaa.gov/pub/data/cirs/climdiv/
#
csv_file_heatcool = {"summer":"summer_cooling_days.csv","winter":"winter_heating_days.csv"}
```

### Clean the data
***
#### Sunspots


```python
# read data file with ; as delimiter
csv_file = "{}/{}".format(source_dir, csv_file_sunspots["monthly"])
sunspots_monthly_data = pd.read_csv(csv_file, sep = ";")
```


```python
sunspots_monthly_data.head()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Month</th>
      <th>Date (fraction of year)</th>
      <th>Monthly Mean Total</th>
      <th>Monthly Mean SD</th>
      <th>Number of Observations</th>
      <th>Definitive/Provisional</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1749</td>
      <td>1</td>
      <td>1749.042</td>
      <td>96.7</td>
      <td>-1.0</td>
      <td>-1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1749</td>
      <td>2</td>
      <td>1749.123</td>
      <td>104.3</td>
      <td>-1.0</td>
      <td>-1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1749</td>
      <td>3</td>
      <td>1749.204</td>
      <td>116.7</td>
      <td>-1.0</td>
      <td>-1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1749</td>
      <td>4</td>
      <td>1749.288</td>
      <td>92.8</td>
      <td>-1.0</td>
      <td>-1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1749</td>
      <td>5</td>
      <td>1749.371</td>
      <td>141.7</td>
      <td>-1.0</td>
      <td>-1</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>




```python
sunspots_monthly_data.tail()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Month</th>
      <th>Date (fraction of year)</th>
      <th>Monthly Mean Total</th>
      <th>Monthly Mean SD</th>
      <th>Number of Observations</th>
      <th>Definitive/Provisional</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>3230</th>
      <td>2018</td>
      <td>3</td>
      <td>2018.204</td>
      <td>2.5</td>
      <td>0.4</td>
      <td>1081</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3231</th>
      <td>2018</td>
      <td>4</td>
      <td>2018.286</td>
      <td>8.9</td>
      <td>1.3</td>
      <td>836</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3232</th>
      <td>2018</td>
      <td>5</td>
      <td>2018.371</td>
      <td>13.2</td>
      <td>1.6</td>
      <td>1035</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3233</th>
      <td>2018</td>
      <td>6</td>
      <td>2018.453</td>
      <td>15.9</td>
      <td>1.8</td>
      <td>925</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3234</th>
      <td>2018</td>
      <td>7</td>
      <td>2018.538</td>
      <td>1.6</td>
      <td>0.6</td>
      <td>1269</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>




```python
# remove all years prior to 1985, reset index
sunspots_monthly_1895 = sunspots_monthly_data[sunspots_monthly_data["Year"] >= 1895]
sunspots_monthly_1895 = sunspots_monthly_1895.reset_index(drop=True)
sunspots_monthly_1895.head()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Month</th>
      <th>Date (fraction of year)</th>
      <th>Monthly Mean Total</th>
      <th>Monthly Mean SD</th>
      <th>Number of Observations</th>
      <th>Definitive/Provisional</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1895</td>
      <td>1</td>
      <td>1895.042</td>
      <td>105.4</td>
      <td>9.2</td>
      <td>31</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1895</td>
      <td>2</td>
      <td>1895.123</td>
      <td>112.0</td>
      <td>9.4</td>
      <td>28</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1895</td>
      <td>3</td>
      <td>1895.204</td>
      <td>101.6</td>
      <td>9.0</td>
      <td>31</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1895</td>
      <td>4</td>
      <td>1895.288</td>
      <td>128.2</td>
      <td>10.1</td>
      <td>30</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1895</td>
      <td>5</td>
      <td>1895.371</td>
      <td>112.5</td>
      <td>9.4</td>
      <td>31</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>




```python
sunspots_monthly_1895.tail()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Month</th>
      <th>Date (fraction of year)</th>
      <th>Monthly Mean Total</th>
      <th>Monthly Mean SD</th>
      <th>Number of Observations</th>
      <th>Definitive/Provisional</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1478</th>
      <td>2018</td>
      <td>3</td>
      <td>2018.204</td>
      <td>2.5</td>
      <td>0.4</td>
      <td>1081</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1479</th>
      <td>2018</td>
      <td>4</td>
      <td>2018.286</td>
      <td>8.9</td>
      <td>1.3</td>
      <td>836</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1480</th>
      <td>2018</td>
      <td>5</td>
      <td>2018.371</td>
      <td>13.2</td>
      <td>1.6</td>
      <td>1035</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1481</th>
      <td>2018</td>
      <td>6</td>
      <td>2018.453</td>
      <td>15.9</td>
      <td>1.8</td>
      <td>925</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1482</th>
      <td>2018</td>
      <td>7</td>
      <td>2018.538</td>
      <td>1.6</td>
      <td>0.6</td>
      <td>1269</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>




```python
# write "cleaned" data file
csv_file = "{}/{}".format(clean_dir, csv_file_sunspots["monthly"])
sunspots_monthly_1895.to_csv(csv_file)
```

***


```python
# read data file with ; as delimiter
csv_file = "{}/{}".format(source_dir, csv_file_sunspots["yearly"])
sunspots_yearly_data = pd.read_csv(csv_file, sep = ";")
```


```python
sunspots_yearly_data.head()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Yearly Mean Total Sunspots</th>
      <th>Yearly Mean SD</th>
      <th>Number of Observations</th>
      <th>Definitive/Provisional</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1700.5</td>
      <td>8.3</td>
      <td>-1.0</td>
      <td>-1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1701.5</td>
      <td>18.3</td>
      <td>-1.0</td>
      <td>-1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1702.5</td>
      <td>26.7</td>
      <td>-1.0</td>
      <td>-1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1703.5</td>
      <td>38.3</td>
      <td>-1.0</td>
      <td>-1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1704.5</td>
      <td>60.0</td>
      <td>-1.0</td>
      <td>-1</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>




```python
sunspots_yearly_data.tail()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Yearly Mean Total Sunspots</th>
      <th>Yearly Mean SD</th>
      <th>Number of Observations</th>
      <th>Definitive/Provisional</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>313</th>
      <td>2013.5</td>
      <td>94.0</td>
      <td>6.9</td>
      <td>5347</td>
      <td>1</td>
    </tr>
    <tr>
      <th>314</th>
      <td>2014.5</td>
      <td>113.3</td>
      <td>8.0</td>
      <td>5273</td>
      <td>1</td>
    </tr>
    <tr>
      <th>315</th>
      <td>2015.5</td>
      <td>69.8</td>
      <td>6.4</td>
      <td>8903</td>
      <td>1</td>
    </tr>
    <tr>
      <th>316</th>
      <td>2016.5</td>
      <td>39.8</td>
      <td>3.9</td>
      <td>9940</td>
      <td>1</td>
    </tr>
    <tr>
      <th>317</th>
      <td>2017.5</td>
      <td>21.7</td>
      <td>2.5</td>
      <td>11444</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>




```python
# remove all years prior to 1985, reset index
sunspots_yearly_1895 = sunspots_yearly_data[sunspots_yearly_data["Year"] >= 1895]
sunspots_yearly_1895 = sunspots_yearly_1895.reset_index(drop=True)
sunspots_yearly_1895.head()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Yearly Mean Total Sunspots</th>
      <th>Yearly Mean SD</th>
      <th>Number of Observations</th>
      <th>Definitive/Provisional</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1895.5</td>
      <td>106.6</td>
      <td>9.2</td>
      <td>365</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1896.5</td>
      <td>69.4</td>
      <td>7.4</td>
      <td>366</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1897.5</td>
      <td>43.8</td>
      <td>5.9</td>
      <td>365</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1898.5</td>
      <td>44.4</td>
      <td>6.0</td>
      <td>365</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1899.5</td>
      <td>20.2</td>
      <td>4.1</td>
      <td>365</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>




```python
sunspots_yearly_1895.tail()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Yearly Mean Total Sunspots</th>
      <th>Yearly Mean SD</th>
      <th>Number of Observations</th>
      <th>Definitive/Provisional</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>118</th>
      <td>2013.5</td>
      <td>94.0</td>
      <td>6.9</td>
      <td>5347</td>
      <td>1</td>
    </tr>
    <tr>
      <th>119</th>
      <td>2014.5</td>
      <td>113.3</td>
      <td>8.0</td>
      <td>5273</td>
      <td>1</td>
    </tr>
    <tr>
      <th>120</th>
      <td>2015.5</td>
      <td>69.8</td>
      <td>6.4</td>
      <td>8903</td>
      <td>1</td>
    </tr>
    <tr>
      <th>121</th>
      <td>2016.5</td>
      <td>39.8</td>
      <td>3.9</td>
      <td>9940</td>
      <td>1</td>
    </tr>
    <tr>
      <th>122</th>
      <td>2017.5</td>
      <td>21.7</td>
      <td>2.5</td>
      <td>11444</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>




```python
# write "cleaned" data file
csv_file = "{}/{}".format(clean_dir, csv_file_sunspots["yearly"])
sunspots_yearly_1895.to_csv(csv_file)
```

#### Temperature


```python
# read text data file
txt_file = "{}/{}".format(source_dir, txt_file_temp["avg"])
```


```python
# display raw data file
solis.print_file_from_head(txt_file,10)
```

    Code  Jan  Feb  March  April  May  June  July  Aug  Sept  Oct  Nov  Dec
    0010021895  43.10  37.40  54.50  63.40  69.50  77.50  79.20  79.50  77.80  59.70  53.20  44.90
    0010021896  43.50  47.70  52.50  68.00  75.90  77.40  81.20  82.20  75.90  63.20  57.30  46.40
    0010021897  41.80  51.10  60.20  62.40  69.00  81.20  81.50  78.80  75.60  67.10  54.20  47.40
    0010021898  49.00  46.10  59.20  58.80  74.10  80.40  80.00  78.80  75.20  61.00  49.80  43.40
    0010021899  43.80  40.00  55.60  61.70  76.10  79.90  80.40  80.90  72.80  66.00  55.30  44.70
    0010021900  43.60  44.40  52.90  64.20  71.40  76.30  79.80  81.20  77.60  68.20  54.70  46.60
    0010021901  46.00  43.10  53.30  58.10  70.60  78.80  82.40  78.70  72.40  62.50  48.70  42.10
    0010021902  43.20  40.80  55.10  62.10  75.70  81.20  83.10  82.30  73.60  63.10  57.60  45.20
    0010021903  43.40  48.20  59.50  61.10  69.80  73.60  80.40  80.60  73.20  63.20  50.60  40.10



```python
# double space delimiter
temp_avg_data = pd.read_table(txt_file, delim_whitespace = True, engine = "python")
temp_avg_data.head()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Code</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>10021895</td>
      <td>43.1</td>
      <td>37.4</td>
      <td>54.5</td>
      <td>63.4</td>
      <td>69.5</td>
      <td>77.5</td>
      <td>79.2</td>
      <td>79.5</td>
      <td>77.8</td>
      <td>59.7</td>
      <td>53.2</td>
      <td>44.9</td>
    </tr>
    <tr>
      <th>1</th>
      <td>10021896</td>
      <td>43.5</td>
      <td>47.7</td>
      <td>52.5</td>
      <td>68.0</td>
      <td>75.9</td>
      <td>77.4</td>
      <td>81.2</td>
      <td>82.2</td>
      <td>75.9</td>
      <td>63.2</td>
      <td>57.3</td>
      <td>46.4</td>
    </tr>
    <tr>
      <th>2</th>
      <td>10021897</td>
      <td>41.8</td>
      <td>51.1</td>
      <td>60.2</td>
      <td>62.4</td>
      <td>69.0</td>
      <td>81.2</td>
      <td>81.5</td>
      <td>78.8</td>
      <td>75.6</td>
      <td>67.1</td>
      <td>54.2</td>
      <td>47.4</td>
    </tr>
    <tr>
      <th>3</th>
      <td>10021898</td>
      <td>49.0</td>
      <td>46.1</td>
      <td>59.2</td>
      <td>58.8</td>
      <td>74.1</td>
      <td>80.4</td>
      <td>80.0</td>
      <td>78.8</td>
      <td>75.2</td>
      <td>61.0</td>
      <td>49.8</td>
      <td>43.4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>10021899</td>
      <td>43.8</td>
      <td>40.0</td>
      <td>55.6</td>
      <td>61.7</td>
      <td>76.1</td>
      <td>79.9</td>
      <td>80.4</td>
      <td>80.9</td>
      <td>72.8</td>
      <td>66.0</td>
      <td>55.3</td>
      <td>44.7</td>
    </tr>
  </tbody>
</table>
</div>




```python
temp_avg_data.tail()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Code</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>7281</th>
      <td>1100022014</td>
      <td>30.56</td>
      <td>32.13</td>
      <td>40.51</td>
      <td>51.69</td>
      <td>61.27</td>
      <td>69.58</td>
      <td>73.29</td>
      <td>72.25</td>
      <td>66.20</td>
      <td>56.93</td>
      <td>39.25</td>
      <td>36.81</td>
    </tr>
    <tr>
      <th>7282</th>
      <td>1100022015</td>
      <td>33.08</td>
      <td>32.99</td>
      <td>45.39</td>
      <td>53.24</td>
      <td>60.84</td>
      <td>71.37</td>
      <td>73.92</td>
      <td>72.95</td>
      <td>68.54</td>
      <td>57.24</td>
      <td>44.60</td>
      <td>38.66</td>
    </tr>
    <tr>
      <th>7283</th>
      <td>1100022016</td>
      <td>32.22</td>
      <td>39.47</td>
      <td>47.50</td>
      <td>53.19</td>
      <td>60.33</td>
      <td>71.76</td>
      <td>75.22</td>
      <td>73.53</td>
      <td>67.12</td>
      <td>57.72</td>
      <td>47.97</td>
      <td>32.95</td>
    </tr>
    <tr>
      <th>7284</th>
      <td>1100022017</td>
      <td>33.55</td>
      <td>41.16</td>
      <td>46.13</td>
      <td>53.78</td>
      <td>60.57</td>
      <td>70.34</td>
      <td>75.70</td>
      <td>72.01</td>
      <td>66.27</td>
      <td>55.67</td>
      <td>45.01</td>
      <td>34.29</td>
    </tr>
    <tr>
      <th>7285</th>
      <td>1100022018</td>
      <td>32.16</td>
      <td>35.49</td>
      <td>42.73</td>
      <td>49.01</td>
      <td>65.50</td>
      <td>71.53</td>
      <td>-99.90</td>
      <td>-99.90</td>
      <td>-99.90</td>
      <td>-99.90</td>
      <td>-99.90</td>
      <td>-99.90</td>
    </tr>
  </tbody>
</table>
</div>




```python
# remove incomplete data from 2018; data given as -99.90 value
temp_avg_data = temp_avg_data[temp_avg_data.Dec != -99.90]
```


```python
# filter to get only national data (lower 48 states)
temp_avg_lower_48_data = pd.DataFrame(temp_avg_data[(temp_avg_data["Code"] < 1110000000) & \
                                                    (temp_avg_data["Code"] > 1100000000)])

# washing up the data
temp_avg_lower_48_data["Code"] = pd.to_numeric(temp_avg_lower_48_data["Code"].apply(solis.clean_trim_year))

temp_avg_lower_48_data = temp_avg_lower_48_data.rename(index = str, columns = {"Code":"Year"})
temp_avg_lower_48_data = temp_avg_lower_48_data.set_index("Year")
```


```python
temp_avg_lower_48_data.head()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
    <tr>
      <th>Year</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1895</th>
      <td>26.69</td>
      <td>26.60</td>
      <td>39.97</td>
      <td>52.90</td>
      <td>59.94</td>
      <td>67.80</td>
      <td>71.24</td>
      <td>71.62</td>
      <td>65.57</td>
      <td>50.85</td>
      <td>39.16</td>
      <td>31.71</td>
    </tr>
    <tr>
      <th>1896</th>
      <td>31.48</td>
      <td>35.04</td>
      <td>38.03</td>
      <td>52.34</td>
      <td>62.46</td>
      <td>69.89</td>
      <td>73.69</td>
      <td>72.27</td>
      <td>62.94</td>
      <td>51.91</td>
      <td>38.32</td>
      <td>35.55</td>
    </tr>
    <tr>
      <th>1897</th>
      <td>28.17</td>
      <td>33.39</td>
      <td>38.79</td>
      <td>51.15</td>
      <td>61.18</td>
      <td>68.11</td>
      <td>73.36</td>
      <td>71.35</td>
      <td>66.40</td>
      <td>55.11</td>
      <td>40.91</td>
      <td>30.76</td>
    </tr>
    <tr>
      <th>1898</th>
      <td>30.67</td>
      <td>35.37</td>
      <td>41.05</td>
      <td>50.79</td>
      <td>59.94</td>
      <td>69.31</td>
      <td>73.29</td>
      <td>72.75</td>
      <td>65.46</td>
      <td>51.49</td>
      <td>38.39</td>
      <td>28.67</td>
    </tr>
    <tr>
      <th>1899</th>
      <td>29.68</td>
      <td>25.50</td>
      <td>37.63</td>
      <td>50.61</td>
      <td>59.90</td>
      <td>68.65</td>
      <td>73.08</td>
      <td>71.74</td>
      <td>64.80</td>
      <td>53.98</td>
      <td>44.92</td>
      <td>31.62</td>
    </tr>
  </tbody>
</table>
</div>




```python
temp_avg_lower_48_data.tail()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
    <tr>
      <th>Year</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013</th>
      <td>32.25</td>
      <td>34.77</td>
      <td>40.91</td>
      <td>49.68</td>
      <td>60.85</td>
      <td>70.39</td>
      <td>74.21</td>
      <td>72.99</td>
      <td>66.96</td>
      <td>53.44</td>
      <td>41.61</td>
      <td>31.06</td>
    </tr>
    <tr>
      <th>2014</th>
      <td>30.56</td>
      <td>32.13</td>
      <td>40.51</td>
      <td>51.69</td>
      <td>61.27</td>
      <td>69.58</td>
      <td>73.29</td>
      <td>72.25</td>
      <td>66.20</td>
      <td>56.93</td>
      <td>39.25</td>
      <td>36.81</td>
    </tr>
    <tr>
      <th>2015</th>
      <td>33.08</td>
      <td>32.99</td>
      <td>45.39</td>
      <td>53.24</td>
      <td>60.84</td>
      <td>71.37</td>
      <td>73.92</td>
      <td>72.95</td>
      <td>68.54</td>
      <td>57.24</td>
      <td>44.60</td>
      <td>38.66</td>
    </tr>
    <tr>
      <th>2016</th>
      <td>32.22</td>
      <td>39.47</td>
      <td>47.50</td>
      <td>53.19</td>
      <td>60.33</td>
      <td>71.76</td>
      <td>75.22</td>
      <td>73.53</td>
      <td>67.12</td>
      <td>57.72</td>
      <td>47.97</td>
      <td>32.95</td>
    </tr>
    <tr>
      <th>2017</th>
      <td>33.55</td>
      <td>41.16</td>
      <td>46.13</td>
      <td>53.78</td>
      <td>60.57</td>
      <td>70.34</td>
      <td>75.70</td>
      <td>72.01</td>
      <td>66.27</td>
      <td>55.67</td>
      <td>45.01</td>
      <td>34.29</td>
    </tr>
  </tbody>
</table>
</div>




```python
# write "cleaned" data file
csv_file = "{}/{}".format(clean_dir, csv_file_temp["avg"])
temp_avg_lower_48_data.to_csv(csv_file)
```

***


```python
# read text data file
txt_file = "{}/{}".format(source_dir, txt_file_temp["max"])
```


```python
# display raw data file
solis.print_file_from_head(txt_file,10)
```

    0010271895  52.70  48.10  66.50  75.70  80.60  88.40  89.60  89.70  89.10  74.20  65.10  57.10
    0010271896  53.00  59.00  63.90  80.60  87.80  87.90  91.60  94.00  89.20  75.80  68.90  57.70
    0010271897  52.10  61.00  69.90  74.80  82.20  94.00  92.80  89.50  88.70  81.00  67.10  58.00
    0010271898  59.10  58.00  69.90  71.00  88.00  92.70  90.50  88.40  85.40  72.30  61.00  54.30
    0010271899  54.40  51.40  67.80  72.60  88.60  92.30  91.90  92.00  86.30  78.10  67.80  55.60
    0010271900  55.30  56.40  64.50  76.70  84.40  85.20  90.60  93.50  89.10  78.20  66.40  57.40
    0010271901  57.50  53.90  65.50  70.00  84.00  91.10  95.10  89.60  83.70  76.20  62.70  53.60
    0010271902  55.40  50.90  66.20  74.90  88.30  94.60  96.10  94.60  84.80  75.60  69.20  55.60
    0010271903  53.50  59.50  68.40  74.00  81.00  85.10  92.00  91.80  86.70  77.00  62.50  52.80
    0010271904  52.60  60.20  70.30  72.70  84.20  91.30  90.60  89.60  90.30  80.10  64.90  57.00



```python
# double space delimiter; define header
temp_max_data = pd.read_table(txt_file, delim_whitespace = True, engine = "python",
                              names = ["Year", "Jan", "Feb", "March", "April", "May", "June", \
                                       "July", "Aug", "Sept", "Oct", "Nov", "Dec"])
temp_max_data.head()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>10271895</td>
      <td>52.7</td>
      <td>48.1</td>
      <td>66.5</td>
      <td>75.7</td>
      <td>80.6</td>
      <td>88.4</td>
      <td>89.6</td>
      <td>89.7</td>
      <td>89.1</td>
      <td>74.2</td>
      <td>65.1</td>
      <td>57.1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>10271896</td>
      <td>53.0</td>
      <td>59.0</td>
      <td>63.9</td>
      <td>80.6</td>
      <td>87.8</td>
      <td>87.9</td>
      <td>91.6</td>
      <td>94.0</td>
      <td>89.2</td>
      <td>75.8</td>
      <td>68.9</td>
      <td>57.7</td>
    </tr>
    <tr>
      <th>2</th>
      <td>10271897</td>
      <td>52.1</td>
      <td>61.0</td>
      <td>69.9</td>
      <td>74.8</td>
      <td>82.2</td>
      <td>94.0</td>
      <td>92.8</td>
      <td>89.5</td>
      <td>88.7</td>
      <td>81.0</td>
      <td>67.1</td>
      <td>58.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>10271898</td>
      <td>59.1</td>
      <td>58.0</td>
      <td>69.9</td>
      <td>71.0</td>
      <td>88.0</td>
      <td>92.7</td>
      <td>90.5</td>
      <td>88.4</td>
      <td>85.4</td>
      <td>72.3</td>
      <td>61.0</td>
      <td>54.3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>10271899</td>
      <td>54.4</td>
      <td>51.4</td>
      <td>67.8</td>
      <td>72.6</td>
      <td>88.6</td>
      <td>92.3</td>
      <td>91.9</td>
      <td>92.0</td>
      <td>86.3</td>
      <td>78.1</td>
      <td>67.8</td>
      <td>55.6</td>
    </tr>
  </tbody>
</table>
</div>




```python
temp_max_data.tail()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>11993</th>
      <td>3650272014</td>
      <td>54.3</td>
      <td>56.7</td>
      <td>64.5</td>
      <td>74.9</td>
      <td>82.5</td>
      <td>89.2</td>
      <td>90.2</td>
      <td>91.3</td>
      <td>85.4</td>
      <td>79.1</td>
      <td>61.3</td>
      <td>57.1</td>
    </tr>
    <tr>
      <th>11994</th>
      <td>3650272015</td>
      <td>53.4</td>
      <td>55.4</td>
      <td>66.7</td>
      <td>75.4</td>
      <td>80.3</td>
      <td>90.0</td>
      <td>92.4</td>
      <td>91.9</td>
      <td>88.1</td>
      <td>77.6</td>
      <td>66.0</td>
      <td>61.7</td>
    </tr>
    <tr>
      <th>11995</th>
      <td>3650272016</td>
      <td>53.8</td>
      <td>62.9</td>
      <td>70.3</td>
      <td>75.1</td>
      <td>80.4</td>
      <td>90.9</td>
      <td>94.7</td>
      <td>91.5</td>
      <td>87.9</td>
      <td>81.1</td>
      <td>69.6</td>
      <td>56.9</td>
    </tr>
    <tr>
      <th>11996</th>
      <td>3650272017</td>
      <td>57.9</td>
      <td>66.3</td>
      <td>70.6</td>
      <td>76.8</td>
      <td>81.6</td>
      <td>89.0</td>
      <td>93.1</td>
      <td>89.3</td>
      <td>85.6</td>
      <td>78.2</td>
      <td>68.3</td>
      <td>57.4</td>
    </tr>
    <tr>
      <th>11997</th>
      <td>3650272018</td>
      <td>53.7</td>
      <td>62.6</td>
      <td>67.3</td>
      <td>72.6</td>
      <td>86.4</td>
      <td>91.9</td>
      <td>93.4</td>
      <td>-99.9</td>
      <td>-99.9</td>
      <td>-99.9</td>
      <td>-99.9</td>
      <td>-99.9</td>
    </tr>
  </tbody>
</table>
</div>




```python
# filter to get only national data (lower 48 states)
temp_max_lower_48_data = pd.DataFrame(temp_max_data[(temp_max_data["Year"] < 1110000000) & \
                                                    (temp_max_data["Year"] > 1100000000)])

# washing up the data
temp_max_lower_48_data["Year"] = pd.to_numeric(temp_max_lower_48_data["Year"].apply(solis.clean_trim_year))

temp_max_lower_48_data = temp_max_lower_48_data[temp_max_lower_48_data.Year != 2018]
temp_max_lower_48_data = temp_max_lower_48_data.reset_index(drop = True)
```


```python
temp_max_lower_48_data.head()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1895</td>
      <td>36.86</td>
      <td>37.65</td>
      <td>52.07</td>
      <td>66.33</td>
      <td>72.81</td>
      <td>80.89</td>
      <td>83.91</td>
      <td>84.90</td>
      <td>78.73</td>
      <td>64.54</td>
      <td>50.09</td>
      <td>42.08</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1896</td>
      <td>41.41</td>
      <td>46.56</td>
      <td>49.42</td>
      <td>64.38</td>
      <td>74.77</td>
      <td>83.26</td>
      <td>86.00</td>
      <td>85.39</td>
      <td>75.27</td>
      <td>64.11</td>
      <td>48.47</td>
      <td>45.79</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1897</td>
      <td>37.65</td>
      <td>43.29</td>
      <td>49.32</td>
      <td>63.43</td>
      <td>74.61</td>
      <td>80.91</td>
      <td>86.41</td>
      <td>84.49</td>
      <td>80.02</td>
      <td>67.68</td>
      <td>52.32</td>
      <td>40.62</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1898</td>
      <td>40.77</td>
      <td>46.76</td>
      <td>52.36</td>
      <td>63.54</td>
      <td>72.05</td>
      <td>81.97</td>
      <td>86.25</td>
      <td>85.50</td>
      <td>78.69</td>
      <td>63.41</td>
      <td>49.48</td>
      <td>38.93</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1899</td>
      <td>39.88</td>
      <td>36.36</td>
      <td>48.87</td>
      <td>62.98</td>
      <td>72.23</td>
      <td>81.54</td>
      <td>86.25</td>
      <td>84.76</td>
      <td>78.96</td>
      <td>65.91</td>
      <td>55.90</td>
      <td>41.52</td>
    </tr>
  </tbody>
</table>
</div>




```python
temp_max_lower_48_data.tail()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>118</th>
      <td>2013</td>
      <td>42.71</td>
      <td>45.46</td>
      <td>52.70</td>
      <td>62.06</td>
      <td>73.53</td>
      <td>82.99</td>
      <td>86.43</td>
      <td>85.39</td>
      <td>79.18</td>
      <td>65.32</td>
      <td>52.48</td>
      <td>41.52</td>
    </tr>
    <tr>
      <th>119</th>
      <td>2014</td>
      <td>42.44</td>
      <td>43.02</td>
      <td>52.84</td>
      <td>64.56</td>
      <td>74.10</td>
      <td>81.81</td>
      <td>85.80</td>
      <td>84.22</td>
      <td>78.26</td>
      <td>69.39</td>
      <td>50.29</td>
      <td>45.34</td>
    </tr>
    <tr>
      <th>120</th>
      <td>2015</td>
      <td>43.27</td>
      <td>44.40</td>
      <td>57.76</td>
      <td>65.84</td>
      <td>72.54</td>
      <td>83.64</td>
      <td>85.96</td>
      <td>85.77</td>
      <td>81.30</td>
      <td>69.10</td>
      <td>55.22</td>
      <td>48.06</td>
    </tr>
    <tr>
      <th>121</th>
      <td>2016</td>
      <td>41.86</td>
      <td>50.81</td>
      <td>59.47</td>
      <td>65.57</td>
      <td>72.50</td>
      <td>84.92</td>
      <td>87.91</td>
      <td>85.80</td>
      <td>79.39</td>
      <td>69.89</td>
      <td>59.56</td>
      <td>42.64</td>
    </tr>
    <tr>
      <th>122</th>
      <td>2017</td>
      <td>42.78</td>
      <td>52.14</td>
      <td>57.81</td>
      <td>65.88</td>
      <td>73.24</td>
      <td>83.25</td>
      <td>88.56</td>
      <td>84.27</td>
      <td>78.75</td>
      <td>68.41</td>
      <td>56.17</td>
      <td>44.82</td>
    </tr>
  </tbody>
</table>
</div>




```python
# write "cleaned" data file
csv_file = "{}/{}".format(clean_dir, csv_file_temp["max"])
temp_max_lower_48_data.to_csv(csv_file)
```

***


```python
# read text data file
txt_file = "{}/{}".format(source_dir, txt_file_temp["min"])
```


```python
# display raw data file
solis.print_file_from_head(txt_file,10)
```

    0010281895  33.40  26.80  42.40  51.20  58.40  66.50  68.80  69.30  66.40  45.20  41.40  32.70
    0010281896  34.00  36.40  41.20  55.60  63.90  66.90  70.70  70.40  62.60  50.60  45.80  35.10
    0010281897  31.40  41.20  50.40  50.10  55.90  68.30  70.20  68.10  62.50  53.10  41.40  36.90
    0010281898  38.80  34.20  48.50  46.40  60.20  68.00  69.60  69.20  65.10  49.60  38.70  32.50
    0010281899  33.10  28.60  43.50  50.80  63.60  67.60  68.90  69.90  59.40  54.00  42.80  33.80
    0010281900  31.90  32.40  41.30  51.60  58.40  67.40  69.10  68.90  66.00  58.20  43.00  35.70
    0010281901  34.50  32.30  41.10  46.20  57.10  66.50  69.80  67.80  61.00  48.80  34.70  30.50
    0010281902  30.90  30.60  44.00  49.30  63.10  67.80  70.10  70.00  62.50  50.60  45.90  34.90
    0010281903  33.30  36.80  50.50  48.20  58.70  62.20  68.80  69.40  59.80  49.40  38.70  27.30
    0010281904  29.70  37.60  45.80  47.30  56.20  64.90  66.60  67.60  63.70  49.20  39.20  34.80



```python
# double space delimiter
temp_min_data = pd.read_table(txt_file, delim_whitespace = True, engine = "python",
                              names = ["Year", "Jan", "Feb", "March", "April", "May", "June", \
                                       "July", "Aug", "Sept", "Oct", "Nov", "Dec"])
temp_min_data.head() 
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>10281895</td>
      <td>33.4</td>
      <td>26.8</td>
      <td>42.4</td>
      <td>51.2</td>
      <td>58.4</td>
      <td>66.5</td>
      <td>68.8</td>
      <td>69.3</td>
      <td>66.4</td>
      <td>45.2</td>
      <td>41.4</td>
      <td>32.7</td>
    </tr>
    <tr>
      <th>1</th>
      <td>10281896</td>
      <td>34.0</td>
      <td>36.4</td>
      <td>41.2</td>
      <td>55.6</td>
      <td>63.9</td>
      <td>66.9</td>
      <td>70.7</td>
      <td>70.4</td>
      <td>62.6</td>
      <td>50.6</td>
      <td>45.8</td>
      <td>35.1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>10281897</td>
      <td>31.4</td>
      <td>41.2</td>
      <td>50.4</td>
      <td>50.1</td>
      <td>55.9</td>
      <td>68.3</td>
      <td>70.2</td>
      <td>68.1</td>
      <td>62.5</td>
      <td>53.1</td>
      <td>41.4</td>
      <td>36.9</td>
    </tr>
    <tr>
      <th>3</th>
      <td>10281898</td>
      <td>38.8</td>
      <td>34.2</td>
      <td>48.5</td>
      <td>46.4</td>
      <td>60.2</td>
      <td>68.0</td>
      <td>69.6</td>
      <td>69.2</td>
      <td>65.1</td>
      <td>49.6</td>
      <td>38.7</td>
      <td>32.5</td>
    </tr>
    <tr>
      <th>4</th>
      <td>10281899</td>
      <td>33.1</td>
      <td>28.6</td>
      <td>43.5</td>
      <td>50.8</td>
      <td>63.6</td>
      <td>67.6</td>
      <td>68.9</td>
      <td>69.9</td>
      <td>59.4</td>
      <td>54.0</td>
      <td>42.8</td>
      <td>33.8</td>
    </tr>
  </tbody>
</table>
</div>




```python
temp_min_data.tail()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>11993</th>
      <td>3650282014</td>
      <td>28.3</td>
      <td>34.1</td>
      <td>38.2</td>
      <td>48.6</td>
      <td>57.4</td>
      <td>66.7</td>
      <td>67.6</td>
      <td>67.8</td>
      <td>63.7</td>
      <td>52.8</td>
      <td>37.3</td>
      <td>38.1</td>
    </tr>
    <tr>
      <th>11994</th>
      <td>3650282015</td>
      <td>32.4</td>
      <td>32.3</td>
      <td>43.4</td>
      <td>51.9</td>
      <td>57.7</td>
      <td>67.2</td>
      <td>70.3</td>
      <td>67.8</td>
      <td>64.0</td>
      <td>53.8</td>
      <td>44.3</td>
      <td>40.1</td>
    </tr>
    <tr>
      <th>11995</th>
      <td>3650282016</td>
      <td>32.6</td>
      <td>37.8</td>
      <td>45.7</td>
      <td>50.7</td>
      <td>56.8</td>
      <td>67.2</td>
      <td>70.8</td>
      <td>69.5</td>
      <td>64.0</td>
      <td>54.0</td>
      <td>44.2</td>
      <td>35.8</td>
    </tr>
    <tr>
      <th>11996</th>
      <td>3650282017</td>
      <td>37.6</td>
      <td>41.7</td>
      <td>45.3</td>
      <td>52.0</td>
      <td>56.7</td>
      <td>66.0</td>
      <td>70.2</td>
      <td>68.4</td>
      <td>62.0</td>
      <td>51.8</td>
      <td>43.7</td>
      <td>34.7</td>
    </tr>
    <tr>
      <th>11997</th>
      <td>3650282018</td>
      <td>29.7</td>
      <td>39.2</td>
      <td>42.8</td>
      <td>45.5</td>
      <td>61.6</td>
      <td>67.7</td>
      <td>70.5</td>
      <td>-99.9</td>
      <td>-99.9</td>
      <td>-99.9</td>
      <td>-99.9</td>
      <td>-99.9</td>
    </tr>
  </tbody>
</table>
</div>




```python
# filter to get only national data (lower 48 states)
temp_min_lower_48_data = pd.DataFrame(temp_min_data[(temp_min_data["Year"] < 1110000000) & \
                                                    (temp_min_data["Year"] > 1100000000)])

# washing up the data
temp_min_lower_48_data["Year"] = pd.to_numeric(temp_min_lower_48_data["Year"].apply(solis.clean_trim_year))

temp_min_lower_48_data = temp_min_lower_48_data[temp_min_lower_48_data.Year != 2018]
temp_min_lower_48_data = temp_min_lower_48_data.reset_index(drop = True)
```


```python
temp_min_lower_48_data.head()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1895</td>
      <td>16.52</td>
      <td>15.57</td>
      <td>27.86</td>
      <td>39.45</td>
      <td>47.05</td>
      <td>54.72</td>
      <td>58.55</td>
      <td>58.32</td>
      <td>52.38</td>
      <td>37.15</td>
      <td>28.24</td>
      <td>21.33</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1896</td>
      <td>21.52</td>
      <td>23.52</td>
      <td>26.62</td>
      <td>40.32</td>
      <td>50.14</td>
      <td>56.52</td>
      <td>61.34</td>
      <td>59.13</td>
      <td>50.59</td>
      <td>39.69</td>
      <td>28.17</td>
      <td>25.32</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1897</td>
      <td>18.66</td>
      <td>23.49</td>
      <td>28.27</td>
      <td>38.88</td>
      <td>47.71</td>
      <td>55.31</td>
      <td>60.30</td>
      <td>58.19</td>
      <td>52.77</td>
      <td>42.51</td>
      <td>29.48</td>
      <td>20.88</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1898</td>
      <td>20.57</td>
      <td>23.97</td>
      <td>29.75</td>
      <td>38.05</td>
      <td>47.82</td>
      <td>56.66</td>
      <td>60.31</td>
      <td>59.99</td>
      <td>52.23</td>
      <td>39.54</td>
      <td>27.28</td>
      <td>18.41</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1899</td>
      <td>19.49</td>
      <td>14.65</td>
      <td>26.38</td>
      <td>38.23</td>
      <td>47.57</td>
      <td>55.74</td>
      <td>59.88</td>
      <td>58.69</td>
      <td>50.61</td>
      <td>42.04</td>
      <td>33.94</td>
      <td>21.72</td>
    </tr>
  </tbody>
</table>
</div>




```python
temp_min_lower_48_data.tail()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>118</th>
      <td>2013</td>
      <td>21.79</td>
      <td>24.08</td>
      <td>29.10</td>
      <td>37.26</td>
      <td>48.18</td>
      <td>57.78</td>
      <td>61.99</td>
      <td>60.58</td>
      <td>54.72</td>
      <td>41.54</td>
      <td>30.74</td>
      <td>20.61</td>
    </tr>
    <tr>
      <th>119</th>
      <td>2014</td>
      <td>18.68</td>
      <td>21.24</td>
      <td>28.18</td>
      <td>38.80</td>
      <td>48.45</td>
      <td>57.36</td>
      <td>60.78</td>
      <td>60.26</td>
      <td>54.12</td>
      <td>44.46</td>
      <td>28.22</td>
      <td>28.26</td>
    </tr>
    <tr>
      <th>120</th>
      <td>2015</td>
      <td>22.89</td>
      <td>21.58</td>
      <td>33.03</td>
      <td>40.62</td>
      <td>49.12</td>
      <td>59.07</td>
      <td>61.84</td>
      <td>60.10</td>
      <td>55.74</td>
      <td>45.37</td>
      <td>33.96</td>
      <td>29.25</td>
    </tr>
    <tr>
      <th>121</th>
      <td>2016</td>
      <td>22.59</td>
      <td>28.11</td>
      <td>35.51</td>
      <td>40.80</td>
      <td>48.15</td>
      <td>58.60</td>
      <td>62.53</td>
      <td>61.23</td>
      <td>54.84</td>
      <td>45.55</td>
      <td>36.36</td>
      <td>23.27</td>
    </tr>
    <tr>
      <th>122</th>
      <td>2017</td>
      <td>24.35</td>
      <td>30.20</td>
      <td>34.47</td>
      <td>41.70</td>
      <td>47.86</td>
      <td>57.43</td>
      <td>62.83</td>
      <td>59.76</td>
      <td>53.78</td>
      <td>42.94</td>
      <td>33.87</td>
      <td>23.77</td>
    </tr>
  </tbody>
</table>
</div>




```python
# write "cleaned" data file
csv_file = "{}/{}".format(clean_dir, csv_file_temp["min"])
temp_min_lower_48_data.to_csv(csv_file)
```

#### Cooling & Heating Days


```python
# read data file with ; as delimiter
csv_file = "{}/{}".format(source_dir, csv_file_heatcool["summer"])
cooling_summer_data = pd.read_csv(csv_file,
                                  names = ["Year", "Jan", "Feb", "March", "April", "May", "June", \
                                           "July", "Aug", "Sept", "Oct", "Nov", "Dec"])
```


```python
cooling_summer_data.head()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>10261895</td>
      <td>5</td>
      <td>0</td>
      <td>18</td>
      <td>49</td>
      <td>156</td>
      <td>360</td>
      <td>420</td>
      <td>437</td>
      <td>366</td>
      <td>29</td>
      <td>4</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>10261896</td>
      <td>4</td>
      <td>3</td>
      <td>12</td>
      <td>118</td>
      <td>320</td>
      <td>355</td>
      <td>488</td>
      <td>522</td>
      <td>306</td>
      <td>61</td>
      <td>20</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>10261897</td>
      <td>4</td>
      <td>11</td>
      <td>56</td>
      <td>39</td>
      <td>144</td>
      <td>465</td>
      <td>497</td>
      <td>415</td>
      <td>309</td>
      <td>121</td>
      <td>8</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>10261898</td>
      <td>19</td>
      <td>2</td>
      <td>45</td>
      <td>13</td>
      <td>269</td>
      <td>446</td>
      <td>457</td>
      <td>421</td>
      <td>298</td>
      <td>37</td>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>10261899</td>
      <td>5</td>
      <td>0</td>
      <td>24</td>
      <td>32</td>
      <td>331</td>
      <td>436</td>
      <td>466</td>
      <td>490</td>
      <td>226</td>
      <td>105</td>
      <td>12</td>
      <td>2</td>
    </tr>
  </tbody>
</table>
</div>




```python
cooling_summer_data.tail()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9017</th>
      <td>2100262014</td>
      <td>6</td>
      <td>11</td>
      <td>14</td>
      <td>35</td>
      <td>111</td>
      <td>240</td>
      <td>298</td>
      <td>289</td>
      <td>179</td>
      <td>71</td>
      <td>9</td>
      <td>9</td>
    </tr>
    <tr>
      <th>9018</th>
      <td>2100262015</td>
      <td>8</td>
      <td>6</td>
      <td>28</td>
      <td>51</td>
      <td>123</td>
      <td>252</td>
      <td>333</td>
      <td>312</td>
      <td>220</td>
      <td>73</td>
      <td>27</td>
      <td>24</td>
    </tr>
    <tr>
      <th>9019</th>
      <td>2100262016</td>
      <td>6</td>
      <td>10</td>
      <td>33</td>
      <td>40</td>
      <td>94</td>
      <td>268</td>
      <td>381</td>
      <td>360</td>
      <td>216</td>
      <td>82</td>
      <td>23</td>
      <td>15</td>
    </tr>
    <tr>
      <th>9020</th>
      <td>2100262017</td>
      <td>15</td>
      <td>20</td>
      <td>29</td>
      <td>53</td>
      <td>102</td>
      <td>237</td>
      <td>359</td>
      <td>287</td>
      <td>179</td>
      <td>73</td>
      <td>25</td>
      <td>8</td>
    </tr>
    <tr>
      <th>9021</th>
      <td>2100262018</td>
      <td>6</td>
      <td>21</td>
      <td>19</td>
      <td>29</td>
      <td>170</td>
      <td>265</td>
      <td>373</td>
      <td>-9999</td>
      <td>-9999</td>
      <td>-9999</td>
      <td>-9999. -</td>
      <td>9999</td>
    </tr>
  </tbody>
</table>
</div>




```python
# filter to get only national data (lower 48 states)
cooling_summer_48_data = pd.DataFrame(cooling_summer_data[(cooling_summer_data["Year"] < 1110000000) & \
                                                          (cooling_summer_data["Year"] > 1100000000)])

# washing up the data
cooling_summer_48_data["Year"] = pd.to_numeric(cooling_summer_48_data["Year"].apply(solis.clean_trim_year))

cooling_summer_48_data = cooling_summer_48_data[cooling_summer_48_data.Year != 2018]
cooling_summer_48_data["Nov"] = pd.to_numeric(cooling_summer_48_data["Nov"])
cooling_summer_48_data = cooling_summer_48_data.reset_index(drop = True)
```


```python
cooling_summer_48_data.head()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1895</td>
      <td>6</td>
      <td>1</td>
      <td>13</td>
      <td>27</td>
      <td>88</td>
      <td>225</td>
      <td>256</td>
      <td>282</td>
      <td>190</td>
      <td>31</td>
      <td>9</td>
      <td>3</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1896</td>
      <td>4</td>
      <td>4</td>
      <td>10</td>
      <td>44</td>
      <td>161</td>
      <td>220</td>
      <td>319</td>
      <td>299</td>
      <td>136</td>
      <td>38</td>
      <td>19</td>
      <td>4</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1897</td>
      <td>3</td>
      <td>9</td>
      <td>28</td>
      <td>29</td>
      <td>82</td>
      <td>205</td>
      <td>333</td>
      <td>261</td>
      <td>161</td>
      <td>56</td>
      <td>13</td>
      <td>5</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1898</td>
      <td>9</td>
      <td>5</td>
      <td>20</td>
      <td>23</td>
      <td>106</td>
      <td>235</td>
      <td>321</td>
      <td>298</td>
      <td>176</td>
      <td>38</td>
      <td>10</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1899</td>
      <td>7</td>
      <td>5</td>
      <td>17</td>
      <td>22</td>
      <td>125</td>
      <td>235</td>
      <td>302</td>
      <td>296</td>
      <td>141</td>
      <td>54</td>
      <td>11</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
</div>




```python
cooling_summer_48_data.tail()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>118</th>
      <td>2013</td>
      <td>14</td>
      <td>10</td>
      <td>10</td>
      <td>32</td>
      <td>98</td>
      <td>243</td>
      <td>337</td>
      <td>286</td>
      <td>175</td>
      <td>54</td>
      <td>16</td>
      <td>12</td>
    </tr>
    <tr>
      <th>119</th>
      <td>2014</td>
      <td>6</td>
      <td>11</td>
      <td>14</td>
      <td>35</td>
      <td>111</td>
      <td>240</td>
      <td>298</td>
      <td>289</td>
      <td>179</td>
      <td>71</td>
      <td>9</td>
      <td>9</td>
    </tr>
    <tr>
      <th>120</th>
      <td>2015</td>
      <td>8</td>
      <td>6</td>
      <td>28</td>
      <td>51</td>
      <td>123</td>
      <td>252</td>
      <td>333</td>
      <td>312</td>
      <td>220</td>
      <td>73</td>
      <td>27</td>
      <td>24</td>
    </tr>
    <tr>
      <th>121</th>
      <td>2016</td>
      <td>6</td>
      <td>10</td>
      <td>33</td>
      <td>40</td>
      <td>94</td>
      <td>268</td>
      <td>381</td>
      <td>360</td>
      <td>216</td>
      <td>82</td>
      <td>23</td>
      <td>15</td>
    </tr>
    <tr>
      <th>122</th>
      <td>2017</td>
      <td>15</td>
      <td>20</td>
      <td>29</td>
      <td>53</td>
      <td>102</td>
      <td>237</td>
      <td>359</td>
      <td>287</td>
      <td>179</td>
      <td>73</td>
      <td>25</td>
      <td>8</td>
    </tr>
  </tbody>
</table>
</div>




```python
# write "cleaned" data file
csv_file = "{}/{}".format(clean_dir, csv_file_heatcool["summer"])
cooling_summer_48_data.to_csv(csv_file)
```

***


```python
# read data file with ; as delimiter
csv_file = "{}/{}".format(source_dir, csv_file_heatcool["winter"])
cooling_winter_data = pd.read_csv(csv_file,
                                  names = ["Year", "Jan", "Feb", "March", "April", "May", "June", \
                                           "July", "Aug", "Sept", "Oct", "Nov", "Dec"])
```


```python
cooling_winter_data.head()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>10251895</td>
      <td>716</td>
      <td>799</td>
      <td>372</td>
      <td>114</td>
      <td>33</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>233</td>
      <td>376</td>
      <td>646</td>
    </tr>
    <tr>
      <th>1</th>
      <td>10251896</td>
      <td>692</td>
      <td>516</td>
      <td>428</td>
      <td>47</td>
      <td>4</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>4</td>
      <td>146</td>
      <td>274</td>
      <td>602</td>
    </tr>
    <tr>
      <th>2</th>
      <td>10251897</td>
      <td>751</td>
      <td>421</td>
      <td>238</td>
      <td>135</td>
      <td>39</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>2</td>
      <td>75</td>
      <td>354</td>
      <td>572</td>
    </tr>
    <tr>
      <th>3</th>
      <td>10251898</td>
      <td>544</td>
      <td>555</td>
      <td>245</td>
      <td>228</td>
      <td>8</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>3</td>
      <td>181</td>
      <td>477</td>
      <td>693</td>
    </tr>
    <tr>
      <th>4</th>
      <td>10251899</td>
      <td>689</td>
      <td>731</td>
      <td>341</td>
      <td>148</td>
      <td>3</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>10</td>
      <td>87</td>
      <td>320</td>
      <td>660</td>
    </tr>
  </tbody>
</table>
</div>




```python
cooling_winter_data.tail()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9017</th>
      <td>2100252014</td>
      <td>980</td>
      <td>807</td>
      <td>690</td>
      <td>328</td>
      <td>128</td>
      <td>27</td>
      <td>10</td>
      <td>13</td>
      <td>57</td>
      <td>222</td>
      <td>620</td>
      <td>712</td>
    </tr>
    <tr>
      <th>9018</th>
      <td>2100252015</td>
      <td>900</td>
      <td>879</td>
      <td>592</td>
      <td>303</td>
      <td>119</td>
      <td>24</td>
      <td>6</td>
      <td>11</td>
      <td>31</td>
      <td>230</td>
      <td>448</td>
      <td>585</td>
    </tr>
    <tr>
      <th>9019</th>
      <td>2100252016</td>
      <td>881</td>
      <td>636</td>
      <td>455</td>
      <td>314</td>
      <td>152</td>
      <td>20</td>
      <td>5</td>
      <td>6</td>
      <td>38</td>
      <td>199</td>
      <td>423</td>
      <td>793</td>
    </tr>
    <tr>
      <th>9020</th>
      <td>2100252017</td>
      <td>776</td>
      <td>555</td>
      <td>552</td>
      <td>251</td>
      <td>156</td>
      <td>24</td>
      <td>5</td>
      <td>15</td>
      <td>44</td>
      <td>194</td>
      <td>498</td>
      <td>810</td>
    </tr>
    <tr>
      <th>9021</th>
      <td>2100252018</td>
      <td>910</td>
      <td>634</td>
      <td>620</td>
      <td>419</td>
      <td>86</td>
      <td>26</td>
      <td>-3</td>
      <td>9999</td>
      <td>-9999</td>
      <td>-9999</td>
      <td>-9999</td>
      <td>-9999</td>
    </tr>
  </tbody>
</table>
</div>




```python
# filter to get only national data (lower 48 states)
cooling_winter_48_data = pd.DataFrame(cooling_summer_data[(cooling_winter_data["Year"] < 1110000000) & \
                                                          (cooling_winter_data["Year"] > 1100000000)])

# washing up the data
cooling_winter_48_data["Year"] = pd.to_numeric(cooling_winter_48_data["Year"].apply(solis.clean_trim_year))

cooling_winter_48_data = cooling_winter_48_data[cooling_winter_48_data.Year != 2018]
cooling_winter_48_data["Nov"] = pd.to_numeric(cooling_winter_48_data["Nov"])
cooling_winter_48_data = cooling_winter_48_data.reset_index(drop = True)
```


```python
cooling_winter_48_data.head()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1895</td>
      <td>6</td>
      <td>1</td>
      <td>13</td>
      <td>27</td>
      <td>88</td>
      <td>225</td>
      <td>256</td>
      <td>282</td>
      <td>190</td>
      <td>31</td>
      <td>9</td>
      <td>3</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1896</td>
      <td>4</td>
      <td>4</td>
      <td>10</td>
      <td>44</td>
      <td>161</td>
      <td>220</td>
      <td>319</td>
      <td>299</td>
      <td>136</td>
      <td>38</td>
      <td>19</td>
      <td>4</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1897</td>
      <td>3</td>
      <td>9</td>
      <td>28</td>
      <td>29</td>
      <td>82</td>
      <td>205</td>
      <td>333</td>
      <td>261</td>
      <td>161</td>
      <td>56</td>
      <td>13</td>
      <td>5</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1898</td>
      <td>9</td>
      <td>5</td>
      <td>20</td>
      <td>23</td>
      <td>106</td>
      <td>235</td>
      <td>321</td>
      <td>298</td>
      <td>176</td>
      <td>38</td>
      <td>10</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1899</td>
      <td>7</td>
      <td>5</td>
      <td>17</td>
      <td>22</td>
      <td>125</td>
      <td>235</td>
      <td>302</td>
      <td>296</td>
      <td>141</td>
      <td>54</td>
      <td>11</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
</div>




```python
cooling_winter_48_data.tail()
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>March</th>
      <th>April</th>
      <th>May</th>
      <th>June</th>
      <th>July</th>
      <th>Aug</th>
      <th>Sept</th>
      <th>Oct</th>
      <th>Nov</th>
      <th>Dec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>118</th>
      <td>2013</td>
      <td>14</td>
      <td>10</td>
      <td>10</td>
      <td>32</td>
      <td>98</td>
      <td>243</td>
      <td>337</td>
      <td>286</td>
      <td>175</td>
      <td>54</td>
      <td>16</td>
      <td>12</td>
    </tr>
    <tr>
      <th>119</th>
      <td>2014</td>
      <td>6</td>
      <td>11</td>
      <td>14</td>
      <td>35</td>
      <td>111</td>
      <td>240</td>
      <td>298</td>
      <td>289</td>
      <td>179</td>
      <td>71</td>
      <td>9</td>
      <td>9</td>
    </tr>
    <tr>
      <th>120</th>
      <td>2015</td>
      <td>8</td>
      <td>6</td>
      <td>28</td>
      <td>51</td>
      <td>123</td>
      <td>252</td>
      <td>333</td>
      <td>312</td>
      <td>220</td>
      <td>73</td>
      <td>27</td>
      <td>24</td>
    </tr>
    <tr>
      <th>121</th>
      <td>2016</td>
      <td>6</td>
      <td>10</td>
      <td>33</td>
      <td>40</td>
      <td>94</td>
      <td>268</td>
      <td>381</td>
      <td>360</td>
      <td>216</td>
      <td>82</td>
      <td>23</td>
      <td>15</td>
    </tr>
    <tr>
      <th>122</th>
      <td>2017</td>
      <td>15</td>
      <td>20</td>
      <td>29</td>
      <td>53</td>
      <td>102</td>
      <td>237</td>
      <td>359</td>
      <td>287</td>
      <td>179</td>
      <td>73</td>
      <td>25</td>
      <td>8</td>
    </tr>
  </tbody>
</table>
</div>




```python
# write "cleaned" data file
csv_file = "{}/{}".format(clean_dir, csv_file_heatcool["winter"])
cooling_winter_48_data.to_csv(csv_file)
```

#### end of line
