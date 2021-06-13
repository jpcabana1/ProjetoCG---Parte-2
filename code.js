import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

class BasicWorldDemo {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(width, height);

    document.body.appendChild(this._threejs.domElement);

    window.addEventListener(
      "resize",
      () => {
        this._OnWindowResize();
      },
      false
    );

    const fov = 60;
    const aspect = width / height;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(75, 20, 0);

    this._scene = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(20, 100, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 100;
    light.shadow.camera.right = -100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    this._scene.add(light);

    light = new THREE.AmbientLight(0x101010);
    this._scene.add(light);

    const controls = new OrbitControls(this._camera, this._threejs.domElement);
    controls.target.set(0, 20, 0);
    controls.update();

    // const loader = new THREE.CubeTextureLoader();
    // const texture = loader.load([
    //   "./resources/posx.jpg",
    //   "./resources/negx.jpg",
    //   "./resources/posy.jpg",
    //   "./resources/negy.jpg",
    //   "./resources/posz.jpg",
    //   "./resources/negz.jpg",
    // ]);
    // this._scene.background = texture;

    //----------------------plane------------------------
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        wireframe: false,
        wireframeLinewidth: 1,
      })
    );
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    this._scene.add(plane);

    //-------------------box------------------------------
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshStandardMaterial({
        color: 0x27ab3f,
      })
    );
    box.position.set(0, 1, 0);
    box.castShadow = true;
    box.receiveShadow = true;
    this._scene.add(box);
    //-------------------triagule------------------------------
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(5, 5, 4),
      new THREE.MeshStandardMaterial({
        color: 0x3b27ab,
      })
    );
    cone.position.set(50, 5, 50);
    cone.castShadow = true;
    cone.receiveShadow = true;
    this._scene.add(cone);
    //-------------------spheree---------------------------
    const spheree = new THREE.Mesh(
      new THREE.SphereGeometry(2, 32, 32),
      new THREE.MeshStandardMaterial({
        color: "rgb(255, 0, 0)",
        wireframe: false,
        wireframeLinewidth: 4,
      })
    );
    spheree.position.set(5, 1, 0);
    spheree.castShadow = true;
    spheree.receiveShadow = true;
    //spheree.name = "oi";
    this._scene.add(spheree);
    console.log(spheree.id);
    //-----------------------------------------------------
    objs.push(plane);
    objs.push(box);
    objs.push(cone);
    objs.push(spheree);
    console.log(objs);

    this._RAF();
  }

  _OnWindowResize() {
    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(width, height);
  }

  _RAF() {
    requestAnimationFrame(() => {
      this._threejs.render(this._scene, this._camera);
      this._RAF();
    });
  }
}

const width = 1920;
const height = 1080;
const objs = [];
const objTypes = {
  Cubo: 0,
  Piramide: 1,
  Cone: 2,
  Cilindro: 3,
};

let _APP = null;

window.addEventListener("DOMContentLoaded", () => {
  _APP = new BasicWorldDemo();
});
