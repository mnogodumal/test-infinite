import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

export function List({ items, onSelectUser }) {
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      style={{
        height: '500px',
        width: '100%',
        overflow: 'auto',
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            onClick={() => onSelectUser(items[virtualRow.index])}
            style={{
              position: 'absolute',
              top: `${virtualRow.start}px`,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              backgroundColor: virtualRow.index % 2 === 0 ? '#f0f0f0' : '#fff',
              padding: '10px',
              boxSizing: 'border-box',
            }}
          >
            {items[virtualRow.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}

