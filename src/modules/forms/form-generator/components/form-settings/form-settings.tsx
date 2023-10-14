import { Button, Typography, Modal } from 'antd';

import { useAppDispatch, useAppSelector } from '@/helpers/store';

import { formsThunkActions } from '../../../model/actions';
import { formsSelectors } from '../../../model/list/selectors';

import styles from './styles.module.scss';

export const FormSettings = ({ formId }: { formId: string }) => {
  const dispatch = useAppDispatch();
  const formName = useAppSelector((state) =>
    formsSelectors.getFormNameById(state, formId),
  );

  const handleRenameButtonClick = () => {};

  const handleDeleteButtonClick = () => {
    Modal.confirm({
      title: `Вы действительно хотите удалить форму "${formName}"?`,
      content: 'Удалится форма и все прикреплённые к ней поля.',
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отменить',
      onOk() {
        dispatch(formsThunkActions.deleteForm(formId));
      },
    });
  };

  return (
    <div className={styles.container}>
      <Typography.Title level={4}>Действия</Typography.Title>
      <div className={styles.buttonBox}>
        <Button onClick={handleRenameButtonClick}>Переименовать</Button>
        <Button onClick={handleDeleteButtonClick}>Удалить</Button>
      </div>
    </div>
  );
};
