import { useRef, useState } from 'react';

const SHOW_RENDER_COUNTERS = true;

const RenderCounter = () => {
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;

  if (SHOW_RENDER_COUNTERS) {
    return (
      <p
        style={{
          backgroundColor: 'hsl(0, 100%, 50%)',
          borderRadius: 6,
          color: 'hsl(0, 0%, 100%)',
          fontSize: 15,
          lineHeight: 2,
          fontWeight: 'bold',
          height: 35,
          margin: 2,
          textAlign: 'center',
          width: 35,
        }}
      >
        {renderCount.current}
      </p>
    );
  }
  return null;
};

export default RenderCounter;
