import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import OtpInput from 'react-otp-input';
import Confetti from 'react-dom-confetti';
import anime from 'animejs';

const wobble = keyframes`
  0%, 100% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(-10deg) scale(1.1); }
  75% { transform: rotate(10deg) scale(1.1); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
`;

const pulseScale = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 30px rgba(34,197,94,0.3); }
  50% { box-shadow: 0 0 80px rgba(34,197,94,0.5); }
`;

const floatUp = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-200px); opacity: 0; }
`;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 70;
  background: rgba(255,255,255,0.97);
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  max-width: 430px;
  margin: 0 auto;
`;

const LockEmoji = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
  animation: ${wobble} 2s ease-in-out infinite;
  opacity: 0;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: #1a1a2e;
  text-align: center;
  opacity: 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  margin-top: 8px;
  opacity: 0;
`;

const DemoBox = styled.div`
  margin-top: 16px;
  padding: 12px 16px;
  background: rgba(249,115,22,0.06);
  border: 1px solid rgba(249,115,22,0.15);
  border-radius: 12px;
  text-align: center;
  opacity: 0;
`;

const DemoLabel = styled.p`
  font-size: 11px;
  color: #6b7280;
`;

const DemoOTP = styled.p`
  font-size: 28px;
  font-weight: 800;
  color: #fb923c;
  letter-spacing: 0.3em;
  margin-top: 4px;
  animation: ${pulseScale} 2s ease-in-out infinite;
`;

const HideBtn = styled.button`
  font-size: 10px;
  color: #9ca3af;
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 4px;
`;

const OtpWrap = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
  opacity: 0;
  animation: ${(p) => (p.hasError ? shake : 'none')} 0.5s ease;
`;

const ErrorMsg = styled.p`
  color: #f87171;
  font-size: 14px;
  font-weight: 500;
  margin-top: 16px;
  text-align: center;
  opacity: 0;
`;

const HelpText = styled.p`
  font-size: 12px;
  color: #9ca3af;
  margin-top: 24px;
  text-align: center;
  opacity: 0;
`;

const SuccessWrap = styled.div`
  text-align: center;
  position: relative;
  z-index: 10;
`;

const SuccessCircle = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4ade80, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  animation: ${pulseGlow} 2s ease-in-out infinite;
  opacity: 0;
  transform: scale(0) rotate(-180deg);
`;

const SuccessEmoji = styled.span`
  font-size: 64px;
`;

const SuccessTitle = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #1a1a2e;
  margin-top: 24px;
  opacity: 0;
  transform: translateY(20px);
`;

const SuccessDesc = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-top: 8px;
  opacity: 0;
  transform: translateY(10px);
`;

const SuccessGiftCard = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: #f8f9fb;
  border: 1px solid #e8ecf1;
  border-radius: 16px;
  opacity: 0;
`;

const SuccessGiftEmoji = styled.span`
  font-size: 48px;
  display: block;
`;

const SuccessGiftName = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #1a1a2e;
  margin-top: 8px;
`;

const SuccessGiftNote = styled.p`
  font-size: 11px;
  color: #6b7280;
  margin-top: 4px;
`;

const FloatingDot = styled.div`
  position: absolute;
  width: ${(p) => 4 + Math.random() * 8}px;
  height: ${(p) => 4 + Math.random() * 8}px;
  border-radius: 50%;
  background: ${(p) => p.color};
  left: ${(p) => p.x}%;
  top: ${(p) => p.y}%;
  animation: ${floatUp} ${(p) => 2 + p.dur}s ease-in ${(p) => p.delay}s infinite;
`;

const ConfettiWrap = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  z-index: 100;
`;

const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: '10px',
  height: '10px',
  colors: ['#22c55e', '#10b981', '#34d399', '#4ade80', '#fb923c'],
};

export default function OTPVerification({ otp, gift, onSuccess }) {
  const [otpValue, setOtpValue] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showOTPDemo, setShowOTPDemo] = useState(true);
  const [confettiActive, setConfettiActive] = useState(false);

  const lockRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const demoRef = useRef(null);
  const otpWrapRef = useRef(null);
  const helpRef = useRef(null);
  const errorRef = useRef(null);
  const successCircleRef = useRef(null);
  const successTitleRef = useRef(null);
  const successDescRef = useRef(null);
  const successCardRef = useRef(null);

  // Entrance animations
  useEffect(() => {
    const els = [lockRef, titleRef, subtitleRef, demoRef, otpWrapRef, helpRef];
    els.forEach((ref, i) => {
      if (!ref.current) return;
      anime({
        targets: ref.current,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 100 + i * 100,
        easing: 'easeOutExpo',
      });
    });
  }, []);

  // Success animations
  useEffect(() => {
    if (!success) return;

    if (successCircleRef.current) {
      anime({
        targets: successCircleRef.current,
        scale: [0, 1],
        rotate: [-180, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'spring(1, 80, 10, 0)',
      });
    }

    if (successTitleRef.current) {
      anime({
        targets: successTitleRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 400,
        easing: 'easeOutExpo',
      });
    }

    if (successDescRef.current) {
      anime({
        targets: successDescRef.current,
        translateY: [10, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 600,
        easing: 'easeOutExpo',
      });
    }

    if (successCardRef.current) {
      anime({
        targets: successCardRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 800,
        easing: 'easeOutExpo',
      });
    }
  }, [success]);

  const handleOtpChange = (val) => {
    setOtpValue(val);
    setError(false);

    if (val.length === 4) {
      if (val === otp) {
        setSuccess(true);
        setConfettiActive(true);
        setTimeout(() => setConfettiActive(false), 100);
        setTimeout(() => onSuccess(), 3000);
      } else {
        setError(true);
        if (errorRef.current) {
          anime({
            targets: errorRef.current,
            opacity: [0, 1],
            translateY: [-10, 0],
            duration: 300,
            easing: 'easeOutExpo',
          });
        }
        setTimeout(() => {
          setOtpValue('');
        }, 800);
      }
    }
  };

  if (success) {
    return (
      <Wrapper style={{ background: '#ffffff' }}>
        {[...Array(30)].map((_, i) => (
          <FloatingDot
            key={i}
            color={
              ['#22c55e', '#10b981', '#34d399', '#fb923c', '#3b82f6'][i % 5]
            }
            x={Math.random() * 100}
            y={60 + Math.random() * 40}
            dur={Math.random() * 2}
            delay={Math.random() * 2}
          />
        ))}

        <ConfettiWrap>
          <Confetti active={confettiActive} config={confettiConfig} />
        </ConfettiWrap>

        <SuccessWrap>
          <SuccessCircle ref={successCircleRef}>
            <SuccessEmoji>🎉</SuccessEmoji>
          </SuccessCircle>

          <SuccessTitle ref={successTitleRef}>Gift Delivered!</SuccessTitle>

          <SuccessDesc ref={successDescRef}>
            Your {gift.name} has been delivered successfully!
          </SuccessDesc>

          <SuccessGiftCard ref={successCardRef}>
            <SuccessGiftEmoji>{gift.image}</SuccessGiftEmoji>
            <SuccessGiftName>Enjoy your reward!</SuccessGiftName>
            <SuccessGiftNote>
              Thank you for being a valued electrician partner
            </SuccessGiftNote>
          </SuccessGiftCard>
        </SuccessWrap>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ConfettiWrap>
        <Confetti active={confettiActive} config={confettiConfig} />
      </ConfettiWrap>

      <LockEmoji ref={lockRef}>🔐</LockEmoji>

      <Title ref={titleRef}>Delivery Confirmation</Title>
      <Subtitle ref={subtitleRef}>
        Enter the OTP to confirm gift delivery
      </Subtitle>

      {showOTPDemo && (
        <DemoBox ref={demoRef}>
          <DemoLabel>Your OTP (Demo)</DemoLabel>
          <DemoOTP>{otp}</DemoOTP>
          <HideBtn onClick={() => setShowOTPDemo(false)}>Hide OTP</HideBtn>
        </DemoBox>
      )}

      <OtpWrap ref={otpWrapRef} hasError={error}>
        <OtpInput
          value={otpValue}
          onChange={handleOtpChange}
          numInputs={4}
          isInputNum
          shouldAutoFocus
          separator={<span style={{ width: 12 }} />}
          inputStyle={{
            width: 64,
            height: 80,
            fontSize: 28,
            fontWeight: 700,
            borderRadius: 16,
            border: `2px solid ${error ? '#ef4444' : otpValue.length > 0 ? '#f97316' : '#e8ecf1'}`,
            background: '#f1f5f9',
            color: error ? '#f87171' : '#1a1a2e',
            outline: 'none',
            caretColor: '#fb923c',
            transition: 'border-color 0.3s',
          }}
          focusStyle={{
            border: '2px solid #f97316',
            boxShadow: '0 0 0 2px rgba(249,115,22,0.15)',
          }}
        />
      </OtpWrap>

      {error && (
        <ErrorMsg ref={errorRef}>Invalid OTP. Please try again.</ErrorMsg>
      )}

      <HelpText ref={helpRef}>
        Share this OTP with the delivery agent
      </HelpText>
    </Wrapper>
  );
}
