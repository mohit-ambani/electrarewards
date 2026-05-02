import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import anime from 'animejs';
import useAppStore from '../store/useAppStore';

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
  max-width: 430px;
  margin: 0 auto;
  padding-bottom: 32px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #e8ecf1;
  position: sticky;
  top: 0;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(12px);
  z-index: 10;
`;

const BackBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #e8ecf1;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a1a2e;
  font-size: 16px;
  cursor: pointer;
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
`;

const PointsBanner = styled.div`
  margin: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #ea580c, #f97316, #f59e0b);
  border-radius: 16px;
  text-align: center;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: scale(0.95);
`;

const BannerShimmer = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  animation: ${shimmer} 2.5s ease-in-out infinite;
`;

const BannerLabel = styled.p`
  font-size: 12px;
  color: rgba(255,255,255,0.8);
  position: relative;
  z-index: 2;
`;

const BannerValue = styled.p`
  font-size: 32px;
  font-weight: 800;
  color: #fff;
  margin-top: 4px;
  position: relative;
  z-index: 2;
`;

const Content = styled.div`
  padding: 0 16px;
`;

const SectionTitle = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 16px 0 10px;
`;

const MissionCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  background: #f8f9fb;
  border: 1px solid #e8ecf1;
  border-radius: 14px;
  margin-bottom: 8px;
  opacity: 0;
  transform: translateY(12px);
`;

const MissionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: ${(p) => p.bg || '#f1f5f9'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
`;

const MissionInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const MissionName = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
`;

const MissionDesc = styled.p`
  font-size: 11px;
  color: #6b7280;
  margin-top: 2px;
`;

const ProgressTrack = styled.div`
  height: 5px;
  background: #e5e7eb;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 6px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #f97316, #fb923c);
  border-radius: 5px;
  width: 0%;
`;

const MissionRight = styled.div`
  text-align: right;
  flex-shrink: 0;
`;

const MissionPoints = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #fb923c;
`;

const MissionStatus = styled.p`
  font-size: 9px;
  color: #9ca3af;
  margin-top: 2px;
`;

const dailyMissions = [
  { icon: '📅', name: 'Daily Check-In', desc: 'Open the app daily', points: '+50', progress: 100, bg: 'rgba(59,130,246,0.1)' },
  { icon: '🔍', name: 'Browse Catalogue', desc: 'View 5 products today', points: '+25', progress: 60, bg: 'rgba(168,85,247,0.1)' },
  { icon: '⭐', name: 'Rate a Product', desc: 'Leave a rating on any gift', points: '+30', progress: 0, bg: 'rgba(234,179,8,0.1)' },
];

const earningMethods = [
  { icon: '🔧', name: 'Complete Electrical Jobs', desc: 'Upload proof of completed work', points: '+500', progress: 40, bg: 'rgba(249,115,22,0.1)' },
  { icon: '📄', name: 'Upload Purchase Bills', desc: 'Submit dealer purchase invoices', points: '+200', progress: 20, bg: 'rgba(16,185,129,0.1)' },
  { icon: '👥', name: 'Refer a Friend', desc: 'Get points when they join & earn', points: '+300', progress: 0, bg: 'rgba(239,68,68,0.1)' },
  { icon: '🏆', name: 'Monthly Challenge', desc: 'Top 10 earners get bonus points', points: '+1000', progress: 65, bg: 'rgba(234,179,8,0.1)' },
  { icon: '📱', name: 'Share on Social', desc: 'Post about ElectraRewards', points: '+100', progress: 0, bg: 'rgba(6,182,212,0.1)' },
  { icon: '🎓', name: 'Complete Training', desc: 'Watch safety training videos', points: '+150', progress: 33, bg: 'rgba(99,102,241,0.1)' },
];

export default function EarnPointsScreen() {
  const history = useHistory();
  const { userPoints } = useAppStore();

  const bannerRef = useRef(null);
  const cardRefs = useRef([]);
  const progressRefs = useRef([]);

  useEffect(() => {
    if (bannerRef.current) {
      anime({
        targets: bannerRef.current,
        scale: [0.95, 1],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutExpo',
      });
    }

    const allMissions = [...dailyMissions, ...earningMethods];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      anime({
        targets: el,
        translateY: [12, 0],
        opacity: [0, 1],
        duration: 400,
        delay: 200 + i * 50,
        easing: 'easeOutExpo',
      });
    });

    progressRefs.current.forEach((el, i) => {
      if (!el) return;
      const prog = allMissions[i]?.progress || 0;
      anime({
        targets: el,
        width: ['0%', `${prog}%`],
        duration: 600,
        delay: 400 + i * 50,
        easing: 'easeOutExpo',
      });
    });
  }, []);

  const allMissions = [...dailyMissions, ...earningMethods];
  let cardIdx = 0;

  return (
    <Wrapper>
      <Header>
        <BackBtn onClick={() => history.goBack()}>
          <FiArrowLeft />
        </BackBtn>
        <HeaderTitle>Earn Points</HeaderTitle>
      </Header>

      <PointsBanner ref={bannerRef}>
        <BannerShimmer />
        <BannerLabel>Your Current Balance</BannerLabel>
        <BannerValue>⚡ {userPoints.toLocaleString()}</BannerValue>
      </PointsBanner>

      <Content>
        <SectionTitle>Daily Missions</SectionTitle>
        {dailyMissions.map((m, i) => {
          const idx = cardIdx++;
          return (
            <MissionCard key={i} ref={(el) => (cardRefs.current[idx] = el)}>
              <MissionIcon bg={m.bg}>{m.icon}</MissionIcon>
              <MissionInfo>
                <MissionName>{m.name}</MissionName>
                <MissionDesc>{m.desc}</MissionDesc>
                <ProgressTrack>
                  <ProgressFill ref={(el) => (progressRefs.current[idx] = el)} />
                </ProgressTrack>
              </MissionInfo>
              <MissionRight>
                <MissionPoints>{m.points}</MissionPoints>
                <MissionStatus>{m.progress === 100 ? 'Done' : `${m.progress}%`}</MissionStatus>
              </MissionRight>
            </MissionCard>
          );
        })}

        <SectionTitle>Ways to Earn</SectionTitle>
        {earningMethods.map((m, i) => {
          const idx = cardIdx++;
          return (
            <MissionCard key={i} ref={(el) => (cardRefs.current[idx] = el)}>
              <MissionIcon bg={m.bg}>{m.icon}</MissionIcon>
              <MissionInfo>
                <MissionName>{m.name}</MissionName>
                <MissionDesc>{m.desc}</MissionDesc>
                <ProgressTrack>
                  <ProgressFill ref={(el) => (progressRefs.current[idx] = el)} />
                </ProgressTrack>
              </MissionInfo>
              <MissionRight>
                <MissionPoints>{m.points}</MissionPoints>
                <MissionStatus>{m.progress === 100 ? 'Done' : `${m.progress}%`}</MissionStatus>
              </MissionRight>
            </MissionCard>
          );
        })}
      </Content>
    </Wrapper>
  );
}
