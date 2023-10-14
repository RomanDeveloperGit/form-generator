import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Divider, Select, Empty } from 'antd';

import { formsSelectors } from '../../../model/list/selectors';
import { FormOption, convertFormsToOptions } from '../../utils';

import styles from './styles.module.scss';

export const FormSelectionWithAdding = ({
  formAddingSlot,
}: {
  formAddingSlot: JSX.Element;
}) => {
  const forms = useSelector(formsSelectors.getAllForms);
  const options = useMemo(() => convertFormsToOptions(forms), [forms]);

  const filterOption = (input: string, option?: FormOption) =>
    (option?.label ?? '').includes(input);

  const filterSort = (optionA: FormOption, optionB: FormOption) =>
    (optionA?.label ?? '')
      .toLowerCase()
      .localeCompare((optionB?.label ?? '').toLowerCase());

  return (
    <Select
      className={styles.container}
      showSearch={true}
      filterOption={filterOption}
      filterSort={filterSort}
      placeholder="Выберите форму"
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
      options={options}
    />
  );
};
