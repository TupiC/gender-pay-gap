import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import Globe from "globe.gl";
import * as d3 from "d3";

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobeComponent implements OnInit {
  ngOnInit() {
    const globeElement = document.getElementById("globeViz")
    if (!globeElement) {
      return;
    }
    
    const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);
    const getVal = (feat: any) => feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);
    fetch('../assets/countries.geojson').then(res => res.json()).then(countries => {
      const maxVal = Math.max(...countries.features.map(getVal));
      colorScale.domain([0, maxVal]);
      const world = Globe()
      world(globeElement)
        .globeImageUrl('../assets/earth-night.jpg')
        .polygonsData(countries.features)
        .polygonAltitude(0.06)
        .polygonCapColor(feat => colorScale(getVal(feat)))
        .polygonSideColor(() => 'rgba(50, 50, 50, 1)')
        .polygonStrokeColor(() => '#111')
        .backgroundImageUrl("../assets/night-sky.png")
        .polygonLabel(({ properties: d }: any) => `
          <b class="white">${d.ADMIN} (${d.ISO_A2}):</b> <br />
          GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
          Population: <i>${d.POP_EST}</i>
        `)
        .onPolygonHover(hoverD => world
          .polygonAltitude(d => d === hoverD ? 0.12 : 0.06)
          .polygonCapColor(d => d === hoverD ? 'steelblue' : colorScale(getVal(d)))
        )
        .polygonsTransitionDuration(300)
    });
  }
}
