
import { AfterViewInit, Component, ElementRef } from '@angular/core';
import * as THREE from "three";
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
})
export class CloudComponent implements AfterViewInit {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;
  private cloud!: GLTF;

  ngAfterViewInit() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load('assets/scene.gltf', (gltf) => {
      scene.add(gltf.scene);
      this.cloud = gltf;
    }, undefined, (error) => {
      console.error(error);
    });

    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 0, 3);
    scene.add(directionalLight);

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    camera.position.z = 40;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);

      if (this.cloud) {
        this.cloud.scene.position.x += 0.5;
        if (this.cloud.scene.position.x > window.innerWidth / 6) {
          this.cloud.scene.position.x = -window.innerWidth / 6;
        }
      }
    };

    animate();
  }
}