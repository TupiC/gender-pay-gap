import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RenderService } from '../renderer/render.service';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
})
export class CloudComponent implements OnInit {

  constructor(private engServ: RenderService) { }

  ngOnInit(): void {
    for (let i = 0; i < 5; i++)
      this.spawnCloud();
  }

  private spawnCloud() {
    this.engServ.loader.load("assets/scene.gltf", (gltf) => {

      const randomScale = Math.random() * 0.1 + 0.1;
      gltf.scene.scale.set(randomScale, randomScale, randomScale);

      let speed = Math.random() * 0.1 + 0.01;
      speed *= Math.random() < 0.5 ? -1 : 1;

      if (speed < 0) {
        gltf.scene.position.x = 50;
      } else {
        gltf.scene.position.x = -50;
      }

      const randomYOffset = Math.random() * 5
      gltf.scene.position.y = Math.random() < 0.5 ? randomYOffset : -randomYOffset;
      gltf.scene.position.z = Math.random() * -10;

      const resetPosition = window.innerWidth / 10


      this.engServ.subscribeToAnimation(
        () => {
          gltf.scene.position.x += speed;

          if (speed > 0 && gltf.scene.position.x > resetPosition) {
            gltf.scene.position.x = -50;
            console.log("remove")
          }
          else if (speed < 0 && gltf.scene.position.x < -resetPosition) {
            gltf.scene.position.x = 50;
            console.log("remove")
          }
        }
      )

      this.engServ.scene.add(gltf.scene);
    }, undefined, (error) => {
      console.error(error);
    });
  }
}