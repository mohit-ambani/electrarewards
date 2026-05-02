import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/css/pagination';

const banners = [
  {
    id: 'premium',
    title: 'Premium Rewards',
    subtitle: 'Redeem your hard-earned points for exclusive gifts',
    gradient: 'linear-gradient(135deg, #ea580c, #fb923c, #f59e0b)',
    emoji: '🏆',
  },
  {
    id: 'tools',
    title: 'Pro Tools Collection',
    subtitle: 'Top-tier equipment trusted by master electricians',
    gradient: 'linear-gradient(135deg, #2563eb, #3b82f6, #06b6d4)',
    emoji: '🔧',
  },
  {
    id: 'new_arrivals',
    title: 'New Arrivals',
    subtitle: 'Latest gadgets and premium electronics added!',
    gradient: 'linear-gradient(135deg, #9333ea, #8b5cf6, #d946ef)',
    emoji: '✨',
  },
];

const BannerWrapper = styled.div`
  padding: 10px 10px 0;
  overflow: hidden;

  .swiper {
    border-radius: 16px;
    overflow: hidden;
  }

  .swiper-pagination {
    bottom: 10px !important;
  }

  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background: rgba(0, 0, 0, 0.15);
    opacity: 1;
    transition: all 0.3s ease;
  }

  .swiper-pagination-bullet-active {
    width: 20px;
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const Slide = styled.div`
  position: relative;
  padding: 16px 16px;
  background: ${(props) => props.$gradient};
  cursor: pointer;
  overflow: hidden;
  min-height: 110px;
  display: flex;
  align-items: center;

  &:active {
    opacity: 0.95;
  }
`;

const DecorCircle1 = styled.div`
  position: absolute;
  right: -20px;
  top: -20px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
`;

const DecorCircle2 = styled.div`
  position: absolute;
  right: -8px;
  bottom: -24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
`;

const DecorCircle3 = styled.div`
  position: absolute;
  left: 50%;
  top: -12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
`;

const SlideContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const TextBlock = styled.div`
  flex: 1;
`;

const BannerTitle = styled.h2`
  font-size: 17px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
`;

const BannerSubtitle = styled.p`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  margin: 4px 0 0;
  max-width: 190px;
  line-height: 1.35;
`;

const ExploreText = styled.p`
  font-size: 10px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 6px 0 0;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Emoji = styled.span`
  font-size: 38px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
`;

const HeroBanner = () => {
  const history = useHistory();

  return (
    <BannerWrapper>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        spaceBetween={0}
        slidesPerView={1}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Slide
              $gradient={banner.gradient}
              onClick={() => history.push(`/banner/${banner.id}`)}
            >
              <DecorCircle1 />
              <DecorCircle2 />
              <DecorCircle3 />
              <SlideContent>
                <TextBlock>
                  <BannerTitle>{banner.title}</BannerTitle>
                  <BannerSubtitle>{banner.subtitle}</BannerSubtitle>
                  <ExploreText>
                    Explore <span>&rarr;</span>
                  </ExploreText>
                </TextBlock>
                <Emoji>{banner.emoji}</Emoji>
              </SlideContent>
            </Slide>
          </SwiperSlide>
        ))}
      </Swiper>
    </BannerWrapper>
  );
};

export default HeroBanner;
