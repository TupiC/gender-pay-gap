import * as THREE from 'three';
import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable({ providedIn: 'root' })
export class RenderService implements OnDestroy {
    private canvas!: HTMLCanvasElement | null;
    private renderer!: THREE.WebGLRenderer | null;
    private camera!: THREE.PerspectiveCamera;
    public scene!: THREE.Scene;
    private light!: THREE.AmbientLight;
    public loader!: GLTFLoader;

    private frameId!: number | null;

    public constructor(private ngZone: NgZone) {
    }

    public ngOnDestroy(): void {
        if (this.frameId != null) {
            cancelAnimationFrame(this.frameId);
        }
        if (this.renderer != null) {
            this.renderer.dispose();
            this.renderer = null;
            this.canvas = null;
        }
    }

    public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
        this.canvas = canvas.nativeElement;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            75, window.innerWidth / window.innerHeight, 0.1, 1000
        );
        this.camera.position.z = 5;
        this.scene.add(this.camera);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 0, 1);
        this.scene.add(directionalLight);

        this.light = new THREE.AmbientLight(0x000000);
        this.light.position.z = 10;
        this.scene.add(this.light);

        this.loader = new GLTFLoader();
    }

    private animationSubscribers: (() => void)[] = [];

    public subscribeToAnimation(callback: () => void): void {
        this.animationSubscribers.push(callback);
    }

    public unsubscribeFromAnimation(callback: () => void): void {
        const index = this.animationSubscribers.indexOf(callback);
        if (index !== -1) {
            this.animationSubscribers.splice(index, 1);
        }
    }

    public animate(): void {
        // We have to run this outside angular zones,
        // because it could trigger heavy changeDetection cycles.
        this.ngZone.runOutsideAngular(() => {
            if (document.readyState !== 'loading') {
                this.render();
            } else {
                window.addEventListener('DOMContentLoaded', () => {
                    this.render();
                });
            }

            window.addEventListener('resize', () => {
                this.resize();
            });
        });
    }

    public render(): void {
        this.frameId = requestAnimationFrame(() => {
            this.render();
            this.animationSubscribers.forEach(callback => callback());
            console.log(this.animationSubscribers.length)
        });

        if (this.renderer)
            this.renderer.render(this.scene, this.camera);
    }

    public resize(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        if (this.renderer)
            this.renderer.setSize(width, height);
    }

}