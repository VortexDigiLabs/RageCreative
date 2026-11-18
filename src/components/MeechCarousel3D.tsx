import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

export interface CarouselItem {
  id: string;
  title: string;
  category: string;
  client?: string;
  type: "video" | "image";
  src: string;
  poster?: string;
  aspect?: number;
}

// 100% Rage Creative assets
export const RAGE_3D_MEDIA: CarouselItem[] = [
  {
    id: "showreel",
    title: "Official Studio Showreel",
    category: "Film & Creative Direction",
    client: "Rage Creative Studio",
    type: "video",
    src: "/videos/hero-background.mp4",
    poster: "/videos/hero-poster.jpg",
    aspect: 16 / 9,
  },
  {
    id: "editorial-ceramics",
    title: "Maison Éthérée",
    category: "Brand Identity & Architecture",
    client: "Éthérée Paris & Cape Town",
    type: "image",
    src: "/images/about-us/1.webp",
    aspect: 4 / 5,
  },
  {
    id: "ai-workflows",
    title: "Intelligent AI Studio",
    category: "Generative Workflows & CGI",
    client: "Rage Innovation Labs",
    type: "video",
    src: "/videos/header-headline-bg.mp4",
    poster: "/videos/header-headline-poster-dark.jpg",
    aspect: 16 / 9,
  },
  {
    id: "luxury-perfumery",
    title: "Haute Botanicals & Perfumery",
    category: "Product Architecture & Packaging",
    client: "Maison De Parfum",
    type: "image",
    src: "/images/products/candle.webp",
    aspect: 1,
  },
  {
    id: "digital-flagship",
    title: "Aurora Sound Architecture",
    category: "Digital Experience & E-Commerce",
    client: "Aurora High Fidelity",
    type: "image",
    src: "/images/about-us/3.webp",
    aspect: 4 / 5,
  },
  {
    id: "motion-spatial",
    title: "Neuro-Spatial Computing",
    category: "3D Motion & Synthetic Sets",
    client: "Kinetica Labs Zurich",
    type: "video",
    src: "/videos/header-background.mp4",
    poster: "/videos/header-poster-dark.jpg",
    aspect: 16 / 9,
  },
  {
    id: "bespoke-craft",
    title: "Bespoke Brand Accelerator",
    category: "Strategic Market Elevation",
    client: "Global Standard Enterprise",
    type: "image",
    src: "/images/about-us/2.webp",
    aspect: 4 / 5,
  },
  {
    id: "cosmetic-elixir",
    title: "Botanical Serum & Formulation",
    category: "Luxury Packaging & Art Direction",
    client: "Aura Skincare",
    type: "image",
    src: "/images/products/serum.webp",
    aspect: 1,
  },
  {
    id: "creative-collective",
    title: "Collaborative Ecosystem",
    category: "Global Specialist Talent",
    client: "Rage Masterminds",
    type: "image",
    src: "/images/masters/maria-garcia.webp",
    aspect: 4 / 5,
  },
  {
    id: "content-production",
    title: "High-Performance Campaigns",
    category: "Content Production & Paid Media",
    client: "Lumina Aesthetics",
    type: "image",
    src: "/images/service-images/facial.webp",
    aspect: 4 / 5,
  },
  {
    id: "artisanal-oil",
    title: "Organic Extract Elixir",
    category: "Commercial Imagery & Styling",
    client: "Pure Element",
    type: "image",
    src: "/images/products/oil.webp",
    aspect: 1,
  },
  {
    id: "studio-culture",
    title: "Where Creativity Meets Intelligence",
    category: "The Core Tenet",
    client: "Rage Creative Cape Town",
    type: "image",
    src: "/images/about-us/4.webp",
    aspect: 4 / 5,
  },
];

interface MeechCarousel3DProps {
  isActive: boolean;
  onToggleActive: () => void;
  onSelectProject?: (project: CarouselItem) => void;
}

export default function MeechCarousel3D({
  isActive,
  onToggleActive,
  onSelectProject,
}: MeechCarousel3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // References to preserve state across renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const videosRef = useRef<HTMLVideoElement[]>([]);
  const texturesRef = useRef<THREE.Texture[]>([]);

  // Physics & Orbit state
  const rotationAngleRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const reqIdRef = useRef<number | null>(null);
  const isInteractiveRef = useRef(isActive);

  // Keep isInteractiveRef in sync with props
  useEffect(() => {
    isInteractiveRef.current = isActive;
    if (isActive) {
      // Resume video playback
      videosRef.current.forEach((v) => {
        v.play().catch(() => {});
      });
    } else {
      // Pause videos to save CPU
      videosRef.current.forEach((v) => {
        v.pause();
      });
      velocityRef.current = 0;
    }
  }, [isActive]);

  // Handle Wheel on container
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isInteractiveRef.current) return;

    // When 3D mode is active, wheel spins the 3D gallery
    e.preventDefault();
    const delta = e.deltaY || e.deltaX;
    velocityRef.current += delta * 0.00035;
    // Cap velocity
    velocityRef.current = Math.max(-0.06, Math.min(0.06, velocityRef.current));
  }, []);

  // Pointer interactions for dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isInteractiveRef.current) return;
    isDraggingRef.current = true;
    lastPointerXRef.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !isInteractiveRef.current) return;
    const deltaX = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;

    // Apply movement
    rotationAngleRef.current += deltaX * 0.0035;
    velocityRef.current = deltaX * 0.0015;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Main Three.js initialization
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // 2. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Warm ambient background tone matching luxury aesthetic
    scene.fog = new THREE.FogExp2(0x181818, 0.022);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    camera.position.set(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Geometry & Texture Setup for 12 Cylindrical Slots
    const count = RAGE_3D_MEDIA.length;
    const radius = width < 768 ? 10.5 : 13.5;
    const planeHeight = width < 768 ? 5.2 : 6.8;

    const textureLoader = new THREE.TextureLoader();
    const meshes: THREE.Mesh[] = [];
    const videos: HTMLVideoElement[] = [];
    const textures: THREE.Texture[] = [];

    RAGE_3D_MEDIA.forEach((item, index) => {
      let texture: THREE.Texture;

      if (item.type === "video") {
        const video = document.createElement("video");
        video.src = item.src;
        video.crossOrigin = "anonymous";
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;
        if (item.poster) video.poster = item.poster;

        // Start playback
        video.play().catch(() => {});

        videos.push(video);
        texture = new THREE.VideoTexture(video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.colorSpace = THREE.SRGBColorSpace;
      } else {
        texture = textureLoader.load(item.src);
        texture.colorSpace = THREE.SRGBColorSpace;
      }
      textures.push(texture);

      const aspect = item.aspect || 1;
      const planeWidth = planeHeight * aspect;

      // Curved or flat plane geometry
      const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 16, 16);

      // Subtle vertical curve to match cylinder arc
      const posAttr = geometry.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const px = posAttr.getX(i);
        // Bend plane slightly backward at edges to hug the cylinder
        posAttr.setZ(i, -(px * px) / (2 * radius));
      }
      geometry.computeVertexNormals();

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Positioning on the cylinder
      const angle = (index / count) * Math.PI * 2;
      const x = radius * Math.sin(angle);
      const z = radius * Math.cos(angle);
      // Subtle organic vertical undulation (meech213 style)
      const y = -0.3 + Math.sin(index * 1.5) * 0.45;

      mesh.position.set(x, y, z);
      // Face inward toward the center (0, 0, 0)
      mesh.lookAt(0, y * 0.5, 0);

      // Store item metadata on the mesh
      mesh.userData = { item, index, baseAngle: angle };

      scene.add(mesh);
      meshes.push(mesh);
    });

    meshesRef.current = meshes;
    videosRef.current = videos;
    texturesRef.current = textures;

    // 5. Render Loop with Inertia & Camera LookAt
    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);

      // Apply velocity and damping
      if (isInteractiveRef.current) {
        if (!isDraggingRef.current) {
          // Slow continuous luxury ambient drift + momentum damping
          rotationAngleRef.current += velocityRef.current;
          velocityRef.current *= 0.92;

          // Tiny ambient auto-pan when idle
          if (Math.abs(velocityRef.current) < 0.0001) {
            rotationAngleRef.current += 0.0006;
          }
        }
      }

      const angle = rotationAngleRef.current;

      // Position camera looking around the cylinder
      if (cameraRef.current) {
        const lookX = radius * Math.sin(angle);
        const lookZ = radius * Math.cos(angle);
        cameraRef.current.position.set(0, 0, 0);
        cameraRef.current.lookAt(lookX, -0.3, lookZ);
      }

      // Determine which item is currently centered
      // The camera looks towards (sin(angle), cos(angle))
      let normalizedAngle = angle % (Math.PI * 2);
      if (normalizedAngle < 0) normalizedAngle += Math.PI * 2;

      let minDiff = Infinity;

      meshes.forEach((mesh) => {
        let diff = Math.abs(mesh.userData.baseAngle - normalizedAngle);
        if (diff > Math.PI) diff = Math.PI * 2 - diff;
        if (diff < minDiff) {
          minDiff = diff;
        }

        // Dynamic scale & opacity focus based on distance to center of view
        const focus = Math.max(0, 1 - minDiff / 1.5);
        mesh.scale.setScalar(0.92 + focus * 0.1);
      });

      renderer.render(scene, camera);
    };

    animate();

    // 6. Native Wheel Event Listener (Passive: false to intercept when active)
    const domElement = container;
    domElement.addEventListener("wheel", handleWheel, { passive: false });

    // 7. Window Resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      domElement.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);

      videos.forEach((v) => {
        v.pause();
        v.src = "";
      });
      textures.forEach((t) => t.dispose());
      meshes.forEach((m) => {
        m.geometry.dispose();
        if (Array.isArray(m.material)) {
          m.material.forEach((mat) => mat.dispose());
        } else {
          m.material.dispose();
        }
      });
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [handleWheel]);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full h-full select-none touch-none ${
        isActive ? "cursor-grab active:cursor-grabbing" : "cursor-default"
      }`}
      aria-label="3D Interactive Media Carousel"
    >
      {/* Drag & Wheel Interaction Cue */}
      {isActive && (
        <div
          className={`absolute top-28 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-500 ${
            isHovered ? "opacity-30" : "opacity-80"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-[#181818]/60 backdrop-blur-md border border-[#E6E1D8]/20 px-3.5 py-1.5 rounded-full text-white/90 text-[11px] uppercase tracking-widest font-mono">
            <span>⇄ Drag or wheel to orbit gallery</span>
          </div>
        </div>
      )}
    </div>
  );
}
