import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';
import Confetti from 'react-dom-confetti';
import anime from 'animejs';
import useAppStore from '../store/useAppStore';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const goldenGlow = keyframes`
  0%, 100% { box-shadow: 0 0 30px rgba(234,179,8,0.3); }
  50% { box-shadow: 0 0 60px rgba(234,179,8,0.5); }
`;

const shimmer = keyframes`
  0% { transform: translateX(-200px); }
  100% { transform: translateX(400px); }
`;

const rotateSlow = keyframes`
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
`;

const driftFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
  50% { transform: translateY(-30px) rotate(20deg); opacity: 0.7; }
`;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 80;
  background: #020617;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  max-width: 430px;
  margin: 0 auto;
  overflow: hidden;
`;

const BgRays = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 500px;
  animation: ${rotateSlow} 20s linear infinite;
`;

const Ray = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 200px;
  transform-origin: bottom center;
  transform: rotate(${(p) => p.deg}deg);
  background: linear-gradient(to top, rgba(249,115,22,0.1), transparent);
`;

const FloatingEmoji = styled.span`
  position: absolute;
  font-size: 24px;
  left: ${(p) => p.x}%;
  top: ${(p) => p.y}%;
  animation: ${driftFloat} ${(p) => 3 + p.dur}s ease-in-out ${(p) => p.delay}s infinite;
`;

const ContentWrap = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  width: 100%;
`;

const TrophyCircle = styled.div`
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background: linear-gradient(135deg, #facc15, #d97706);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  animation: ${goldenGlow} 2s ease-in-out infinite, ${float} 2s ease-in-out infinite;
  opacity: 0;
  transform: translateY(-50px) scale(0);
`;

const TrophyEmoji = styled.span`
  font-size: 56px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 800;
  background: linear-gradient(135deg, #fbbf24, #f59e0b, #fbbf24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-top: 32px;
  opacity: 0;
  transform: translateY(30px);
`;

const Description = styled.p`
  font-size: 14px;
  color: #94a3b8;
  margin-top: 12px;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
  opacity: 0;
  transform: translateY(20px);
`;

const GiftCard = styled.div`
  margin-top: 32px;
  padding: 20px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px) scale(0.9);
`;

const GiftCardShimmer = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
  animation: ${shimmer} 3s ease-in-out infinite;
`;

const GiftEmoji = styled.span`
  font-size: 48px;
  display: block;
  position: relative;
  z-index: 5;
`;

const GiftName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #f8fafc;
  margin-top: 12px;
  position: relative;
  z-index: 5;
`;

const DeliveryMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
  position: relative;
  z-index: 5;
`;

const MetaTag = styled.span`
  font-size: 11px;
  color: ${(p) => p.color || '#94a3b8'};
  font-weight: ${(p) => (p.bold ? '600' : '400')};
`;

const MetaDot = styled.span`
  color: #334155;
`;

const RatingSection = styled.div`
  margin-top: 24px;
  opacity: 0;
  transform: translateY(20px);
`;

const RatingLabel = styled.p`
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 8px;
`;

const StarsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const StarItem = styled.span`
  font-size: 28px;
  cursor: pointer;
  opacity: 0;
  transform: scale(0) rotate(-30deg);
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

const BtnShimmer = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: ${shimmer} 2s ease-in-out infinite;
`;

const ConfettiWrap = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  z-index: 100;
`;

const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 35,
  elementCount: 60,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: '10px',
  height: '10px',
  colors: ['#fbbf24', '#f59e0b', '#fb923c', '#f97316', '#eab308'],
};

const floatingEmojis = ['🎉', '⚡', '🎁', '🏆', '✨', '🎊', '🔧', '💪'];

export default function DeliverySuccess() {
  const history = useHistory();
  const { selectedGift } = useAppStore();
  const gift = selectedGift || { name: 'Your Gift', image: '🎁', points: 0 };

  const [confettiActive, setConfettiActive] = useState(false);

  const trophyRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardRef = useRef(null);
  const ratingRef = useRef(null);
  const starRefs = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Trophy
    if (trophyRef.current) {
      anime({
        targets: trophyRef.current,
        translateY: [-50, 0],
        scale: [0, 1],
        opacity: [0, 1],
        duration: 800,
        delay: 200,
        easing: 'spring(1, 80, 10, 0)',
      });
    }

    // Confetti
    setTimeout(() => {
      setConfettiActive(true);
      setTimeout(() => setConfettiActive(false), 100);
    }, 400);

    // Title
    if (titleRef.current) {
      anime({
        targets: titleRef.current,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        delay: 500,
        easing: 'easeOutExpo',
      });
    }

    // Description
    if (descRef.current) {
      anime({
        targets: descRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 700,
        easing: 'easeOutExpo',
      });
    }

    // Gift card
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        translateY: [30, 0],
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 600,
        delay: 900,
        easing: 'spring(1, 80, 10, 0)',
      });
    }

    // Rating section
    if (ratingRef.current) {
      anime({
        targets: ratingRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 1200,
        easing: 'easeOutExpo',
      });
    }

    // Stars
    starRefs.current.forEach((el, i) => {
      if (!el) return;
      anime({
        targets: el,
        scale: [0, 1],
        rotate: [-30, 0],
        opacity: [0, 1],
        duration: 400,
        delay: 1300 + i * 100,
        easing: 'spring(1, 80, 10, 0)',
      });
    });

    // CTA
    if (ctaRef.current) {
      anime({
        targets: ctaRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 1500,
        easing: 'easeOutExpo',
      });
    }

    // Repeat confetti
    const confettiInterval = setInterval(() => {
      setConfettiActive(true);
      setTimeout(() => setConfettiActive(false), 100);
    }, 4000);

    return () => clearInterval(confettiInterval);
  }, []);

  return (
    <Wrapper>
      <BgRays>
        {[...Array(6)].map((_, i) => (
          <Ray key={i} deg={i * 60} />
        ))}
      </BgRays>

      {floatingEmojis.map((emoji, i) => (
        <FloatingEmoji
          key={i}
          x={10 + i * 12}
          y={20 + (i * 8) % 60}
          dur={i * 0.5}
          delay={i * 0.3}
        >
          {emoji}
        </FloatingEmoji>
      ))}

      <ConfettiWrap>
        <Confetti active={confettiActive} config={confettiConfig} />
      </ConfettiWrap>

      <ContentWrap>
        <TrophyCircle ref={trophyRef}>
          <TrophyEmoji>🏆</TrophyEmoji>
        </TrophyCircle>

        <Title ref={titleRef}>Delivery Complete!</Title>

        <Description ref={descRef}>
          Your premium gift has been successfully delivered. Thank you for being
          an amazing electrician partner!
        </Description>

        <GiftCard ref={cardRef}>
          <GiftCardShimmer />
          <GiftEmoji>{gift.image}</GiftEmoji>
          <GiftName>{gift.name}</GiftName>
          <DeliveryMeta>
            <MetaTag color="#4ade80" bold>
              ✓ Delivered
            </MetaTag>
            <MetaDot>&bull;</MetaDot>
            <MetaTag>OTP Verified</MetaTag>
          </DeliveryMeta>
        </GiftCard>

        <RatingSection ref={ratingRef}>
          <RatingLabel>Rate your experience</RatingLabel>
          <StarsRow>
            {[...Array(5)].map((_, i) => (
              <StarItem key={i} ref={(el) => (starRefs.current[i] = el)}>
                ⭐
              </StarItem>
            ))}
          </StarsRow>
        </RatingSection>

        <CTAButton ref={ctaRef} onClick={() => history.push('/home')}>
          <BtnShimmer />
          <span style={{ position: 'relative', zIndex: 10 }}>
            Browse More Gifts ⚡
          </span>
        </CTAButton>
      </ContentWrap>
    </Wrapper>
  );
}
