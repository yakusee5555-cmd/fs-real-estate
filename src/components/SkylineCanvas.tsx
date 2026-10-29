import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

/* Real 3D Mumbai-at-dusk skyline for the hero background (plain three.js,
   no drei / no react-three-fiber). Instanced box towers in deep-blue glass
   tones with emissive gold windows, dark navy sky + fog, drifting light
   particles, slow automatic camera sway. NO pointer/mouse control anywhere.
   Pauses off-screen; renders one static frame under reduced motion. */

const SKY = 0x0a142e;
const GOLD = 0xf0c030;

function makeFacadeTextures() {
  const W = 96;
  const H = 192;
  const cols = 5;
  const rows = 16;
  const mx = 10;
  const my = 8;
  const cw = (W - mx * 2) / cols;
  const ch = (H - my * 2) / rows;

  const lit: boolean[] = [];
  for (let i = 0; i < cols * rows; i++) lit.push(Math.random() < 0.42);

  const draw = (litOnly: boolean) => {
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const g = c.getContext("2d")!;
    g.fillStyle = litOnly ? "#000000" : "#2e4c88";
    g.fillRect(0, 0, W, H);
    for (let r = 0; r < rows; r++) {
      for (let col = 0; col < cols; col++) {
        const isLit = lit[r * cols + col];
        if (litOnly && !isLit) continue;
        const x = mx + col * cw + cw * 0.22;
        const y = my + r * ch + ch * 0.22;
        const w = cw * 0.56;
        const h = ch * 0.5;
        if (isLit) {
          const v = 0.75 + Math.random() * 0.25;
          g.fillStyle = `rgba(240,192,48,${v.toFixed(2)})`;
        } else {
          g.fillStyle = "#141f42";
        }
        g.fillRect(x, y, w, h);
      }
    }
    return c;
  };

  const map = new THREE.CanvasTexture(draw(false));
  map.colorSpace = THREE.SRGBColorSpace;
  const emissiveMap = new THREE.CanvasTexture(draw(true));
  emissiveMap.colorSpace = THREE.SRGBColorSpace;
  return { map, emissiveMap };
}

function makeGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "rgba(240,192,48,0.85)");
  grad.addColorStop(0.35, "rgba(240,180,60,0.35)");
  grad.addColorStop(1, "rgba(240,180,60,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function SkylineCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isPhone = window.innerWidth < 640;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isPhone ? 1.5 : 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(SKY);
    scene.fog = new THREE.Fog(SKY, 60, 165);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 400);
    camera.position.set(0, 11, 58);

    scene.add(new THREE.AmbientLight(0x8fa3ff, 0.55));
    const dir = new THREE.DirectionalLight(0xffffff, 0.7);
    dir.position.set(30, 60, 40);
    scene.add(dir);

    // --- towers (single instanced draw call) ---
    const TOWERS = isPhone ? 52 : 88;
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const { map, emissiveMap } = makeFacadeTextures();
    const mat = new THREE.MeshStandardMaterial({
      map,
      emissiveMap,
      emissive: new THREE.Color(GOLD),
      emissiveIntensity: 1.05,
      roughness: 0.85,
      metalness: 0.15,
    });
    const towers = new THREE.InstancedMesh(geo, mat, TOWERS);
    const dummy = new THREE.Object3D();
    const tint = new THREE.Color();
    for (let i = 0; i < TOWERS; i++) {
      const row = i % 3; // 0 = front, 2 = back
      const x = (Math.random() - 0.5) * (row === 2 ? 150 : 110);
      const z = -12 - row * 16 - Math.random() * 10;
      const w = 4 + Math.random() * 4.5;
      const h = (row === 2 ? 22 : 12) + Math.random() * (row === 2 ? 30 : 20);
      const d = 4 + Math.random() * 4;
      dummy.position.set(x, h / 2 - 2.5, z);
      dummy.scale.set(w, h, d);
      dummy.updateMatrix();
      towers.setMatrixAt(i, dummy.matrix);
      tint.setHSL(0.6 + Math.random() * 0.03, 0.45 + Math.random() * 0.2, 0.42 + Math.random() * 0.22);
      towers.setColorAt(i, tint);
    }
    towers.instanceMatrix.needsUpdate = true;
    if (towers.instanceColor) towers.instanceColor.needsUpdate = true;
    scene.add(towers);

    // --- ground ---
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(400, 120),
      new THREE.MeshStandardMaterial({ color: 0x060b1c, roughness: 1 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.6;
    scene.add(ground);

    // --- dusk glow on the horizon ---
    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeGlowTexture(),
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.9,
      })
    );
    glow.scale.set(150, 60, 1);
    glow.position.set(-18, 6, -70);
    scene.add(glow);

    // --- drifting light particles ---
    const P = isPhone ? 70 : 160;
    const pos = new Float32Array(P * 3);
    const spd = new Float32Array(P);
    for (let i = 0; i < P; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 120;
      pos[i * 3 + 1] = Math.random() * 45 - 2;
      pos[i * 3 + 2] = -50 + Math.random() * 70;
      spd[i] = 0.6 + Math.random() * 1.8;
    }
    const pgeo = new THREE.BufferGeometry();
    pgeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const points = new THREE.Points(
      pgeo,
      new THREE.PointsMaterial({
        color: GOLD,
        size: 0.5,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    scene.add(points);

    const lookAt = new THREE.Vector3(0, 13, -25);

    const size = () => {
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    size();
    window.addEventListener("resize", size);

    const renderFrame = (t: number) => {
      // slow automatic camera sway — no pointer control
      camera.position.x = Math.sin(t * 0.00011) * 7;
      camera.position.y = 11 + Math.sin(t * 0.000083) * 1.6;
      camera.lookAt(lookAt);
      const arr = pgeo.attributes.position.array as Float32Array;
      const dt = 0.016;
      for (let i = 0; i < P; i++) {
        arr[i * 3 + 1] += spd[i] * dt;
        arr[i * 3] += Math.sin(t * 0.0004 + i) * 0.008;
        if (arr[i * 3 + 1] > 45) arr[i * 3 + 1] = -2;
      }
      pgeo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    let raf = 0;
    let running = false;
    let disposed = false;

    const dispose = () => {
      disposed = true;
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      geo.dispose();
      mat.dispose();
      map.dispose();
      emissiveMap.dispose();
      (glow.material as THREE.Material).dispose();
      (points.material as THREE.Material).dispose();
      pgeo.dispose();
      (ground.material as THREE.Material).dispose();
      (ground.geometry as THREE.BufferGeometry).dispose();
      renderer.dispose();
    };

    if (reduce) {
      renderFrame(2200); // one static frame
    } else {
      const loop = (t: number) => {
        if (!running || disposed) return;
        renderFrame(t);
        raf = requestAnimationFrame(loop);
      };
      const io = new IntersectionObserver(([e]) => {
        if (disposed) return;
        if (e.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!e.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      });
      io.observe(canvas);
      return () => {
        io.disconnect();
        dispose();
      };
    }
    return dispose;
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="canvas-fadein pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
