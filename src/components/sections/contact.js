import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  .contact-details {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 8px 18px;
    margin-top: 40px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);

    a {
      color: var(--light-slate);
      transition: var(--transition);

      &:hover {
        color: var(--green);
      }
    }

    .divider {
      color: var(--lightest-navy);

      @media (max-width: 480px) {
        display: none;
      }
    }
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What’s Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        Whether you want to talk engineering leadership, AI platform strategy, or just say hello, my
        inbox is always open. I'll do my best to get back to you as quickly as I can.
      </p>

      <a className="email-link" href={`mailto:${email}`}>
        Say Hello
      </a>

      <div className="contact-details">
        <a href={`mailto:${email}`}>{email}</a>
        <span className="divider">·</span>
        <a href="tel:+919873581799">+91 98735 81799</a>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
