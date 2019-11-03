# african-conflict-2018
African conflicts resulting in at least one fatality for year 2018, New Maps Plus MAP675 Module 02

## Data
Country boundary polygons provided by Natural Earth Data.

## Geoprocessing
Natural Earth Data provides great country boundaries, but we only want to look at Africa for this project.

First navigate to the `/data` directory and unzip the `ne_110m_admin_0_countries.zip` file. Navigate to the new directory with `cd ne_110m_admin_0_countries` in your terminal.

With mapshaper, preserve only the NAME, CONTINENT, and POP_EST files by using the filter fields parameter. Also simplify the shapfile and save as geojson for web mapping:
```
$ mapshaper ne_110m_admin_0_countries.shp -filter-fields NAME,CONTINENT,POP_EST -simplify dp 15% -o precision=.0001 format=geojson ../countries.json
```

Using ogr, filter the data again, pulling only African countries from the new `countries.json` file:
```
$ ogr2ogr -f "GeoJSON" -where "CONTINENT='Africa'" africa-countries.json countries.json
```
