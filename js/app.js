require([
  'esri/Map',
  'esri/views/MapView',
  'esri/Basemap',
  'esri/layers/VectorTileLayer',
  'esri/layers/FeatureLayer',
  'esri/layers/WebTileLayer',
  'esri/widgets/Search',
  'esri/widgets/Home',
  'esri/widgets/Locate'
],
    function (Map, MapView, Basemap, VectorTileLayer, FeatureLayer, WebTileLayer, Search, Home, Locate) {
      var map, view, searchWidget, homeBtn, locateBtn
      var layers = window.layers
      var featLayers = []

        // Create base layer from Mapbox street layer
      var mapBaseLayer = new WebTileLayer({
        urlTemplate: 'https://api.mapbox.com/styles/v1/fcc/ckh108wiu0bjw19sc7zu16zgt/tiles/256/{level}/{col}/{row}?access_token=pk.eyJ1IjoiZmNjIiwiYSI6InBiaGMyLU0ifQ.LOmVYpUCFv2yWpbvxDdQNg',
        copyright: '\u00A9 OpenStreetMap contributors Design \u00A9 Mapbox'
      })

        // Create base map from Mapbox layer
      var mapBox = new Basemap({
        baseLayers: [mapBaseLayer],
        title: 'Street'
      })

        // Create map
      map = new Map({
        basemap: mapBox
      })

        // Make map view and bind it to the map
      view = new MapView({
        container: 'map',
        map: map,
        center: [-98, 38.48],
        zoom: 4,
        constraints: {
          minZoom: 4,
          maxZoom: 9,
          rotationEnabled: false
        }
      })

        // Add search widget
      searchWidget = new Search({
        view: view
      })

        // Position search widget
      view.ui.add(searchWidget, {
        position: 'top-right',
        index: 2
      })

        // Add Home widget
      homeBtn = new Home({
        view: view
      })

        // Position Home widget
      view.ui.add(homeBtn, 'top-left')

        // Add locate widget
      locateBtn = new Locate({
        view: view
      })

        // Position locate widget
      view.ui.add(locateBtn, {
        position: 'top-left'
      })

      var template = {
        title: 'caf2_auction_cam_auction_cbg_geom',
        content: '<ul style="margin-top: 0"><li>cbg_fips = {cbg_fips}</li><li>reserve_price = {reserve_price}</li><li>locations = {locations}</li><ul>'
      }

      // Create vector tile layer
      var tileLayer = new VectorTileLayer({
        url: 'https://tiles.arcgis.com/tiles/YnOQrIGdN9JGtBh4/arcgis/rest/services/CAF2_Auction_Eligible_Areas_30jan18_fix/VectorTileServer/resources/styles/root.json?f=pjson'
      })

      // Create feature layers
      var fLayer = new FeatureLayer({
        url: 'https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/CAF2_Auction_CGB_Data_30jan18/FeatureServer',
        outFields: ['*']
      })

      fLayer.popupTemplate = template

        // Add tile layers to map
      map.add(fLayer)
      map.add(tileLayer)

        // bind radio button event
        // var radios = document.layerControl.layerOpts;
        // for (var i = 0, radiosLen = radios.length; i < radiosLen; i++) {
        //     radios[i].onchange = function() {
        //         updateLayerVisibility(this.value);
        //     };
        // }

        // toggle layer visibility
        // function updateLayerVisibility(indx) {

        //     for (var i = 0; i < featLayers.length; i++) {
        //         featLayers[i].visible = false;
        //     }

        //     featLayers[indx].visible = true;

        // }

        // set default layer to visible
        // updateLayerVisibility(0);

        // toggle legend display
      $('#btn-closeLegend').on('click', function (e) {
        e.preventDefault()
        $('.map-legend').hide('fast')
      })

      $('#btn-openLegend').on('click', function (e) {
        e.preventDefault()
        $('.map-legend').show('fast')
      })

        // toggle layer control display
      $('#btn-closeLayerCtrl').on('click', function (e) {
        e.preventDefault()
        $('.layer-control').hide('fast')
      })

      $('#btn-openLayerCtrl').on('click', function (e) {
        e.preventDefault()
        $('.layer-control').show('fast')
      })
    })
