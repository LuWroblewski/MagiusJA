import { useState } from 'react';
import { Menu } from '../components/Menu';
import { DeleteQuestion } from '../components/deleteQuestion';
import { UpdateQuestion } from '../components/updateQuestion';

const Home = () => {
  const [displayDelete, setDisplayDelete] = useState('block');
  const [displayUpdate, setDisplayUpdate] = useState('none');

  const handleToggleDeleteQuestion = () => {
    setDisplayDelete('block');
    setDisplayUpdate('none');
  };
  const handleToggleUpdateQuestion = () => {
    setDisplayDelete('none');
    setDisplayUpdate('block');
  };

  return (
    <div className='Home'>
      <Menu />
      <div className='menu'>
        <button className='buttonConfig' onClick={handleToggleDeleteQuestion}>
          Deletar
        </button>
        <button className='buttonConfig' onClick={handleToggleUpdateQuestion}>
          Atualizar
        </button>

        <div style={{ display: `${displayDelete}` }}>
          <DeleteQuestion />
        </div>
        <div style={{ display: `${displayUpdate}` }}>
          <UpdateQuestion />
        </div>
      </div>
    </div>
  );
};

export default Home;
