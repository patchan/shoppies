import React from 'react';

interface EmojiProps {
  symbol: string;
  label?: string;
}

const Emoji: React.FC<EmojiProps> = ({ symbol, label }) => {
  return (
    <span
      className="emoji"
      role="img"
      aria-label={label || ''}
      aria-hidden={!label}
    >
      {symbol}
    </span>
  );
};

export default Emoji;
