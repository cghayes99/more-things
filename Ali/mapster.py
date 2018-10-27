## Imports
# Dependencies and Setup
import pandas as pd
import numpy as np
import datetime, json, requests, time, csv
from pandas.io.json import json_normalize

#### Google Places API text search
#### {store} in {state}
####
#### https://maps.googleapis.com/maps/api/place/textsearch/json?query=Target+in+MO&key=AIzaSyBTygt0iTuAHmp5A-BYjE_byAROQ_E5y0M

## Google Places API 
google_api_url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query={}+in+{}&key=AIzaSyBTygt0iTuAHmp5A-BYjE_byAROQ_E5y0M"

states = ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"]

# sample dataset
sam_states = ["MO","IL"]
sam_stores = ["BEST-BUY","TARGET","ACE-HARDWARE"]

'''
## Functions
-------------------------------------------------
'''
def current_date_timestamp():
    return time.strftime('%Y-%m-%d-%H.%M.%S')

def get_geo(state, store):
    url = google_api_url.format(store, state)
    print('Calling Google API: {}'.format(url))

    resp = requests.get(url).json()
    result = json_normalize(resp['results'])

    return result

# output file -- current datestamp
# makes unique name
csv_file = "bfa.stores.geo-loc.{}.csv".format(current_date_timestamp())

# store all the goods
summary_df = pd.DataFrame()

# list of states, stores
lstates = ["MO"]
lstores = ["Ben and Jerry's"] ## <<<< must be a list 

print('Mapster: START ##########################')

# loop thru list of stores
for store in lstores:
    print('Getting lat(s)/log(s) for : {}'.format(store))

    for state in lstates:
        print('Feteching geo data [state]: {}'.format(state))

        # calls Google API function
        # JSON output puting in dataframe; Pandas is nice
        geo_result = get_geo(state, store)
        df = pd.DataFrame(geo_result)
        print('Result DataFrame length   : {}'.format(len(df)))

        # moves on if there are not results from search
        if len(df) > 0:
            df['bfa.store'] = store
            df['bfa.state'] = state

            geo_df = pd.DataFrame(df[['bfa.store', 'bfa.state', 'place_id', 'name', 'formatted_address', 'geometry.location.lat', 'geometry.location.lng']])
            print('Geo data DataFrame shape  : {}'.format(df.shape))

            summary_df = pd.concat([summary_df, geo_df])
            print('Summary data frame shape  : {}'.format(summary_df.shape))

print('Final summary geo DataFrame {}'.format(summary_df.info()))

# write output to CSV file
summary_df.to_csv(csv_file, index=False, quoting=csv.QUOTE_ALL)

