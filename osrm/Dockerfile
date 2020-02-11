FROM osrm/osrm-backend

ARG PBF=https://download.geofabrik.de/europe/bulgaria-latest.osm.pbf
RUN apt-get update && \
    apt-get install -y --no-install-recommends wget  ca-certificates
RUN mkdir /data && wget --no-check-certificate -O /data/map-latest.osm.pbf $PBF
RUN osrm-extract  -p /opt/car.lua /data/map-latest.osm.pbf
RUN osrm-contract /data/map-latest.osrm

EXPOSE 5000
ENTRYPOINT ["osrm-routed", "/data/map-latest.osrm"]
