import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import anime from 'animejs';
import Swal from 'sweetalert2';
import useAppStore from '../store/useAppStore';
import { getGiftById } from '../data/gifts';
import { createRedemption } from '../services/api';
import { twGradient } from '../utils/colors';

const earnMethods = [
  { icon: '🔧', label: 'Complete Jobs', points: '+500' },
  { icon: '📄', label: 'Upload Bills', points: '+200' },
  { icon: '📅', label: 'Daily Login', points: '+50' },
  { icon: '⭐', label: 'Referrals', points: '+300' },
];

const shimmer = keyframes`
  0% { transform: translateX(-200px); }
  100% { transform: translateX(400px); }
`;

const sparkleAnim = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

const wobble = keyframes`
  0%, 100% { transform: rotate(-8deg); }
  50% { transform: rotate(8deg); }
`;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  max-width: 430px;
  margin: 0 auto;
  overflow-y: auto;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(8px);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`;

const ImageArea = styled.div`
  position: relative;
  height: 280px;
  background: ${(p) => p.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
`;

const Bubble = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,${(p) => p.opacity || 0.1});
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  top: ${(p) => p.top};
  left: ${(p) => p.left};
  right: ${(p) => p.right};
  bottom: ${(p) => p.bottom};
`;

const Sparkle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #fff;
  left: ${(p) => p.x}%;
  top: ${(p) => p.y}%;
  animation: ${sparkleAnim} ${(p) => 2 + p.delay * 0.3}s ease-in-out ${(p) => p.delay * 0.2}s infinite;
`;

const GiftEmoji = styled.span`
  font-size: 96px;
  position: relative;
  z-index: 5;
  filter: drop-shadow(0 8px 24px rgba(0,0,0,0.3));
  opacity: 0;
`;

const Tag = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 4px 12px;
  border-radius: 12px;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(4px);
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  opacity: 0;
`;

const LockedOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;

const LockedBadge = styled.div`
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  padding: 8px 16px;
  border: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LockIcon = styled.span`
  display: inline-block;
  font-size: 20px;
  animation: ${wobble} 1.5s ease-in-out infinite;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px 20px 140px;
`;

const GiftName = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: #1a1a2e;
  line-height: 1.3;
  opacity: 0;
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  opacity: 0;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const Star = styled.span`
  font-size: 14px;
  color: ${(p) => (p.filled ? '#fbbf24' : '#d1d5db')};
`;

const RatingVal = styled.span`
  font-size: 13px;
  color: #6b7280;
  margin-left: 4px;
`;

const Dot = styled.span`
  color: #d1d5db;
`;

const Category = styled.span`
  font-size: 12px;
  color: #6b7280;
  text-transform: capitalize;
`;

const Description = styled.p`
  font-size: 14px;
  color: #4b5563;
  margin-top: 16px;
  line-height: 1.6;
  opacity: 0;
`;

const PointsCard = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: #f8f9fb;
  border: 1px solid #e8ecf1;
  border-radius: 16px;
  opacity: 0;
`;

const PointsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PointsLabel = styled.p`
  font-size: 11px;
  color: #6b7280;
  margin: 0;
`;

const PointsCost = styled.p`
  font-size: 22px;
  font-weight: 800;
  color: #fb923c;
  margin: 4px 0 0;
`;

const BalanceValue = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: ${(p) => (p.canAfford ? '#4ade80' : '#f87171')};
  margin: 4px 0 0;
  text-align: right;
`;

const GreenBar = styled.div`
  margin-top: 12px;
  height: 2px;
  background: linear-gradient(90deg, #22c55e, #10b981);
  border-radius: 2px;
  width: 0%;
`;

const ProgressBarTrack = styled.div`
  margin-top: 12px;
  height: 8px;
  background: #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #ef4444, #f59e0b, #fbbf24);
  border-radius: 8px;
`;

const ProgressLabel = styled.p`
  font-size: 10px;
  color: #6b7280;
  text-align: center;
  margin: 6px 0 0;
`;

const DeliveryGrid = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const DeliveryItem = styled.div`
  text-align: center;
  padding: 12px;
  background: #f8f9fb;
  border: 1px solid #e8ecf1;
  border-radius: 12px;
  opacity: 0;
`;

const DeliveryIcon = styled.span`
  font-size: 18px;
`;

const DeliveryLabel = styled.p`
  font-size: 10px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 4px 0 0;
`;

const DeliverySub = styled.p`
  font-size: 9px;
  color: #9ca3af;
  margin: 2px 0 0;
`;

const DeficitCard = styled.div`
  margin-top: 20px;
  background: #f8f9fb;
  border: 1px solid #e8ecf1;
  border-radius: 16px;
  padding: 16px;
  text-align: center;
`;

const DeficitText = styled.p`
  font-size: 14px;
  color: #4b5563;
  margin-top: 8px;
`;

const EarnTitle = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 16px 0 8px;
`;

const EarnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const EarnItem = styled.div`
  background: #f8f9fb;
  border: 1px solid #e8ecf1;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
`;

const EarnIcon = styled.span`
  font-size: 20px;
`;

const EarnLabel = styled.p`
  font-size: 10px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 4px 0 0;
`;

const EarnPoints = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: #fb923c;
  margin: 2px 0 0;
`;

const BottomCTA = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, #ffffff 60%, transparent);
  max-width: 430px;
  margin: 0 auto;
  z-index: 30;
`;

const RedeemBtn = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 700;
  background: linear-gradient(90deg, #f97316, #ea580c);
  color: #fff;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(249,115,22,0.3);
  opacity: 0;
`;

const ShimmerOverlay = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  & > div {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    animation: ${shimmer} 2s ease-in-out infinite;
  }
`;

const LockedBtn = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 700;
  background: #f1f5f9;
  border: 1px solid #e8ecf1;
  color: #6b7280;
  text-align: center;
  opacity: 0;
`;

export default function GiftDetail() {
  const history = useHistory();
  const { id } = useParams();
  const { selectedGift, userPoints, redeemGift, setSelectedGift } = useAppStore();

  const gift = selectedGift || getGiftById(Number(id));

  const emojiRef = useRef(null);
  const tagRef = useRef(null);
  const nameRef = useRef(null);
  const ratingRef = useRef(null);
  const descRef = useRef(null);
  const pointsCardRef = useRef(null);
  const deliveryRefs = useRef([]);
  const greenBarRef = useRef(null);
  const progressFillRef = useRef(null);
  const redeemBtnRef = useRef(null);
  const lockedBtnRef = useRef(null);

  const canAfford = gift ? userPoints >= gift.points : false;
  const deficit = gift ? gift.points - userPoints : 0;
  const progressPercent = gift ? Math.min(100, Math.round((userPoints / gift.points) * 100)) : 0;

  useEffect(() => {
    if (!gift) return;

    if (emojiRef.current) {
      anime({
        targets: emojiRef.current,
        scale: [0, 1],
        rotate: [-20, 0],
        opacity: [0, 1],
        duration: 600,
        delay: 200,
        easing: 'spring(1, 80, 10, 0)',
      });
    }

    if (tagRef.current) {
      anime({
        targets: tagRef.current,
        translateX: [30, 0],
        opacity: [0, 1],
        duration: 400,
        delay: 400,
        easing: 'easeOutExpo',
      });
    }

    if (nameRef.current) {
      anime({
        targets: nameRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 300,
        easing: 'easeOutExpo',
      });
    }

    if (ratingRef.current) {
      anime({
        targets: ratingRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 400,
        easing: 'easeOutExpo',
      });
    }

    if (descRef.current) {
      anime({
        targets: descRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 450,
        easing: 'easeOutExpo',
      });
    }

    if (pointsCardRef.current) {
      anime({
        targets: pointsCardRef.current,
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 500,
        delay: 500,
        easing: 'easeOutExpo',
      });
    }

    if (canAfford && greenBarRef.current) {
      anime({
        targets: greenBarRef.current,
        width: ['0%', '100%'],
        duration: 500,
        delay: 700,
        easing: 'easeOutExpo',
      });
    }

    if (!canAfford && progressFillRef.current) {
      anime({
        targets: progressFillRef.current,
        width: ['0%', `${progressPercent}%`],
        duration: 800,
        delay: 700,
        easing: 'easeOutExpo',
      });
    }

    deliveryRefs.current.forEach((el, i) => {
      if (!el) return;
      anime({
        targets: el,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 400,
        delay: 600 + i * 100,
        easing: 'easeOutExpo',
      });
    });

    const ctaEl = canAfford ? redeemBtnRef.current : lockedBtnRef.current;
    if (ctaEl) {
      anime({
        targets: ctaEl,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 500,
        easing: 'easeOutExpo',
      });
    }
  }, [gift, canAfford, progressPercent]);

  if (!gift) {
    return (
      <Wrapper style={{ alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#6b7280' }}>Gift not found</p>
      </Wrapper>
    );
  }

  const handleRedeem = async () => {
    const result = await Swal.fire({
      title: 'Confirm Redemption',
      html: `Redeem <b style="color:#fb923c">${gift.name}</b> for <b style="color:#fb923c">⚡ ${gift.points.toLocaleString()}</b> points?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirm ⚡',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#d1d5db',
      background: '#fff',
      color: '#1a1a2e',
    });

    if (result.isConfirmed) {
      try {
        const backendData = await createRedemption(gift.id);
        redeemGift(gift, backendData);
        history.push('/celebrate');
      } catch (err) {
        Swal.fire({
          title: 'Redemption Failed',
          text: 'Could not connect to server. Please make sure the backend is running.',
          icon: 'error',
          confirmButtonColor: '#f97316',
          background: '#fff',
          color: '#1a1a2e',
        });
      }
    }
  };

  const gradient = twGradient(gift.color);

  return (
    <Wrapper>
      <ImageArea gradient={gradient}>
        <Bubble size={192} opacity={0.1} top="-40px" right="-40px" />
        <Bubble size={128} opacity={0.05} bottom="-40px" left="-24px" />

        {[...Array(12)].map((_, i) => (
          <Sparkle
            key={i}
            x={20 + Math.random() * 60}
            y={20 + Math.random() * 60}
            delay={i}
          />
        ))}

        {gift.tag && <Tag ref={tagRef}>{gift.tag}</Tag>}

        <CloseBtn onClick={() => history.goBack()}>
          <FiX />
        </CloseBtn>

        {!canAfford && (
          <LockedOverlay>
            <LockedBadge>
              <LockIcon>🔒</LockIcon>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>
                Premium Reward
              </span>
            </LockedBadge>
          </LockedOverlay>
        )}

        <GiftEmoji ref={emojiRef}>{gift.image}</GiftEmoji>
      </ImageArea>

      <Content>
        <GiftName ref={nameRef}>{gift.name}</GiftName>

        <RatingRow ref={ratingRef}>
          <Stars>
            {[...Array(5)].map((_, i) => (
              <Star key={i} filled={i < Math.floor(gift.rating)}>
                ★
              </Star>
            ))}
            <RatingVal>{gift.rating}</RatingVal>
          </Stars>
          <Dot>&bull;</Dot>
          <Category>{gift.category}</Category>
        </RatingRow>

        <Description ref={descRef}>{gift.description}</Description>

        <PointsCard ref={pointsCardRef}>
          <PointsRow>
            <div>
              <PointsLabel>Redemption Cost</PointsLabel>
              <PointsCost>⚡ {gift.points.toLocaleString()}</PointsCost>
            </div>
            <div style={{ textAlign: 'right' }}>
              <PointsLabel>Your Balance</PointsLabel>
              <BalanceValue canAfford={canAfford}>
                ⚡ {userPoints.toLocaleString()}
              </BalanceValue>
            </div>
          </PointsRow>

          {canAfford ? (
            <GreenBar ref={greenBarRef} />
          ) : (
            <>
              <ProgressBarTrack>
                <ProgressBarFill ref={progressFillRef} />
              </ProgressBarTrack>
              <ProgressLabel>{progressPercent}% of the way there</ProgressLabel>
            </>
          )}
        </PointsCard>

        <DeliveryGrid>
          {[
            { icon: '🚚', label: 'Free Delivery', sub: '2-5 days' },
            { icon: '🔒', label: 'Secure', sub: 'Packaging' },
            { icon: '✅', label: 'Verified', sub: 'Authentic' },
          ].map((info, i) => (
            <DeliveryItem
              key={i}
              ref={(el) => (deliveryRefs.current[i] = el)}
            >
              <DeliveryIcon>{info.icon}</DeliveryIcon>
              <DeliveryLabel>{info.label}</DeliveryLabel>
              <DeliverySub>{info.sub}</DeliverySub>
            </DeliveryItem>
          ))}
        </DeliveryGrid>

        {!canAfford && (
          <>
            <DeficitCard>
              <LockIcon>🔒</LockIcon>
              <DeficitText>
                You need{' '}
                <span style={{ color: '#fb923c', fontWeight: 800 }}>
                  ⚡ {deficit.toLocaleString()}
                </span>{' '}
                more points
              </DeficitText>
            </DeficitCard>

            <EarnTitle>Ways to Earn</EarnTitle>
            <EarnGrid>
              {earnMethods.map((m, i) => (
                <EarnItem key={i}>
                  <EarnIcon>{m.icon}</EarnIcon>
                  <EarnLabel>{m.label}</EarnLabel>
                  <EarnPoints>{m.points}</EarnPoints>
                </EarnItem>
              ))}
            </EarnGrid>
          </>
        )}
      </Content>

      <BottomCTA>
        {canAfford ? (
          <RedeemBtn ref={redeemBtnRef} onClick={handleRedeem}>
            <ShimmerOverlay>
              <div />
            </ShimmerOverlay>
            <span style={{ position: 'relative', zIndex: 10 }}>
              Redeem for ⚡ {gift.points.toLocaleString()} Points
            </span>
          </RedeemBtn>
        ) : (
          <LockedBtn ref={lockedBtnRef}>
            🔒{' '}
            <span style={{ color: '#fb923c', fontWeight: 800 }}>
              ⚡ {deficit.toLocaleString()}
            </span>{' '}
            Points Away
          </LockedBtn>
        )}
      </BottomCTA>
    </Wrapper>
  );
}
