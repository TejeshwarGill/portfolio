import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Extract an 11-char YouTube video id from any common URL form.
export const getYouTubeId = url => {
  if (!url) {
    return null;
  }
  const match = url.match(/(?:youtu\.be\/|watch\?v=|\/embed\/|\/shorts\/|\/v\/)([\w-]{11})/);
  return match ? match[1] : null;
};

const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(2, 12, 27, 0.85);
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledFrame = styled.div`
  position: relative;
  width: min(92vw, 960px);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 20px 50px -15px rgba(2, 12, 27, 0.9);

  .ratio {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
    background: #000;
  }

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  .close {
    position: absolute;
    top: -44px;
    right: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    background: transparent;
    border: 0;
    color: var(--lightest-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    cursor: pointer;

    &:hover {
      color: var(--green);
    }

    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

const VideoModal = ({ url, onClose }) => {
  const id = getYouTubeId(url);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!id) {
    return null;
  }

  return (
    <StyledOverlay onClick={onClose} role="dialog" aria-modal="true" aria-label="Video player">
      <StyledFrame onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close video">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Close
        </button>
        <div className="ratio">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title="Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </StyledFrame>
    </StyledOverlay>
  );
};

VideoModal.propTypes = {
  url: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default VideoModal;
