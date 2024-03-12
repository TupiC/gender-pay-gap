import { Component, OnInit } from '@angular/core';
import Globe from "globe.gl";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'info_vis';

  ngOnInit() {

    const globeElement = document.getElementById("globeViz")

    if (!globeElement) {
      return;
    }
    fetch("../assets/countries.geojson")
      .then((res) => res.json())
      .then((countries) => {
        const world = Globe();
        world(globeElement)
          .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
          .polygonsData(countries.features) // Set the polygons data to the loaded countries
          .polygonCapColor(() => '#193251') // Color of the countries
          .polygonStrokeColor(() => '#000'); // Border color of the countries
      });
  }
}
