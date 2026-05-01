import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import anime from 'animejs';
import useAppStore from '../store/useAppStore';
import { gifts } from '../data/gifts';
import { twGradient } from '../utils/colors';

const shimmer = keyframes`
  0% { transform: translateX(-400px); }
  100% { transform: translateX(400px); }
`;

const floatBubble = keyframes`
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-15px) translateX(8px); }
`;

const pulseNew = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const PAGE_CONFIG = {
  premium: {
    title: 'Premium Rewards',
    subtitle: 'Exclusive high-value gifts for top earners',
    gradient: 'linear-gradient(135deg, #f59e0b, #eab308, #f97316)',
    emoji: '👑',
    filterFn: (g) => g.category === 'premium' || g.points >= 10000,
    accentColor: '#fbbf24',
    badgeBg: 'rgba(245,158,11,0.2)',
  },
  tools: {
    title: 'Pro Tools Collection',
    subtitle: 'Top-tier equipment for master electricians',
    gradient: 'linear-gradient(135deg, #2563eb, #3b82f6, #06b6d4)',
    emoji: '🔧',
    filterFn: (g) => g.category === 'tools',
    accentColor: '#60a5fa',
    badgeBg: 'rgba(59,130,246,0.2)',
  },
  new_arrivals: {
    title: 'New Arrivals',
    subtitle: 'Latest additions to the catalogue',
    gradient: 'linear-gradient(135deg, #7c3aed, #8b5cf6, #d946ef)',
    emoji: '✨',
    filterFn: (g) =>
      ['Hot Pick', 'Exclusive', 'Top Rated', 'Premium'].includes(g.tag),
    accentColor: '#c084fc',
    badgeBg: 'rgba(168,85,247,0.2)',
  },
};

const Wrapper = styled.div`
  min-height: 100vh;
  background: #020617;
  max-width: 430px;
  margin: 0 auto;
  padding-bottom: 96px;
`;

const HeaderArea = styled.div`
  position: relative;
  overflow: hidden;
  background: ${(p) => p.gradient};
  padding: 48px 20px 40px;
`;

const HeaderShimmer = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  animation: ${shimmer} 3s ease-in-out infinite;
`;

const HeaderBubble = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,${(p) => p.opacity || 0.1});
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  top: ${(p) => p.top || 'auto'};
  right: ${(p) => p.right || 'auto'};
  left: ${(p) => p.left || 'auto'};
  bottom: ${(p) => p.bottom || 'auto'};
  filter: blur(2px);
  animation: ${floatBubble} ${(p) => p.dur || 5}s ease-in-out infinite;
`;

const BackBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  color: rgba(255,255,255,0.9);
  font-size: 14px;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 16px;
  position: relative;
  z-index: 10;
`;

const HeaderRow = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderText = styled.div``;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: #fff;
  opacity: 0;
  transform: translateY(15px);
`;

const HeaderSub = styled.p`
  font-size: 12px;
  color: rgba(255,255,255,0.8);
  margin-top: 4px;
  max-width: 220px;
  line-height: 1.4;
  opacity: 0;
  transform: translateY(15px);
`;

const ItemCount = styled.p`
  font-size: 10px;
  color: rgba(255,255,255,0.6);
  margin-top: 8px;
  opacity: 0;
`;

const HeaderEmoji = styled.span`
  font-size: 48px;
  opacity: 0;
  transform: scale(0) rotate(-30deg);
`;

const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 12px;
`;

const FeaturedScroll = styled.div`
  margin: -20px 0 0;
  padding: 0 16px;
  position: relative;
  z-index: 10;
`;

const FeaturedRow = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 12px;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const FeaturedCard = styled.div`
  flex-shrink: 0;
  width: 220px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: transform 0.2s;
  &:active {
    transform: scale(0.97);
  }
`;

const FeaturedImage = styled.div`
  position: relative;
  height: 140px;
  background: ${(p) => p.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const FeaturedBubble = styled.div`
  position: absolute;
  right: -16px;
  top: -16px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
`;

const FeaturedEmoji = styled.span`
  font-size: 48px;
  position: relative;
  z-index: 5;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
`;

const FeaturedTag = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 9px;
  font-weight: 700;
  background: ${(p) => p.bg};
  color: ${(p) => p.color};
`;

const FeaturedInfo = styled.div`
  padding: 12px;
`;

const FeaturedName = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: #f8fafc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FeaturedPoints = styled.p`
  font-size: 14px;
  font-weight: 800;
  color: ${(p) => p.color};
  margin-top: 4px;
`;

const FeaturedRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
`;

const RatingStar = styled.span`
  font-size: 10px;
  color: #fbbf24;
`;

const RatingVal = styled.span`
  font-size: 10px;
  color: #94a3b8;
`;

const GridSection = styled.div`
  padding: 20px 16px 0;
`;

const GiftGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const GridCard = styled.div`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: transform 0.2s;
  &:active {
    transform: scale(0.97);
  }
`;

const GridImage = styled.div`
  position: relative;
  height: 112px;
  background: ${(p) => p.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const GridBubble = styled.div`
  position: absolute;
  right: -12px;
  top: -12px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
`;

const GridEmoji = styled.span`
  font-size: 40px;
  position: relative;
  z-index: 5;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
`;

const NewBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 2px 6px;
  border-radius: 6px;
  background: #d946ef;
  font-size: 8px;
  font-weight: 700;
  color: #fff;
  animation: ${pulseNew} 1.5s ease-in-out infinite;
`;

const GridInfo = styled.div`
  padding: 10px;
`;

const GridName = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: #f8fafc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const GridBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
`;

const GridPoints = styled.p`
  font-size: 12px;
  font-weight: 800;
  color: ${(p) => p.color};
`;

export default function BannerPage() {
  const history = useHistory();
  const { type } = useParams();
  const { setSelectedGift } = useAppStore();

  const config = PAGE_CONFIG[type] || PAGE_CONFIG.premium;
  const filteredGifts = gifts.filter(config.filterFn);
  const featured = filteredGifts.slice(0, 5);
  const isNewArrivals = type === 'new_arrivals';

  const titleRef = useRef(null);
  const subRef = useRef(null);
  const countRef = useRef(null);
  const emojiRef = useRef(null);
  const featuredRefs = useRef([]);
  const gridRefs = useRef([]);

  useEffect(() => {
    if (titleRef.current) {
      anime({
        targets: titleRef.current,
        translateY: [15, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 150,
        easing: 'easeOutExpo',
      });
    }

    if (subRef.current) {
      anime({
        targets: subRef.current,
        translateY: [15, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 250,
        easing: 'easeOutExpo',
      });
    }

    if (countRef.current) {
      anime({
        targets: countRef.current,
        opacity: [0, 1],
        duration: 400,
        delay: 350,
        easing: 'easeOutExpo',
      });
    }

    if (emojiRef.current) {
      anime({
        targets: emojiRef.current,
        scale: [0, 1],
        rotate: [-30, 0],
        opacity: [0, 1],
        duration: 600,
        delay: 300,
        easing: 'spring(1, 80, 10, 0)',
      });
    }

    featuredRefs.current.forEach((el, i) => {
      if (!el) return;
      anime({
        targets: el,
        translateY: [30, 0],
        scale: [0.95, 1],
        opacity: [0, 1],
        duration: 500,
        delay: 300 + i * 60,
        easing: 'easeOutExpo',
      });
    });

    gridRefs.current.forEach((el, i) => {
      if (!el) return;
      anime({
        targets: el,
        translateY: [30, 0],
        scale: [0.95, 1],
        opacity: [0, 1],
        duration: 500,
        delay: 400 + i * 60,
        easing: 'easeOutExpo',
      });
    });
  }, [type]);

  const handleGiftClick = (gift) => {
    setSelectedGift(gift);
    history.push(`/gift/${gift.id}`);
  };

  return (
    <Wrapper>
      <HeaderArea gradient={config.gradient}>
        <HeaderShimmer />
        <HeaderBubble size={192} opacity={0.1} top="-40px" right="-40px" dur={5} />
        <HeaderBubble size={128} opacity={0.05} bottom="0" left="-32px" dur={4} />
        <HeaderBubble size={64} opacity={0.05} top="24px" right="33%" dur={3.5} />

        <BackBtn onClick={() => history.push('/home')}>
          <FiArrowLeft size={18} /> Back
        </BackBtn>

        <HeaderRow>
          <HeaderText>
            <HeaderTitle ref={titleRef}>{config.title}</HeaderTitle>
            <HeaderSub ref={subRef}>{config.subtitle}</HeaderSub>
            <ItemCount ref={countRef}>{filteredGifts.length} items</ItemCount>
          </HeaderText>
          <HeaderEmoji ref={emojiRef}>{config.emoji}</HeaderEmoji>
        </HeaderRow>
      </HeaderArea>

      <FeaturedScroll>
        <SectionTitle>Featured</SectionTitle>
        <FeaturedRow>
          {featured.map((gift, i) => (
            <FeaturedCard
              key={gift.id}
              ref={(el) => (featuredRefs.current[i] = el)}
              onClick={() => handleGiftClick(gift)}
            >
              <FeaturedImage gradient={twGradient(gift.color)}>
                <FeaturedBubble />
                <FeaturedEmoji>{gift.image}</FeaturedEmoji>
                {gift.tag && (
                  <FeaturedTag bg={config.badgeBg} color={config.accentColor}>
                    {gift.tag}
                  </FeaturedTag>
                )}
              </FeaturedImage>
              <FeaturedInfo>
                <FeaturedName>{gift.name}</FeaturedName>
                <FeaturedPoints color={config.accentColor}>
                  ⚡ {gift.points.toLocaleString()}
                </FeaturedPoints>
                <FeaturedRating>
                  <RatingStar>★</RatingStar>
                  <RatingVal>{gift.rating}</RatingVal>
                </FeaturedRating>
              </FeaturedInfo>
            </FeaturedCard>
          ))}
        </FeaturedRow>
      </FeaturedScroll>

      <GridSection>
        <SectionTitle>All {config.title}</SectionTitle>
        <GiftGrid>
          {filteredGifts.map((gift, i) => (
            <GridCard
              key={gift.id}
              ref={(el) => (gridRefs.current[i] = el)}
              onClick={() => handleGiftClick(gift)}
            >
              <GridImage gradient={twGradient(gift.color)}>
                <GridBubble />
                <GridEmoji>{gift.image}</GridEmoji>
                {isNewArrivals && <NewBadge>NEW</NewBadge>}
              </GridImage>
              <GridInfo>
                <GridName>{gift.name}</GridName>
                <GridBottom>
                  <GridPoints color={config.accentColor}>
                    ⚡ {gift.points.toLocaleString()}
                  </GridPoints>
                  <FeaturedRating>
                    <RatingStar>★</RatingStar>
                    <RatingVal>{gift.rating}</RatingVal>
                  </FeaturedRating>
                </GridBottom>
              </GridInfo>
            </GridCard>
          ))}
        </GiftGrid>
      </GridSection>
    </Wrapper>
  );
}
