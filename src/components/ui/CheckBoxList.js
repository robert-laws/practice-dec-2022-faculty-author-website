import React, { useState, useEffect, useCallback } from 'react';
import { CheckBox } from './CheckBox';

export const CheckBoxList = ({ listName, boxItems, checkedList, onInput }) => {
  const [checkBoxes, setCheckBoxes] = useState([]);

  const checkChange = useCallback((box) => {
    if (box.checked === true) {
      setCheckBoxes((prevState) => {
        return [...prevState, box.name];
      });
    } else {
      setCheckBoxes((prevState) => {
        return prevState.filter((item) => item !== box.name);
      });
    }
  }, []);

  useEffect(() => {
    onInput(listName, checkBoxes);
  }, [listName, checkBoxes, onInput]);

  // console.log(checkBoxes);

  return (
    <fieldset className='space-y-5'>
      <legend className='sr-only'>{listName}</legend>
      {boxItems.map((item, index) => (
        <CheckBox
          key={index}
          boxNumber={index}
          boxName={item[0]}
          boxText={` (${item[1]})`}
          checked={checkedList.includes(parseInt(item.id)) ? true : false}
          checkChange={checkChange}
        />
      ))}
    </fieldset>
  );
};
