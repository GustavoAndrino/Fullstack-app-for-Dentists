// App.jsx
import React from 'react';
import Agenda from './Agenda';

const App = () => {
  // Sample data for days and hours
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const hours = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  return (
    <div className="dandh">
      <Agenda days={days} hours={hours} />
    </div>
  );
};

export default App;
