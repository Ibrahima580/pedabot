'use client';

import { useState, FC } from 'react';

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
}

const ExpandableText: FC<ExpandableTextProps> = ({ text, maxLength = 300 }) => {
  const [expanded, setExpanded] = useState(false);

  if (text.length <= maxLength) {
    return <p>{text}</p>;
  }

  const shortText = text.slice(0, maxLength);

  return (
    <p>
      {expanded ? text : shortText + '... '}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',    // <-- blanc ici
          cursor: 'pointer',
          padding: 0,
          fontWeight: 'bold', // <-- gras ici
          fontSize: '1rem',
        }}
        aria-expanded={expanded}
      >
        {expanded ? 'Réduire' : 'Lire la suite'}
      </button>
    </p>
  );
};

export default ExpandableText;
