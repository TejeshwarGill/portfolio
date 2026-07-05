import React, { useEffect, useRef, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import VideoModal, { getYouTubeId } from '@components/videoModal';
import { usePrefersReducedMotion } from '@hooks';

const StyledMentorshipsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledMentorship = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }
  &:not(:last-of-type) {
    margin-bottom: 100px;
    @media (max-width: 768px) {
      margin-bottom: 70px;
    }
    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }
  &:nth-of-type(odd) {
    .mentorship-content {
      grid-column: 7 / -1;
      text-align: right;
      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .mentorship-tech-list {
      justify-content: flex-end;
      @media (max-width: 768px) {
        justify-content: flex-start;
      }
      li {
        margin: 0 0 5px 20px;
        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .mentorship-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;
      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .mentorship-image {
      grid-column: 1 / 8;
      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }
  .mentorship-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;
    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }
    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }
  .mentorship-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }
  .mentorship-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);
    @media (min-width: 768px) {
      margin: 0 0 20px;
    }
    @media (max-width: 768px) {
      color: var(--white);
      a {
        position: static;
        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }
  .mentorship-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);
    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;
      &:hover {
        box-shadow: none;
      }
    }
    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
    strong {
      color: var(--white);
      font-weight: normal;
    }
  }
  .mentorship-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;
    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }
    @media (max-width: 768px) {
      margin: 10px 0;
      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }
  .mentorship-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);
    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;
      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }
      svg {
        width: 20px;
        height: 20px;
      }
    }
    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }
  .mentorship-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;
    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 0.25;
    }
    .play-badge {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 4;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: rgba(2, 12, 27, 0.65);
      border: 2px solid var(--green);
      color: var(--green);
      pointer-events: none;
      transition: var(--transition);

      svg {
        width: 26px;
        height: 26px;
        margin-left: 3px;
      }
    }
    a.has-video:hover .play-badge,
    a.has-video:focus .play-badge {
      background: var(--green);
      color: var(--navy);
      transform: translate(-50%, -50%) scale(1.08);
    }
    a {
      width: 100%;
      height: 100%;
      background-color: var(--green);
      border-radius: var(--border-radius);
      vertical-align: middle;
      &:hover,
      &:focus {
        background: transparent;
        outline: 0;
        &:before,
        .img {
          background: transparent;
          filter: none;
        }
      }
      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: var(--transition);
        background-color: var(--navy);
        mix-blend-mode: screen;
      }
    }
    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);
      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(50%);
      }
    }
  }
`;

const Mentorship = () => {
  const data = useStaticQuery(graphql`
    {
      mentorship: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/mentorship/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              overline
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
              tech
              github
              external
              cta
              video
            }
            html
          }
        }
      }
    }
  `);

  const mentorshipMentorships = data.mentorship.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealMentorships = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealMentorships.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="mentorships">
      <h2 className="numbered-heading" ref={revealTitle}>
        Speaking &amp; Thought Leadership
      </h2>

      <StyledMentorshipsGrid>
        {mentorshipMentorships &&
          mentorshipMentorships.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, overline, tech, github, cover, cta, video } = frontmatter;
            const image = getImage(cover);
            const hasVideo = !!getYouTubeId(video);

            return (
              <StyledMentorship key={i} ref={el => (revealMentorships.current[i] = el)}>
                <div className="mentorship-content">
                  <div>
                    <p className="mentorship-overline">{overline}</p>

                    <h3 className="mentorship-title">
                      <a href={external}>{title}</a>
                    </h3>

                    <div
                      className="mentorship-description"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />

                    {tech.length && (
                      <ul className="mentorship-tech-list">
                        {tech.map((tech, i) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    )}

                    <div className="mentorship-links">
                      {cta && (
                        <a href={cta} aria-label="Course Link" className="cta">
                          Learn More
                        </a>
                      )}
                      {external && !cta && (
                        <a href={external} aria-label="External Link" className="external">
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mentorship-image">
                  <a
                    href={hasVideo ? video : external ? external : github ? github : '#'}
                    className={hasVideo ? 'has-video' : undefined}
                    aria-label={hasVideo ? `Play video: ${title}` : title}
                    onClick={
                      hasVideo
                        ? e => {
                            e.preventDefault();
                            setActiveVideo(video);
                          }
                        : undefined
                    }>
                    <GatsbyImage image={image} alt={title} className="img" />
                    {hasVideo && (
                      <span className="play-badge">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    )}
                  </a>
                </div>
              </StyledMentorship>
            );
          })}
      </StyledMentorshipsGrid>

      {activeVideo && <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />}
    </section>
  );
};

export default Mentorship;
