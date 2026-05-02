import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import anime from 'animejs';

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

const HeroSection = styled.div`
  text-align: center;
  padding: 32px 24px 24px;
  opacity: 0;
`;

const HeroEmoji = styled.p`
  font-size: 48px;
  margin-bottom: 12px;
`;

const HeroTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: #1a1a2e;
`;

const HeroDesc = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin-top: 6px;
  line-height: 1.5;
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

const ContactCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  background: #f8f9fb;
  border: 1px solid #e8ecf1;
  border-radius: 14px;
  margin-bottom: 8px;
  cursor: pointer;
  opacity: 0;
  transform: translateY(12px);
  transition: border-color 0.2s;

  &:hover {
    border-color: #d1d5db;
  }
`;

const ContactIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${(p) => p.bg || '#f1f5f9'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
`;

const ContactInfo = styled.div`
  flex: 1;
`;

const ContactLabel = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
`;

const ContactValue = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
`;

const ContactArrow = styled.span`
  font-size: 16px;
  color: #d1d5db;
`;

const FAQCard = styled.div`
  padding: 14px;
  background: #f8f9fb;
  border: 1px solid #e8ecf1;
  border-radius: 14px;
  margin-bottom: 8px;
  opacity: 0;
  transform: translateY(12px);
`;

const FAQQuestion = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: #1a1a2e;
`;

const FAQAnswer = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin-top: 6px;
  line-height: 1.5;
`;

const contactOptions = [
  { icon: '📞', label: 'Call Us', value: '1800-123-4567 (Toll Free)', bg: 'rgba(59,130,246,0.1)' },
  { icon: '💬', label: 'WhatsApp', value: '+91 98765 43210', bg: 'rgba(34,197,94,0.1)' },
  { icon: '📧', label: 'Email', value: 'support@electrarewards.com', bg: 'rgba(249,115,22,0.1)' },
];

const faqs = [
  {
    q: 'How do I earn points?',
    a: 'Complete electrical jobs, upload purchase bills, refer friends, and check in daily to earn points.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Most gifts are delivered within 2-5 business days. You can track your delivery in real-time through the app.',
  },
  {
    q: 'Can I return or exchange a gift?',
    a: 'Gifts can be exchanged within 7 days of delivery if they are in original condition. Contact support for assistance.',
  },
  {
    q: 'My points are not showing. What do I do?',
    a: 'Points may take up to 24 hours to reflect. If the issue persists, contact our support team with your registered details.',
  },
];

export default function SupportScreen() {
  const history = useHistory();

  const heroRef = useRef(null);
  const contactRefs = useRef([]);
  const faqRefs = useRef([]);

  useEffect(() => {
    if (heroRef.current) {
      anime({
        targets: heroRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutExpo',
      });
    }

    contactRefs.current.forEach((el, i) => {
      if (!el) return;
      anime({
        targets: el,
        translateY: [12, 0],
        opacity: [0, 1],
        duration: 400,
        delay: 200 + i * 60,
        easing: 'easeOutExpo',
      });
    });

    faqRefs.current.forEach((el, i) => {
      if (!el) return;
      anime({
        targets: el,
        translateY: [12, 0],
        opacity: [0, 1],
        duration: 400,
        delay: 400 + i * 60,
        easing: 'easeOutExpo',
      });
    });
  }, []);

  return (
    <Wrapper>
      <Header>
        <BackBtn onClick={() => history.goBack()}>
          <FiArrowLeft />
        </BackBtn>
        <HeaderTitle>Help & Support</HeaderTitle>
      </Header>

      <HeroSection ref={heroRef}>
        <HeroEmoji>📞</HeroEmoji>
        <HeroTitle>How can we help?</HeroTitle>
        <HeroDesc>We're available 24/7 to assist you with any queries about your rewards.</HeroDesc>
      </HeroSection>

      <Content>
        <SectionTitle>Contact Us</SectionTitle>
        {contactOptions.map((c, i) => (
          <ContactCard key={i} ref={(el) => (contactRefs.current[i] = el)}>
            <ContactIcon bg={c.bg}>{c.icon}</ContactIcon>
            <ContactInfo>
              <ContactLabel>{c.label}</ContactLabel>
              <ContactValue>{c.value}</ContactValue>
            </ContactInfo>
            <ContactArrow>&rsaquo;</ContactArrow>
          </ContactCard>
        ))}

        <SectionTitle>Frequently Asked Questions</SectionTitle>
        {faqs.map((f, i) => (
          <FAQCard key={i} ref={(el) => (faqRefs.current[i] = el)}>
            <FAQQuestion>{f.q}</FAQQuestion>
            <FAQAnswer>{f.a}</FAQAnswer>
          </FAQCard>
        ))}
      </Content>
    </Wrapper>
  );
}
