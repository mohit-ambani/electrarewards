import React from 'react';
import styled, { keyframes } from 'styled-components';
import { twGradient } from '../utils/colors';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardWrapper = styled.div`
  opacity: 0;
  animation: ${fadeInUp} 0.45s ease forwards;
  animation-delay: ${(props) => props.$delay}s;
  cursor: pointer;

  &:active {
    transform: scale(0.97);
  }
`;

const Card = styled.div`
  border-radius: 16px;
  overflow: hidden;
  background: rgba(248, 250, 252, 0.03);
  border: 1px solid rgba(248, 250, 252, 0.06);
  transition: border-color 0.25s ease;
  width: 100%;
  min-width: 0;

  &:hover {
    border-color: rgba(251, 146, 60, 0.25);
  }
`;

const ImageArea = styled.div`
  position: relative;
  height: 140px;
  background: ${(props) => props.$gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.08);
`;

const DecorCircleA = styled.div`
  position: absolute;
  right: -16px;
  top: -16px;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
`;

const DecorCircleB = styled.div`
  position: absolute;
  left: -8px;
  bottom: -16px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
`;

const GiftEmoji = styled.span`
  font-size: 52px;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
`;

const TagBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 2px 8px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  font-size: 10px;
  font-weight: 700;
  color: #ffffff;
  z-index: 3;
`;

const PointsBadge = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  padding: 4px 10px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  font-size: 12px;
  font-weight: 700;
  color: #fb923c;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 3px;
`;

const InfoSection = styled.div`
  padding: 10px 12px 12px;
`;

const GiftName = styled.h3`
  font-size: 13px;
  font-weight: 700;
  color: #f8fafc;
  margin: 0;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const GiftDescription = styled.p`
  font-size: 11px;
  color: #64748b;
  margin: 4px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.3;
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`;

const Stars = styled.div`
  display: flex;
`;

const Star = styled.span`
  font-size: 10px;
  color: ${(props) => (props.$filled ? '#fbbf24' : '#334155')};
`;

const RatingValue = styled.span`
  font-size: 10px;
  color: #64748b;
`;

const GiftCard = ({ gift, index, onSelect }) => {
  const delay = index * 0.06;

  return (
    <CardWrapper $delay={delay} onClick={() => onSelect(gift)}>
      <Card>
        <ImageArea $gradient={twGradient(gift.color)}>
          <ImageOverlay />
          <DecorCircleA />
          <DecorCircleB />
          <GiftEmoji>{gift.image}</GiftEmoji>
          {gift.tag && <TagBadge>{gift.tag}</TagBadge>}
          <PointsBadge>
            <span>&#9889;</span> {gift.points.toLocaleString()}
          </PointsBadge>
        </ImageArea>
        <InfoSection>
          <GiftName>{gift.name}</GiftName>
          <GiftDescription>{gift.description}</GiftDescription>
          <RatingRow>
            <Stars>
              {[...Array(5)].map((_, i) => (
                <Star key={i} $filled={i < Math.floor(gift.rating)}>
                  &#9733;
                </Star>
              ))}
            </Stars>
            <RatingValue>{gift.rating}</RatingValue>
          </RatingRow>
        </InfoSection>
      </Card>
    </CardWrapper>
  );
};

export default GiftCard;
