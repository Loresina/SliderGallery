import React, { useEffect, useState, useRef } from 'react';
import '../styles/app.scss';
import mockData from '../../mockData';

function App() {
  const [info, setInfo] = useState([]);

  const ref = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.resolve(mockData);

        setInfo(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollLeft += 304;
      }
    }, 100);
  }, []);

  let prevConnerStyle = '';

  const randonForm = () => {
    const connerStyles = {
      1: 'leaf_right',
      2: 'leaf_left',
      3: 'rounded',
    };

    const min = 1;
    const max = 3;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

    let curentConnerStyle = connerStyles[randomNum];

    if (prevConnerStyle.length > 0) {
      curentConnerStyle = prevConnerStyle === curentConnerStyle
      || (prevConnerStyle === 'leaf_right' && curentConnerStyle === 'leaf_left')
      || (prevConnerStyle === 'leaf_left' && curentConnerStyle === 'leaf_right')
        ? randonForm() : curentConnerStyle;
    }

    prevConnerStyle = curentConnerStyle;

    return curentConnerStyle;
  };

  const horizontalScroll = (e) => {
    const container = e.currentTarget;
    container.scrollLeft += e.deltaY;
  };

  const scrollLeft = () => {
    const gallery = document.getElementsByClassName('scroll_gallery');
    gallery[0].scrollLeft -= 304;
    console.log('влево', gallery);
  };

  const scrollRight = () => {
    const gallery = document.getElementsByClassName('scroll_gallery');
    gallery[0].scrollLeft += 304;
    console.log('влево');
  };

  return (
    <div className="main">
      <div className="main_title">
        <h1>Полезные материалы</h1>
        <span className="main_subtitle">
          Собрали для вас полезные исследования схемы кормления и другие
          материалы, которые пригодятся для лучших результатов на вашем
          хозяйстве
        </span>
      </div>

      <div className="scroll_gallery" ref={ref} onWheel={(e) => horizontalScroll(e)}>
        {info.map((item) => (
          <div key={item.id} className={item.title.length < 35 ? 'scroll_container_min' : 'scroll_container_big'}>
            <div className={`scroll_container_img ${item.title.length < 35 ? randonForm() : 'rounded_big'}`}>
              <img src={item.img} alt={item.title} />
            </div>
            <div className="scroll_container_discription">
              <a href="#"><h2 className="scroll_container_title">{item.title}</h2></a>
              <span className="scroll_container_subtitle">{item.date}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="scroll_buttons">
        <button type="button" className="button_left" alt="Листать влево" onClick={() => scrollLeft()} />
        <button type="button" className="button_right" alt="Листать вправо" onClick={() => scrollRight()} />
      </div>

    </div>
  );
}

export default App;
