import { Tooltip, Typography } from 'antd';

import { Form } from '../../../model/types';

export const FormViewHeader = ({ form }: { form: Form }) => {
  return (
    <div>
      <Typography.Title
        level={4}
        copyable={{
          tooltips: ['Скопировать конфиг формы', 'Скопировано'],
          text: JSON.stringify(form),
        }}
      >
        Форма "{form.name}"
      </Typography.Title>
      <Tooltip
        color="white"
        title={
          <Typography.Paragraph>
            В будущем добавятся дополнительные валидации при создании формы и
            полей, а также возможность отправить данные на бекенд, импортировать
            и экспортировать конфиги.
          </Typography.Paragraph>
        }
        placement="bottom"
        arrow={{
          pointAtCenter: true,
        }}
      >
        <Typography.Link>
          На данный момент доступно лишь заполнение полей данными.
        </Typography.Link>
      </Tooltip>
    </div>
  );
};
