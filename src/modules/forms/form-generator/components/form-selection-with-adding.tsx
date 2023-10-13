import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';
import type { InputRef } from 'antd';

import { useAppDispatch } from '@/helpers/store';

import { formsThunkActions } from '../../actions';
import { formsSelectors } from '../../selectors';
import { FormOption } from '../../utils';

export const FormSelectionWithAdding = () => {
  const dispatch = useAppDispatch();
  const forms = useSelector(formsSelectors.getAllForms);

  const [newFormName, setNewFormName] = useState('');
  const inputRef = useRef<InputRef>(null);

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
      style={{ width: 300 }}
      showSearch={true}
      filterOption={filterOption}
      filterSort={filterSort}
      placeholder="Выберите форму"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              ref={inputRef}
              placeholder="Название формы"
              value={newFormName}
              onChange={handleNewFormNameChange}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Добавить
            </Button>
          </Space>
        </>
      )}
      options={forms.map((form) => ({ label: form.name, value: form.id }))}
    />
  );
};
