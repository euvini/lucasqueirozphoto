import React from 'react';

const Title = ({ setSelectedImg }) => {

  const handleTitleClick = () => {
    setSelectedImg({});
  };

  return (
    <div className="title">
      <a href='/' onClick={handleTitleClick}>
        LUCAS QUEIROZ
      </a>
      <p>photography</p>
      <p>contato.eulucasqueiroz@gmail.com</p>
    </div >
  )
}

export default Title;