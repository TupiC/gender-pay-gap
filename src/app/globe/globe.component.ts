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

    const colorScale = d3.scaleSequential(d3.interpolateBlues);
    const getIndex = (feat: any) => feat.properties.Gender_Index;

    Promise.all([
      fetch('../assets/countries.geojson').then(res => res.json()),
      fetch('../assets/gender-index.csv').then(
        res =>
          res.text().then(text => text.split('\n').map((line: string) => {
            const row = line.split(';');
            return { Country: row[0], Index: parseFloat(row[1]) };
          })))
    ]).then(([countries, genderIndexData]) => {
      countries.features.forEach((feature: { properties: { ADMIN: any; Gender_Index: string; }; }) => {
        const indexData = genderIndexData.find((indexItem: { Country: any; }) => indexItem.Country === feature.properties.ADMIN);

        if (indexData) {
          feature.properties.Gender_Index = indexData.Index.toString();
        } else {
          console.log(`No data for country: ${feature.properties.ADMIN}`);
          feature.properties.Gender_Index = 'N/A';
        }
      });

      const indexValues = genderIndexData.map(d => d.Index).filter(v => !isNaN(v));
      const minVal = Math.min(...indexValues);
      const maxVal = Math.max(...indexValues);
      colorScale.domain([minVal, maxVal]);
      const world = Globe()

      world(globeElement)
        .globeImageUrl('../assets/earth-night.jpg')
        .polygonsData(countries.features)
        .polygonAltitude(0.06)
        .polygonCapColor(feat => {
          const index = getIndex(feat);
          return index !== 'N/A' ? colorScale(index * 10) : 'rgba(100, 100, 100, 1)';
        })
        .polygonSideColor(() => 'rgba(50, 50, 50, 1)')
        .polygonStrokeColor(() => '#111')
        .backgroundImageUrl("../assets/night-sky.png")
        .polygonLabel(({ properties: d }: any) => `
        <div class="bg-black white p-2 rounded-md">
          <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
          Population: <i>${d.POP_EST}</i><br/>
          Gender Index: <i>${d.Gender_Index}</i>
        </div>
        `)
        .onPolygonHover(hoverD => world
          .polygonAltitude(d => d === hoverD ? 0.12 : 0.06)
          .polygonCapColor(d => d === hoverD ? 'steelblue' : getIndex(d) !== 'N/A' ? colorScale(getIndex(d)) : 'rgba(100, 100, 100, 1)')
        )
        .polygonsTransitionDuration(300)
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
