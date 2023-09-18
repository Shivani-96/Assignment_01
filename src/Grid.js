import React, { useEffect, useRef } from 'react';
import './Grid.css';

const Grid = ({ numColumns, numBoxes }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const boxIndex = parseInt(entry.target.dataset.boxIndex, 10);
          console.log(`${boxIndex + 1} WAS CALLED`);
        }
      });
    };

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    const boxElements = document.querySelectorAll('.box');
    boxElements.forEach((box, index) => {
      box.dataset.boxIndex = index;
      observer.observe(box);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const boxes = [];
  for (let i = 0; i < numBoxes; i++) {
    boxes.push(
      <div key={i} className="box">
        <div className='box-label'>{i + 1}</div>
      </div>
    );
  }

  return (
    <div className="grid-container">
      <div className="grid" style={{ '--numColumns': numColumns }} ref={gridRef}>
        {boxes}
      </div>
    </div>
  );
};

export default Grid;