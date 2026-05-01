import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';
import anime from 'animejs';

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(251,146,60,0.3); }
  50% { box-shadow: 0 0 60px rgba(251,146,60,0.6); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #020617;
  overflow: hidden;
`;

const BgGlow = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(251,146,60,0.15) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${gradientShift} 4s ease infinite;
`;

const ArcLine = styled.div`
  position: absolute;
  width: 1px;
  height: 100%;
  left: ${(p) => 15 + p.idx * 15}%;
  background: linear-gradient(to bottom, transparent, rgba(251,146,60,0.25), transparent);
  opacity: 0;
`;

const BoltBox = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 24px;
  background: linear-gradient(135deg, #fb923c, #ea580c);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  position: relative;
  opacity: 0;
  transform: scale(0) rotate(-180deg);
  animation: ${pulseGlow} 2s ease-in-out infinite;
`;

const Particle = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fb923c;
  left: 50%;
  top: 50%;
  margin-left: -4px;
  margin-top: -4px;
  opacity: 0;
`;

const BrandName = styled.h1`
  margin-top: 32px;
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(135deg, #fb923c, #f97316, #fb923c);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0;
  transform: translateY(20px);
  animation: ${gradientShift} 3s ease infinite;
`;

const Tagline = styled.p`
  margin-top: 12px;
  color: #94a3b8;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(10px);
`;

const LoadingBarTrack = styled.div`
  margin-top: 32px;
  width: 192px;
  height: 4px;
  background: #1e293b;
  border-radius: 4px;
  overflow: hidden;
  opacity: 0;
`;

const LoadingBarFill = styled.div`
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #f97316, #fb923c);
  border-radius: 4px;
`;

export default function SplashScreen() {
  const history = useHistory();
  const [phase, setPhase] = useState(0);
  const boltRef = useRef(null);
  const particlesRef = useRef([]);
  const brandRef = useRef(null);
  const taglineRef = useRef(null);
  const loadingTrackRef = useRef(null);
  const loadingFillRef = useRef(null);
  const arcRefs = useRef([]);

  useEffect(() => {
    // Arc animations
    arcRefs.current.forEach((el, i) => {
      if (!el) return;
      anime({
        targets: el,
        opacity: [0, 0.3, 0],
        scaleY: [0, 1, 0],
        duration: 1500,
        delay: 200 * i,
        loop: true,
        easing: 'easeInOutSine',
      });
    });

    // Phase 0: Bolt appears
    const t0 = setTimeout(() => {
      setPhase(0);
      if (boltRef.current) {
        anime({
          targets: boltRef.current,
          scale: [0, 1],
          rotate: [-180, 0],
          opacity: [0, 1],
          duration: 800,
          easing: 'spring(1, 80, 10, 0)',
        });
      }
    }, 100);

    // Phase 1: Particles + Brand name
    const t1 = setTimeout(() => {
      setPhase(1);
      particlesRef.current.forEach((el, i) => {
        if (!el) return;
        const angle = (i * Math.PI) / 4;
        anime({
          targets: el,
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          translateX: [0, Math.cos(angle) * 60],
          translateY: [0, Math.sin(angle) * 60],
          duration: 1000,
          delay: i * 100,
          easing: 'easeOutExpo',
        });
      });
      if (brandRef.current) {
        anime({
          targets: brandRef.current,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          easing: 'easeOutExpo',
        });
      }
    }, 500);

    // Phase 2: Tagline + Loading bar
    const t2 = setTimeout(() => {
      setPhase(2);
      if (taglineRef.current) {
        anime({
          targets: taglineRef.current,
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 500,
          easing: 'easeOutExpo',
        });
      }
      if (loadingTrackRef.current) {
        anime({
          targets: loadingTrackRef.current,
          opacity: [0, 1],
          duration: 300,
          easing: 'easeOut',
        });
      }
      if (loadingFillRef.current) {
        anime({
          targets: loadingFillRef.current,
          width: ['0%', '100%'],
          duration: 1000,
          easing: 'easeInOutQuad',
        });
      }
    }, 1200);

    // Phase 3: Navigate
    const t3 = setTimeout(() => {
      setPhase(3);
      history.push('/home');
    }, 2000 + 1200);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [history]);

  return (
    <Wrapper>
      <BgGlow />

      {[...Array(6)].map((_, i) => (
        <ArcLine
          key={i}
          idx={i}
          ref={(el) => (arcRefs.current[i] = el)}
        />
      ))}

      <div style={{ position: 'relative' }}>
        <BoltBox ref={boltRef}>
          <span role="img" aria-label="bolt">⚡</span>
        </BoltBox>

        {phase >= 1 &&
          [...Array(8)].map((_, i) => (
            <Particle
              key={i}
              ref={(el) => (particlesRef.current[i] = el)}
            />
          ))}
      </div>

      <BrandName ref={brandRef}>ElectraRewards</BrandName>

      <Tagline ref={taglineRef}>
        Premium Rewards for Pro Electricians
      </Tagline>

      <LoadingBarTrack ref={loadingTrackRef}>
        <LoadingBarFill ref={loadingFillRef} />
      </LoadingBarTrack>
    </Wrapper>
  );
}
