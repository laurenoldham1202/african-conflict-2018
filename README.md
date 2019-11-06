# African Conflicts Resulting in Fatalities, 2018
African conflicts resulting in at least one fatality for year 2018, New Maps Plus MAP675 Module 02

[View the live map here!](https://laurenoldham1202.github.io/african-conflict-2018/)

## Data
African conflict date provided by [The Armed Conflict Location and Event Data Project (ACLED)](https://www.acleddata.com/).
Country boundary polygons provided by [Natural Earth Data](https://www.naturalearthdata.com/downloads/) (1:110m Cultural Vectors > Admin 0 - Countries).

## Geoprocessing
Natural Earth Data provides great country boundaries, but we only want to look at Africa for this project.

First navigate to the `/data` directory and unzip the `ne_110m_admin_0_countries.zip` file. Navigate to the new directory with `cd ne_110m_admin_0_countries` in your terminal.

With mapshaper, preserve only the NAME, CONTINENT, and POP_EST files by using the filter fields parameter. Save as geojson for web mapping:
```
$ mapshaper ne_110m_admin_0_countries.shp -filter-fields NAME,CONTINENT,POP_EST -o precision=.0001 format=geojson ../countries.json
```

Using ogr, filter the data again, pulling only African countries from the new `countries.json` file:
```
$ ogr2ogr -f "GeoJSON" -where "CONTINENT='Africa'" africa-countries.json countries.json
```
