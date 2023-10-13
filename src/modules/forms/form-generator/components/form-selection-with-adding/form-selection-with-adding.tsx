import { useRef, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Button, Empty } from 'antd';
import type { InputRef } from 'antd';

import { useAppDispatch } from '@/helpers/store';

import { formsThunkActions } from '../../../actions';
import { formsSelectors } from '../../../selectors';
import { FormOption, convertFormsToOptions } from '../../utils';

import styles from './styles.module.scss';

export const FormSelectionWithAdding = () => {
  const dispatch = useAppDispatch();
  const forms = useSelector(formsSelectors.getAllForms);

  const [newFormName, setNewFormName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const options = useMemo(() => convertFormsToOptions(forms), [forms]);

  const filterOption = (input: string, option?: FormOption) =>
    (option?.label ?? '').includes(input);

  const filterSort = (optionA: FormOption, optionB: FormOption) =>
    (optionA?.label ?? '')
      .toLowerCase()
      .localeCompare((optionB?.label ?? '').toLowerCase());

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
    <Select
      className={styles.container}
      showSearch={true}
      filterOption={filterOption}
      filterSort={filterSort}
      placeholder="Выберите форму"
      notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Ничего не найдено." />}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider className={styles.divider} />
          <div className={styles.addFormBlock}>
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
        </>
      )}
      options={options}
    />
  );
};
