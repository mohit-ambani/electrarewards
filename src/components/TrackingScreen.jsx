import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';
import anime from 'animejs';
import useAppStore from '../store/useAppStore';
import {
  trackingStages,
  generateOrderId,
  generateDocket,
  generateOTP,
} from '../data/trackingSimulation';
import OTPVerification from './OTPVerification';

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.3); opacity: 1; }
`;

const colorMap = {
  'text-green-400': '#4ade80',
  'text-blue-400': '#60a5fa',
  'text-emerald-400': '#34d399',
  'text-purple-400': '#c084fc',
  'text-orange-400': '#fb923c',
  'text-cyan-400': '#22d3ee',
  'text-sky-400': '#38bdf8',
  'text-amber-400': '#fbbf24',
  'text-red-400': '#f87171',
  'text-yellow-400': '#facc15',
};

const bgMap = {
  'bg-green-500/10': 'rgba(34,197,94,0.1)',
  'bg-blue-500/10': 'rgba(59,130,246,0.1)',
  'bg-emerald-500/10': 'rgba(16,185,129,0.1)',
  'bg-purple-500/10': 'rgba(168,85,247,0.1)',
  'bg-orange-500/10': 'rgba(249,115,22,0.1)',
  'bg-cyan-500/10': 'rgba(6,182,212,0.1)',
  'bg-sky-500/10': 'rgba(14,165,233,0.1)',
  'bg-amber-500/10': 'rgba(245,158,11,0.1)',
  'bg-red-500/10': 'rgba(239,68,68,0.1)',
  'bg-yellow-500/10': 'rgba(234,179,8,0.1)',
};

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: #020617;
  display: flex;
  flex-direction: column;
  max-width: 430px;
  margin: 0 auto;
  overflow-y: auto;
`;

const Header = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  flex-shrink: 0;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: #f8fafc;
`;

const HeaderSub = styled.p`
  font-size: 11px;
  color: #94a3b8;
  margin-top: 2px;
`;

const LiveBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  background: rgba(34,197,94,0.1);
  border: 1px solid rgba(34,197,94,0.2);
`;

const LiveDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LiveText = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #4ade80;
`;

const ProgressTrack = styled.div`
  margin-top: 12px;
  height: 6px;
  background: #1e293b;
  border-radius: 6px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #f97316, #fb923c);
  border-radius: 6px;
  transition: width 0.5s ease;
  width: ${(p) => p.pct}%;
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
`;

const ProgressText = styled.span`
  font-size: 10px;
  color: ${(p) => p.color || '#64748b'};
`;

const GiftSummary = styled.div`
  margin: 16px 20px 0;
  padding: 12px 16px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

const GiftEmojiBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(249,115,22,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`;

const GiftInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const GiftName = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #f8fafc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const GiftDelivery = styled.p`
  font-size: 11px;
  color: #94a3b8;
  margin-top: 2px;
`;

const CountdownBar = styled.div`
  margin: 12px 20px 0;
  padding: 10px 16px;
  background: rgba(249,115,22,0.08);
  border: 1px solid rgba(249,115,22,0.15);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

const CountdownLabel = styled.span`
  font-size: 12px;
  color: #94a3b8;
`;

const CountdownValue = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #fb923c;
  font-variant-numeric: tabular-nums;
`;

const TimelineWrap = styled.div`
  padding: 20px;
  flex: 1;
`;

const TimelineEntry = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 4px;
  opacity: 0;
  transform: translateX(-20px);
`;

const TimelineLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40px;
  flex-shrink: 0;
`;

const StageDot = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${(p) => p.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  position: relative;
  flex-shrink: 0;
`;

const PulseRing = styled.div`
  position: absolute;
  inset: -4px;
  border-radius: 14px;
  border: 2px solid ${(p) => p.color};
  animation: ${pulse} 2s ease-in-out infinite;
`;

const VertLine = styled.div`
  width: 2px;
  flex: 1;
  min-height: 16px;
  background: ${(p) => (p.active ? 'rgba(249,115,22,0.3)' : 'rgba(255,255,255,0.06)')};
  margin: 4px 0;
`;

const StageContent = styled.div`
  flex: 1;
  padding-bottom: 20px;
  min-width: 0;
`;

const StageTitle = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${(p) => p.color || '#f8fafc'};
`;

const StageSubtitle = styled.p`
  font-size: 12px;
  color: #94a3b8;
  margin-top: 2px;
`;

const StageDetail = styled.div`
  font-size: 11px;
  color: #cbd5e1;
  margin-top: 6px;
  padding: 8px 12px;
  background: rgba(255,255,255,0.03);
  border-radius: 8px;
  border-left: 2px solid ${(p) => p.borderColor || 'rgba(255,255,255,0.1)'};
`;

const StageTime = styled.p`
  font-size: 10px;
  color: #475569;
  margin-top: 4px;
`;

const SkipBtn = styled.button`
  margin: 0 20px 20px;
  padding: 14px;
  border-radius: 14px;
  background: rgba(249,115,22,0.1);
  border: 1px solid rgba(249,115,22,0.2);
  color: #fb923c;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  flex-shrink: 0;
  width: calc(100% - 40px);
`;

const DemoNote = styled.p`
  text-align: center;
  font-size: 10px;
  color: #475569;
  margin: -12px 0 20px;
`;

export default function TrackingScreen() {
  const history = useHistory();
  const { selectedGift } = useAppStore();
  const gift = selectedGift || { name: 'Your Gift', image: '🎁', points: 0 };

  const orderId = useMemo(() => generateOrderId(), []);
  const docket = useMemo(() => generateDocket(), []);
  const otp = useMemo(() => generateOTP(), []);

  const [currentStage, setCurrentStage] = useState(0);
  const [countdown, setCountdown] = useState(60);
  const [showOTP, setShowOTP] = useState(false);

  const stageRefs = useRef([]);

  // Auto-advance every 60s
  useEffect(() => {
    if (showOTP) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCurrentStage((s) => {
            const next = s + 1;
            if (next >= trackingStages.length) {
              clearInterval(interval);
              setShowOTP(true);
              return s;
            }
            return next;
          });
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showOTP]);

  // Animate stage entries
  useEffect(() => {
    stageRefs.current.forEach((el, i) => {
      if (!el || i > currentStage) return;
      anime({
        targets: el,
        translateX: [-20, 0],
        opacity: [0, 1],
        duration: 500,
        delay: i === currentStage ? 0 : i * 80,
        easing: 'easeOutExpo',
      });
    });
  }, [currentStage]);

  const handleSkip = () => {
    if (currentStage < trackingStages.length - 1) {
      setCurrentStage((s) => s + 1);
      setCountdown(60);
    } else {
      setShowOTP(true);
    }
  };

  const handleOTPSuccess = () => {
    history.push('/delivered');
  };

  const progressPct = ((currentStage + 1) / trackingStages.length) * 100;

  const getTimestamp = (stageIndex) => {
    const now = new Date();
    const offset = (currentStage - stageIndex) * 60 * 1000;
    const time = new Date(now.getTime() - offset);
    return time.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const fillDetail = (detail) =>
    detail.replace('{orderId}', orderId).replace('{docket}', docket);

  if (showOTP) {
    return (
      <OTPVerification otp={otp} gift={gift} onSuccess={handleOTPSuccess} />
    );
  }

  return (
    <Wrapper>
      <Header>
        <HeaderRow>
          <div>
            <HeaderTitle>Live Tracking</HeaderTitle>
            <HeaderSub>Order #ELR-2026-{orderId}</HeaderSub>
          </div>
          <LiveBadge>
            <LiveDot />
            <LiveText>LIVE</LiveText>
          </LiveBadge>
        </HeaderRow>

        <ProgressTrack>
          <ProgressFill pct={progressPct} />
        </ProgressTrack>
        <ProgressInfo>
          <ProgressText>
            {currentStage + 1}/{trackingStages.length} stages
          </ProgressText>
          <ProgressText color="#fb923c">
            Next update in {countdown}s
          </ProgressText>
        </ProgressInfo>
      </Header>

      <GiftSummary>
        <GiftEmojiBox>{gift.image}</GiftEmojiBox>
        <GiftInfo>
          <GiftName>{gift.name}</GiftName>
          <GiftDelivery>Estimated delivery: 2-5 business days</GiftDelivery>
        </GiftInfo>
      </GiftSummary>

      <CountdownBar>
        <CountdownLabel>Next update in</CountdownLabel>
        <CountdownValue>
          {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
        </CountdownValue>
      </CountdownBar>

      <TimelineWrap>
        {trackingStages.map((stage, i) => {
          if (i > currentStage) return null;
          const isActive = i === currentStage;
          const stageColor = colorMap[stage.color] || '#fb923c';
          const stageBg = bgMap[stage.bgColor] || 'rgba(249,115,22,0.1)';

          return (
            <TimelineEntry
              key={stage.id}
              ref={(el) => (stageRefs.current[i] = el)}
            >
              <TimelineLeft>
                <StageDot bg={stageBg}>
                  {isActive && <PulseRing color={stageColor} />}
                  <span>{stage.icon}</span>
                </StageDot>
                {i < currentStage && <VertLine active />}
              </TimelineLeft>

              <StageContent>
                <StageTitle color={stageColor}>{stage.title}</StageTitle>
                <StageSubtitle>{stage.subtitle}</StageSubtitle>
                <StageDetail borderColor={stageColor}>
                  {fillDetail(stage.detail)}
                </StageDetail>
                <StageTime>{getTimestamp(i)}</StageTime>
              </StageContent>
            </TimelineEntry>
          );
        })}
      </TimelineWrap>

      <SkipBtn onClick={handleSkip}>
        {currentStage < trackingStages.length - 1
          ? 'Skip to Next Update (Demo)'
          : 'Complete Delivery (Demo)'}
      </SkipBtn>
      <DemoNote>Demo mode: Updates every 1 minute (or tap to skip)</DemoNote>
    </Wrapper>
  );
}
