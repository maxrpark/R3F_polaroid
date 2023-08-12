import * as THREE from "three";

// desktop
export const initialCameraPosition = new THREE.Vector3(2.44, 4.9, 8.9);
export const cameraLookAt_1 = new THREE.Vector3(-1.81, -0.13, 1.16);
export const cameraLookAt_2 = new THREE.Vector3(0.9, 0.6, 1.8);
export const cameraLookAt_3 = new THREE.Vector3(0.68, 0.41, 2.37);
export const cameraLookAt_4 = new THREE.Vector3(1.14, -0.15, 1.16);
export const cameraLookAt_5 = new THREE.Vector3(0.53, -0.69, 1.58);
export const cameraLookAt_6 = new THREE.Vector3(0.18, -0.64, 0.99);
export const cameraLookAt_7 = new THREE.Vector3(-0.27, 0, 0.8);

// mobile

export const initialCameraPosition_mobile = new THREE.Vector3(
  8.93,
  5.99,
  12.17
);
export const cameraLookAt_1_mobile = new THREE.Vector3(0.25, -1.03, 0.58);
export const cameraLookAt_2_mobile = new THREE.Vector3(-0.28, -1.28, 0.42);
export const cameraLookAt_3_mobile = new THREE.Vector3(-0.21, -1.21, 0.44);
export const cameraLookAt_4_mobile = new THREE.Vector3(-0.08, -1.55, 0.59);
export const cameraLookAt_5_mobile = new THREE.Vector3(-0.28, -1.41, 0.626);
export const cameraLookAt_6_mobile = new THREE.Vector3(0.159, -1.66, 0.408);

export const cameraLookAt_7_mobile = new THREE.Vector3(0.26, -0.69, -0.19);

export const colors = [
  new THREE.Color("#FF6F61"),
  new THREE.Color("#000000"),
  new THREE.Color("#FFFFFF"),
  new THREE.Color("#434345"),
  new THREE.Color("#77DD77"),
  new THREE.Color("#198cd9"),
];

export const detailsData = [
  {
    id: "detail-1",
    title: "Real Life is beautifully imperfect",
    text: "In other words: take sharper shots. The Polaroid Now selects which lens is suitable, meaning you can take beautiful photos in more places, more often, with less hassle — even without the flash.",

    cameraPositionDesktop: new THREE.Vector3(-3.84, 2.6, 8.76),
    cameraPositionMobile: new THREE.Vector3(-8.73, 6.86, 10.92),

    cameraLookAtDesktop: cameraLookAt_2,
    cameraLookAtMobile: cameraLookAt_2_mobile,
  },
  {
    id: "detail-2",
    title: "Autofocus 2-lens system",
    text: "In other words: take sharper shots. The Polaroid Now selects which lens is suitable, meaning you can take beautiful photos in more places, more often, with less hassle — even without the flash.",
    cameraPositionDesktop: new THREE.Vector3(3.81, 1.17, 4.48),
    cameraPositionMobile: new THREE.Vector3(-5.74, 1.35, 8.23),

    cameraLookAtDesktop: cameraLookAt_3,
    cameraLookAtMobile: cameraLookAt_3_mobile,
  },
  {
    id: "detail-3",
    title: "Classic look, future-facing materials",
    text: "The iconic camera retains its style, but is now made with 40% recycled materials.",
    cameraPositionDesktop: new THREE.Vector3(-4.68, 1.13, 5.3),
    cameraPositionMobile: new THREE.Vector3(5.64, 4.24, 8.65),

    cameraLookAtDesktop: cameraLookAt_4,
    cameraLookAtMobile: cameraLookAt_4_mobile,
  },
];
