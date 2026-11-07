import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RotateCw, Sun, ChevronUp, ChevronDown, Layers, Camera, Palette, Sparkles, Check } from 'lucide-react';

interface ThreeCarShowcaseProps {
  initialVehicleType?: 'suv' | 'sedan' | 'luxury_suv';
  onBookClick?: () => void;
  carName?: string;
  priceKes?: number;
}

const COLOR_PRESETS = [
  { id: 'obsidian', name: 'Obsidian Black', hex: 0x0c0d10, roughness: 0.18, metalness: 0.92 },
  { id: 'titanium_gold', name: 'Nairobi Gold Titanium', hex: 0xa89060, roughness: 0.22, metalness: 0.88 },
  { id: 'charcoal', name: 'Matte Graphite', hex: 0x22242a, roughness: 0.42, metalness: 0.70 },
  { id: 'platinum', name: 'Platinum Silver', hex: 0xd8dcde, roughness: 0.15, metalness: 0.95 },
  { id: 'riviera', name: 'Imperial Blue', hex: 0x0f2442, roughness: 0.20, metalness: 0.90 },
];

export const ThreeCarShowcase: React.FC<ThreeCarShowcaseProps> = ({
  initialVehicleType = 'suv',
  onBookClick,
  carName = 'Apex LC300 GR Sport',
  priceKes = 45000,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isControlsOpen, setIsControlsOpen] = useState(true);
  const [selectedColor, setSelectedColor] = useState(COLOR_PRESETS[0]);
  const [autoRotate, setAutoRotate] = useState(true);
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [explodedFactor, setExplodedFactor] = useState(0);
  const [cameraView, setCameraView] = useState<'front' | 'side' | 'rear' | 'top'>('front');

  // Mutable refs for Three.js render loop
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
    carBodyGroup: THREE.Group;
    bodyMaterial: THREE.MeshPhysicalMaterial;
    headlights: THREE.PointLight[];
    headlightMeshes: THREE.Mesh[];
    explodedParts: { mesh: THREE.Object3D; basePos: THREE.Vector3; explodeDir: THREE.Vector3 }[];
    targetCamPos: THREE.Vector3;
    targetControlsTarget: THREE.Vector3;
    isTransitioningCam: boolean;
    isSoftwareGl: boolean;
  } | null>(null);

  // Update car paint material when selectedColor changes
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.bodyMaterial.color.setHex(selectedColor.hex);
      sceneRef.current.bodyMaterial.roughness = selectedColor.roughness;
      sceneRef.current.bodyMaterial.metalness = selectedColor.metalness;
      sceneRef.current.bodyMaterial.needsUpdate = true;
    }
  }, [selectedColor]);

  // Update headlights
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.headlights.forEach((light) => {
        light.intensity = headlightsOn ? (sceneRef.current?.isSoftwareGl ? 1.5 : 3.0) : 0;
      });
      sceneRef.current.headlightMeshes.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.emissive.setHex(headlightsOn ? 0xeef5ff : 0x222222);
        mat.emissiveIntensity = headlightsOn ? 1.8 : 0.1;
      });
    }
  }, [headlightsOn]);

  // Update exploded view factor
  useEffect(() => {
    if (sceneRef.current) {
      const { explodedParts } = sceneRef.current;
      explodedParts.forEach(({ mesh, basePos, explodeDir }) => {
        mesh.position.copy(basePos).addScaledVector(explodeDir, explodedFactor * 0.9);
      });
    }
  }, [explodedFactor]);

  // Update camera view presets
  useEffect(() => {
    if (!sceneRef.current) return;
    const { targetCamPos, targetControlsTarget } = sceneRef.current;
    sceneRef.current.isTransitioningCam = true;

    if (cameraView === 'front') {
      targetCamPos.set(4.2, 1.8, 4.6);
      targetControlsTarget.set(0, 0.7, 0);
    } else if (cameraView === 'side') {
      targetCamPos.set(5.8, 1.2, 0.1);
      targetControlsTarget.set(0, 0.7, 0);
    } else if (cameraView === 'rear') {
      targetCamPos.set(-4.4, 1.8, -4.2);
      targetControlsTarget.set(0, 0.7, 0);
    } else if (cameraView === 'top') {
      targetCamPos.set(0.1, 7.5, 0.5);
      targetControlsTarget.set(0, 0.7, 0);
    }
  }, [cameraView]);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 580;

    // 1. Detect Software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Scene & Fog
    const scene = new THREE.Scene();
    const bgColor = new THREE.Color(0x0a0a0d);
    scene.background = bgColor;
    scene.fog = new THREE.FogExp2(0x0a0a0d, 0.045);

    // 4. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4.2, 1.8, 4.6);

    // 5. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.04; // Don't clip through ground
    controls.minDistance = 2.8;
    controls.maxDistance = 11.0;
    controls.target.set(0, 0.7, 0);

    // 6. Mandatory Studio Environment Reflection (RoomEnvironment + PMREMGenerator)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 7. Studio Lighting Rig
    // Warm key light
    const keyLight = new THREE.DirectionalLight(0xfff3e0, 2.8);
    keyLight.position.set(5, 7, 5);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0004;
      keyLight.shadow.normalBias = 0.02;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 20;
      const d = 4;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
    }
    scene.add(keyLight);

    // Cool fill light
    const hemiLight = new THREE.HemisphereLight(0xddeeff, 0x141820, 0.9);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    // Sharp gold rim/backlight
    const rimLight = new THREE.DirectionalLight(0xf5d799, 1.6);
    rimLight.position.set(-6, 4, -6);
    scene.add(rimLight);

    // 8. Procedural Ground Turntable with Radial Contact Shadow
    // Contact shadow canvas texture
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 512;
    shadowCanvas.height = 512;
    const sCtx = shadowCanvas.getContext('2d')!;
    const radGrad = sCtx.createRadialGradient(256, 256, 30, 256, 256, 240);
    radGrad.addColorStop(0, 'rgba(0, 0, 0, 0.92)');
    radGrad.addColorStop(0.35, 'rgba(0, 0, 0, 0.65)');
    radGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.25)');
    radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = radGrad;
    sCtx.fillRect(0, 0, 512, 512);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowGeo = new THREE.PlaneGeometry(6.4, 6.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.85,
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.015;
    scene.add(contactShadow);

    // Studio Turntable Ring
    const turntableGeo = new THREE.RingGeometry(2.6, 2.65, 64);
    const turntableMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const turntableRing = new THREE.Mesh(turntableGeo, turntableMat);
    turntableRing.rotation.x = -Math.PI / 2;
    turntableRing.position.y = 0.018;
    scene.add(turntableRing);

    // Outer subtle floor grid
    const floorGridGeo = new THREE.PlaneGeometry(30, 30);
    const floorGridMat = new THREE.MeshStandardMaterial({
      color: 0x0e0f14,
      roughness: 0.75,
      metalness: 0.2,
    });
    const floorGrid = new THREE.Mesh(floorGridGeo, floorGridMat);
    floorGrid.rotation.x = -Math.PI / 2;
    floorGrid.position.y = 0;
    floorGrid.receiveShadow = !isSoftwareGl;
    scene.add(floorGrid);

    // 9. Procedural Procedural Canvas Texture for Tire Treads & Carbon details
    const tireCanvas = document.createElement('canvas');
    tireCanvas.width = 256;
    tireCanvas.height = 256;
    const tCtx = tireCanvas.getContext('2d')!;
    tCtx.fillStyle = '#1c1c1f';
    tCtx.fillRect(0, 0, 256, 256);
    tCtx.fillStyle = '#101013';
    for (let i = 0; i < 256; i += 16) {
      tCtx.fillRect(i, 0, 8, 256);
      tCtx.fillRect(0, i, 256, 8);
    }
    const tireTexture = new THREE.CanvasTexture(tireCanvas);
    tireTexture.wrapS = THREE.RepeatWrapping;
    tireTexture.wrapT = THREE.RepeatWrapping;
    tireTexture.repeat.set(4, 1);

    // 10. Composite 3–12 Part Procedural Vehicle Model
    const carRootGroup = new THREE.Group();
    carRootGroup.position.y = 0;
    scene.add(carRootGroup);

    // Body Paint Material (Physical luxury paint)
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: COLOR_PRESETS[0].hex,
      roughness: COLOR_PRESETS[0].roughness,
      metalness: COLOR_PRESETS[0].metalness,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      metalness: 0.95,
      roughness: 0.1,
    });

    const blackTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0x16171a,
      roughness: 0.6,
      metalness: 0.3,
    });

    const tireMaterial = new THREE.MeshStandardMaterial({
      color: 0x242426,
      roughness: 0.85,
      metalness: 0.1,
      bumpMap: tireTexture,
      bumpScale: 0.04,
    });

    const brakeCaliperMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Nairobi luxury gold calipers
      roughness: 0.3,
      metalness: 0.8,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111620,
      metalness: 0.1,
      roughness: 0.05,
      transmission: isSoftwareGl ? 0 : 0.88,
      transparent: true,
      opacity: isSoftwareGl ? 0.65 : 0.95,
      ior: 1.52,
    });

    const headlightMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xeef5ff,
      emissiveIntensity: 1.8,
      roughness: 0.1,
    });

    const taillightMat = new THREE.MeshStandardMaterial({
      color: 0xff2222,
      emissive: 0xcc0000,
      emissiveIntensity: 1.5,
      roughness: 0.1,
    });

    // Tracking parts for exploded view
    const explodedParts: { mesh: THREE.Object3D; basePos: THREE.Vector3; explodeDir: THREE.Vector3 }[] = [];

    // Part 1: Main Chassis / Lower Hull
    const isSuv = initialVehicleType !== 'sedan';
    const bodyLength = 3.9;
    const bodyWidth = 1.76;
    const bodyHeight = isSuv ? 0.72 : 0.54;
    const bodyY = isSuv ? 0.68 : 0.52;

    const lowerHullGeo = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyLength);
    const lowerHull = new THREE.Mesh(lowerHullGeo, bodyMaterial);
    lowerHull.position.set(0, bodyY, 0);
    lowerHull.castShadow = !isSoftwareGl;
    lowerHull.receiveShadow = !isSoftwareGl;
    carRootGroup.add(lowerHull);
    explodedParts.push({ mesh: lowerHull, basePos: lowerHull.position.clone(), explodeDir: new THREE.Vector3(0, 0, 0) });

    // Part 2: Sculpted Hood & Front Fascia
    const hoodGeo = new THREE.BoxGeometry(bodyWidth * 0.96, bodyHeight * 0.42, 1.25);
    const hoodMesh = new THREE.Mesh(hoodGeo, bodyMaterial);
    hoodMesh.position.set(0, bodyY + (isSuv ? 0.28 : 0.18), 1.25);
    hoodMesh.castShadow = !isSoftwareGl;
    carRootGroup.add(hoodMesh);
    explodedParts.push({ mesh: hoodMesh, basePos: hoodMesh.position.clone(), explodeDir: new THREE.Vector3(0, 0.4, 0.4) });

    // Part 3: Front Luxury Grille (Horizontal Chrome slats)
    const grilleGeo = new THREE.BoxGeometry(1.2, 0.38, 0.08);
    const grilleMesh = new THREE.Mesh(grilleGeo, chromeMaterial);
    grilleMesh.position.set(0, bodyY + 0.06, bodyLength / 2 + 0.04);
    carRootGroup.add(grilleMesh);
    explodedParts.push({ mesh: grilleMesh, basePos: grilleMesh.position.clone(), explodeDir: new THREE.Vector3(0, 0, 0.8) });

    // Part 4: Upper Greenhouse / Cabin & Roof
    const cabinLength = isSuv ? 2.3 : 1.9;
    const cabinWidth = bodyWidth * 0.86;
    const cabinHeight = isSuv ? 0.64 : 0.52;
    const cabinY = bodyY + bodyHeight / 2 + cabinHeight / 2;

    const cabinGeo = new THREE.BoxGeometry(cabinWidth, cabinHeight, cabinLength);
    const cabinMesh = new THREE.Mesh(cabinGeo, glassMaterial);
    cabinMesh.position.set(0, cabinY, -0.2);
    cabinMesh.castShadow = !isSoftwareGl;
    carRootGroup.add(cabinMesh);
    explodedParts.push({ mesh: cabinMesh, basePos: cabinMesh.position.clone(), explodeDir: new THREE.Vector3(0, 0.6, 0) });

    // Part 5: Roof Top Panel & Safari Rails
    const roofPanelGeo = new THREE.BoxGeometry(cabinWidth * 0.98, 0.06, cabinLength * 0.98);
    const roofPanel = new THREE.Mesh(roofPanelGeo, bodyMaterial);
    roofPanel.position.set(0, cabinY + cabinHeight / 2 + 0.03, -0.2);
    roofPanel.castShadow = !isSoftwareGl;
    carRootGroup.add(roofPanel);
    explodedParts.push({ mesh: roofPanel, basePos: roofPanel.position.clone(), explodeDir: new THREE.Vector3(0, 0.9, 0) });

    if (isSuv) {
      // Roof rails for executive SUV
      const railGeo = new THREE.BoxGeometry(0.04, 0.05, cabinLength * 0.9);
      const railLeft = new THREE.Mesh(railGeo, chromeMaterial);
      railLeft.position.set(cabinWidth * 0.44, cabinY + cabinHeight / 2 + 0.07, -0.2);
      const railRight = new THREE.Mesh(railGeo, chromeMaterial);
      railRight.position.set(-cabinWidth * 0.44, cabinY + cabinHeight / 2 + 0.07, -0.2);
      carRootGroup.add(railLeft, railRight);
      explodedParts.push({ mesh: railLeft, basePos: railLeft.position.clone(), explodeDir: new THREE.Vector3(0.3, 0.9, 0) });
      explodedParts.push({ mesh: railRight, basePos: railRight.position.clone(), explodeDir: new THREE.Vector3(-0.3, 0.9, 0) });
    }

    // Part 6: Headlights & Taillights
    const headlightMeshes: THREE.Mesh[] = [];
    const headlights: THREE.PointLight[] = [];

    // Left & Right LED Headlight units
    const hlGeo = new THREE.BoxGeometry(0.34, 0.12, 0.06);
    const hlLeft = new THREE.Mesh(hlGeo, headlightMat);
    hlLeft.position.set(0.64, bodyY + 0.14, bodyLength / 2 + 0.04);
    const hlRight = new THREE.Mesh(hlGeo, headlightMat);
    hlRight.position.set(-0.64, bodyY + 0.14, bodyLength / 2 + 0.04);
    carRootGroup.add(hlLeft, hlRight);
    headlightMeshes.push(hlLeft, hlRight);
    explodedParts.push({ mesh: hlLeft, basePos: hlLeft.position.clone(), explodeDir: new THREE.Vector3(0.3, 0, 0.6) });
    explodedParts.push({ mesh: hlRight, basePos: hlRight.position.clone(), explodeDir: new THREE.Vector3(-0.3, 0, 0.6) });

    // Actual point lights for headlights
    const pLightL = new THREE.PointLight(0xe0f0ff, 2.8, 8);
    pLightL.position.set(0.64, bodyY + 0.14, bodyLength / 2 + 0.5);
    const pLightR = new THREE.PointLight(0xe0f0ff, 2.8, 8);
    pLightR.position.set(-0.64, bodyY + 0.14, bodyLength / 2 + 0.5);
    carRootGroup.add(pLightL, pLightR);
    headlights.push(pLightL, pLightR);

    // Taillights
    const tlGeo = new THREE.BoxGeometry(0.38, 0.1, 0.06);
    const tlLeft = new THREE.Mesh(tlGeo, taillightMat);
    tlLeft.position.set(0.64, bodyY + 0.16, -bodyLength / 2 - 0.04);
    const tlRight = new THREE.Mesh(tlGeo, taillightMat);
    tlRight.position.set(-0.64, bodyY + 0.16, -bodyLength / 2 - 0.04);
    carRootGroup.add(tlLeft, tlRight);
    explodedParts.push({ mesh: tlLeft, basePos: tlLeft.position.clone(), explodeDir: new THREE.Vector3(0.3, 0, -0.6) });
    explodedParts.push({ mesh: tlRight, basePos: tlRight.position.clone(), explodeDir: new THREE.Vector3(-0.3, 0, -0.6) });

    // Part 7: Side Mirrors
    const mirrorGeo = new THREE.BoxGeometry(0.2, 0.12, 0.14);
    const mirrorL = new THREE.Mesh(mirrorGeo, bodyMaterial);
    mirrorL.position.set(bodyWidth / 2 + 0.11, cabinY - 0.12, 0.6);
    const mirrorR = new THREE.Mesh(mirrorGeo, bodyMaterial);
    mirrorR.position.set(-bodyWidth / 2 - 0.11, cabinY - 0.12, 0.6);
    carRootGroup.add(mirrorL, mirrorR);
    explodedParts.push({ mesh: mirrorL, basePos: mirrorL.position.clone(), explodeDir: new THREE.Vector3(0.5, 0, 0) });
    explodedParts.push({ mesh: mirrorR, basePos: mirrorR.position.clone(), explodeDir: new THREE.Vector3(-0.5, 0, 0) });

    // Part 8: 4 Luxury Wheel & Rim Assemblies
    const wheelRadius = isSuv ? 0.38 : 0.34;
    const wheelWidth = 0.26;
    const wheelPositions = [
      { x: bodyWidth / 2 + 0.02, z: 1.15, isLeft: true },
      { x: -bodyWidth / 2 - 0.02, z: 1.15, isLeft: false },
      { x: bodyWidth / 2 + 0.02, z: -1.25, isLeft: true },
      { x: -bodyWidth / 2 - 0.02, z: -1.25, isLeft: false },
    ];

    const wheelGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 24);
    wheelGeo.rotateZ(Math.PI / 2);

    const rimGeo = new THREE.CylinderGeometry(wheelRadius * 0.72, wheelRadius * 0.72, wheelWidth + 0.01, 16);
    rimGeo.rotateZ(Math.PI / 2);

    const caliperGeo = new THREE.BoxGeometry(0.08, wheelRadius * 0.44, 0.12);

    wheelPositions.forEach((pos, idx) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(pos.x, wheelRadius, pos.z);

      // Rubber Tire
      const tireMesh = new THREE.Mesh(wheelGeo, tireMaterial);
      tireMesh.castShadow = !isSoftwareGl;
      wheelGroup.add(tireMesh);

      // Alloy Rim
      const rimMesh = new THREE.Mesh(rimGeo, chromeMaterial);
      wheelGroup.add(rimMesh);

      // Gold Caliper
      const caliper = new THREE.Mesh(caliperGeo, brakeCaliperMaterial);
      caliper.position.set(pos.isLeft ? -0.05 : 0.05, 0.08, 0.04);
      wheelGroup.add(caliper);

      carRootGroup.add(wheelGroup);
      const explodeDir = new THREE.Vector3(pos.isLeft ? 0.6 : -0.6, 0, 0);
      explodedParts.push({ mesh: wheelGroup, basePos: wheelGroup.position.clone(), explodeDir });
    });

    // Part 9: Dual Polished Exhaust Outlets
    const exhaustGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.22, 16);
    exhaustGeo.rotateX(Math.PI / 2);
    const exLeft = new THREE.Mesh(exhaustGeo, chromeMaterial);
    exLeft.position.set(0.5, bodyY - 0.18, -bodyLength / 2 - 0.08);
    const exRight = new THREE.Mesh(exhaustGeo, chromeMaterial);
    exRight.position.set(-0.5, bodyY - 0.18, -bodyLength / 2 - 0.08);
    carRootGroup.add(exLeft, exRight);

    // Store references
    sceneRef.current = {
      renderer,
      scene,
      camera,
      controls,
      carBodyGroup: carRootGroup,
      bodyMaterial,
      headlights,
      headlightMeshes,
      explodedParts,
      targetCamPos: camera.position.clone(),
      targetControlsTarget: controls.target.clone(),
      isTransitioningCam: false,
      isSoftwareGl,
    };

    // 11. Animation Loop with Software-GL safety & Lossless Exponential Damping
    let frameId = 0;
    let lastTime = performance.now();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const clock = new THREE.Clock();

    function tick() {
      const delta = Math.min(clock.getDelta(), 0.1);

      // Auto-rotation
      if (autoRotate && !sceneRef.current?.isTransitioningCam) {
        carRootGroup.rotation.y += delta * 0.35;
      }

      // Smooth camera transition using exponential damping
      if (sceneRef.current && sceneRef.current.isTransitioningCam) {
        const factor = 1 - Math.exp(-6 * delta);
        camera.position.lerp(sceneRef.current.targetCamPos, factor);
        controls.target.lerp(sceneRef.current.targetControlsTarget, factor);

        if (camera.position.distanceTo(sceneRef.current.targetCamPos) < 0.05) {
          sceneRef.current.isTransitioningCam = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 580;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [initialVehicleType]);

  return (
    <div className="relative w-full h-[520px] lg:h-[620px] bg-neutral-950 overflow-hidden rounded-2xl border border-neutral-800/80 shadow-2xl">
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Bar Spec Badges (Minimal, zero-pill text format as per guidelines) */}
      <div className="absolute top-4 left-5 z-10 pointer-events-none flex flex-col gap-1">
        <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold">3D Vehicle Stage</span>
        <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">{carName}</h3>
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span>PBR Studio Lighting</span>
          <span aria-hidden="true">·</span>
          <span>360° Interactive Orbit</span>
          <span aria-hidden="true">·</span>
          <span className="text-amber-400 font-mono">KES {priceKes.toLocaleString()} / day</span>
        </div>
      </div>

      {/* Quick Action Top-Right */}
      <div className="absolute top-4 right-5 z-10 flex items-center gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            autoRotate
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
              : 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:text-white'
          }`}
          title="Toggle Turntable Rotation"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span>{autoRotate ? 'Auto Orbit: On' : 'Orbit: Paused'}</span>
        </button>

        <button
          onClick={() => setHeadlightsOn(!headlightsOn)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            headlightsOn
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
              : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-white'
          }`}
          title="Toggle Headlights"
        >
          <Sun className="w-3.5 h-3.5" />
          <span>{headlightsOn ? 'Lights: On' : 'Lights: Off'}</span>
        </button>
      </div>

      {/* Unified Bottom Control Dock (Follows Section 5 of Three.js skill: <=15% footprint, collapsible, pinned bottom center) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[94%] max-w-[820px] pointer-events-auto">
        {/* Collapse toggle tab */}
        <div className="flex justify-center -mb-[1px]">
          <button
            onClick={() => setIsControlsOpen(!isControlsOpen)}
            className="flex items-center gap-1.5 px-3.5 py-1 text-[11px] font-medium text-neutral-300 bg-neutral-900 border border-b-0 border-neutral-700/80 rounded-t-lg hover:text-white hover:bg-neutral-800 transition-colors"
          >
            {isControlsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            <span>{isControlsOpen ? 'Minimize Controls' : 'Customizer Dock'}</span>
          </button>
        </div>

        {/* Floating Dock Surface */}
        {isControlsOpen && (
          <div className="bg-neutral-900/95 border border-neutral-800 rounded-xl p-3 shadow-2xl transition-all">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
              {/* Finish / Color Picker */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium flex items-center gap-1">
                  <Palette className="w-3 h-3 text-amber-400" /> Finish:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {COLOR_PRESETS.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: `#${color.hex.toString(16).padStart(6, '0')}` }}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        selectedColor.id === color.id
                          ? 'border-amber-400 scale-110 shadow-md shadow-amber-500/20'
                          : 'border-neutral-600 hover:border-neutral-400'
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Camera Perspective Presets */}
              <div className="flex items-center justify-center gap-1 bg-neutral-950/80 p-1 rounded-lg border border-neutral-800">
                <button
                  onClick={() => setCameraView('front')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    cameraView === 'front' ? 'bg-neutral-800 text-amber-400 font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Front
                </button>
                <button
                  onClick={() => setCameraView('side')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    cameraView === 'side' ? 'bg-neutral-800 text-amber-400 font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setCameraView('rear')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    cameraView === 'rear' ? 'bg-neutral-800 text-amber-400 font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Rear
                </button>
                <button
                  onClick={() => setCameraView('top')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    cameraView === 'top' ? 'bg-neutral-800 text-amber-400 font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Top
                </button>
              </div>

              {/* Exploded View Slider + Direct CTA */}
              <div className="flex items-center justify-end gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-neutral-400 whitespace-nowrap">Explode:</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={explodedFactor}
                    onChange={(e) => setExplodedFactor(parseFloat(e.target.value))}
                    className="w-20 accent-amber-500 cursor-pointer"
                    title="Component Exploded View"
                  />
                </div>
                {onBookClick && (
                  <button
                    onClick={onBookClick}
                    className="px-3.5 py-1.5 text-xs font-semibold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg hover:from-amber-300 hover:to-amber-400 transition-all shadow-md whitespace-nowrap"
                  >
                    Reserve Now
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
