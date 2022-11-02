import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js'
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js'

const canvasBox = document.getElementById('canvas-box');

var json = {
  "metadata": {
    "version": 4.5,
    "type": "Object",
    "generator": "Object3D.toJSON"
  },
  "geometries": [
    {
      "uuid": "601f26e2-9c78-48fd-8c46-d8190d3cbfe3",
      "type": "LatheGeometry",
      "name": "DrehDing",
      "points": [
        {
          "x": 0,
          "y": -0.25
        },
        {
          "x": 0.25,
          "y": 0
        },
        {
          "x": 0,
          "y": 0.25
        }],
      "segments": 4,
      "phiStart": 0,
      "phiLength": 6.283185307179586
    }],
  "materials": [
    {
      "uuid": "36bc97e1-1a38-400f-b42f-cb74fd9f0785",
      "type": "MeshPhongMaterial",
      "color": 7960706,
      "emissive": 0,
      "specular": 1118481,
      "shininess": 10,
      "reflectivity": 1,
      "refractionRatio": 0.98,
      "depthFunc": 3,
      "depthTest": true,
      "depthWrite": true,
      "colorWrite": true,
      "stencilWrite": false,
      "stencilWriteMask": 255,
      "stencilFunc": 519,
      "stencilRef": 0,
      "stencilFuncMask": 255,
      "stencilFail": 7680,
      "stencilZFail": 7680,
      "stencilZPass": 7680
    }],
  "object": {
    "uuid": "3741222A-BD8F-401C-A5D2-5A907E891896",
    "type": "Scene",
    "name": "Scene",
    "layers": 1,
    "matrix": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    "children": [
      {
        "uuid": "B7CBBC6F-EC26-49B5-8D0D-67D9C535924B",
        "type": "Group",
        "name": "Dummy",
        "layers": 1,
        "matrix": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 1],
        "children": [
          {
            "uuid": "60B69C58-4201-43FD-815E-AD2EDFBBD0CE",
            "type": "PerspectiveCamera",
            "name": "PerspectiveCamera",
            "layers": 1,
            "matrix": [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1],
            "fov": 50,
            "zoom": 1,
            "near": 0.1,
            "far": 100,
            "focus": 10,
            "aspect": 1.8123496391339213,
            "filmGauge": 35,
            "filmOffset": 0
          }]
      },
      {
        "uuid": "E2939A7B-5E40-438A-8C1B-32126FBC6892",
        "type": "PointLight",
        "name": "PointLight 1",
        "layers": 1,
        "matrix": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -2.678694204244674, 2.284510704984978, 2.549, 1],
        "color": 9474221,
        "intensity": 1,
        "distance": 0,
        "decay": 1,
        "shadow": {
          "camera": {
            "uuid": "EFF42F46-1E27-4B36-B9D9-CF7D879D258E",
            "type": "PerspectiveCamera",
            "layers": 1,
            "fov": 90,
            "zoom": 1,
            "near": 0.5,
            "far": 500,
            "focus": 10,
            "aspect": 1,
            "filmGauge": 35,
            "filmOffset": 0
          }
        }
      },
      {
        "uuid": "3412781E-27CC-43C3-A5DB-54C0C8E42ED6",
        "type": "PointLight",
        "name": "PointLight 2",
        "layers": 1,
        "matrix": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1.847, 0.083, 2.2777290009358078, 1],
        "color": 12773063,
        "intensity": 1,
        "distance": 0,
        "decay": 1,
        "shadow": {
          "camera": {
            "uuid": "81E800FE-E8A7-4A9E-AFAA-4F04FD56AFE4",
            "type": "PerspectiveCamera",
            "layers": 1,
            "fov": 90,
            "zoom": 1,
            "near": 0.5,
            "far": 500,
            "focus": 10,
            "aspect": 1,
            "filmGauge": 35,
            "filmOffset": 0
          }
        }
      },
    ],
    "fog": {
      "type": "FogExp2",
      "color": 11184810,
      "density": 0.05
    }
  }
}
const scene = new THREE.ObjectLoader().parse(json);

const camera = new THREE.PerspectiveCamera(75, canvasBox.clientWidth / canvasBox.clientHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvasBox.clientWidth, canvasBox.clientHeight);
renderer.setClearColor(0x000000, 0); // the default

canvasBox.appendChild(renderer.domElement);

const loader = new GLTFLoader();

let box;

const group = new THREE.Group();
group.name = 'Group';

loader.load('assets/MenuBox.glbb', function (gltf) {
  const [cube, heading, home] = gltf.scene.children

  group.add(cube);
  group.add(heading);
  group.add(home);

  box = scene.children.find(child => child.name === 'Group');
});

scene.add(group)

camera.position.z = 20;

function animate () {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();

function rotateCube (visible) {
  if (visible && box.rotation.x === 0) return

  var counter = 0
  if (visible) {
    var interval = setInterval(function () {
      counter++
      box.rotation.x += 0.01;
      renderer.render(scene, camera);
      if (counter === 150) {
        clearInterval(interval)
      }
    }, 10)
  } else {
    var interval = setInterval(function () {
      counter++
      box.rotation.x -= 0.01;
      renderer.render(scene, camera);
      if (counter === 150) {
        clearInterval(interval)
      }
    }, 10)
  }
}

const theHeading = document.getElementById("the-heading")

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    rotateCube(entry.isIntersecting)
  });
});

observer.observe(theHeading);