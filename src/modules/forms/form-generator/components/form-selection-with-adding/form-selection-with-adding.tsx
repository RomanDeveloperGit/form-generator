import { Divider, Empty, Select } from 'antd';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { FormId } from '@/modules/forms/model/types';

import { formsSelectors } from '../../../model/selectors';

import styles from './styles.module.scss';
import { FormOption } from './types';
import { convertFormsToOptions } from './utils';

export const FormSelectionWithAdding = ({
  formAddingSlot,
  selectedFormId,
  onFormSelect,
}: {
  formAddingSlot: JSX.Element;
  selectedFormId: FormId;
  onFormSelect: (formId: FormId) => void;
}) => {
  const forms = useSelector(formsSelectors.getAllForms);
  const options = useMemo(() => convertFormsToOptions(forms), [forms]);

  const filterOption = (input: string, option?: FormOption) =>
    (option?.label ?? '').includes(input);

  const filterSort = (optionA: FormOption, optionB: FormOption) =>
    (optionA?.label ?? '')
      .toLowerCase()
      .localeCompare((optionB?.label ?? '').toLowerCase());

      // onClose + reset
  return (
    <Select
      className={styles.container}
      showSearch={true}
      filterOption={filterOption}
      filterSort={filterSort}
      placeholder="Выберите форму"
      value={selectedFormId}
      onSelect={onFormSelect}
      options={options}
      notFoundContent={
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Ничего не найдено."
        />
      }
      dropdownRender={(menu) => (
        <>
          <div className={styles.menu}>{menu}</div>
          <Divider className={styles.divider} />
          {formAddingSlot}
        </>
      )}
    />
  );
};
