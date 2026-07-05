import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;
  padding-top: 30px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-sans);
      font-size: var(--fz-lg);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I'm an engineering leader with 17 years of experience building and scaling
              high-performance organizations across Healthcare AI, Cybersecurity, and AdTech. I
              currently lead an 18-member AI/ML team as a Senior Engineering Manager at{' '}
              <a href="https://www.nextgen.com/">NextGen Healthcare</a>, where I established an AI
              Center of Excellence and set organization-wide standards for model governance and
              responsible AI.
            </p>

            <p>
              My background pairs a{' '}
              <a href="https://www.anderson.ucla.edu/">UCLA Anderson Executive MBA</a> with a{' '}
              <a href="https://www.bits-pilani.ac.in/">BITS Pilani M.S. in Software Engineering</a>{' '}
              — a combination that lets me operate fluently in both rigorous systems thinking and
              sharp business decision-making. I translate strategy into executable roadmaps: leading
              build-vs-buy evaluations, driving vendor negotiations, managing P&amp;L impact, and
              designing org structures that scale.
            </p>

            <p>
              A few outcomes I'm proud of:
              <ul className="skills-list">
                <li>$2.1M+ in cost savings through infrastructure and vendor optimization</li>
                <li>240% improvement in AI project delivery via an AI Center of Excellence</li>
                <li>90%+ accuracy in AI-generated clinical documentation</li>
                <li>Scaled the Ivanti India Engineering Center from 5 to 27 engineers</li>
                <li>99.9% platform uptime with AI-driven full-stack observability</li>
              </ul>
            </p>

            <p>
              I believe great teams operate as a system, not silos — driven by shared goals, clear
              communication, and engineers who take end-to-end ownership across boundaries to solve
              meaningful problems. I hold teams accountable for the full lifecycle: from model
              selection and architecture to deployment, reliability, and continuous improvement.
            </p>

            <p>
              Here are a few areas I focus on day to day:
              <ul className="skills-list">
                <li>Engineering Org Scaling (5 → 50+)</li>
                <li>AI/ML Strategy &amp; Platform Architecture</li>
                <li>MLOps &amp; Production ML Systems</li>
                <li>AI Governance &amp; Responsible AI</li>
                <li>P&amp;L Ownership &amp; Technology ROI</li>
                <li>Cross-Functional Stakeholder Alignment</li>
              </ul>
            </p>

            <p>
              Beyond the day job, I'm a NASSCOM speaker on Augmented Reality in AdTech and a
              published author on <a href="https://medium.com/@tejeshwargill">Medium</a>. I stay
              hands-on through my projects on <a href="https://github.com/TejeshwarGill">GitHub</a>{' '}
              and as an active{' '}
              <a href="https://stackoverflow.com/users/1388966/ironmangill">Stack Overflow</a>{' '}
              contributor with 7,000+ reputation.
            </p>

            <p>
              I'm also deeply invested in growing the next generation — I mentor new engineers on{' '}
              <strong>mobile</strong> and <strong>AI</strong>, helping them build strong fundamentals
              and grow into end-to-end ownership of the systems they work on.
            </p>
          </div>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.png"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
