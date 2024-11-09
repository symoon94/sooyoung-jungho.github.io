'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Particle {
    position: THREE.Vector3;
    rotation: THREE.Euler;
    speed: number;
    rotationSpeed: number;
}

export default function Snowfall() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0); // 완전 투명 배경
        container.appendChild(renderer.domElement);

        // 하트 모양 생성
        const createHeartShape = () => {
            const shape = new THREE.Shape();
            const x = 0, y = 0;

            shape.moveTo(x, y);
            shape.bezierCurveTo(x + 0.5, y + 0.3, x + 0.8, y - 0.3, x, y - 0.8);
            shape.bezierCurveTo(x - 0.8, y - 0.3, x - 0.5, y + 0.3, x, y);

            return shape;
        };

        const heartShape = createHeartShape();
        const geometry = new THREE.ShapeGeometry(heartShape);
        const material = new THREE.MeshBasicMaterial({
            color: 0xe6ff99,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });

        // 더 많은 파티클 생성
        const particles: Particle[] = [];
        const numParticles = 50; // 파티클 수 증가

        for (let i = 0; i < numParticles; i++) {
            const heart = new THREE.Mesh(geometry, material);

            // 더 넓은 영역에 분포
            const x = (Math.random() - 0.5) * 20; // 좌우 분포 줄임
            const y = Math.random() * 40 - 10; // 시작 높이 다양화
            const z = (Math.random() - 0.5) * 10; // 앞뒤 분포 줄임

            heart.position.set(x, y, z);
            heart.scale.set(0.18, 0.18, 0.18); // 크기를 더 작게 조정

            scene.add(heart);

            particles.push({
                position: heart.position,
                rotation: heart.rotation,
                speed: 0.01 + Math.random() * 0.02, // 속도 줄임
                rotationSpeed: (Math.random() - 0.5) * 0.01 // 회전 속도 줄임
            });
        }

        // 카메라 위치 조정
        camera.position.z = 15;

        const animate = () => {
            requestAnimationFrame(animate);

            particles.forEach((particle, i) => {
                // 아래로 떨어지는 움직임
                particle.position.y -= particle.speed;

                // 좌우로 살짝 흔들리는 움직임 (더 미세하게)
                particle.position.x += Math.sin(Date.now() * 0.001 + i) * 0.003;

                // 회전
                particle.rotation.z += particle.rotationSpeed;

                // 화면 아래로 벗어나면 다시 위로
                if (particle.position.y < -15) {
                    particle.position.y = 15;
                    particle.position.x = (Math.random() - 0.5) * 20;
                    particle.position.z = (Math.random() - 0.5) * 10;
                }
            });

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    );
} 