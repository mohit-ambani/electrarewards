import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';
import Confetti from 'react-dom-confetti';
import anime from 'animejs';
import useAppStore from '../store/useAppStore';

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(34,197,94,0.3); }
  50% { box-shadow: 0 0 60px rgba(34,197,94,0.5); }
`;

const floatUp = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-100px); opacity: 0; }
`;

const shimmer = keyframes`
  0% { transform: translateX(-200px); }
  100% { transform: translateX(400px); }
`;

const gradientPulse = keyframes`
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.5); }
`;

const bobFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 60;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  max-width: 430px;
  margin: 0 auto;
`;

const BgGlow1 = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 384px;
  height: 384px;
  border-radius: 50%;
  background: rgba(249,115,22,0.06);
  filter: blur(60px);
  animation: ${gradientPulse} 3s ease-in-out infinite;
`;

const BgGlow2 = styled.div`
  position: absolute;
  bottom: 25%;
  left: 50%;
  transform: translate(-50%, 50%);
  width: 256px;
  height: 256px;
  border-radius: 50%;
  background: rgba(59,130,246,0.06);
  filter: blur(60px);
  animation: ${gradientPulse} 4s ease-in-out infinite reverse;
`;

const FloatingParticle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${(p) => p.color};
  left: ${(p) => p.x}%;
  top: ${(p) => p.y}%;
  animation: ${floatUp} ${(p) => 2 + p.dur}s ease-in ${(p) => p.delay}s infinite;
`;

const MainContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 32px;
`;

const CheckCircle = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4ade80, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  animation: ${pulseGlow} 2s ease-in-out infinite;
  opacity: 0;
  transform: scale(0) rotate(-180deg);
`;

const CheckMark = styled.span`
  font-size: 48px;
  color: #fff;
  opacity: 0;
  transform: scale(0);
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 800;
  color: #1a1a2e;
  opacity: 0;
  transform: translateY(30px);
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 14px;
  margin-top: 8px;
  opacity: 0;
  transform: translateY(20px);
`;

const GiftCard = styled.div`
  margin-top: 32px;
  padding: 24px;
  background: #f8f9fb;
  border: 1px solid #e8ecf1;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(40px) scale(0.8);
`;

const GiftCardShimmer = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(249,115,22,0.04), transparent);
  animation: ${shimmer} 3s ease-in-out infinite;
`;

const GiftEmoji = styled.span`
  font-size: 64px;
  display: block;
  animation: ${bobFloat} 2s ease-in-out infinite;
`;

const GiftName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  margin-top: 12px;
`;

const PointsSpent = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #fb923c;
  margin-top: 4px;
`;

const CTAButton = styled.button`
  margin-top: 32px;
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  background: linear-gradient(90deg, #f97316, #ea580c);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(249,115,22,0.3);
  opacity: 0;
  transform: translateY(20px);
`;

const ConfettiWrapper = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  z-index: 100;
`;

const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 80,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: '10px',
  height: '10px',
  colors: ['#fb923c', '#f97316', '#3b82f6', '#22c55e', '#fbbf24', '#a855f7'],
};

export default function RedemptionCelebration() {
  const history = useHistory();
  const { selectedGift } = useAppStore();
  const [phase, setPhase] = useState(0);
  const [confettiActive, setConfettiActive] = useState(false);

  const checkCircleRef = useRef(null);
  const checkMarkRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const giftCardRef = useRef(null);
  const ctaRef = useRef(null);

  const gift = selectedGift || { name: 'Your Gift', image: '🎁', points: 0 };

  useEffect(() => {
    // Phase 1: Checkmark
    const t1 = setTimeout(() => {
      setPhase(1);
      setConfettiActive(true);
      setTimeout(() => setConfettiActive(false), 100);

      if (checkCircleRef.current) {
        anime({
          targets: checkCircleRef.current,
          scale: [0, 1],
          rotate: [-180, 0],
          opacity: [0, 1],
          duration: 800,
          easing: 'spring(1, 80, 10, 0)',
        });
      }
      if (checkMarkRef.current) {
        anime({
          targets: checkMarkRef.current,
          scale: [0, 1],
          opacity: [0, 1],
          duration: 400,
          delay: 500,
          easing: 'spring(1, 80, 10, 0)',
        });
      }
    }, 300);

    // Phase 2: Title
    const t2 = setTimeout(() => {
      setPhase(2);
      if (titleRef.current) {
        anime({
          targets: titleRef.current,
          translateY: [30, 0],
          opacity: [0, 1],
          duration: 600,
          easing: 'easeOutExpo',
        });
      }
      if (subtitleRef.current) {
        anime({
          targets: subtitleRef.current,
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 500,
          delay: 200,
          easing: 'easeOutExpo',
        });
      }
    }, 1500);

    // Phase 3: Gift card
    const t3 = setTimeout(() => {
      setPhase(3);
      setConfettiActive(true);
      setTimeout(() => setConfettiActive(false), 100);

      if (giftCardRef.current) {
        anime({
          targets: giftCardRef.current,
          translateY: [40, 0],
          scale: [0.8, 1],
          opacity: [0, 1],
          duration: 600,
          easing: 'spring(1, 80, 10, 0)',
        });
      }
    }, 2500);

    // Phase 4: CTA
    const t4 = setTimeout(() => {
      setPhase(4);
      if (ctaRef.current) {
        anime({
          targets: ctaRef.current,
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 500,
          easing: 'easeOutExpo',
        });
      }
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <Wrapper>
      <BgGlow1 />
      <BgGlow2 />

      {[...Array(20)].map((_, i) => (
        <FloatingParticle
          key={i}
          color={i % 2 === 0 ? '#fb923c' : '#3b82f6'}
          x={Math.random() * 100}
          y={60 + Math.random() * 40}
          dur={Math.random() * 2}
          delay={Math.random() * 3}
        />
      ))}

      <ConfettiWrapper>
        <Confetti active={confettiActive} config={confettiConfig} />
      </ConfettiWrapper>

      <MainContent>
        {phase >= 1 && (
          <CheckCircle ref={checkCircleRef}>
            <CheckMark ref={checkMarkRef}>✓</CheckMark>
          </CheckCircle>
        )}

        {phase >= 2 && (
          <>
            <Title ref={titleRef}>Congratulations! 🎉</Title>
            <Subtitle ref={subtitleRef}>
              Your gift has been successfully redeemed
            </Subtitle>
          </>
        )}

        {phase >= 3 && (
          <GiftCard ref={giftCardRef}>
            <GiftCardShimmer />
            <GiftEmoji>{gift.image}</GiftEmoji>
            <GiftName>{gift.name}</GiftName>
            <PointsSpent>
              ⚡ {gift.points.toLocaleString()} Points Redeemed
            </PointsSpent>
          </GiftCard>
        )}

        {phase >= 4 && (
          <CTAButton ref={ctaRef} onClick={() => history.push('/tracking')}>
            <ShimmerOverlayInner />
            <span style={{ position: 'relative', zIndex: 10 }}>
              Track Your Gift 📦
            </span>
          </CTAButton>
        )}
      </MainContent>
    </Wrapper>
  );
}

const shimmerInner = keyframes`
  0% { transform: translateX(-200px); }
  100% { transform: translateX(400px); }
`;

const ShimmerOverlayInner = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: ${shimmerInner} 2s ease-in-out infinite;
`;
