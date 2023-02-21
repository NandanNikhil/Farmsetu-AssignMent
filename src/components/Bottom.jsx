import React from "react";
import "./bottom.css";


const Bottom = ({ weather}) => {
 

  const cards = [
    {
      id: 1,
      title: "min_temp",
      data: weather.temp_min.toFixed(),
      unit:"°C",
    },
    {
      id: 2,
      title: "max_temp",
      data: weather.temp_max.toFixed(),
      unit:"°C",


    },
    {
      id: 3,
      title: "feels like",
      data: weather.feels_like.toFixed(),
      unit:"°C",


    },
    
    {
      id: 4,
      title: "humidity",
      data: weather.humidity,
      unit:"%",


    },
    {
      id: 5,
      title: "wind speed",
      data: weather.speed.toFixed(),
      unit:"m/s",


    },
  ];
 return (
    <div className="section section__descriptions">
      {cards.map(({ id, title, data,unit}) => (
        <div key={id} className="card">
          <div className="description__card">
            
            <small>{title}</small>
                    </div>
    
          <h2>{`${data}${unit}`}</h2>
        </div>
      ))}
    </div>
  );
};

export default Bottom;