import { useRef, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import type { InputRef } from 'antd';

import { useAppDispatch } from '@/helpers/store';

import { formsThunkActions } from '../../../model/actions';

import styles from './styles.module.scss';

export const FormAdding = () => {
  const dispatch = useAppDispatch();

  const [newFormName, setNewFormName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const handleNewFormNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewFormName(event.target.value);
  };

  const addItem = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    event.preventDefault();

    dispatch(formsThunkActions.createForm(newFormName));
    setNewFormName('');

    inputRef.current?.focus();
  };

  return (
    <div className={styles.container}>
      <Input
        ref={inputRef}
        placeholder="Название формы"
        value={newFormName}
        onChange={handleNewFormNameChange}
      />
      <Button type="link" icon={<PlusOutlined />} onClick={addItem}>
        Добавить
      </Button>
    </div>
  );
};
