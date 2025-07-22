import { Row, Col, Form, Input } from 'antd';
import type { RuleObject } from 'antd/es/form';
import type { StoreValue } from 'antd/es/form/interface';

import FullNameField from './fields/FullNameField';
import BirthDateField from './fields/BirthDateField';
import ExperienceField from './fields/ExperienceField';
import PositionField from './fields/PositionField';
import LoginField from './fields/LoginField';
import PasswordField from './fields/PasswordField';
import EmailField from './fields/EmailField';
import PhoneField from './fields/PhoneField';
import NotesField from './fields/NotesField';

interface EmployeeFormFieldsProps {
  editing: boolean;
  validateExperience: (rule: RuleObject, value: StoreValue) => Promise<void>;
  POSITIONS: { value: string; label: string }[];
  FIELD_LIMITS: any;
  MESSAGES: any;
}

function EmployeeFormFields({
  editing,
  validateExperience,
  POSITIONS,
  FIELD_LIMITS,
  MESSAGES,
}: EmployeeFormFieldsProps) {
  return (
    <>
      <Form.Item name="id" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Row gutter={16}>
        <Col span={24}>
          <FullNameField
            editing={editing}
            FIELD_LIMITS={FIELD_LIMITS}
            MESSAGES={MESSAGES}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <BirthDateField editing={editing} MESSAGES={MESSAGES} />
        </Col>
        <Col xs={24} sm={12}>
          <ExperienceField
            editing={editing}
            FIELD_LIMITS={FIELD_LIMITS}
            validateExperience={validateExperience}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <PositionField
            editing={editing}
            POSITIONS={POSITIONS}
            MESSAGES={MESSAGES}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <LoginField
            editing={editing}
            FIELD_LIMITS={FIELD_LIMITS}
            MESSAGES={MESSAGES}
          />
        </Col>
        <Col xs={24} sm={12}>
          <PasswordField
            editing={editing}
            FIELD_LIMITS={FIELD_LIMITS}
            MESSAGES={MESSAGES}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <EmailField
            editing={editing}
            FIELD_LIMITS={FIELD_LIMITS}
            MESSAGES={MESSAGES}
          />
        </Col>
        <Col xs={24} sm={12}>
          <PhoneField editing={editing} MESSAGES={MESSAGES} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <NotesField
            editing={editing}
            FIELD_LIMITS={FIELD_LIMITS}
            MESSAGES={MESSAGES}
          />
        </Col>
      </Row>
    </>
  );
}

export default EmployeeFormFields;
