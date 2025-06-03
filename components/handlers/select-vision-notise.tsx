import React, { useState } from 'react';

const DropdownComponent = () => {
  const [selectedOption, setSelectedOption] = useState<string>('Да');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="selected-option-box">
      <label htmlFor="decision">Выводить объявление?</label>
      <select
        className="selected-option-value"
        id="decision"
        value={selectedOption}
        onChange={handleChange}
      >
        
        <option value="Да">Да</option>
        <option value="Нет">Нет</option>
      </select>
    </div>
  );
};

export default DropdownComponent;