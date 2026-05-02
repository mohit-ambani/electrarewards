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

const Content = styled.div`
  padding: 20px 16px;
`;

const LastUpdated = styled.p`
  font-size: 11px;
  color: #9ca3af;
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(10px);
`;

const SectionHeading = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 8px;
`;

const Paragraph = styled.p`
  font-size: 13px;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 6px;
`;

const BulletList = styled.ul`
  margin: 6px 0 0 16px;
  padding: 0;
`;

const Bullet = styled.li`
  font-size: 13px;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 4px;
`;

const sections = [
  {
    title: '1. Eligibility',
    content: 'The ElectraRewards program is exclusively available to registered electricians and electrical professionals. Participants must be at least 18 years of age and hold a valid electrical trade license.',
  },
  {
    title: '2. Points & Earning',
    content: 'Points are earned through verified activities including completing jobs, uploading purchase invoices, daily check-ins, referrals, and training completion. Points have no cash value and cannot be transferred between accounts.',
  },
  {
    title: '3. Redemption Policy',
    bullets: [
      'Points can be redeemed for gifts listed in the catalogue at the time of redemption.',
      'Gift availability is subject to stock and may be withdrawn without notice.',
      'Redeemed points cannot be reversed or refunded once the order is confirmed.',
      'Minimum redemption threshold varies by product category.',
    ],
  },
  {
    title: '4. Delivery',
    content: 'Gifts are delivered within 2-5 business days to the registered address. Delivery confirmation requires OTP verification. ElectraRewards is not responsible for delays caused by incorrect address details.',
  },
  {
    title: '5. Account Suspension',
    content: 'Accounts may be suspended or terminated for fraudulent activities, duplicate submissions, or violation of program rules. Points from suspended accounts will be forfeited.',
  },
  {
    title: '6. Privacy',
    content: 'Your personal data is collected and processed in accordance with our Privacy Policy. We do not sell or share your information with third parties without consent, except as required by law.',
  },
  {
    title: '7. Changes to Terms',
    content: 'ElectraRewards reserves the right to modify these terms at any time. Continued use of the program after changes constitutes acceptance of the updated terms.',
  },
];

export default function TermsScreen() {
  const history = useHistory();
  const sectionRefs = useRef([]);

  useEffect(() => {
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      anime({
        targets: el,
        translateY: [10, 0],
        opacity: [0, 1],
        duration: 400,
        delay: 100 + i * 50,
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
        <HeaderTitle>Terms & Conditions</HeaderTitle>
      </Header>

      <Content>
        <LastUpdated>Last updated: January 2026</LastUpdated>

        {sections.map((sec, i) => (
          <Section key={i} ref={(el) => (sectionRefs.current[i] = el)}>
            <SectionHeading>{sec.title}</SectionHeading>
            {sec.content && <Paragraph>{sec.content}</Paragraph>}
            {sec.bullets && (
              <BulletList>
                {sec.bullets.map((b, j) => (
                  <Bullet key={j}>{b}</Bullet>
                ))}
              </BulletList>
            )}
          </Section>
        ))}
      </Content>
    </Wrapper>
  );
}
